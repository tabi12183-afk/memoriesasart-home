import { NextResponse } from 'next/server';
import { z } from 'zod';
import { nullish } from '~/lib/utils';
import type { MediaItem } from '@stormycms/core';
import { createStormyCMSClient } from '~/lib/stormy-cms-client.factory';

const requestSchema = z.discriminatedUnion('operation', [
	z.object({
		operation: z.literal('prepare'),
		name: z.string().min(1).max(255),
		contentType: z.string(),
		size: z.number().int().min(1).max(100_000_000),
		sha256: z.string(),
		alt: z.string().max(4000).optional(),
	}),
	z.object({ operation: z.literal('complete'), id: z.string().min(1), tags: z.string().optional() }),
	z.object({ operation: z.literal('cancel'), id: z.string().min(1) }),
]);
// Small control requests only: file bytes go directly from the browser to storage.
export async function POST(request: Request) {
	const parsed = requestSchema.safeParse(await request.json().catch(() => null));
	if (!parsed.success) return NextResponse.json({ error: 'Invalid upload request.' }, { status: 400 });
	try {
		const client = await createStormyCMSClient();
		if (parsed.data.operation === 'prepare') {
			const { name, contentType, size, sha256, alt } = parsed.data;
			const variables = { name, contentType, size, sha256, alt };
			const result = await client.graphql<{ prepareMediaUpload: unknown }>(
				'mutation($name:String!,$contentType:String!,$size:Int!,$sha256:String!,$alt:String){prepareMediaUpload(name:$name,contentType:$contentType,size:$size,sha256:$sha256,alt:$alt){id uploadUrl method headers expiresAt}}',
				variables,
			);
			if (result.errors.length > 0) throw new Error(result.errors.map((error) => error.message).join('; '));
			if (nullish(result.data?.prepareMediaUpload)) throw new Error('The upload could not be prepared.');
			return NextResponse.json(result.data.prepareMediaUpload);
		}
		if (parsed.data.operation === 'cancel') {
			const result = await client.graphql<{ cancelMediaUpload: boolean }>(
				'mutation($id:ID!){cancelMediaUpload(id:$id)}',
				{ id: parsed.data.id },
			);
			if (result.errors.length > 0) throw new Error(result.errors.map((error) => error.message).join('; '));
			if (typeof result.data?.cancelMediaUpload !== 'boolean') throw new Error('Cancellation was not confirmed.');
			return NextResponse.json({ cancelled: result.data.cancelMediaUpload });
		}
		const result = await client.graphql<{ completeMediaUpload: MediaItem }>(
			'mutation($id:ID!){completeMediaUpload(id:$id){id type url name metadata siteId createdAt updatedAt}}',
			{ id: parsed.data.id },
		);
		if (result.errors.length > 0) throw new Error(result.errors.map((error) => error.message).join('; '));
		let media = result.data?.completeMediaUpload;
		if (nullish(media)) throw new Error('Upload did not return a media item.');
		if (!nullish(parsed.data.tags) && parsed.data.tags !== '') {
			media = await client.updateMedia({
				id: media.id,
				metadata: {
					...media.metadata,
					tags: parsed.data.tags
						.split(',')
						.map((t) => t.trim())
						.filter(Boolean),
				},
			});
		}
		return NextResponse.json({ media });
	} catch (error) {
		return NextResponse.json(
			{ error: error instanceof Error ? error.message : 'Upload could not be completed.' },
			{ status: 400 },
		);
	}
}
