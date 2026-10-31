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

vi.mock('components', () => ({
	default: {},
	MemoriesPortfolio: ({ pagePath }: { pagePath: string }) => (
		<div data-testid="photography-default" data-path={pagePath} />
	),
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
	},
}));

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

	it('uses photography metadata for an approved page with no CMS content', async () => {
		getPageBySlug.mockResolvedValue(null);
		await expect(generateMetadata(params(['portraits', 'boudoir']))).resolves.toMatchObject({
			title: 'Greensburg PA Boudoir Photography | Memories as Art',
			description: 'Personal portraits.',
		});
	});

	it('uses photography metadata for an empty approved CMS page', async () => {
		getPageBySlug.mockResolvedValue(cmsPage(''));
		await expect(generateMetadata(params())).resolves.toMatchObject({
			title: 'Greensburg PA Photographer | Memories as Art',
		});
	});

	it('also treats absent component data as an empty approved page', async () => {
		getPageBySlug.mockResolvedValue({ ...cmsPage(''), components: undefined });
		await expect(generateMetadata(params())).resolves.toMatchObject({
			title: 'Greensburg PA Photographer | Memories as Art',
		});
	});

	it('keeps populated CMS metadata ahead of curated defaults', async () => {
		getPageBySlug.mockResolvedValue({ ...cmsPage(''), components: [{ id: 'authored-component' }] });
		await expect(generateMetadata(params())).resolves.toEqual({
			title: 'Title for ',
			description: 'Description for ',
		});
	});

	it('does not hide CMS failures behind default metadata', async () => {
		getPageBySlug.mockRejectedValue(new Error('CMS unavailable'));
		await expect(generateMetadata(params())).rejects.toThrow('CMS unavailable');
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

	it('shows edits on the next request', async () => {
		const edited = (title: string) => ({ ...cmsPage('edited'), metadata: { title, description: '' } });
		getPageBySlug.mockResolvedValueOnce(edited('Before the edit'));
		await expect(generateMetadata(params(['edited']))).resolves.toMatchObject({ title: 'Before the edit' });

		getPageBySlug.mockResolvedValueOnce(edited('After the edit'));
		await expect(generateMetadata(params(['edited']))).resolves.toMatchObject({ title: 'After the edit' });
	});

	it('renders an approved photography portfolio when it has no CMS page', async () => {
		getPageBySlug.mockResolvedValue(null);
		const html = renderToStaticMarkup(await Page(params(['portraits', 'boudoir'])));
		expect(html).toContain('data-testid="photography-default"');
		expect(html).toContain('data-path="/portraits/boudoir/"');
		expect(redirect).not.toHaveBeenCalled();
	});

	it('renders curated home content for an empty CMS home page', async () => {
		getPageBySlug.mockResolvedValue(cmsPage(''));
		const html = renderToStaticMarkup(await Page(params()));
		expect(html).toContain('data-testid="photography-default"');
		expect(html).toContain('data-path="/"');
	});

	it('renders curated home content when component data is absent', async () => {
		getPageBySlug.mockResolvedValue({ ...cmsPage(''), components: undefined });
		const html = renderToStaticMarkup(await Page(params()));
		expect(html).toContain('data-testid="photography-default"');
	});

	it('keeps an authored approved page ahead of curated defaults', async () => {
		getPageBySlug.mockResolvedValue({ ...cmsPage(''), components: [{ id: 'authored-component' }] });
		const html = renderToStaticMarkup(await Page(params()));
		expect(html).toContain('data-testid="component-tree"');
		expect(html).not.toContain('data-testid="photography-default"');
	});

	it('does not hide CMS failures behind default content', async () => {
		getPageBySlug.mockRejectedValue(new Error('CMS unavailable'));
		await expect(Page(params())).rejects.toThrow('CMS unavailable');
	});
});
