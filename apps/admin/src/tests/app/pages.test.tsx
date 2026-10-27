import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { client, cookieStore, redirect, capturedActions } = vi.hoisted(() => ({
	client: {
		getPages: vi.fn(),
		getLayouts: vi.fn(),
		getSession: vi.fn(),
		createPage: vi.fn(),
		createLayout: vi.fn(),
		getPage: vi.fn(),
		getLayout: vi.fn(),
	},
	cookieStore: {
		get: vi.fn(() => ({ value: 'session-token' })),
		toString: () => 'stormy_session_token=session-token',
	},
	redirect: vi.fn((url: string) => {
		throw new Error(`NEXT_REDIRECT:${url}`);
	}),
	capturedActions: {} as Record<string, (formData: FormData) => Promise<void>>,
}));

vi.mock('@/stormy-cms-client', () => ({ stormyCMSClient: client }));
vi.mock('next/headers', () => ({ cookies: vi.fn(async () => cookieStore) }));
vi.mock('next/navigation', () => ({ redirect }));

vi.mock('~/components/create-page-dialog', () => ({
	CreatePageDialog: ({
		action,
		existingSlugs,
	}: {
		action: (fd: FormData) => Promise<void>;
		existingSlugs: string[];
	}) => {
		capturedActions.createPage = action;
		return <div data-testid="create-page-dialog">{existingSlugs.join(',')}</div>;
	},
}));

vi.mock('~/components/create-layout-dialog', () => ({
	CreateLayoutDialog: ({ action }: { action: (fd: FormData) => Promise<void> }) => {
		capturedActions.createLayout = action;
		return <div data-testid="create-layout-dialog" />;
	},
}));

import PagesPage from '~/app/(dashboard)/pages/page';
import LayoutsPage from '~/app/(dashboard)/layouts/page';
import { nullish } from '~/lib/utils';

const formData = (entries: Record<string, string>) => {
	const fd = new FormData();
	for (const [key, value] of Object.entries(entries)) fd.append(key, value);
	return fd;
};

beforeEach(() => {
	for (const fn of Object.values(client)) fn.mockReset();
	redirect.mockClear();
	cookieStore.get.mockClear();
	client.getSession.mockResolvedValue({ user: { id: 'u1' }, jwt: 'jwt-token' });
	client.getLayouts.mockResolvedValue([
		{ id: 'l2', name: 'Other', components: [], isDefault: false },
		{ id: 'l1', name: 'Default', components: [], isDefault: true },
	]);
	vi.spyOn(console, 'log').mockImplementation(() => {});
	vi.spyOn(console, 'error').mockImplementation(() => {});
});

describe('PagesPage', () => {
	it('lists pages with links and passes existing slugs to the dialog', async () => {
		client.getPages.mockResolvedValue([
			{ id: 'p1', slug: 'about', name: 'About', metadata: { title: 'About Us' } },
			{ id: 'p2', slug: null, name: null, metadata: {} },
			{ id: 'p3', slug: 'draft', name: 'Draft Page', metadata: { title: '' } },
		]);
		render(await PagesPage());
		expect(screen.getByRole('link', { name: /About Us/ })).toHaveAttribute('href', '/pages/p1');
		expect(screen.getByText('Untitled')).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /Draft Page/ })).toHaveAttribute('href', '/pages/p3');
		expect(screen.getByTestId('create-page-dialog')).toHaveTextContent('about,,draft');
	});

	it('shows an empty state when the site has no pages', async () => {
		client.getPages.mockResolvedValue([]);
		render(await PagesPage());
		expect(screen.getByText(/No pages yet/)).toBeInTheDocument();
		expect(screen.queryByRole('alert')).not.toBeInTheDocument();
	});

	it('shows whatever was thrown when loading the pages fails without an Error', async () => {
		client.getPages.mockRejectedValue('offline');
		render(await PagesPage());
		expect(screen.getByRole('alert')).toHaveTextContent('offline');
	});

	it('says the pages could not be loaded, rather than that there are none, when fetching fails', async () => {
		client.getPages.mockRejectedValue(
			new Error('Pages not found: The client secret is not valid for this site; it may have been reset.'),
		);
		render(await PagesPage());
		const alert = screen.getByRole('alert');
		expect(alert).toHaveTextContent('Your pages could not be loaded.');
		expect(alert).toHaveTextContent(
			'Pages not found: The client secret is not valid for this site; it may have been reset.',
		);
		expect(screen.queryByText(/No pages yet/)).not.toBeInTheDocument();
	});

	describe('createNewPage action', () => {
		const action = () => {
			const action = capturedActions.createPage;
			if (nullish(action)) {
				throw new Error('createPage action is undefined');
			}
			return action;
		};

		beforeEach(async () => {
			client.getPages.mockResolvedValue([]);
			render(await PagesPage());
		});

		it('requires a page name and a non-empty slug', async () => {
			await expect(action()(formData({}))).rejects.toThrow('Page name is required.');
			await expect(action()(formData({ 'page-name': '   ' }))).rejects.toThrow('Page name is required.');
			await expect(action()(formData({ 'page-name': 'Home', 'page-slug': '/' }))).rejects.toThrow(
				'Page slug is required.',
			);
		});

		it('redirects to login without a valid session', async () => {
			client.getSession.mockResolvedValue({ user: null, jwt: null });
			await expect(action()(formData({ 'page-name': 'About' }))).rejects.toThrow('NEXT_REDIRECT:/login');
		});

		it('requires at least one layout', async () => {
			client.getLayouts.mockResolvedValue([]);
			await expect(action()(formData({ 'page-name': 'About' }))).rejects.toThrow('No layouts available');
		});

		it('creates the page with the default layout and redirects to it', async () => {
			client.createPage.mockResolvedValue({ id: 'new-page' });
			await expect(action()(formData({ 'page-name': 'About Us' }))).rejects.toThrow('NEXT_REDIRECT:/pages/new-page');
			expect(client.createPage).toHaveBeenCalledWith(
				'jwt-token',
				expect.objectContaining({ slug: 'about-us', layoutId: 'l1', metadata: { title: 'About Us' } }),
			);
		});

		it('prefers an explicit slug and falls back to the first layout without a default', async () => {
			client.getLayouts.mockResolvedValue([{ id: 'only', name: 'Only', components: [], isDefault: false }]);
			client.createPage.mockResolvedValue({ id: 'new-page' });
			await expect(action()(formData({ 'page-name': 'About', 'page-slug': '/Custom/' }))).rejects.toThrow(
				'NEXT_REDIRECT:/pages/new-page',
			);
			expect(client.createPage).toHaveBeenCalledWith(
				'jwt-token',
				expect.objectContaining({ slug: 'custom', layoutId: 'only' }),
			);
		});

		it('wraps creation failures in a friendly error', async () => {
			client.createPage.mockRejectedValue(new Error('boom'));
			await expect(action()(formData({ 'page-name': 'About' }))).rejects.toThrow('Failed to create page.');
		});
	});
});

