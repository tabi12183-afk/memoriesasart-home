import type { GqlPage, GqlLayout } from '@stormycms/core';

const testPage = (id: string): GqlPage => ({
	id,
	name: 'Test Page',
	slug: 'test-page',
	metadata: { title: 'Test Page', description: '', keywords: [] },
	layouts: [],
	layoutId: null,
	components: [],
	siteId: 'test-site',
	createdAt: new Date().toISOString(),
	updatedAt: new Date().toISOString(),
});

const testLayout = (): GqlLayout => ({
	id: 'test-layout',
	name: 'Test Layout',
	props: [],
	isDefault: true,
	attrs: [],
	components: [
		{
			id: 'outlet-1',
			order: 0,
			name: 'Outlet',
			attrs: [],
			props: [],
			childComponents: [],
			parentComponentId: null,
		},
	],
	componentIds: ['outlet-1'],
	outletId: 'outlet-1',
	childLayoutId: null,
	parentLayoutId: null,
	childLayout: null,
	createdAt: new Date().toISOString(),
	updatedAt: new Date().toISOString(),
});

const noop = () => Promise.resolve({} as unknown);

export class StormyCMSClientMock {
	getPage = async ({ id }: { id: string }) =>
		id === 'home-page' ? { ...testPage(id), name: 'Home', slug: '' } : testPage(id);
	getPages = async () => [
		testPage('test-id'),
		{ ...testPage('existing-id'), name: 'Existing Page', slug: 'existing-page' },
	];
	getLayouts = async () => [testLayout(), { ...testLayout(), id: 'parent-layout', name: 'Parent Layout Option' }];
	getLayout = async () => testLayout();
	getPageBySlug = async () => testPage('test-id');
	getSite = async () =>
		({ id: 'test-site', name: 'Test Site' }) as unknown as ReturnType<
			import('@stormycms/core').StormyCMSClient['getSite']
		>;
	getCurrentSite = async () =>
		({ id: 'test-site', name: 'Test Site' }) as unknown as ReturnType<
			import('@stormycms/core').StormyCMSClient['getCurrentSite']
		>;
	getSites = async () => [
		{
			id: 'test-site',
			name: 'Test Site',
			ownerId: 'test-owner',
			clientId: 'test-client',
			adminIds: [],
			contributorIds: [],
		},
	];
	getSiteWithUsers = async () =>
		({ id: 'test-site', name: 'Test Site', users: [] }) as unknown as ReturnType<
			import('@stormycms/core').StormyCMSClient['getSiteWithUsers']
		>;
	getSession = async () => ({
		user: { id: 'test-user', userName: 'Test', email: '', image: '', role: 'admin' },
		jwt: 'test-jwt',
	});
	getJWTToken = async () => 'test-jwt';
	mintJwt = async () => ({ jwt: 'test-jwt', expiresIn: 3600 });
	getUser = async () => ({ id: 'test-user', username: 'Test', email: 'test@test.com', image: '', role: 'admin' });
	getMediaItems = async () => [];
	getMedia = async ({ id }: { id: string }) => ({
		id,
		type: 'image',
		url: '/uploads/example.png',
		name: 'example.png',
		metadata: {},
		siteId: 'test-site',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	});
	createMedia = async ({
		type,
		url,
		name,
		metadata,
	}: {
		type: string;
		url: string;
		name: string;
		metadata: Record<string, unknown>;
	}) => ({
		id: `media-${Math.random().toString(36).slice(2, 11)}`,
		type,
		url,
		name,
		metadata,
		siteId: 'test-site',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	});
	updateMedia = async ({
		id,
		type,
		url,
		name,
		metadata,
	}: {
		id: string;
		type?: string;
		url?: string;
		name?: string;
		metadata?: Record<string, unknown>;
	}) => ({
		id,
		type: type ?? 'image',
		url: url ?? '/uploads/example.png',
		name: name ?? 'example.png',
		metadata: metadata ?? {},
		siteId: 'test-site',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	});
	deleteMedia = async ({ id }: { id: string }) => ({
		id,
		type: 'image',
		url: '/uploads/example.png',
		name: 'example.png',
		metadata: {},
		siteId: 'test-site',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	});
	createPage = noop;
	updatePage = noop;
	deletePage = async () => ({ id: 'test-id' });
	createLayout = noop;
	updateLayout = noop;
	deleteLayout = async () => ({ id: 'test-id' });
	createSite = noop;
	updateSite = noop;
	resetClientId = noop;
	resetClientSecret = async () => ({ clientSecret: 'test-secret' });
	getSubscriptionBySite = async () =>
		({ id: 'test-sub', status: 'active' }) as unknown as ReturnType<
			import('@stormycms/core').StormyCMSClient['getSubscriptionBySite']
		>;
	inviteUser = noop;
	exchangeTokenForJWT = async () => ({ jwt: 'test-jwt', expiresIn: 3600 });
	updateUser = noop;
	resendInvite = noop;
	getSiteContent = noop;
	getSiteWithUsersContent = noop;
	getUserContent = noop;
	signIn = async () => {};
	signUp = async () => {};
}
