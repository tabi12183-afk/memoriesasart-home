import { renderToStaticMarkup } from 'react-dom/server';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('components', () => ({
	MemoriesPortfolio: ({ pagePath }: { pagePath: string }) => <div data-portfolio={pagePath} />,
	memoriesPages: {
		'/': {
			title: 'Greensburg PA Photographer | Memories as Art',
			description: 'Portrait, wedding, and commercial photography.',
			image: '/assets/home.webp',
			preview: false,
		},
		'/portraits/boudoir/': {
			title: 'Greensburg PA Boudoir Photography | Memories as Art',
			description: 'Personal portraits.',
			image: '/assets/boudoir.webp',
			preview: false,
		},
		'/shop/': {
			title: 'Shop | Memories as Art',
			description: 'Coming soon.',
			image: '/assets/shop.webp',
			preview: true,
		},
	},
}));

import { getMemoriesDefault, MemoriesDefault, memoriesMetadata, memoriesPath } from '../memories-defaults';

afterEach(() => vi.unstubAllEnvs());

describe('approved photography defaults', () => {
	it('resolves root and nested portfolio paths', () => {
		expect(memoriesPath()).toBe('/');
		expect(memoriesPath([])).toBe('/');
		expect(memoriesPath(['portraits', 'boudoir'])).toBe('/portraits/boudoir/');
		expect(getMemoriesDefault(['portraits', 'boudoir'])?.title).toContain('Boudoir');
	});

	it('does not invent defaults for unknown or inherited object keys', () => {
		expect(getMemoriesDefault(['unapproved'])).toBeUndefined();
		expect(getMemoriesDefault(['toString'])).toBeUndefined();
		expect(memoriesMetadata(['unapproved'])).toBeUndefined();
	});

	it('renders the shared CMS portfolio with the requested path', () => {
		expect(renderToStaticMarkup(<MemoriesDefault slug={['portraits', 'boudoir']} />)).toContain(
			'data-portfolio="/portraits/boudoir/"',
		);
		expect(renderToStaticMarkup(<MemoriesDefault />)).toContain('data-portfolio="/"');
	});

	it('uses the configured public origin for canonical and social image URLs', () => {
		vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://photography.example/');
		vi.stubEnv('MEMORIES_PUBLIC_LAUNCH', '1');
		const metadata = memoriesMetadata(['portraits', 'boudoir']);
		expect(metadata).toMatchObject({
			title: 'Greensburg PA Boudoir Photography | Memories as Art',
			description: 'Personal portraits.',
			alternates: { canonical: 'https://photography.example/portraits/boudoir/' },
			openGraph: {
				title: 'Greensburg PA Boudoir Photography | Memories as Art',
				description: 'Personal portraits.',
				url: 'https://photography.example/portraits/boudoir/',
				images: ['https://photography.example/assets/boudoir.webp'],
				type: 'website',
			},
			twitter: {
				card: 'summary_large_image',
				title: 'Greensburg PA Boudoir Photography | Memories as Art',
				description: 'Personal portraits.',
				images: ['https://photography.example/assets/boudoir.webp'],
			},
			robots: { index: true, follow: true },
		});
	});

	it('keeps unfinished pages and an unlaunched preview out of search indexing', () => {
		vi.stubEnv('MEMORIES_PUBLIC_LAUNCH', '1');
		expect(memoriesMetadata(['shop'])?.robots).toEqual({ index: false, follow: true });
		vi.stubEnv('MEMORIES_PUBLIC_LAUNCH', '');
		expect(memoriesMetadata()?.robots).toEqual({ index: false, follow: true });
	});

	it.each(['', undefined])('uses the existing studio domain when a public origin is %s', (origin) => {
		vi.stubEnv('NEXT_PUBLIC_SITE_URL', origin);
		expect(memoriesMetadata()?.alternates).toEqual({ canonical: 'https://www.memoriesasart.com/' });
	});
});
