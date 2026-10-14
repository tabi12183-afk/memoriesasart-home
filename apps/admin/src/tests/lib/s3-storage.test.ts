import { beforeEach, describe, expect, it, vi } from 'vitest';

const { s3Send, s3ClientConfigs, getSignedUrl } = vi.hoisted(() => ({
	s3Send: vi.fn(),
	s3ClientConfigs: [] as unknown[],
	getSignedUrl: vi.fn(async () => 'https://signed.example.com/url'),
}));

vi.mock('@aws-sdk/client-s3', async (importOriginal) => {
	const original = await importOriginal<typeof import('@aws-sdk/client-s3')>();
	return {
		...original,
		S3Client: class {
			send = s3Send;
			constructor(config: unknown) {
				s3ClientConfigs.push(config);
			}
		},
	};
});

vi.mock('@aws-sdk/s3-request-presigner', () => ({ getSignedUrl }));

import { DeleteObjectCommand, GetObjectCommand, ListObjectsV2Command, PutObjectCommand } from '@aws-sdk/client-s3';
import {
	S3StorageClient,
	deleteFromS3,
	getPresignedDownloadUrl,
	getPresignedUploadUrl,
	listObjects,
	uploadToS3,
	type S3Config,
} from '~/lib/s3-storage';

const config: S3Config = {
	endpoint: 'https://s3.test',
	bucket: 'bucket',
	accessKeyId: 'key',
	secretAccessKey: 'secret',
};

beforeEach(() => {
	s3Send.mockReset();
	getSignedUrl.mockClear();
	s3ClientConfigs.length = 0;
});

describe('uploadToS3', () => {
	it('uploads a File under a generated key with its own content type', async () => {
		s3Send.mockResolvedValue({ ETag: '"etag-1"' });
		const file = new File(['hello'], 'photo.png', { type: 'image/png' });

		const result = await uploadToS3(file, config);

		expect(result.key).toMatch(/^uploads\/\d+-photo\.png$/);
		expect(result.publicUrl).toBe(`https://s3.test/bucket/${result.key}`);
		expect(result.etag).toBe('"etag-1"');
		const command = s3Send.mock.calls[0]?.[0] as PutObjectCommand;
		expect(command).toBeInstanceOf(PutObjectCommand);
		expect(command.input).toMatchObject({ Bucket: 'bucket', ContentType: 'image/png', ACL: undefined });
	});

	it('defaults the region and honors an explicit one', async () => {
		s3Send.mockResolvedValue({});
		await uploadToS3(Buffer.from('x'), config, { key: 'k' });
		await uploadToS3(Buffer.from('x'), { ...config, region: 'eu-west-1' }, { key: 'k' });
		expect(s3ClientConfigs).toMatchObject([{ region: 'us-east-1' }, { region: 'eu-west-1' }]);
	});

	it('uploads raw buffers under the provided key as public octet-stream', async () => {
		s3Send.mockResolvedValue({});
		const result = await uploadToS3(Buffer.from('raw'), config, { key: 'uploads/raw.bin', isPublic: true });

		expect(result).toEqual({
			publicUrl: 'https://s3.test/bucket/uploads/raw.bin',
			key: 'uploads/raw.bin',
			etag: undefined,
		});
		const command = s3Send.mock.calls[0]?.[0] as PutObjectCommand;
		expect(command.input).toMatchObject({
			Key: 'uploads/raw.bin',
			ContentType: 'application/octet-stream',
			ACL: 'public-read',
		});
	});

	it('generates a generic key for non-File uploads', async () => {
		s3Send.mockResolvedValue({});
		const result = await uploadToS3(new Blob(['x']), config);
		expect(result.key).toMatch(/^uploads\/\d+-upload$/);
	});

	it('accepts ArrayBuffer, Uint8Array, and Blob bodies', async () => {
		s3Send.mockResolvedValue({});
		await uploadToS3(new ArrayBuffer(4), config, { key: 'a' });
		await uploadToS3(new Uint8Array([1, 2]), config, { key: 'b' });
		await uploadToS3(new Blob(['blob-content']), config, { key: 'c', contentType: 'text/plain' });

		expect(s3Send).toHaveBeenCalledTimes(3);
		const blobCommand = s3Send.mock.calls[2]?.[0] as PutObjectCommand;
		expect(blobCommand.input.ContentType).toBe('text/plain');
	});
});

