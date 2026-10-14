import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { pageCtx, layoutCtx } = vi.hoisted(() => {
	const makeCtx = () => ({
		id: 'entity-1',
		initialData: { name: 'Entity', slug: 'entity' },
		components: [] as unknown[],
		layoutId: undefined as string | undefined,
		parentLayoutId: undefined as string | undefined,
		updateComponent: vi.fn(),
		removeComponent: vi.fn(),
		addComponent: vi.fn(),
		addFirstComponent: vi.fn(),
		setLayoutId: vi.fn(),
		setParentLayoutId: vi.fn(),
	});
	return { pageCtx: makeCtx(), layoutCtx: makeCtx() };
});

vi.mock('@stormycms/react/cms/client', () => ({
	useCMSPage: () => pageCtx,
	useCMSLayout: () => layoutCtx,
}));

vi.mock('@stormycms/react/cms', async (importOriginal) => ({
	...(await importOriginal<typeof import('@stormycms/react/cms')>()),
	buildLayoutTree: vi.fn(() => null),
	LayoutTree: ({ children }: React.PropsWithChildren) => <div data-testid="layout-tree">{children}</div>,
	Layout: ({ children }: React.PropsWithChildren) => <div data-testid="layout-wrapper">{children}</div>,
}));

import { LayoutEditor } from '~/components/layout-editor';
import { PageEditor } from '~/components/page-editor';

const fetchMock = vi.fn();

const layouts = [
	{ id: 'layout-1', name: 'Main layout', components: [], isDefault: true },
	{ id: 'entity-1', name: 'Self layout', components: [] },
] as never;

beforeEach(() => {
	fetchMock.mockReset();
	vi.stubGlobal('fetch', fetchMock);
	vi.spyOn(console, 'error').mockImplementation(() => {});
	pageCtx.components = [];
	layoutCtx.components = [];
	pageCtx.initialData = { name: 'Entity', slug: 'entity' };
	pageCtx.layoutId = undefined;
	layoutCtx.parentLayoutId = undefined;
	pageCtx.setLayoutId.mockClear();
	layoutCtx.setParentLayoutId.mockClear();
});

