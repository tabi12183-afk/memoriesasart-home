import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { stormyState, themeState, cmsClient } = vi.hoisted(() => ({
	stormyState: { value: {} as Record<string, unknown> },
	themeState: { theme: 'light' as string | undefined, setTheme: vi.fn() },
	cmsClient: {
		getPages: vi.fn(),
		getLayouts: vi.fn(),
		getCurrentSite: vi.fn(),
	},
}));

vi.mock('@stormycms/react/stormy', () => ({
	useStormy: () => stormyState.value,
}));

vi.mock('next-themes', () => ({
	useTheme: () => themeState,
}));

vi.mock('@/stormy-cms-client', () => ({ stormyCMSClient: cmsClient }));
vi.mock('next/headers', () => ({ cookies: vi.fn(async () => ({})) }));

import { AppSidebar } from '~/components/app-sidebar';
import LoginButton from '~/components/login-button';
import { LoginForm } from '~/components/login-form';
import { NavMain } from '~/components/nav-main';
import { NavSecondary } from '~/components/nav-secondary';
import { NavUser } from '~/components/nav-user';
import { SidebarProvider } from '~/components/sidebar';
import { SiteAnalytics } from '~/components/site-analytics';
import { SiteHeader } from '~/components/site-header';
import { TooltipProvider } from '~/components/tooltip';

const withProviders = (ui: React.ReactNode) => (
	<TooltipProvider>
		<SidebarProvider>{ui}</SidebarProvider>
	</TooltipProvider>
);

beforeEach(() => {
	stormyState.value = {};
	themeState.theme = 'light';
	themeState.setTheme.mockClear();
	cmsClient.getPages.mockReset();
	cmsClient.getLayouts.mockReset();
	cmsClient.getCurrentSite.mockReset();
});

describe('NavMain and NavSecondary', () => {
	it('renders navigation items', () => {
		render(
			withProviders(
				<>
					<NavMain items={[{ title: 'Pages', url: '/pages', icon: <svg /> }]} />
					<NavSecondary items={[{ title: 'External', url: 'https://example.com', icon: <svg /> }]} />
					<NavSecondary items={[{ title: 'Internal', url: '/internal', icon: <svg /> }]} />
				</>,
			),
		);
		expect(screen.getByRole('link', { name: 'Pages' })).toHaveAttribute('href', '/pages');
		expect(screen.getByRole('link', { name: 'External' })).toHaveAttribute('target', '_blank');
		expect(screen.getByRole('link', { name: 'Internal' })).not.toHaveAttribute('target');
	});
});

describe('SiteHeader', () => {
	it('shows the site name and updates the document title', async () => {
		stormyState.value = { site: { name: 'My Site' } };
		render(withProviders(<SiteHeader />));
		expect(screen.getByTestId('header-site-name')).toHaveTextContent('My Site');
		await waitFor(() => expect(document.title).toBe('My Site — Stormy CMS'));
	});

	it('falls back to a generic title without a site', () => {
		render(withProviders(<SiteHeader />));
		expect(screen.getByTestId('header-site-name')).toHaveTextContent('Site Editor');
	});
});

describe('AppSidebar', () => {
	it('renders site name and user details when available', () => {
		stormyState.value = {
			site: { name: 'Acme Site' },
			user: { userName: 'Ada Lovelace', email: 'ada@example.com', image: '/ada.png' },
		};
		render(withProviders(<AppSidebar />));
		expect(screen.getByTestId('sidebar-site-name')).toHaveTextContent('Acme Site');
		expect(screen.getByText('Ada Lovelace')).toBeInTheDocument();
	});

	it('renders placeholders when logged out', () => {
		stormyState.value = { user: { userName: 'No Image', email: 'x@example.com', image: null } };
		render(withProviders(<AppSidebar />));
		expect(screen.getByTestId('sidebar-site-name')).toHaveTextContent('Stormy CMS');
	});

	it('renders empty user info when no user at all', () => {
		render(withProviders(<AppSidebar />));
		expect(screen.getByTestId('sidebar-site-name')).toHaveTextContent('Stormy CMS');
	});
});

