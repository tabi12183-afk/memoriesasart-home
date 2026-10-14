import { beforeEach, describe, expect, it, vi } from 'vitest';

const { cookieStore, fakeClient } = vi.hoisted(() => {
	const cookieStore = {
		get: vi.fn(),
		toString: vi.fn(() => 'stormy_session_token=abc'),
	};
	const fakeClient = {
		getJWTToken: vi.fn(),
		createPage: vi.fn(async (...args: unknown[]) => args),
		getPages: vi.fn(async () => ['no-jwt']),
		notAFunction: 'plain-value',
	};
	return { cookieStore, fakeClient };
});

vi.mock('next/headers', () => ({ cookies: vi.fn(async () => cookieStore) }));

vi.mock('@stormycms/core', async (importOriginal) => ({
	...(await importOriginal<typeof import('@stormycms/core')>()),
	StormyCMSClient: class {
		constructor() {
			return fakeClient;
		}
	},
}));

import { createStormyCMSClient } from '~/lib/stormy-cms-client.factory';
import { StormyCMSClientMock } from '~/lib/stormy-cms-client.mock';

beforeEach(() => {
	cookieStore.get.mockReset();
	fakeClient.getJWTToken.mockReset();
	fakeClient.createPage.mockClear();
	vi.unstubAllEnvs();
});

describe('createStormyCMSClient', () => {
	it('returns the mock client when E2E_BYPASS_AUTH is enabled', async () => {
		vi.stubEnv('E2E_BYPASS_AUTH', 'true');
		await expect(createStormyCMSClient()).resolves.toBeInstanceOf(StormyCMSClientMock);
	});

	it('returns the mock client for the e2e cookie when cookie bypass is allowed', async () => {
		vi.stubEnv('E2E_ALLOW_COOKIE_BYPASS', 'true');
		cookieStore.get.mockReturnValue({ value: 'true' });
		await expect(createStormyCMSClient()).resolves.toBeInstanceOf(StormyCMSClientMock);
		expect(cookieStore.get).toHaveBeenCalledWith('e2e_bypass_auth');
	});

	it('ignores the e2e cookie when cookie bypass is not allowed', async () => {
		cookieStore.get.mockReturnValue({ value: 'true' });
		fakeClient.getJWTToken.mockResolvedValue('minted-jwt');
		const client = await createStormyCMSClient();
		expect(client).not.toBeInstanceOf(StormyCMSClientMock);
	});

	it('throws when no JWT can be minted from the session cookie', async () => {
		fakeClient.getJWTToken.mockResolvedValue(null);
		await expect(createStormyCMSClient()).rejects.toThrow('Failed to mint JWT');
	});

	it('injects the minted JWT as the first argument of JWT methods', async () => {
		fakeClient.getJWTToken.mockResolvedValue('minted-jwt');
		const client = await createStormyCMSClient();
		await expect(client.createPage({ slug: 'a' } as never)).resolves.toEqual(['minted-jwt', { slug: 'a' }]);
		expect(fakeClient.getJWTToken).toHaveBeenCalledWith('stormy_session_token=abc');
	});

	it('leaves non-JWT methods and plain properties untouched', async () => {
		fakeClient.getJWTToken.mockResolvedValue('minted-jwt');
		const client = (await createStormyCMSClient()) as unknown as {
			getPages: () => Promise<string[]>;
			notAFunction: string;
		};
		await expect(client.getPages()).resolves.toEqual(['no-jwt']);
		expect(client.notAFunction).toBe('plain-value');
	});
});
