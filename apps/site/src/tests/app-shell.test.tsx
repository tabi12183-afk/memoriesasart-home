import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next/font/google', () => ({
	// next/font is resolved by the Next.js compiler; tests only need the shape.
	Geist: () => ({ variable: 'font-geist-sans' }),
	Geist_Mono: () => ({ variable: 'font-geist-mono' }),
}));

vi.mock('~/stormy-cms-client', () => ({
	stormyCMSClient: { getPageBySlug: vi.fn() },
}));

import RootLayout, { metadata } from '../app/layout';
import NotFound from '../app/(pages)/404/page';
import SlugPage from '../app/(pages)/[...slug]/page';
import HomePage from '../app/page';
import { PoweredByStormy } from '../components/powered-by-stormy';

describe('RootLayout', () => {
	it('renders the document shell with fonts and attribution', () => {
		const html = renderToStaticMarkup(<RootLayout>content</RootLayout>);
		expect(html).toContain('<html lang="en"');
		expect(html).toContain('font-geist-sans');
		expect(html).toContain('font-geist-mono');
		expect(html).toContain('content');
		expect(html).toContain('Powered by');
	});

	it('describes the site in its metadata', () => {
		expect(metadata.title).toBe('My Stormy Site');
		expect(metadata.description).toBe('A website built with Stormy CMS');
	});
});

describe('NotFound', () => {
	it('renders a not-found message', () => {
		expect(renderToStaticMarkup(<NotFound />)).toContain('Not Found');
	});
});

describe('Home page', () => {
	it('reuses the dynamic slug page for the root route', () => {
		expect(HomePage).toBe(SlugPage);
	});
});

describe('PoweredByStormy', () => {
	it('links back to Stormy CMS in a new tab', () => {
		const html = renderToStaticMarkup(<PoweredByStormy />);
		expect(html).toContain('href="https://stormycms.com"');
		expect(html).toContain('target="_blank"');
		expect(html).toContain('rel="noreferrer"');
	});
});
