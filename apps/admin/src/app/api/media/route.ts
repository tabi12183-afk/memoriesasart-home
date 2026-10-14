import { NextResponse } from 'next/server';
import { S3StorageClient } from '~/lib/s3-storage';
import { createStormyCMSClient } from '../../../lib/stormy-cms-client.factory';
import { notNullish, nullish } from '~/lib/utils';

class MediaStorageConfigurationError extends Error {}

function getS3Client(): S3StorageClient {
	const bucket = process.env.S3_BUCKET;
	const accessKeyId = process.env.S3_ACCESS_KEY_ID;
	const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;
	if (nullish(bucket) || nullish(accessKeyId) || nullish(secretAccessKey)) {
		throw new MediaStorageConfigurationError(
			'Media storage is not configured. Set S3_BUCKET, S3_ACCESS_KEY_ID, and S3_SECRET_ACCESS_KEY.',
		);
	}

	return new S3StorageClient({
		endpoint: process.env.S3_ENDPOINT ?? 'https://s3.amazonaws.com',
		bucket,
		accessKeyId,
		secretAccessKey,
		region: process.env.S3_REGION ?? 'us-east-2',
	});
}

/**
 * GET /api/media - Get all media items from Stormy CMS server
 */
export async function GET() {
	try {
		const stormyCMSClient = await createStormyCMSClient();
		const media = await stormyCMSClient.getMediaItems({ limit: 100, offset: 0 });

		console.log('[API/media] Listed', media.length, 'media items from Stormy CMS');
		return NextResponse.json({ media }, { status: 200 });
	} catch (error) {
		console.error('[API/media] Get media error:', error);
		return NextResponse.json({ media: [] }, { status: 200 });
	}
}

/**
 * POST /api/media - Upload new media to S3 and store metadata in Stormy CMS
 */
export async function POST(request: Request) {
	console.log('[API/media] POST request received');
	try {
		const formData = await request.formData();
		const file = formData.get('file') as File | null;
		const url = formData.get('url') as string | null;
		const name = formData.get('name') as string | null;
		const alt = formData.get('alt') as string | null;
		const tags = formData.get('tags') as string | null;

		console.log('[API/media] Received file:', file?.name, 'URL:', url, 'Size:', file?.size, 'Type:', file?.type);

		if (nullish(file) && nullish(url)) {
			return NextResponse.json({ error: 'file or url is required' }, { status: 400 });
		}

		let publicUrl: string;
		const metadata: Record<string, unknown> = {};

		if (notNullish(file)) {
			// Upload to S3
			const s3Client = getS3Client();
			const { publicUrl: uploadedUrl, key } = await s3Client.upload(file);
			publicUrl = uploadedUrl;
			metadata.s3Key = key;
		} else {
			publicUrl = url as string;
		}

		const parsedTags = notNullish(tags)
			? tags
					.split(',')
					.map((t) => t.trim())
					.filter((t) => t !== '')
			: undefined;

		// Store metadata in Stormy CMS
		const stormyCMSClient = await createStormyCMSClient();
		const primaryType = notNullish(file) ? file.type.replace(/\/.*$/, '') : '';
		const type = notNullish(file) ? (primaryType !== '' ? primaryType.toLowerCase() : 'file') : 'image';
		const media = await stormyCMSClient.createMedia({
			type,
			url: publicUrl,
			name: name ?? file?.name ?? publicUrl,
			metadata: {
				...metadata,
				...(notNullish(alt) ? { alt } : {}),
				...(notNullish(parsedTags) ? { tags: parsedTags } : {}),
			},
		});

		console.log('[API/media] Created media in Stormy CMS:', media.id, 'URL:', publicUrl);

		return NextResponse.json({ media }, { status: 201 });
	} catch (error) {
		console.error('Create media error:', error);
		if (error instanceof MediaStorageConfigurationError) {
			return NextResponse.json({ error: error.message }, { status: 503 });
		}
		const details = error instanceof Error ? error.message : String(error);
		return NextResponse.json(
			{ error: 'Unable to upload media. Check the storage configuration and try again.', details },
			{ status: 500 },
		);
	}
}

/**
 * PUT /api/media - Update media item metadata in Stormy CMS
 */
export async function PUT(request: Request) {
	try {
		const body = await request.json();
		const { id, type, name, url, metadata: updateMetadata } = body;

		if (typeof id !== 'string' || id === '') {
			return NextResponse.json({ error: 'id is required' }, { status: 400 });
		}

		const stormyCMSClient = await createStormyCMSClient();
		const existing = await stormyCMSClient.getMedia(id);
		const parsedTags = notNullish(updateMetadata?.tags)
			? typeof updateMetadata.tags === 'string'
				? updateMetadata.tags
						.split(',')
						.map((t: string) => t.trim())
						.filter((t: string) => t !== '')
				: updateMetadata.tags
			: undefined;
		const media = await stormyCMSClient.updateMedia({
			id,
			type,
			name,
			url,
			metadata: {
				...existing.metadata,
				...(notNullish(updateMetadata?.alt) ? { alt: updateMetadata.alt } : {}),
				...(notNullish(parsedTags) ? { tags: parsedTags } : {}),
			},
		});

		console.log('[API/media] Updated media in Stormy CMS:', id);

		return NextResponse.json({ media }, { status: 200 });
	} catch (error) {
		console.error('Update media error:', error);
		return NextResponse.json({ error: 'Failed to update media' }, { status: 500 });
	}
}

/**
 * DELETE /api/media - Delete media item from S3 and Stormy CMS
 */
export async function DELETE(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const id = searchParams.get('id');

		if (nullish(id)) {
			return NextResponse.json({ error: 'id query parameter is required' }, { status: 400 });
		}

		const stormyCMSClient = await createStormyCMSClient();

		// Delete from Stormy CMS first; the returned metadata tells us what to clean up in storage
		const media = await stormyCMSClient.deleteMedia({ id });
		console.log('[API/media] Deleted from Stormy CMS:', id);

		// Clean up the underlying storage object using the returned metadata
		const key = media.metadata?.s3Key as string | undefined;
		if (notNullish(key)) {
			try {
				const s3Client = getS3Client();
				await s3Client.delete(key);
				console.log('[API/media] Deleted from S3:', key);
			} catch (s3Error) {
				console.error('[API/media] S3 delete failed:', s3Error);
				// Metadata is already removed; surface the storage failure but don't fail the request
			}
		}

		return NextResponse.json({ message: 'Media deleted successfully', media }, { status: 200 });
	} catch (error) {
		console.error('Delete media error:', error);
		return NextResponse.json({ error: 'Failed to delete media' }, { status: 500 });
	}
}