describe('LayoutsPage', () => {
	it('lists layouts distinguishing the default one', async () => {
		client.getLayouts.mockResolvedValue([
			{ id: 'l1', name: 'Default', components: [], isDefault: true },
			{ id: 'l2', name: 'Two column', components: [{}, {}], isDefault: false },
		]);
		render(await LayoutsPage());
		expect(screen.getByText('Default layout')).toBeInTheDocument();
		expect(screen.getByText('2 components')).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /Two column/ })).toHaveAttribute('href', '/layouts/l2');
	});

	it('shows an empty state when the site has no layouts', async () => {
		client.getLayouts.mockResolvedValue([]);
		render(await LayoutsPage());
		expect(screen.getByText(/No layouts yet/)).toBeInTheDocument();
		expect(screen.queryByRole('alert')).not.toBeInTheDocument();
	});

	it('shows whatever was thrown when loading the layouts fails without an Error', async () => {
		client.getLayouts.mockRejectedValue('offline');
		render(await LayoutsPage());
		expect(screen.getByRole('alert')).toHaveTextContent('offline');
	});

	it('says the layouts could not be loaded, rather than that there are none, when fetching fails', async () => {
		client.getLayouts.mockRejectedValue(
			new Error('Layouts not found: The client secret is not valid for this site; it may have been reset.'),
		);
		render(await LayoutsPage());
		const alert = screen.getByRole('alert');
		expect(alert).toHaveTextContent('Your layouts could not be loaded.');
		expect(alert).toHaveTextContent(
			'Layouts not found: The client secret is not valid for this site; it may have been reset.',
		);
		expect(screen.queryByText(/No layouts yet/)).not.toBeInTheDocument();
	});

	describe('createNewLayout action', () => {
		const action = () => {
			const action = capturedActions.createLayout;
			if (nullish(action)) {
				throw new Error('createLayout action is undefined');
			}
			return action;
		};

		beforeEach(async () => {
			client.getLayouts.mockResolvedValue([]);
			render(await LayoutsPage());
		});

		it('requires a layout name', async () => {
			await expect(action()(formData({}))).rejects.toThrow('Layout name is required.');
			await expect(action()(formData({ 'layout-name': '  ' }))).rejects.toThrow('Layout name is required.');
		});

		it('redirects to login without a valid session', async () => {
			client.getSession.mockResolvedValue({ user: null, jwt: null });
			await expect(action()(formData({ 'layout-name': 'Main' }))).rejects.toThrow('NEXT_REDIRECT:/login');
		});

		it('creates the layout and redirects to it', async () => {
			client.createLayout.mockResolvedValue({ id: 'new-layout' });
			await expect(action()(formData({ 'layout-name': ' Main ' }))).rejects.toThrow(
				'NEXT_REDIRECT:/layouts/new-layout',
			);
			expect(client.createLayout).toHaveBeenCalledWith('jwt-token', expect.objectContaining({ name: 'Main' }));
		});

		it('wraps creation failures in a friendly error', async () => {
			client.createLayout.mockRejectedValue(new Error('boom'));
			await expect(action()(formData({ 'layout-name': 'Main' }))).rejects.toThrow('Failed to create layout.');
		});
	});
});
