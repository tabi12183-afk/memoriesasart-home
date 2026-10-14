import { NextRequest } from 'next/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { client } = vi.hoisted(() => ({
	client: {
		getJWTToken: vi.fn(),
		createLayout: vi.fn(),
		updateLayout: vi.fn(),
		deleteLayout: vi.fn(),
	},
}));

vi.mock('@/stormy-cms-client', () => ({ stormyCMSClient: client }));
vi.mock('next/headers', () => ({
	cookies: vi.fn(async () => ({ toString: (): string => 'stormy_session_token=abc' })),
}));

import { POST } from '~/app/api/layouts/route';
import { DELETE, PATCH, PUT } from '~/app/api/layouts/[id]/route';

const jsonRequest = (method: string, body: unknown) =>
	new NextRequest('http://localhost:4000/api/layouts', { method, body: JSON.stringify(body) });

const params = { params: Promise.resolve({ id: 'layout-1' }) };

beforeEach(() => {
	client.getJWTToken.mockReset().mockResolvedValue('jwt-token');
	client.createLayout.mockReset();
	client.updateLayout.mockReset();
	client.deleteLayout.mockReset();
	vi.spyOn(console, 'error').mockImplementation(() => {});
});

describe('POST /api/layouts', () => {
	it('rejects unauthenticated requests', async () => {
		client.getJWTToken.mockResolvedValue(null);
		expect((await POST(jsonRequest('POST', {}))).status).toBe(401);
	});

	it('requires a name', async () => {
		const response = await POST(jsonRequest('POST', { components: [] }));
		expect(response.status).toBe(400);
		await expect(response.json()).resolves.toEqual({ error: 'name is required' });
	});

	it('creates the layout with mapped components and timestamps', async () => {
		client.createLayout.mockResolvedValue({ id: 'layout-1' });
		const response = await POST(jsonRequest('POST', { name: 'Main', components: [] }));
		expect(response.status).toBe(201);
		await expect(response.json()).resolves.toEqual({ layout: { id: 'layout-1' } });
		expect(client.createLayout).toHaveBeenCalledWith(
			'jwt-token',
			expect.objectContaining({ name: 'Main', components: [] }),
		);
	});

	it('reports create failures as 500', async () => {
		client.createLayout.mockRejectedValue(new Error('nope'));
		expect((await POST(jsonRequest('POST', { name: 'Main', components: [] }))).status).toBe(500);
	});
});

describe('PUT /api/layouts/[id]', () => {
	it('rejects unauthenticated requests', async () => {
		client.getJWTToken.mockResolvedValue(null);
		expect((await PUT(jsonRequest('PUT', {}), params)).status).toBe(401);
	});

	it('requires a name', async () => {
		expect((await PUT(jsonRequest('PUT', { components: [] }), params)).status).toBe(400);
	});

	it('updates the layout and defaults parentLayoutId to null', async () => {
		client.updateLayout.mockResolvedValue({ id: 'layout-1' });
		const response = await PUT(jsonRequest('PUT', { name: 'Main', components: [] }), params);
		expect(response.status).toBe(200);
		await expect(response.json()).resolves.toEqual({ layout: { id: 'layout-1' } });
		expect(client.updateLayout).toHaveBeenCalledWith(
			'jwt-token',
			expect.objectContaining({ id: 'layout-1', parentLayoutId: null }),
		);
	});

	it('passes through an explicit parentLayoutId', async () => {
		client.updateLayout.mockResolvedValue({ id: 'layout-1' });
		await PUT(jsonRequest('PUT', { name: 'Main', components: [], parentLayoutId: 'parent-9' }), params);
		expect(client.updateLayout).toHaveBeenCalledWith(
			'jwt-token',
			expect.objectContaining({ parentLayoutId: 'parent-9' }),
		);
	});

	it('reports update failures as 500', async () => {
		client.updateLayout.mockRejectedValue(new Error('nope'));
		expect((await PUT(jsonRequest('PUT', { name: 'Main', components: [] }), params)).status).toBe(500);
	});

	it('handles PATCH as an alias for PUT', async () => {
		client.updateLayout.mockResolvedValue({ id: 'layout-1' });
		expect((await PATCH(jsonRequest('PATCH', { name: 'Main', components: [] }), params)).status).toBe(200);
	});
});

describe('DELETE /api/layouts/[id]', () => {
	it('rejects unauthenticated requests', async () => {
		client.getJWTToken.mockResolvedValue(null);
		expect((await DELETE(jsonRequest('DELETE', {}), params)).status).toBe(401);
	});

	it('deletes the layout by id', async () => {
		client.deleteLayout.mockResolvedValue({ id: 'layout-1' });
		const response = await DELETE(jsonRequest('DELETE', {}), params);
		expect(response.status).toBe(200);
		await expect(response.json()).resolves.toEqual({ deleted: { id: 'layout-1' } });
	});

	it('reports delete failures as 500', async () => {
		client.deleteLayout.mockRejectedValue(new Error('nope'));
		expect((await DELETE(jsonRequest('DELETE', {}), params)).status).toBe(500);
	});
});
