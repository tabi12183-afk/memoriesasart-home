import { NextRequest } from 'next/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { client } = vi.hoisted(() => ({
	client: {
		getJWTToken: vi.fn(),
		createPage: vi.fn(),
		updatePage: vi.fn(),
		deletePage: vi.fn(),
	},
}));

vi.mock('@/stormy-cms-client', () => ({ stormyCMSClient: client }));
vi.mock('next/headers', () => ({
	cookies: vi.fn(async () => ({ toString: (): string => 'stormy_session_token=abc' })),
}));

import { POST } from '~/app/api/pages/route';
import { DELETE, PATCH, PUT } from '~/app/api/pages/[id]/route';

const jsonRequest = (method: string, body: unknown) =>
	new NextRequest('http://localhost:4000/api/pages', { method, body: JSON.stringify(body) });

const params = { params: Promise.resolve({ id: 'page-1' }) };

beforeEach(() => {
	client.getJWTToken.mockReset().mockResolvedValue('jwt-token');
	client.createPage.mockReset();
	client.updatePage.mockReset();
	client.deletePage.mockReset();
	vi.spyOn(console, 'error').mockImplementation(() => {});
});

describe('POST /api/pages', () => {
	it('rejects unauthenticated requests', async () => {
		client.getJWTToken.mockResolvedValue(null);
		expect((await POST(jsonRequest('POST', {}))).status).toBe(401);
	});

	it('validates required fields', async () => {
		const response = await POST(jsonRequest('POST', { metadata: { title: 'T' }, layoutId: 'l1' }));
		expect(response.status).toBe(400);
		await expect(response.json()).resolves.toEqual({ error: 'slug, metadata and layoutId are required' });
	});

	it('creates the page with mapped components and timestamps', async () => {
		client.createPage.mockResolvedValue({ id: 'page-1' });
		const response = await POST(
			jsonRequest('POST', { slug: 'about', metadata: { title: 'About' }, components: [], layoutId: 'l1' }),
		);
		expect(response.status).toBe(201);
		await expect(response.json()).resolves.toEqual({ page: { id: 'page-1' } });
		expect(client.createPage).toHaveBeenCalledWith(
			'jwt-token',
			expect.objectContaining({ slug: 'about', layoutId: 'l1', components: [] }),
		);
	});

	it('reports create failures as 500', async () => {
		client.createPage.mockRejectedValue(new Error('nope'));
		const response = await POST(
			jsonRequest('POST', { slug: 'about', metadata: { title: 'About' }, components: [], layoutId: 'l1' }),
		);
		expect(response.status).toBe(500);
	});
});

describe('PUT /api/pages/[id]', () => {
	it('rejects unauthenticated requests', async () => {
		client.getJWTToken.mockResolvedValue(null);
		expect((await PUT(jsonRequest('PUT', {}), params)).status).toBe(401);
	});

	it('validates required fields', async () => {
		expect((await PUT(jsonRequest('PUT', { slug: 'about' }), params)).status).toBe(400);
	});

	it('updates the page by id', async () => {
		client.updatePage.mockResolvedValue({ id: 'page-1', slug: 'about' });
		const response = await PUT(
			jsonRequest('PUT', { slug: 'about', metadata: { title: 'About' }, components: [], layoutId: 'l1' }),
			params,
		);
		expect(response.status).toBe(200);
		await expect(response.json()).resolves.toEqual({ page: { id: 'page-1', slug: 'about' } });
		expect(client.updatePage).toHaveBeenCalledWith('jwt-token', expect.objectContaining({ id: 'page-1' }));
	});

	it('reports update failures as 500', async () => {
		client.updatePage.mockRejectedValue(new Error('nope'));
		const response = await PUT(
			jsonRequest('PUT', { slug: 'about', metadata: { title: 'About' }, components: [], layoutId: 'l1' }),
			params,
		);
		expect(response.status).toBe(500);
	});

	it('handles PATCH as an alias for PUT', async () => {
		client.updatePage.mockResolvedValue({ id: 'page-1' });
		const response = await PATCH(
			jsonRequest('PATCH', { slug: 'about', metadata: { title: 'About' }, components: [], layoutId: 'l1' }),
			params,
		);
		expect(response.status).toBe(200);
	});
});

describe('DELETE /api/pages/[id]', () => {
	it('rejects unauthenticated requests', async () => {
		client.getJWTToken.mockResolvedValue(null);
		expect((await DELETE(jsonRequest('DELETE', {}), params)).status).toBe(401);
	});

	it('deletes the page by id', async () => {
		client.deletePage.mockResolvedValue({ id: 'page-1' });
		const response = await DELETE(jsonRequest('DELETE', {}), params);
		expect(response.status).toBe(200);
		await expect(response.json()).resolves.toEqual({ deleted: { id: 'page-1' } });
		expect(client.deletePage).toHaveBeenCalledWith('jwt-token', { id: 'page-1' });
	});

	it('reports delete failures as 500', async () => {
		client.deletePage.mockRejectedValue(new Error('nope'));
		expect((await DELETE(jsonRequest('DELETE', {}), params)).status).toBe(500);
	});
});