describe('presigned URLs', () => {
	it('presigns uploads with the requested expiry and content type', async () => {
		await expect(getPresignedUploadUrl('k', config, 60, 'image/png')).resolves.toBe('https://signed.example.com/url');
		const [, commandArg, optionsArg] = getSignedUrl.mock.calls[0] as unknown[];
		expect(commandArg).toBeInstanceOf(PutObjectCommand);
		expect((commandArg as PutObjectCommand).input.ContentType).toBe('image/png');
		expect(optionsArg).toEqual({ expiresIn: 60 });
	});

	it('presigns downloads with a default one-hour expiry', async () => {
		await expect(getPresignedDownloadUrl('k', config)).resolves.toBe('https://signed.example.com/url');
		const [, commandArg, optionsArg] = getSignedUrl.mock.calls[0] as unknown[];
		expect(commandArg).toBeInstanceOf(GetObjectCommand);
		expect(optionsArg).toEqual({ expiresIn: 3600 });
	});
});

describe('deleteFromS3', () => {
	it('issues a delete for the key', async () => {
		s3Send.mockResolvedValue({});
		await deleteFromS3('uploads/old.png', config);
		const command = s3Send.mock.calls[0]?.[0] as DeleteObjectCommand;
		expect(command).toBeInstanceOf(DeleteObjectCommand);
		expect(command.input).toEqual({ Bucket: 'bucket', Key: 'uploads/old.png' });
	});
});

describe('listObjects', () => {
	it('maps S3 contents into storage objects and skips keyless entries', async () => {
		const lastModified = new Date('2026-01-02T03:04:05Z');
		s3Send.mockResolvedValue({
			Contents: [{ Key: 'a.png', Size: 10, LastModified: lastModified, ETag: '"e"' }, { Key: 'b.png' }, { Size: 5 }],
		});

		await expect(listObjects(config, 'uploads/', 25)).resolves.toEqual([
			{ key: 'a.png', size: 10, lastModified: lastModified.toISOString(), etag: '"e"' },
			{ key: 'b.png', size: 0, lastModified: new Date(0).toISOString(), etag: undefined },
		]);
		const command = s3Send.mock.calls[0]?.[0] as ListObjectsV2Command;
		expect(command.input).toEqual({ Bucket: 'bucket', Prefix: 'uploads/', MaxKeys: 25 });
	});

	it('returns an empty list when the bucket has no contents', async () => {
		s3Send.mockResolvedValue({});
		await expect(listObjects(config)).resolves.toEqual([]);
	});
});

describe('S3StorageClient', () => {
	const client = new S3StorageClient(config);

	it('builds public URLs from the configured endpoint and bucket', () => {
		expect(client.getPublicUrl('uploads/pic.png')).toBe('https://s3.test/bucket/uploads/pic.png');
	});

	it('delegates every storage operation to the shared S3 client', async () => {
		s3Send.mockResolvedValue({ Contents: [] });

		await expect(client.upload(Buffer.from('x'), { key: 'k' })).resolves.toMatchObject({ key: 'k' });
		await expect(client.getPresignedUrl('k')).resolves.toBe('https://signed.example.com/url');
		await expect(client.getDownloadUrl('k')).resolves.toBe('https://signed.example.com/url');
		await expect(client.delete('k')).resolves.toBeUndefined();
		await expect(client.list('uploads/', 10)).resolves.toEqual([]);
	});
});
