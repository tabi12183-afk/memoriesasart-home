import { beforeEach, describe, expect, it, vi } from 'vitest';
const { cmsClient } = vi.hoisted(() => ({
	cmsClient: {
		getMediaItems: vi.fn(),
		graphql: vi.fn(),
		createMedia: vi.fn(),
		getMedia: vi.fn(),
		updateMedia: vi.fn(),
		deleteMedia: vi.fn(),
	},
}));
vi.mock('~/lib/stormy-cms-client.factory', () => ({ createStormyCMSClient: vi.fn(async () => cmsClient) }));
import { GET, POST, PUT, DELETE } from '~/app/api/media/route';
const postForm = (entries: Record<string, string>) => {
	const data = new FormData();
	for (const [key, value] of Object.entries(entries)) data.set(key, value);
	return new Request('http://localhost/api/media', { method: 'POST', body: data });
};
beforeEach(() => {
	for (const fn of Object.values(cmsClient)) fn.mockReset();
	vi.spyOn(console, 'error').mockImplementation(() => {});
	vi.spyOn(console, 'log').mockImplementation(() => {});
});
describe('GET /api/media', () => {
	it('lists media with Stormy upload availability', async () => {
		cmsClient.getMediaItems.mockResolvedValue([{ id: 'm1' }]);
		cmsClient.graphql.mockResolvedValue({ data: { mediaStorage: { uploads: true } }, errors: [] });
		expect(await (await GET()).json()).toEqual({ media: [{ id: 'm1' }], uploads: true });
	});
	it('uses the site plan upload availability', async () => {
		cmsClient.getMediaItems.mockResolvedValue([]);
		cmsClient.graphql.mockResolvedValue({ data: { mediaStorage: { uploads: false } }, errors: [] });
		expect(await (await GET()).json()).toEqual({ media: [], uploads: false });
	});
	it('reports service failures', async () => {
		cmsClient.getMediaItems.mockRejectedValue(new Error('offline'));
		expect((await GET()).status).toBe(500);
	});
	it('reports missing storage data', async () => {
		cmsClient.getMediaItems.mockResolvedValue([]);
		cmsClient.graphql.mockResolvedValue({ errors: [] });
		expect((await GET()).status).toBe(500);
	});
	it('reports storage API errors', async () => {
		cmsClient.getMediaItems.mockResolvedValue([]);
		cmsClient.graphql.mockResolvedValue({
			data: { mediaStorage: { uploads: true } },
			errors: [{ message: 'unavailable' }],
		});
		expect((await GET()).status).toBe(500);
	});
});
describe('POST /api/media', () => {
	it('requires a URL', async () => {
		expect((await POST(postForm({}))).status).toBe(400);
		expect((await POST(postForm({ url: '' }))).status).toBe(400);
	});
	it('registers an externally hosted file', async () => {
		cmsClient.createMedia.mockResolvedValue({ id: 'm1' });
		expect((await POST(postForm({ url: 'https://example.com/photo.png' }))).status).toBe(201);
		expect(cmsClient.createMedia).toHaveBeenCalledWith({
			type: 'image',
			url: 'https://example.com/photo.png',
			name: 'https://example.com/photo.png',
			metadata: {},
		});
	});
	it('saves the name, alt text, and tags', async () => {
		cmsClient.createMedia.mockResolvedValue({ id: 'm1' });
		await POST(postForm({ url: 'https://example.com/photo.png', name: 'Lake', alt: 'A lake', tags: 'one, two, ' }));
		expect(cmsClient.createMedia).toHaveBeenCalledWith({
			type: 'image',
			url: 'https://example.com/photo.png',
			name: 'Lake',
			metadata: { alt: 'A lake', tags: ['one', 'two'] },
		});
	});
	it('reports failures', async () => {
		cmsClient.createMedia.mockRejectedValue(new Error('offline'));
		expect((await POST(postForm({ url: 'https://example.com/photo.png' }))).status).toBe(500);
	});
});
describe('PUT /api/media', () => {
	const putRequest = (body: unknown) =>
		new Request('http://localhost:4000/api/media', { method: 'PUT', body: JSON.stringify(body) });

	it('requires an id', async () => {
		expect((await PUT(putRequest({}))).status).toBe(400);
	});

	it('merges alt and string tags into the existing metadata', async () => {
		cmsClient.getMedia.mockResolvedValue({ metadata: { s3Key: 'uploads/file.png' } });
		cmsClient.updateMedia.mockResolvedValue({ id: 'm1' });

		const response = await PUT(
			putRequest({ id: 'm1', name: 'new.png', metadata: { alt: 'Alt text', tags: 'a, b, ' } }),
		);

		expect(response.status).toBe(200);
		expect(cmsClient.updateMedia).toHaveBeenCalledWith({
			id: 'm1',
			type: undefined,
			name: 'new.png',
			url: undefined,
			metadata: { s3Key: 'uploads/file.png', alt: 'Alt text', tags: ['a', 'b'] },
		});
	});

	it('passes through tags that are already an array', async () => {
		cmsClient.getMedia.mockResolvedValue({ metadata: {} });
		cmsClient.updateMedia.mockResolvedValue({ id: 'm1' });

		await PUT(putRequest({ id: 'm1', metadata: { tags: ['x', 'y'] } }));

		expect(cmsClient.updateMedia).toHaveBeenCalledWith(expect.objectContaining({ metadata: { tags: ['x', 'y'] } }));
	});

	it('keeps existing metadata when no updates are provided', async () => {
		cmsClient.getMedia.mockResolvedValue({ metadata: { alt: 'old' } });
		cmsClient.updateMedia.mockResolvedValue({ id: 'm1' });

		await PUT(putRequest({ id: 'm1' }));

		expect(cmsClient.updateMedia).toHaveBeenCalledWith(expect.objectContaining({ metadata: { alt: 'old' } }));
	});

	it('reports update failures as 500', async () => {
		cmsClient.getMedia.mockRejectedValue(new Error('missing'));
		expect((await PUT(putRequest({ id: 'm1' }))).status).toBe(500);
	});
});

describe('DELETE /api/media', () => {
	it('requires an id', async () => {
		expect((await DELETE(new Request('http://localhost/api/media'))).status).toBe(400);
	});
	it('delegates file ownership and deletion to the API', async () => {
		cmsClient.deleteMedia.mockResolvedValue({ id: 'm1', metadata: { s3Key: 'external-key' } });
		const response = await DELETE(new Request('http://localhost/api/media?id=m1'));
		expect(response.status).toBe(200);
		expect(cmsClient.deleteMedia).toHaveBeenCalledWith({ id: 'm1' });
	});
	it('reports API failures', async () => {
		cmsClient.deleteMedia.mockRejectedValue(new Error('offline'));
		expect((await DELETE(new Request('http://localhost/api/media?id=m1'))).status).toBe(500);
	});
});
