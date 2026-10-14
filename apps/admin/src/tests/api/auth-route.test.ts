import { NextRequest } from 'next/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { handlers } = vi.hoisted(() => ({
	handlers: {
		GET: vi.fn(async () => new Response('real-get')),
		POST: vi.fn(async () => new Response('real-post')),
	},
}));

vi.mock('@stormycms/next', () => ({
	createNextAuthHandlers: () => handlers,
}));

import { GET, POST } from '~/app/api/auth/stormy/route';
import { notNullish } from '~/lib/utils';

beforeEach(() => {
	handlers.GET.mockClear();
	vi.unstubAllEnvs();
});

const sessionRequest = (cookie?: string) =>
	new NextRequest('http://localhost:4000/api/auth/stormy?action=session', {
		headers: notNullish(cookie) ? { cookie } : {},
	});

describe('auth route', () => {
	it('returns a stub session for the e2e bypass cookie when allowed', async () => {
		vi.stubEnv('E2E_ALLOW_COOKIE_BYPASS', 'true');
		const response = await GET(sessionRequest('e2e_bypass_auth=true'));
		await expect(response.json()).resolves.toEqual({ id: 'test-user', userName: 'Test' });
		expect(handlers.GET).not.toHaveBeenCalled();
	});

	it('delegates to the real handler when cookie bypass is not allowed', async () => {
		const response = await GET(sessionRequest('e2e_bypass_auth=true'));
		await expect(response.text()).resolves.toBe('real-get');
	});

	it('delegates to the real handler for non-session actions', async () => {
		vi.stubEnv('E2E_ALLOW_COOKIE_BYPASS', 'true');
		const response = await GET(new NextRequest('http://localhost:4000/api/auth/stormy?action=signin'));
		await expect(response.text()).resolves.toBe('real-get');
	});

	it('exposes the real POST handler unchanged', async () => {
		expect(POST).toBe(handlers.POST);
	});
});
