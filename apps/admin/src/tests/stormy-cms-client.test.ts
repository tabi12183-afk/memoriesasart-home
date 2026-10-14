import { beforeEach, describe, expect, it, vi } from 'vitest';

const { cookies, cookieStore, fakeClient } = vi.hoisted(() => {
	const cookieStore = { get: vi.fn() };
	return {
		cookieStore,
		cookies: vi.fn(async () => cookieStore),
		fakeClient: {
			getPages: vi.fn(async () => 'from-real-client'),
			// Present on the real client but absent from StormyCMSClientMock.
			somethingRealOnly: vi.fn(async () => 'real-only'),
			plainProperty: 'not-a-function',
		},
	};
});

vi.mock('next/headers', () => ({ cookies }));

vi.mock('@stormycms/core', async (importOriginal) => ({
	...(await importOriginal<typeof import('@stormycms/core')>()),
	StormyCMSClient: class {
		constructor() {
			return fakeClient;
		}
	},
}));

import { stormyCMSClient } from '@/stormy-cms-client';

const client = stormyCMSClient as unknown as {
	getPages: () => Promise<unknown>;
	somethingRealOnly: () => Promise<unknown>;
	plainProperty: string;
};

beforeEach(() => {
	cookieStore.get.mockReset();
	cookies.mockClear();
	cookies.mockImplementation(async () => cookieStore);
	vi.unstubAllEnvs();
});

describe('stormyCMSClient proxy', () => {
	it('exposes non-function properties directly', () => {
		expect(client.plainProperty).toBe('not-a-function');
	});

	it('calls the real client when no bypass is active', async () => {
		cookieStore.get.mockReturnValue(undefined);
		await expect(client.getPages()).resolves.toBe('from-real-client');
	});

	it('routes to the mock client when E2E_BYPASS_AUTH is set', async () => {
		vi.stubEnv('E2E_BYPASS_AUTH', 'true');
		const pages = (await client.getPages()) as Array<{ slug: string }>;
		expect(pages.map((p) => p.slug)).toEqual(['test-page', 'existing-page']);
	});

	it('routes to the mock client when the e2e cookie is set', async () => {
		cookieStore.get.mockReturnValue({ value: 'true' });
		const pages = (await client.getPages()) as Array<{ slug: string }>;
		expect(pages.map((p) => p.slug)).toEqual(['test-page', 'existing-page']);
	});

	it('falls back to the real client when cookies are unavailable', async () => {
		cookies.mockImplementation(async () => {
			throw new Error('outside request scope');
		});
		await expect(client.getPages()).resolves.toBe('from-real-client');
	});

	it('returns the mock value even when the mock lacks the method', async () => {
		vi.stubEnv('E2E_BYPASS_AUTH', 'true');
		await expect(client.somethingRealOnly()).resolves.toBeUndefined();
	});

	it('still calls real-only methods when not bypassing', async () => {
		cookieStore.get.mockReturnValue(undefined);
		await expect(client.somethingRealOnly()).resolves.toBe('real-only');
	});
});