describe('PageEditor', () => {
	it('shows an empty state with an add-first-component dialog', async () => {
		render(<PageEditor layouts={layouts} reservedSlugs={[]} />);
		expect(screen.getByText('This page is empty.')).toBeInTheDocument();
		await userEvent.click(screen.getByRole('button', { name: /Add Your First Component/ }));
		expect(await screen.findByRole('heading', { name: 'Add Component' })).toBeInTheDocument();
	});

	it('renders existing components as editable components', () => {
		pageCtx.components = [
			{
				id: 't1',
				name: 'Text',
				props: { content: 'Body copy' },
				attrs: {},
				parentComponentId: null,
				childComponents: [],
			},
		];
		render(<PageEditor layouts={layouts} reservedSlugs={[]} />);
		expect(screen.getByText('Body copy')).toBeInTheDocument();
	});

	it('saves the page and normalizes the slug', async () => {
		fetchMock.mockResolvedValue({ ok: true });
		render(<PageEditor layouts={layouts} reservedSlugs={['other']} />);

		await userEvent.clear(screen.getByLabelText('Page Name'));
		await userEvent.type(screen.getByLabelText('Page Name'), 'Renamed');
		await userEvent.clear(screen.getByLabelText('Slug'));
		await userEvent.type(screen.getByLabelText('Slug'), '/Fancy/Slug/');
		await userEvent.click(screen.getByRole('button', { name: /^Save$/ }));

		await waitFor(() => expect(fetchMock).toHaveBeenCalled());
		const [url, options] = fetchMock.mock.calls[0] ?? [];
		expect(url).toBe('/api/pages/entity-1');
		expect(JSON.parse(options.body)).toMatchObject({ slug: 'fancy/slug', metadata: { title: 'Renamed' } });
		expect(screen.getByLabelText('Slug')).toHaveValue('fancy/slug');
	});

	it('rejects reserved and empty slugs before saving', async () => {
		render(<PageEditor layouts={layouts} reservedSlugs={['taken']} />);

		await userEvent.clear(screen.getByLabelText('Slug'));
		await userEvent.type(screen.getByLabelText('Slug'), 'taken');
		await userEvent.click(screen.getByRole('button', { name: /^Save$/ }));
		expect(await screen.findByRole('alert')).toHaveTextContent('already used');
		expect(fetchMock).not.toHaveBeenCalled();

		await userEvent.clear(screen.getByLabelText('Slug'));
		await userEvent.click(screen.getByRole('button', { name: /^Save$/ }));
		expect(await screen.findByRole('alert')).toHaveTextContent('Slug is required.');
		expect(fetchMock).not.toHaveBeenCalled();
	});

	it('surfaces server-side save conflicts and failures', async () => {
		fetchMock.mockResolvedValueOnce({ ok: false, status: 409 });
		render(<PageEditor layouts={layouts} reservedSlugs={[]} />);
		await userEvent.click(screen.getByRole('button', { name: /^Save$/ }));
		expect(await screen.findByRole('alert')).toHaveTextContent('already used');
	});

	it('reports generic save failures and network errors', async () => {
		fetchMock.mockResolvedValueOnce({ ok: false, status: 500 });
		render(<PageEditor layouts={layouts} reservedSlugs={[]} />);
		await userEvent.click(screen.getByRole('button', { name: /^Save$/ }));
		expect(await screen.findByRole('alert')).toHaveTextContent('Unable to save this page.');

		fetchMock.mockRejectedValueOnce(new Error('offline'));
		// The "Saving..." state resets after two seconds.
		await waitFor(() => expect(screen.getByRole('button', { name: /^Save$/ })).toBeEnabled(), { timeout: 4000 });
		await userEvent.click(screen.getByRole('button', { name: /^Save$/ }));
		await waitFor(() => expect(console.error).toHaveBeenCalledWith('Save failed:', expect.any(Error)));
	});

	it('hides slug and delete controls for the home page', () => {
		pageCtx.initialData = { name: 'Home', slug: '' };
		render(<PageEditor layouts={layouts} reservedSlugs={[]} />);
		expect(screen.queryByLabelText('Slug')).not.toBeInTheDocument();
		expect(screen.queryByRole('button', { name: 'Delete page' })).not.toBeInTheDocument();
	});

	it('deletes the page after confirmation', async () => {
		fetchMock.mockResolvedValue({ ok: true });
		render(<PageEditor layouts={layouts} reservedSlugs={[]} />);
		await userEvent.click(screen.getByRole('button', { name: 'Delete page' }));
		await userEvent.click(await screen.findByRole('button', { name: /Delete page$/ }));
		await waitFor(() => expect(fetchMock).toHaveBeenCalledWith('/api/pages/entity-1', { method: 'DELETE' }));
	});

	it('keeps the delete dialog open when deletion fails', async () => {
		fetchMock.mockResolvedValueOnce({ ok: false });
		render(<PageEditor layouts={layouts} reservedSlugs={[]} />);
		await userEvent.click(screen.getByRole('button', { name: 'Delete page' }));
		await userEvent.click(await screen.findByRole('button', { name: /Delete page$/ }));
		expect(await screen.findByRole('alert')).toHaveTextContent('Unable to delete this page.');

		fetchMock.mockRejectedValueOnce(new Error('offline'));
		await userEvent.click(screen.getByRole('button', { name: /Delete page$/ }));
		expect(await screen.findByRole('alert')).toHaveTextContent('Unable to delete this page.');

		await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
		expect(screen.queryByRole('button', { name: 'Cancel' })).not.toBeInTheDocument();
	});

	it('updates the page layout through the layout picker', async () => {
		render(<PageEditor layouts={layouts} reservedSlugs={[]} />);
		await userEvent.click(screen.getByRole('button', { name: /Layout/ }));
		await userEvent.click(await screen.findByRole('combobox'));
		await userEvent.click(await screen.findByRole('option', { name: 'Main layout' }));
		await userEvent.click(screen.getByRole('button', { name: 'Update Layout' }));
		expect(pageCtx.setLayoutId).toHaveBeenCalledWith('layout-1');
	});

	it('clears the layout when none is selected', async () => {
		render(<PageEditor layouts={layouts} reservedSlugs={[]} />);
		await userEvent.click(screen.getByRole('button', { name: /Layout/ }));
		await userEvent.click(await screen.findByRole('button', { name: 'Update Layout' }));
		expect(pageCtx.setLayoutId).toHaveBeenCalledWith(undefined);
	});
});

