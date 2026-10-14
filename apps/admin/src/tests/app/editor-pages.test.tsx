import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { client, redirect, captured } = vi.hoisted(() => ({
	client: {
		getPage: vi.fn(),
		getPages: vi.fn(),
		getLayout: vi.fn(),
		getLayouts: vi.fn(),
	},
	redirect: vi.fn((url: string) => {
		throw new Error(`NEXT_REDIRECT:${url}`);
	}),
	captured: { page: null as unknown, layout: null as unknown, editorProps: null as unknown },
}));

vi.mock('@/stormy-cms-client', () => ({ stormyCMSClient: client }));
vi.mock('next/navigation', () => ({ redirect }));

vi.mock('@stormycms/core', async (importOriginal) => ({
	...(await importOriginal<typeof import('@stormycms/core')>()),
	mapPageData: vi.fn((raw) => raw),
	mapLayoutData: vi.fn((raw) => raw),
}));

vi.mock('@stormycms/react/cms/client', () => ({
	CMSPageProvider: ({ page, children }: { page: unknown; children: React.ReactNode }) => {
		captured.page = page;
		return <div data-testid="page-provider">{children}</div>;
	},
	CMSLayoutProvider: ({ layout, children }: { layout: unknown; children: React.ReactNode }) => {
		captured.layout = layout;
		return <div data-testid="layout-provider">{children}</div>;
	},
}));

vi.mock('~/components/page-editor', () => ({
	PageEditor: (props: unknown) => {
		captured.editorProps = props;
		return <div data-testid="page-editor" />;
	},
}));

vi.mock('~/components/layout-editor', () => ({
	LayoutEditor: (props: unknown) => {
		captured.editorProps = props;
		return <div data-testid="layout-editor" />;
	},
}));

import PageEditorPage from '~/app/(dashboard)/pages/[id]/page';
import LayoutEditorPage from '~/app/(dashboard)/layouts/[id]/page';

const params = (id: string) => ({ params: Promise.resolve({ id }) });

beforeEach(() => {
	for (const fn of Object.values(client)) fn.mockReset();
	redirect.mockClear();
	captured.page = null;
	captured.layout = null;
	captured.editorProps = null;
});

describe('PageEditorPage', () => {
	it('redirects to the pages list when the page cannot be loaded', async () => {
		client.getPage.mockRejectedValue(new Error('missing'));
		await expect(PageEditorPage(params('nope'))).rejects.toThrow('NEXT_REDIRECT:/pages');
	});

	it('provides the page to the editor with reserved slugs from other pages', async () => {
		client.getPage.mockResolvedValue({ id: 'p1', name: 'About', slug: 'about', layoutId: 'l1', components: [] });
		client.getLayouts.mockResolvedValue([{ id: 'l1', name: 'Main' }]);
		client.getPages.mockResolvedValue([
			{ id: 'p1', slug: 'about' },
			{ id: 'p2', slug: 'contact' },
			{ id: 'p3', slug: null },
		]);

		render(await PageEditorPage(params('p1')));

		expect(screen.getByTestId('page-editor')).toBeInTheDocument();
		expect(captured.page).toMatchObject({ id: 'p1', initialData: { name: 'About', slug: 'about', layoutId: 'l1' } });
		expect(captured.editorProps).toMatchObject({ reservedSlugs: ['contact', ''] });
	});

	it('tolerates layout and page listing failures', async () => {
		client.getPage.mockResolvedValue({ id: 'p1', name: 'About', slug: 'about', layoutId: null, components: null });
		client.getLayouts.mockRejectedValue(new Error('down'));
		client.getPages.mockRejectedValue(new Error('down'));

		render(await PageEditorPage(params('p1')));

		expect(captured.page).toMatchObject({ id: 'p1', components: [], initialData: { layoutId: undefined } });
		expect(captured.editorProps).toMatchObject({ layouts: [], reservedSlugs: [] });
	});
});

describe('LayoutEditorPage', () => {
	it('redirects to the layouts list when the layout cannot be loaded', async () => {
		client.getLayout.mockRejectedValue(new Error('missing'));
		await expect(LayoutEditorPage(params('nope'))).rejects.toThrow('NEXT_REDIRECT:/layouts');
	});

	it('provides the layout to the editor', async () => {
		client.getLayout.mockResolvedValue({ id: 'l1', name: 'Main', parentLayoutId: 'parent', components: [] });
		client.getLayouts.mockResolvedValue([{ id: 'l1' }, { id: 'l2' }]);

		render(await LayoutEditorPage(params('l1')));

		expect(screen.getByTestId('layout-editor')).toBeInTheDocument();
		expect(captured.layout).toMatchObject({ id: 'l1', initialData: { name: 'Main', parentLayoutId: 'parent' } });
		expect(captured.editorProps).toMatchObject({ layouts: [{ id: 'l1' }, { id: 'l2' }] });
	});

	it('tolerates layout listing failures and missing parents', async () => {
		client.getLayout.mockResolvedValue({ id: 'l1', name: 'Main', parentLayoutId: null, components: null });
		client.getLayouts.mockRejectedValue(new Error('down'));

		render(await LayoutEditorPage(params('l1')));

		expect(captured.layout).toMatchObject({ id: 'l1', components: [], initialData: { parentLayoutId: undefined } });
	});
});
