import { renderToStaticMarkup } from 'react-dom/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { getPageBySlug, redirect } = vi.hoisted(() => ({
	getPageBySlug: vi.fn(),
	// Next's redirect() throws to halt rendering; mirror that.
	redirect: vi.fn((url: string) => {
		throw new Error(`NEXT_REDIRECT:${url}`);
	}),
}));

vi.mock('~/stormy-cms-client', () => ({
	stormyCMSClient: { getPageBySlug },
}));

vi.mock('next/navigation', () => ({ redirect }));

vi.mock('@stormycms/core', async (importOriginal) => ({
	...(await importOriginal<typeof import('@stormycms/core')>()),
	mapPageData: vi.fn((page) => page),
}));

vi.mock('@stormycms/react/cms', async (importOriginal) => ({
	...(await importOriginal<typeof import('@stormycms/react/cms')>()),
	buildLayoutTree: vi.fn(() => ({ id: 'layout-tree' })),
	LayoutTree: ({ children }: React.PropsWithChildren) => <div data-testid="layout-tree">{children}</div>,
	ComponentTree: () => <div data-testid="component-tree" />,
}));

import Page, { generateMetadata } from '../app/(pages)/[...slug]/page';

const cmsPage = (slug: string) => ({
	metadata: { title: `Title for ${slug}`, description: `Description for ${slug}` },
	layouts: [],
	layoutId: 'layout-1',
	components: [],
});

const params = (slug?: string[]) => ({ params: Promise.resolve({ slug: slug as string[] }) });

beforeEach(() => {
	getPageBySlug.mockReset();
	redirect.mockClear();
});

describe('generateMetadata', () => {
	it('returns not-found metadata when the page does not exist', async () => {
		getPageBySlug.mockResolvedValue(null);
		await expect(generateMetadata(params(['missing']))).resolves.toEqual({
			title: 'Page Not Found',
			description: 'The page you are looking for does not exist.',
		});
	});

	it('returns the page metadata when the page exists', async () => {
		getPageBySlug.mockResolvedValue(cmsPage('about'));
		await expect(generateMetadata(params(['about']))).resolves.toEqual({
			title: 'Title for about',
			description: 'Description for about',
		});
	});
});

describe('Page', () => {
	it('redirects to /404 when the page does not exist', async () => {
		getPageBySlug.mockResolvedValue(null);
		await expect(Page(params(['missing', 'deeply']))).rejects.toThrow('NEXT_REDIRECT:/404');
		expect(redirect).toHaveBeenCalledWith('/404');
	});

	it('renders the layout and component trees for an existing page', async () => {
		getPageBySlug.mockResolvedValue(cmsPage('features/pricing'));
		const html = renderToStaticMarkup(await Page(params(['features', 'pricing'])));
		expect(html).toContain('data-testid="layout-tree"');
		expect(html).toContain('data-testid="component-tree"');
		expect(getPageBySlug).toHaveBeenCalledWith({ slug: 'features/pricing' });
	});

	it('treats a missing slug as the home page', async () => {
		getPageBySlug.mockResolvedValue(cmsPage(''));
		await Page(params(undefined));
		expect(getPageBySlug).toHaveBeenCalledWith({ slug: '' });
	});

	it('serves repeat requests for a slug from the page cache', async () => {
		getPageBySlug.mockResolvedValue(cmsPage('cached'));
		await Page(params(['cached']));
		await Page(params(['cached']));
		expect(getPageBySlug).toHaveBeenCalledTimes(1);
	});
});
