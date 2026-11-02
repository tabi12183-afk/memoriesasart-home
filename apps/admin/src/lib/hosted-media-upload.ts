import { z } from 'zod';
import type { MediaItem } from '@stormycms/core';
const preparedSchema = z.object({
	id: z.string(),
	uploadUrl: z.string().url(),
	method: z.literal('PUT'),
	headers: z.record(z.string()),
	expiresAt: z.string(),
});
const mediaSchema = z.object({
	id: z.string(),
	type: z.string(),
	url: z.string(),
	name: z.string(),
	metadata: z.record(z.unknown()),
	siteId: z.string(),
	createdAt: z.string().optional(),
	updatedAt: z.string().optional(),
});
async function control(body: unknown): Promise<unknown> {
	const response = await fetch('/api/media/upload', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
	});
	const result: unknown = await response.json();
	if (!response.ok) {
		const parsed = z.object({ error: z.string() }).safeParse(result);
		throw new Error(parsed.success ? parsed.data.error : 'Upload could not be completed.');
	}
	return result;
}
/** A file was transferred but could not yet be confirmed in the media library. */
export class HostedUploadCompletionError extends Error {
	constructor(
		readonly uploadId: string,
		options: ErrorOptions,
	) {
		super(
			'The file was transferred, but confirmation failed. Try confirming upload ' +
				uploadId +
				' before uploading again.',
			options,
		);
	}
}
/** Upload a file to the site’s Stormy media library using your signed-in admin session. */
export async function uploadHostedMedia(
	file: Blob,
	metadata: { name: string; alt: string; tags: string },
): Promise<MediaItem> {
	if (file.size < 1 || file.size > 100_000_000) throw new Error('Choose a file between 1 byte and 100 MB.');
	const digest = await crypto.subtle.digest('SHA-256', await file.arrayBuffer());
	const sha256 = btoa(String.fromCharCode(...new Uint8Array(digest)));
	const prepared = preparedSchema.parse(
		await control({
			operation: 'prepare',
			name: metadata.name,
			contentType: file.type,
			size: file.size,
			sha256,
			alt: metadata.alt,
		}),
	);
	try {
		const response = await fetch(prepared.uploadUrl, {
			method: prepared.method,
			headers: prepared.headers,
			body: file,
		});
		if (!response.ok) throw new Error('The file could not be transferred. Please try again.');
	} catch (error) {
		await control({ operation: 'cancel', id: prepared.id }).catch(() => undefined);
		throw error;
	}
	try {
		return z
			.object({ media: mediaSchema })
			.parse(await control({ operation: 'complete', id: prepared.id, tags: metadata.tags })).media;
	} catch (cause) {
		throw new HostedUploadCompletionError(prepared.id, { cause });
	}
}
