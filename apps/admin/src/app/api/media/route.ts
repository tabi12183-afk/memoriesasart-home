import { NextResponse } from 'next/server';
import { createStormyCMSClient } from '~/lib/stormy-cms-client.factory';
import { notNullish, nullish } from '~/lib/utils';

/** List media and whether the site's plan currently permits uploads. */
export async function GET() {
	try {
		const client = await createStormyCMSClient();
		const [media, result] = await Promise.all([
			client.getMediaItems({ limit: 100, offset: 0 }),
			client.graphql<{ mediaStorage: { uploads: boolean } }>('query { mediaStorage { uploads } }'),
		]);
		if (result.errors.length > 0 || nullish(result.data?.mediaStorage))
			throw new Error('Media storage is unavailable.');
		return NextResponse.json({ media, uploads: result.data.mediaStorage.uploads });
	} catch (error) {
		console.error('Get media error:', error);
		return NextResponse.json({ error: 'Unable to load media.' }, { status: 500 });
	}
}

/** Add a media record for a file already available at a URL. */
export async function POST(request: Request) {
	try {
		const form = await request.formData();
		const url = form.get('url');
		if (typeof url !== 'string' || url === '') return NextResponse.json({ error: 'url is required' }, { status: 400 });
		const name = form.get('name'),
			alt = form.get('alt'),
			tags = form.get('tags');
		const client = await createStormyCMSClient();
		const media = await client.createMedia({
			type: 'image',
			url,
			name: typeof name === 'string' ? name : url,
			metadata: {
				...(typeof alt === 'string' ? { alt } : {}),
				...(typeof tags === 'string'
					? {
							tags: tags
								.split(',')
								.map((t) => t.trim())
								.filter((t) => t !== ''),
						}
					: {}),
			},
		});
		return NextResponse.json({ media }, { status: 201 });
	} catch (error) {
		console.error('Add media error:', error);
		return NextResponse.json({ error: 'Unable to add media.' }, { status: 500 });
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

/** Delete a media record; the API removes files held in Stormy storage. */
export async function DELETE(request: Request) {
	try {
		const id = new URL(request.url).searchParams.get('id');
		if (nullish(id)) return NextResponse.json({ error: 'id query parameter is required' }, { status: 400 });
		const client = await createStormyCMSClient();
		const media = await client.deleteMedia({ id });
		return NextResponse.json({ message: 'Media deleted successfully', media });
	} catch (error) {
		console.error('Delete media error:', error);
		return NextResponse.json({ error: 'Failed to delete media' }, { status: 500 });
	}
}