describe('NavUser', () => {
	const user = { name: 'Ada Lovelace', email: 'ada@example.com', avatar: '/ada.png' };

	it('opens the account menu and switches to dark mode from light', async () => {
		render(withProviders(<NavUser user={user} />));
		await userEvent.click(screen.getByRole('button', { name: /Ada Lovelace/ }));
		expect(await screen.findByRole('menuitem', { name: 'Account' })).toBeInTheDocument();
		await userEvent.click(screen.getByRole('menuitem', { name: 'Dark' }));
		expect(themeState.setTheme).toHaveBeenCalledWith('dark');
	});

	it('offers light mode when the theme is dark', async () => {
		themeState.theme = 'dark';
		render(withProviders(<NavUser user={user} />));
		await userEvent.click(screen.getByRole('button', { name: /Ada Lovelace/ }));
		await userEvent.click(await screen.findByRole('menuitem', { name: 'Light' }));
		expect(themeState.setTheme).toHaveBeenCalledWith('light');
	});

	it('falls back to a generic initial for empty names', () => {
		render(withProviders(<NavUser user={{ name: '', email: '', avatar: '' }} />));
		expect(screen.getByText('U')).toBeInTheDocument();
	});

	it('navigates to the sign-out endpoint on logout', async () => {
		const originalLocation = window.location;
		Object.defineProperty(window, 'location', {
			configurable: true,
			writable: true,
			value: { href: originalLocation.href },
		});
		render(withProviders(<NavUser user={user} />));
		await userEvent.click(screen.getByRole('button', { name: /Ada Lovelace/ }));
		const logout = await screen.findByRole('menuitem', { name: 'Log out' });
		await userEvent.click(logout);
		expect(window.location.href).toBe('/api/auth/stormy?action=signout');
		Object.defineProperty(window, 'location', { configurable: true, writable: true, value: originalLocation });
	});

	it('uses a bottom side for the menu on mobile', async () => {
		const originalMatchMedia = window.matchMedia;
		window.matchMedia = (query: string) =>
			({
				matches: query.includes('(max-width: 767px)'),
				media: query,
				onchange: null,
				addEventListener: () => {},
				removeEventListener: () => {},
				addListener: () => {},
				removeListener: () => {},
				dispatchEvent: () => true,
			}) as unknown as MediaQueryList;
		render(withProviders(<NavUser user={user} />));
		await userEvent.click(screen.getByRole('button', { name: /Ada Lovelace/ }));
		expect(await screen.findByRole('menuitem', { name: 'Account' })).toBeInTheDocument();
		expect(document.querySelector('[data-side="bottom"]')).toBeInTheDocument();
		window.matchMedia = originalMatchMedia;
	});
});

describe('LoginButton', () => {
	it.each(['github', 'google', 'gitlab', 'bitbucket', 'facebook', 'microsoft'] as const)(
		'renders a button for the %s provider',
		(provider) => {
			render(<LoginButton provider={provider} />);
			expect(screen.getByTestId(`${provider}-login-button`)).toBeInTheDocument();
		},
	);

	it('navigates to the provider sign-in on click', async () => {
		render(<LoginButton provider="github" />);
		await userEvent.click(screen.getByTestId('github-login-button'));
		render(<LoginButton provider="google" />);
		await userEvent.click(screen.getByTestId('google-login-button'));
	});
});

describe('LoginForm', () => {
	it('renders the login options', () => {
		render(<LoginForm />);
		expect(screen.getByText('Welcome back')).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: 'Accounts' })).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: 'Git providers' })).toBeInTheDocument();
		for (const provider of ['github', 'google', 'gitlab', 'bitbucket', 'facebook', 'microsoft']) {
			expect(screen.getByTestId(`${provider}-login-button`)).toBeInTheDocument();
		}
	});

	it('surfaces an error message when provided', () => {
		render(<LoginForm error="Something broke" />);
		expect(screen.getByText('Something broke')).toBeInTheDocument();
	});
});

describe('SiteAnalytics', () => {
	it('summarizes pages, layouts, components, and the site', async () => {
		cmsClient.getPages.mockResolvedValue([{ components: [{ childComponents: [{}, {}] }, {}] }, {}]);
		cmsClient.getLayouts.mockResolvedValue([{ components: [{}] }]);
		cmsClient.getCurrentSite.mockResolvedValue({ id: 'site-1', name: 'Acme' });

		render(await SiteAnalytics());

		expect(screen.getByTestId('stat-total-pages')).toHaveTextContent('2');
		expect(screen.getByTestId('stat-total-layouts')).toHaveTextContent('1');
		// 2 page components + 2 children + 1 layout component
		expect(screen.getByTestId('stat-total-components')).toHaveTextContent('5');
		expect(screen.getByTestId('stat-site-name')).toHaveTextContent('Acme');
	});

	it('degrades gracefully when every query fails', async () => {
		vi.spyOn(console, 'error').mockImplementation(() => {});
		cmsClient.getPages.mockRejectedValue(new Error('down'));
		cmsClient.getLayouts.mockRejectedValue(new Error('down'));
		cmsClient.getCurrentSite.mockRejectedValue(new Error('down'));

		render(await SiteAnalytics());

		expect(screen.getByTestId('stat-total-pages')).toHaveTextContent('0');
		expect(screen.getByTestId('stat-site-name')).toHaveTextContent('Unknown');
		expect(screen.getByText('No site ID available')).toBeInTheDocument();
		vi.restoreAllMocks();
	});
});
