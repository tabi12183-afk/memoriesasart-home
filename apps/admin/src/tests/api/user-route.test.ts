import { beforeEach, describe, expect, it, vi } from 'vitest';

const { client } = vi.hoisted(() => ({
	client: {
		getJWTToken: vi.fn(),
		updateUser: vi.fn(),
	},
}));

vi.mock('@/stormy-cms-client', () => ({ stormyCMSClient: client }));
vi.mock('next/headers', () => ({
	cookies: vi.fn(async () => ({ toString: (): string => 'stormy_session_token=abc' })),
}));

import { PATCH } from '~/app/api/user/route';

const patchRequest = (body: unknown) =>
	new Request('http://localhost:4000/api/user', { method: 'PATCH', body: JSON.stringify(body) });

beforeEach(() => {
	client.getJWTToken.mockReset().mockResolvedValue('jwt-token');
	client.updateUser.mockReset();
	vi.spyOn(console, 'error').mockImplementation(() => {});
});

describe('PATCH /api/user', () => {
	it('rejects unauthenticated requests', async () => {
		client.getJWTToken.mockResolvedValue(null);
		const response = await PATCH(patchRequest({ id: 'u1' }));
		expect(response.status).toBe(401);
		await expect(response.json()).resolves.toEqual({ error: 'Unauthorized' });
	});

	it('requires an id', async () => {
		const response = await PATCH(patchRequest({ username: 'nobody' }));
		expect(response.status).toBe(400);
		await expect(response.json()).resolves.toEqual({ error: 'id is required' });
	});

	it('updates the user with the minted JWT', async () => {
		client.updateUser.mockResolvedValue({ id: 'u1', username: 'new-name' });
		const response = await PATCH(
			patchRequest({ id: 'u1', username: 'new-name', displayName: 'New Name', email: 'n@example.com' }),
		);
		expect(response.status).toBe(200);
		await expect(response.json()).resolves.toEqual({ user: { id: 'u1', username: 'new-name' } });
		expect(client.updateUser).toHaveBeenCalledWith('jwt-token', {
			id: 'u1',
			username: 'new-name',
			displayName: 'New Name',
			email: 'n@example.com',
		});
	});

	it('reports update failures as 500', async () => {
		client.updateUser.mockRejectedValue(new Error('nope'));
		const response = await PATCH(patchRequest({ id: 'u1' }));
		expect(response.status).toBe(500);
		await expect(response.json()).resolves.toEqual({ error: 'Failed to update user' });
	});
});
