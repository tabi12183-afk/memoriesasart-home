import { File as NodeFile } from 'node:buffer';
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

// undici's multipart parser constructs files via the global File, and jsdom's
// implementation fails undici's brand check. Swap in Node's File for this suite.
beforeAll(() => vi.stubGlobal('File', NodeFile));
afterAll(() => vi.unstubAllGlobals());

const { cmsClient, s3Instances, s3State, S3StorageClientMock } = vi.hoisted(() => {
	const cmsClient = {
		getMediaItems: vi.fn(),
		createMedia: vi.fn(),
		getMedia: vi.fn(),
		updateMedia: vi.fn(),
		deleteMedia: vi.fn(),
	};
	const s3Instances: Array<{ config: unknown; upload: ReturnType<typeof vi.fn>; delete: ReturnType<typeof vi.fn> }> =
		[];
	const s3State = { failDelete: false };
	class S3StorageClientMock {
		config: unknown;
		upload = vi.fn(async () => ({ publicUrl: 'https://s3.test/bucket/uploads/file.png', key: 'uploads/file.png' }));
		delete = vi.fn(async () => {
			if (s3State.failDelete) throw new Error('s3 delete failed');
		});
		constructor(config: unknown) {
			this.config = config;
			s3Instances.push(this as never);
		}
	}
	return { cmsClient, s3Instances, s3State, S3StorageClientMock };
});

vi.mock('~/lib/stormy-cms-client.factory', () => ({
	createStormyCMSClient: vi.fn(async () => cmsClient),
}));

vi.mock('~/lib/s3-storage', () => ({ S3StorageClient: S3StorageClientMock }));

import { DELETE, GET, POST, PUT } from '~/app/api/media/route';
import { notNullish } from '~/lib/utils';

const stubS3Env = () => {
	vi.stubEnv('S3_BUCKET', 'bucket');
	vi.stubEnv('S3_ACCESS_KEY_ID', 'key');
	vi.stubEnv('S3_SECRET_ACCESS_KEY', 'secret');
};

type FormFile = { filename: string; type: string; content: string };

// jsdom's FormData/File don't survive the round-trip through undici's Request,
// so build the multipart payload by hand.
const postForm = (entries: Record<string, string | FormFile>) => {
	const boundary = '----vitest-boundary';
	const parts = Object.entries(entries).map(([key, value]) =>
		typeof value === 'string'
			? `--${boundary}\r\nContent-Disposition: form-data; name="${key}"\r\n\r\n${value}`
			: `--${boundary}\r\nContent-Disposition: form-data; name="${key}"; filename="${value.filename}"\r\n` +
				`${notNullish(value.type) ? `Content-Type: ${value.type}\r\n` : ''}\r\n${value.content}`,
	);
	return new Request('http://localhost:4000/api/media', {
		method: 'POST',
		headers: { 'content-type': `multipart/form-data; boundary=${boundary}` },
		body: [...parts, `--${boundary}--`].join('\r\n'),
	});
};

beforeEach(() => {
	for (const fn of Object.values(cmsClient)) fn.mockReset();
	s3Instances.length = 0;
	s3State.failDelete = false;
	vi.spyOn(console, 'log').mockImplementation(() => {});
	vi.spyOn(console, 'error').mockImplementation(() => {});
});

describe('GET /api/media', () => {
	it('lists media items', async () => {
		cmsClient.getMediaItems.mockResolvedValue([{ id: 'm1' }]);
		const response = await GET();
		expect(response.status).toBe(200);
		await expect(response.json()).resolves.toEqual({ media: [{ id: 'm1' }] });
		expect(cmsClient.getMediaItems).toHaveBeenCalledWith({ limit: 100, offset: 0 });
	});

	it('degrades to an empty list when the CMS is unreachable', async () => {
		cmsClient.getMediaItems.mockRejectedValue(new Error('down'));
		const response = await GET();
		expect(response.status).toBe(200);
		await expect(response.json()).resolves.toEqual({ media: [] });
	});
});

