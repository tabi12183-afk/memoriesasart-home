import {
	S3Client,
	PutObjectCommand,
	DeleteObjectCommand,
	ListObjectsV2Command,
	GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export interface S3Config {
	endpoint: string;
	bucket: string;
	accessKeyId: string;
	secretAccessKey: string;
	region?: string;
}

export interface UploadResult {
	publicUrl: string;
	key: string;
	etag?: string;
}

export interface UploadOptions {
	key?: string;
	contentType?: string;
	isPublic?: boolean;
}

export interface S3Object {
	key: string;
	size: number;
	lastModified: string;
	etag?: string;
}

export interface StorageProvider {
	upload(file: File | Blob | ArrayBuffer | Buffer | Uint8Array, options?: UploadOptions): Promise<UploadResult>;
	delete(key: string): Promise<void>;
	list(prefix?: string, maxKeys?: number): Promise<S3Object[]>;
	getPublicUrl(key: string): string;
	getPresignedUrl(key: string, expiresInSeconds?: number, contentType?: string): Promise<string>;
	getDownloadUrl(key: string, expiresInSeconds?: number): Promise<string>;
}

function createClient(config: S3Config): S3Client {
	const { endpoint, accessKeyId, secretAccessKey, region = 'us-east-1' } = config;
	return new S3Client({
		endpoint,
		region,
		credentials: { accessKeyId, secretAccessKey },
		forcePathStyle: true,
	});
}

async function toUint8Array(file: File | Blob | ArrayBuffer | Buffer | Uint8Array): Promise<Uint8Array> {
	if (file instanceof ArrayBuffer) return new Uint8Array(file);
	if (Buffer.isBuffer(file)) return new Uint8Array(file);
	if (file instanceof Uint8Array) return file;
	const buffer = await (file as File | Blob).arrayBuffer();
	return new Uint8Array(buffer);
}

function buildPublicUrl(config: S3Config, key: string): string {
	return `${config.endpoint}/${config.bucket}/${key}`;
}

function generateKey(file: File | Blob | ArrayBuffer | Buffer | Uint8Array): string {
	const name = file instanceof File ? file.name : 'upload';
	return `uploads/${Date.now()}-${name}`;
}

export async function uploadToS3(
	file: File | Blob | ArrayBuffer | Buffer | Uint8Array,
	config: S3Config,
	options: UploadOptions = {},
	client: S3Client = createClient(config),
): Promise<UploadResult> {
	const { bucket } = config;
	const key = options.key ?? generateKey(file);
	const body = await toUint8Array(file);
	const resolvedContentType =
		options.contentType ?? (file instanceof File ? file.type : undefined) ?? 'application/octet-stream';

	const response = await client.send(
		new PutObjectCommand({
			Bucket: bucket,
			Key: key,
			Body: body,
			ContentType: resolvedContentType,
			ACL: options.isPublic === true ? 'public-read' : undefined,
		}),
	);

	return {
		publicUrl: buildPublicUrl(config, key),
		key,
		etag: response.ETag ?? undefined,
	};
}

export async function getPresignedUploadUrl(
	key: string,
	config: S3Config,
	expiresInSeconds: number = 3600,
	contentType?: string,
	client: S3Client = createClient(config),
): Promise<string> {
	const command = new PutObjectCommand({
		Bucket: config.bucket,
		Key: key,
		ContentType: contentType,
	});
	return getSignedUrl(client, command, { expiresIn: expiresInSeconds });
}

export async function getPresignedDownloadUrl(
	key: string,
	config: S3Config,
	expiresInSeconds: number = 3600,
	client: S3Client = createClient(config),
): Promise<string> {
	const command = new GetObjectCommand({
		Bucket: config.bucket,
		Key: key,
	});
	return getSignedUrl(client, command, { expiresIn: expiresInSeconds });
}

export async function deleteFromS3(
	key: string,
	config: S3Config,
	client: S3Client = createClient(config),
): Promise<void> {
	await client.send(
		new DeleteObjectCommand({
			Bucket: config.bucket,
			Key: key,
		}),
	);
}

export async function listObjects(
	config: S3Config,
	prefix?: string,
	maxKeys: number = 1000,
	client: S3Client = createClient(config),
): Promise<S3Object[]> {
	const response = await client.send(
		new ListObjectsV2Command({
			Bucket: config.bucket,
			Prefix: prefix,
			MaxKeys: maxKeys,
		}),
	);

	return (response.Contents ?? [])
		.filter((obj): obj is typeof obj & { Key: string } => Boolean(obj.Key))
		.map((obj) => ({
			key: obj.Key,
			size: obj.Size ?? 0,
			lastModified: obj.LastModified?.toISOString() ?? new Date(0).toISOString(),
			etag: obj.ETag ?? undefined,
		}));
}

export class S3StorageClient implements StorageProvider {
	#config: S3Config;
	#client: S3Client;

	constructor(config: S3Config) {
		this.#config = config;
		this.#client = createClient(config);
	}

	async upload(file: File | Blob | ArrayBuffer | Buffer, options?: UploadOptions): Promise<UploadResult> {
		return uploadToS3(file, this.#config, options, this.#client);
	}

	async getPresignedUrl(key: string, expiresInSeconds?: number, contentType?: string): Promise<string> {
		return getPresignedUploadUrl(key, this.#config, expiresInSeconds, contentType, this.#client);
	}

	async getDownloadUrl(key: string, expiresInSeconds?: number): Promise<string> {
		return getPresignedDownloadUrl(key, this.#config, expiresInSeconds, this.#client);
	}

	async delete(key: string): Promise<void> {
		return deleteFromS3(key, this.#config, this.#client);
	}

	async list(prefix?: string, maxKeys?: number): Promise<S3Object[]> {
		return listObjects(this.#config, prefix, maxKeys, this.#client);
	}

	getPublicUrl(key: string): string {
		const { endpoint, bucket } = this.#config;
		return `${endpoint}/${bucket}/${key}`;
	}
}