describe('LayoutEditor', () => {
	it('shows an empty state with an add-first-component dialog', async () => {
		render(<LayoutEditor layouts={layouts} />);
		expect(screen.getByText('This layout is empty.')).toBeInTheDocument();
		await userEvent.click(screen.getByRole('button', { name: /Add Your First Component/ }));
		expect(await screen.findByRole('heading', { name: 'Add Component' })).toBeInTheDocument();
	});

	it('renders components inside the layout wrapper', () => {
		layoutCtx.components = [
			{ id: 'o1', name: 'Outlet', props: {}, attrs: {}, parentComponentId: null, childComponents: [] },
		];
		render(<LayoutEditor layouts={layouts} />);
		expect(screen.getByTestId('layout-wrapper')).toBeInTheDocument();
		expect(screen.getByTestId('cms-outlet-placeholder')).toBeInTheDocument();
	});

	it('saves the layout name', async () => {
		fetchMock.mockResolvedValue({ ok: true });
		render(<LayoutEditor layouts={layouts} />);
		await userEvent.clear(screen.getByLabelText('Layout Name'));
		await userEvent.type(screen.getByLabelText('Layout Name'), 'New name');
		await userEvent.click(screen.getByRole('button', { name: /^Save$/ }));

		await waitFor(() => expect(fetchMock).toHaveBeenCalled());
		const [url, options] = fetchMock.mock.calls[0] ?? [];
		expect(url).toBe('/api/layouts/entity-1');
		expect(JSON.parse(options.body)).toMatchObject({ name: 'New name', parentLayoutId: null });
		await waitFor(() => expect(screen.getByRole('button', { name: /^Save$/ })).toBeEnabled(), { timeout: 3000 });
	});

	it('logs save failures', async () => {
		fetchMock.mockRejectedValueOnce(new Error('offline'));
		render(<LayoutEditor layouts={layouts} />);
		await userEvent.click(screen.getByRole('button', { name: /^Save$/ }));
		await waitFor(() => expect(console.error).toHaveBeenCalledWith('Save failed:', expect.any(Error)));
	});

	it('deletes the layout after confirmation and logs failures', async () => {
		fetchMock.mockResolvedValueOnce({ ok: true });
		const { unmount } = render(<LayoutEditor layouts={layouts} />);
		const deleteToolbarButton = document.querySelector('header button[data-variant="destructive"]') as HTMLElement;
		await userEvent.click(deleteToolbarButton);
		await userEvent.click(await screen.findByRole('button', { name: 'Delete' }));
		await waitFor(() => expect(fetchMock).toHaveBeenCalledWith('/api/layouts/entity-1', { method: 'DELETE' }));
		unmount();

		fetchMock.mockRejectedValueOnce(new Error('offline'));
		render(<LayoutEditor layouts={layouts} />);
		await userEvent.click(document.querySelector('header button[data-variant="destructive"]') as HTMLElement);
		await userEvent.click(await screen.findByRole('button', { name: 'Delete' }));
		await waitFor(() => expect(console.error).toHaveBeenCalledWith('Delete failed:', expect.any(Error)));
	});

	it('can cancel deletion', async () => {
		render(<LayoutEditor layouts={layouts} />);
		await userEvent.click(document.querySelector('header button[data-variant="destructive"]') as HTMLElement);
		await userEvent.click(await screen.findByRole('button', { name: 'Cancel' }));
		expect(fetchMock).not.toHaveBeenCalled();
	});

	it('assigns a parent layout, excluding the layout itself', async () => {
		render(<LayoutEditor layouts={layouts} />);
		await userEvent.click(screen.getByRole('button', { name: /Parent Layout/ }));
		await userEvent.click(await screen.findByRole('combobox'));
		expect(screen.queryByRole('option', { name: 'Self layout' })).not.toBeInTheDocument();
		await userEvent.click(await screen.findByRole('option', { name: 'Main layout' }));
		await userEvent.click(screen.getByRole('button', { name: 'Update Layout' }));
		expect(layoutCtx.setParentLayoutId).toHaveBeenCalledWith('layout-1');
	});

	it('clears the parent layout with the no-parent option', async () => {
		layoutCtx.parentLayoutId = 'layout-1';
		render(<LayoutEditor layouts={layouts} />);
		await userEvent.click(screen.getByRole('button', { name: /Parent Layout/ }));
		await userEvent.click(await screen.findByRole('combobox'));
		await userEvent.click(await screen.findByRole('option', { name: 'No parent layout' }));
		await userEvent.click(screen.getByRole('button', { name: 'Update Layout' }));
		expect(layoutCtx.setParentLayoutId).toHaveBeenCalledWith(undefined);
	});
});
