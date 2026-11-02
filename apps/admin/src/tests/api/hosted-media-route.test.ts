import { beforeEach, expect, it, vi } from 'vitest';
const { client } = vi.hoisted(() => ({ client: { graphql: vi.fn(), updateMedia: vi.fn() } }));
vi.mock('~/lib/stormy-cms-client.factory', () => ({ createStormyCMSClient: vi.fn(async () => client) }));
import { POST } from '~/app/api/media/upload/route';
const post = (body: unknown) =>
	POST(
		new Request('http://localhost/api/media/upload', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
		}),
	);
beforeEach(() => {
	vi.resetAllMocks();
	client.graphql.mockResolvedValue({ data: { mediaStorage: { uploads: true } }, errors: [] });
});
it('prepares a file using only the signed-in client', async () => {
	client.graphql.mockResolvedValue({
		data: {
			prepareMediaUpload: {
				id: 'upload',
				uploadUrl: 'https://storage.test/object',
				method: 'PUT',
				headers: {},
				expiresAt: 'later',
			},
		},
		errors: [],
	});
	const response = await post({
		operation: 'prepare',
		name: 'x.png',
		contentType: 'image/png',
		size: 1,
		sha256: 'hash',
		alt: 'Lake',
	});
	expect(response.status).toBe(200);
	expect((await response.json()).id).toBe('upload');
	expect(client.graphql.mock.calls[0]?.[1]).toEqual({
		name: 'x.png',
		contentType: 'image/png',
		size: 1,
		sha256: 'hash',
		alt: 'Lake',
	});
});
it('finishes an upload and preserves storage metadata when adding tags', async () => {
	const media = { id: 'upload', metadata: { storage: 'stormy' } };
	client.graphql.mockResolvedValue({ data: { completeMediaUpload: media }, errors: [] });
	client.updateMedia.mockResolvedValue({ ...media, metadata: { storage: 'stormy', tags: ['one', 'two'] } });
	const response = await post({ operation: 'complete', id: 'upload', tags: 'one, two, ' });
	expect((await response.json()).media.metadata.tags).toEqual(['one', 'two']);
	expect(client.updateMedia).toHaveBeenCalledWith({
		id: 'upload',
		metadata: { storage: 'stormy', tags: ['one', 'two'] },
	});
});
it('finishes without a metadata write when no tags were provided', async () => {
	client.graphql.mockResolvedValue({ data: { completeMediaUpload: { id: 'upload' } }, errors: [] });
	expect((await post({ operation: 'complete', id: 'upload' })).status).toBe(200);
	expect(client.updateMedia).not.toHaveBeenCalled();
});
it('cancels an unfinished upload', async () => {
	client.graphql.mockResolvedValue({ data: { cancelMediaUpload: true }, errors: [] });
	expect(await (await post({ operation: 'cancel', id: 'upload' })).json()).toEqual({ cancelled: true });
});
it('rejects invalid requests before contacting the API', async () => {
	for (const body of [{ operation: 'other' }, { operation: 'prepare', size: -1 }, { operation: 'cancel', id: '' }])
		expect((await post(body)).status).toBe(400);
	expect(client.graphql).not.toHaveBeenCalled();
});
it('surfaces API errors without returning upload credentials', async () => {
	client.graphql.mockResolvedValue({ errors: [{ message: 'Storage allowance reached' }] });
	expect(await (await post({ operation: 'cancel', id: 'upload' })).json()).toEqual({
		error: 'Storage allowance reached',
	});
});
it('handles unexpected failures', async () => {
	client.graphql.mockRejectedValue('offline');
	expect(await (await post({ operation: 'cancel', id: 'upload' })).json()).toEqual({
		error: 'Upload could not be completed.',
	});
});
it('rejects malformed JSON', async () => {
	const response = await POST(new Request('http://localhost/api/media/upload', { method: 'POST', body: 'not json' }));
	expect(response.status).toBe(400);
});

it('handles rejected preparation and completion', async () => {
	for (const body of [
		{ operation: 'prepare', name: 'x.png', contentType: 'image/png', size: 1, sha256: 'hash' },
		{ operation: 'complete', id: 'upload' },
	]) {
		client.graphql.mockResolvedValue({ errors: [{ message: 'Permission denied' }] });
		expect(await (await post(body)).json()).toEqual({ error: 'Permission denied' });
	}
});
it('does not report success for missing operation results', async () => {
	for (const body of [
		{ operation: 'prepare', name: 'x.png', contentType: 'image/png', size: 1, sha256: 'hash' },
		{ operation: 'complete', id: 'upload' },
		{ operation: 'cancel', id: 'upload' },
	]) {
		client.graphql.mockResolvedValue({ errors: [] });
		expect((await post(body)).status).toBe(400);
	}
});

it('ignores an empty tag field', async () => {
	client.graphql.mockResolvedValue({ data: { completeMediaUpload: { id: 'upload' } }, errors: [] });
	expect((await post({ operation: 'complete', id: 'upload', tags: '' })).status).toBe(200);
	expect(client.updateMedia).not.toHaveBeenCalled();
});
