import { webcrypto } from 'node:crypto';
import { beforeEach, expect, it, vi } from 'vitest';
import { HostedUploadCompletionError, uploadHostedMedia } from '~/lib/hosted-media-upload';
const fetcher = vi.fn();
const metadata = { name: 'lake.png', alt: 'Lake', tags: 'nature' };
const media = {
	id: 'a',
	type: 'image',
	url: 'https://cdn.stormycms.com/uploads/site/a',
	name: 'lake.png',
	metadata: { storage: 'stormy' },
	siteId: 'site',
};
const prepared = {
	id: 'a',
	uploadUrl: 'https://storage.test/object',
	method: 'PUT',
	headers: { 'Content-Type': 'image/png' },
	expiresAt: 'later',
};
const response = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status });
const file = () => {
	const f = new File(['bytes'], 'lake.png', { type: 'image/png' });
	Object.defineProperty(f, 'arrayBuffer', { value: async () => new TextEncoder().encode('bytes').buffer });
	return f;
};
beforeEach(() => {
	fetcher.mockReset();
	vi.stubGlobal('fetch', fetcher);
	vi.stubGlobal('crypto', webcrypto);
});
it('hashes and transfers the exact file with only storage headers', async () => {
	const f = file();
	fetcher
		.mockResolvedValueOnce(response(prepared))
		.mockResolvedValueOnce(response({}))
		.mockResolvedValueOnce(response({ media }));
	expect(await uploadHostedMedia(f, metadata)).toEqual(media);
	expect(JSON.parse(fetcher.mock.calls[0]?.[1].body)).toMatchObject({
		operation: 'prepare',
		size: 5,
		contentType: 'image/png',
		sha256: 'J3CJ2RwL308uaGK6fkoHYFEZQx9dE/cm3TUrBvGyBqk=',
	});
	expect(fetcher.mock.calls[1]?.[1]).toEqual({ method: 'PUT', headers: prepared.headers, body: f });
	expect(JSON.parse(fetcher.mock.calls[2]?.[1].body)).toEqual({ operation: 'complete', id: 'a', tags: 'nature' });
});
it('cancels failed transfers without masking the transfer error', async () => {
	fetcher
		.mockResolvedValueOnce(response(prepared))
		.mockResolvedValueOnce(response({}, 403))
		.mockRejectedValueOnce(new Error('cancel offline'));
	await expect(uploadHostedMedia(file(), metadata)).rejects.toThrow('could not be transferred');
	expect(JSON.parse(fetcher.mock.calls[2]?.[1].body)).toEqual({ operation: 'cancel', id: 'a' });
});
it('preserves the upload ID when confirmation fails', async () => {
	fetcher
		.mockResolvedValueOnce(response(prepared))
		.mockResolvedValueOnce(response({}))
		.mockResolvedValueOnce(response({ error: 'temporarily unavailable' }, 503));
	try {
		await uploadHostedMedia(file(), metadata);
		throw new Error('expected failure');
	} catch (error) {
		expect(error).toBeInstanceOf(HostedUploadCompletionError);
		if (error instanceof HostedUploadCompletionError) expect(error.uploadId).toBe('a');
	}
	expect(fetcher).toHaveBeenCalledTimes(3);
});
it('validates file size before any network request', async () => {
	await expect(uploadHostedMedia(new File([], 'empty.png'), metadata)).rejects.toThrow('100 MB');
	const f = file();
	Object.defineProperty(f, 'size', { value: 100_000_001 });
	await expect(uploadHostedMedia(f, metadata)).rejects.toThrow('100 MB');
	expect(fetcher).not.toHaveBeenCalled();
});
it('shows a neutral message for an unexpected API failure', async () => {
	fetcher.mockResolvedValueOnce(response({}, 500));
	await expect(uploadHostedMedia(file(), metadata)).rejects.toThrow('Upload could not be completed.');
});
