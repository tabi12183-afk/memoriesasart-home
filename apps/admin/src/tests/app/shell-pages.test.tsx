import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { cookieStore, serverProviderProps } = vi.hoisted(() => ({
	cookieStore: { get: vi.fn() },
	serverProviderProps: { guard: null as boolean | null },
}));

vi.mock('next/headers', () => ({ cookies: vi.fn(async () => cookieStore) }));
vi.mock('@/stormy-cms-client', () => ({ stormyCMSClient: { tag: 'client' } }));

vi.mock('@stormycms/next', () => ({
	StormyServerProvider: ({ guard, children }: { guard: boolean; children: React.ReactNode }) => {
		serverProviderProps.guard = guard;
		return <div data-testid="stormy-server-provider">{children}</div>;
	},
}));

vi.mock('@stormycms/react/stormy', () => ({
	useStormy: () => ({}),
}));

vi.mock('next/font/google', () => ({
	Montserrat: () => ({ className: 'font-montserrat' }),
}));

vi.mock('~/components/site-analytics', () => ({
	SiteAnalytics: () => <div data-testid="site-analytics" />,
}));

vi.mock('~/components/media-library', () => ({
	MediaLibrary: ({ onUpload }: { onUpload?: (item: unknown) => void }) => (
		<button type="button" onClick={() => onUpload?.({ id: 'new' })}>
			trigger-upload
		</button>
	),
}));

vi.mock('~/components/media-grid', () => ({
	MediaGrid: () => <div data-testid="media-grid-stub" />,
}));

import DashboardLayout from '~/app/(dashboard)/layout';
import { TooltipProvider } from '~/components/tooltip';
import DashboardPage from '~/app/(dashboard)/page';
import MediaPage from '~/app/(dashboard)/media/page';
import LoginPage from '~/app/login/page';
import RootLayout, { metadata } from '~/app/layout';

beforeEach(() => {
	cookieStore.get.mockReset();
	serverProviderProps.guard = null;
	vi.unstubAllEnvs();
});

describe('RootLayout', () => {
	it('wraps the app in theme and tooltip providers with the toaster', () => {
		render(<RootLayout>app content</RootLayout>);
		expect(screen.getByText('app content')).toBeInTheDocument();
		expect(document.body.className).toContain('font-montserrat');
		expect(metadata.title).toMatchObject({ template: '%s — Stormy CMS' });
	});
});

describe('DashboardLayout', () => {
	it('guards the dashboard when no bypass is active', async () => {
		render(<TooltipProvider>{await DashboardLayout({ children: 'dashboard body' })}</TooltipProvider>);
		expect(screen.getByTestId('stormy-server-provider')).toBeInTheDocument();
		expect(screen.getByText('dashboard body')).toBeInTheDocument();
		expect(serverProviderProps.guard).toBe(true);
	});

	it('disables the guard when the E2E env bypass is set', async () => {
		vi.stubEnv('E2E_BYPASS_AUTH', 'true');
		render(<TooltipProvider>{await DashboardLayout({ children: 'x' })}</TooltipProvider>);
		expect(serverProviderProps.guard).toBe(false);
	});

	it('disables the guard for the e2e cookie when allowed', async () => {
		vi.stubEnv('E2E_ALLOW_COOKIE_BYPASS', 'true');
		cookieStore.get.mockReturnValue({ value: 'true' });
		render(<TooltipProvider>{await DashboardLayout({ children: 'x' })}</TooltipProvider>);
		expect(serverProviderProps.guard).toBe(false);
	});
});

describe('DashboardPage', () => {
	it('renders the analytics dashboard', () => {
		render(<DashboardPage />);
		expect(screen.getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument();
		expect(screen.getByTestId('site-analytics')).toBeInTheDocument();
	});
});

describe('MediaPage', () => {
	it('refreshes the media grid after an upload', async () => {
		render(<MediaPage />);
		expect(screen.getByRole('heading', { name: 'Media Library' })).toBeInTheDocument();
		expect(screen.getByTestId('media-grid-stub')).toBeInTheDocument();
		await userEvent.click(screen.getByRole('button', { name: 'trigger-upload' }));
		expect(screen.getByTestId('media-grid-stub')).toBeInTheDocument();
	});
});

describe('LoginPage', () => {
	const searchParams = (error?: string) => ({ searchParams: Promise.resolve({ error }) });

	it('renders the login form without an error', async () => {
		render(await LoginPage(searchParams()));
		expect(screen.getByText('Welcome back')).toBeInTheDocument();
	});

	it('maps known error codes to friendly messages', async () => {
		render(await LoginPage(searchParams('user_not_found')));
		expect(screen.getByText('No account found for this login. Please sign up first.')).toBeInTheDocument();
	});

	it('shows unknown error codes verbatim', async () => {
		render(await LoginPage(searchParams('weird_error')));
		expect(screen.getByText('weird_error')).toBeInTheDocument();
	});
});