describe('POST /api/media', () => {
	it('requires a file or url', async () => {
		const response = await POST(postForm({}));
		expect(response.status).toBe(400);
		await expect(response.json()).resolves.toEqual({ error: 'file or url is required' });
	});

	it('uploads a file to S3 and stores its metadata', async () => {
		stubS3Env();
		cmsClient.createMedia.mockResolvedValue({ id: 'm1' });
		const file: FormFile = { filename: 'photo.png', type: 'image/png', content: 'data' };

		const response = await POST(postForm({ file, alt: 'A photo', tags: 'one, two, ,three' }));

		expect(response.status).toBe(201);
		expect(s3Instances).toHaveLength(1);
		if (s3Instances[0] === undefined) {
			throw new Error('S3 instance is undefined');
		}
		expect(s3Instances[0].config).toMatchObject({
			endpoint: 'https://s3.amazonaws.com',
			bucket: 'bucket',
			region: 'us-east-2',
		});
		expect(cmsClient.createMedia).toHaveBeenCalledWith({
			type: 'image',
			url: 'https://s3.test/bucket/uploads/file.png',
			name: 'photo.png',
			metadata: { s3Key: 'uploads/file.png', alt: 'A photo', tags: ['one', 'two', 'three'] },
		});
	});

	it('honors explicit S3 endpoint/region and an explicit name', async () => {
		stubS3Env();
		vi.stubEnv('S3_ENDPOINT', 'https://minio.local');
		vi.stubEnv('S3_REGION', 'eu-central-1');
		cmsClient.createMedia.mockResolvedValue({ id: 'm1' });
		const file: FormFile = { filename: 'photo.png', type: 'image/png', content: 'data' };

		await POST(postForm({ file, name: 'renamed.png' }));
		if (s3Instances[0] === undefined) {
			throw new Error('S3 instance is undefined');
		}

		expect(s3Instances[0].config).toMatchObject({ endpoint: 'https://minio.local', region: 'eu-central-1' });
		expect(cmsClient.createMedia).toHaveBeenCalledWith(expect.objectContaining({ name: 'renamed.png' }));
	});

	it('registers an external url without touching S3', async () => {
		cmsClient.createMedia.mockResolvedValue({ id: 'm1' });
		const response = await POST(postForm({ url: 'https://example.com/pic.jpg' }));

		expect(response.status).toBe(201);
		expect(s3Instances).toHaveLength(0);
		expect(cmsClient.createMedia).toHaveBeenCalledWith({
			type: 'image',
			url: 'https://example.com/pic.jpg',
			name: 'https://example.com/pic.jpg',
			metadata: {},
		});
	});

	it('falls back to the generic file type when the file has no MIME type', async () => {
		stubS3Env();
		cmsClient.createMedia.mockResolvedValue({ id: 'm1' });
		const file: FormFile = { filename: 'blob.bin', type: '/bin', content: 'data' };

		await POST(postForm({ file }));

		expect(cmsClient.createMedia).toHaveBeenCalledWith(expect.objectContaining({ type: 'file' }));
	});

	it('returns 503 when storage is not configured', async () => {
		const file: FormFile = { filename: 'photo.png', type: 'image/png', content: 'data' };
		const response = await POST(postForm({ file }));
		expect(response.status).toBe(503);
		const body = await response.json();
		expect(body.error).toContain('Media storage is not configured');
	});

	it.each([
		['bucket', ['S3_ACCESS_KEY_ID', 'S3_SECRET_ACCESS_KEY']],
		['access key', ['S3_BUCKET', 'S3_SECRET_ACCESS_KEY']],
		['secret', ['S3_BUCKET', 'S3_ACCESS_KEY_ID']],
	])('treats storage as unconfigured when the %s is missing', async (_name, presentVars) => {
		for (const envVar of presentVars) vi.stubEnv(envVar, 'value');
		const response = await POST(
			postForm({ file: { filename: 'x.png', type: 'image/png', content: 'x' } satisfies FormFile }),
		);
		expect(response.status).toBe(503);
	});

	it('returns 500 with details for unexpected failures', async () => {
		stubS3Env();
		cmsClient.createMedia.mockRejectedValue(new Error('cms exploded'));
		const response = await POST(
			postForm({ file: { filename: 'x.png', type: 'image/png', content: 'x' } satisfies FormFile }),
		);
		expect(response.status).toBe(500);
		const body = await response.json();
		expect(body.details).toBe('cms exploded');
	});

	it('stringifies non-Error failures in the details', async () => {
		cmsClient.createMedia.mockRejectedValue('string failure');
		const response = await POST(postForm({ url: 'https://example.com/pic.jpg' }));
		expect(response.status).toBe(500);
		const body = await response.json();
		expect(body.details).toBe('string failure');
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
	const deleteRequest = (id?: string) =>
		new Request(`http://localhost:4000/api/media${notNullish(id) ? `?id=${id}` : ''}`, { method: 'DELETE' });

	it('requires an id query parameter', async () => {
		expect((await DELETE(deleteRequest())).status).toBe(400);
	});

	it('deletes from the CMS and cleans up the S3 object', async () => {
		stubS3Env();
		cmsClient.deleteMedia.mockResolvedValue({ id: 'm1', metadata: { s3Key: 'uploads/file.png' } });

		const response = await DELETE(deleteRequest('m1'));

		expect(response.status).toBe(200);
		expect(s3Instances).toHaveLength(1);
		if (s3Instances[0] === undefined) {
			throw new Error('S3 instance is undefined');
		}
		expect(s3Instances[0].delete).toHaveBeenCalledWith('uploads/file.png');
	});

	it('skips storage cleanup when the media has no S3 key', async () => {
		cmsClient.deleteMedia.mockResolvedValue({ id: 'm1', metadata: {} });
		const response = await DELETE(deleteRequest('m1'));
		expect(response.status).toBe(200);
		expect(s3Instances).toHaveLength(0);
	});

	it('still succeeds when the S3 cleanup fails', async () => {
		stubS3Env();
		s3State.failDelete = true;
		cmsClient.deleteMedia.mockResolvedValue({ id: 'm1', metadata: { s3Key: 'uploads/file.png' } });
		const response = await DELETE(deleteRequest('m1'));
		expect(response.status).toBe(200);
		if (s3Instances[0] === undefined) {
			throw new Error('S3 instance is undefined');
		}
		expect(s3Instances[0].delete).toHaveBeenCalledWith('uploads/file.png');
	});

	it('reports CMS delete failures as 500', async () => {
		cmsClient.deleteMedia.mockRejectedValue(new Error('nope'));
		expect((await DELETE(deleteRequest('m1'))).status).toBe(500);
	});
});
