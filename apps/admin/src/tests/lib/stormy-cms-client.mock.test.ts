import { describe, expect, it } from 'vitest';
import { StormyCMSClientMock } from '~/lib/stormy-cms-client.mock';

const mock = new StormyCMSClientMock();

describe('StormyCMSClientMock', () => {
	it('returns the home page for the home-page id and a test page otherwise', async () => {
		await expect(mock.getPage({ id: 'home-page' })).resolves.toMatchObject({ name: 'Home', slug: '' });
		await expect(mock.getPage({ id: 'other' })).resolves.toMatchObject({ id: 'other', name: 'Test Page' });
	});

	it('lists pages including an existing slug for collision tests', async () => {
		const pages = await mock.getPages();
		expect(pages.map((p) => p.slug)).toEqual(['test-page', 'existing-page']);
	});

	it('provides layouts with a default layout and an outlet component', async () => {
		const layouts = await mock.getLayouts();
		expect(layouts).toHaveLength(2);
		expect(layouts[0]?.isDefault).toBe(true);
		await expect(mock.getLayout()).resolves.toMatchObject({ outletId: 'outlet-1' });
	});

	it('resolves pages by slug', async () => {
		await expect(mock.getPageBySlug()).resolves.toMatchObject({ id: 'test-id' });
	});

	it('describes the test site in all site queries', async () => {
		await expect(mock.getSite()).resolves.toMatchObject({ id: 'test-site' });
		await expect(mock.getCurrentSite()).resolves.toMatchObject({ id: 'test-site' });
		await expect(mock.getSites()).resolves.toMatchObject([{ id: 'test-site' }]);
		await expect(mock.getSiteWithUsers()).resolves.toMatchObject({ users: [] });
	});

	it('authenticates as the test user', async () => {
		await expect(mock.getSession()).resolves.toMatchObject({ jwt: 'test-jwt' });
		await expect(mock.getJWTToken()).resolves.toBe('test-jwt');
		await expect(mock.mintJwt()).resolves.toEqual({ jwt: 'test-jwt', expiresIn: 3600 });
		await expect(mock.exchangeTokenForJWT()).resolves.toEqual({ jwt: 'test-jwt', expiresIn: 3600 });
		await expect(mock.getUser()).resolves.toMatchObject({ id: 'test-user' });
		await expect(mock.signIn()).resolves.toBeUndefined();
		await expect(mock.signUp()).resolves.toBeUndefined();
	});

	it('supports the media lifecycle', async () => {
		await expect(mock.getMediaItems()).resolves.toEqual([]);
		await expect(mock.getMedia({ id: 'm1' })).resolves.toMatchObject({ id: 'm1', type: 'image' });

		const created = await mock.createMedia({ type: 'image', url: '/u.png', name: 'u.png', metadata: { alt: 'x' } });
		expect(created.id).toMatch(/^media-/);
		expect(created.metadata).toEqual({ alt: 'x' });

		const untouched = await mock.updateMedia({ id: 'm0' });
		expect(untouched).toMatchObject({ id: 'm0', name: 'example.png' });

		const updated = await mock.updateMedia({ id: 'm1', name: 'renamed.png' });
		expect(updated).toMatchObject({ id: 'm1', name: 'renamed.png', type: 'image', metadata: {} });

		const updatedAll = await mock.updateMedia({
			id: 'm2',
			type: 'video',
			url: '/v.mp4',
			name: 'v.mp4',
			metadata: { tags: ['a'] },
		});
		expect(updatedAll).toMatchObject({ id: 'm2', type: 'video', url: '/v.mp4', metadata: { tags: ['a'] } });

		await expect(mock.deleteMedia({ id: 'm1' })).resolves.toMatchObject({ id: 'm1' });
	});

	it('supports page and layout mutations', async () => {
		await expect(mock.createPage()).resolves.toEqual({});
		await expect(mock.updatePage()).resolves.toEqual({});
		await expect(mock.deletePage()).resolves.toEqual({ id: 'test-id' });
		await expect(mock.createLayout()).resolves.toEqual({});
		await expect(mock.updateLayout()).resolves.toEqual({});
		await expect(mock.deleteLayout()).resolves.toEqual({ id: 'test-id' });
	});

	it('stubs the remaining account operations', async () => {
		await expect(mock.createSite()).resolves.toEqual({});
		await expect(mock.updateSite()).resolves.toEqual({});
		await expect(mock.resetClientId()).resolves.toEqual({});
		await expect(mock.resetClientSecret()).resolves.toEqual({ clientSecret: 'test-secret' });
		await expect(mock.getSubscriptionBySite()).resolves.toMatchObject({ status: 'active' });
		await expect(mock.inviteUser()).resolves.toEqual({});
		await expect(mock.updateUser()).resolves.toEqual({});
		await expect(mock.resendInvite()).resolves.toEqual({});
		await expect(mock.getSiteContent()).resolves.toEqual({});
		await expect(mock.getSiteWithUsersContent()).resolves.toEqual({});
		await expect(mock.getUserContent()).resolves.toEqual({});
	});
});
