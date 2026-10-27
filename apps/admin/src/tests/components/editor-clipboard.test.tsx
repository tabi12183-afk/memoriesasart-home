import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CMSLayoutProvider, CMSPageProvider, useCMSLayout, useCMSPage } from '@stormycms/react/cms/client';
import type { CMSComponentData } from '@stormycms/core';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Toaster, toast } from 'sonner';
import { EditableComponent } from '~/components/editable-component';
import { EditorSelectionProvider, useEditorSelection } from '~/components/editor-selection';

afterEach(() => {
	toast.dismiss();
	sessionStorage.clear();
});

vi.mock('~/components/markdown-editor', () => ({ MarkdownEditor: () => null }));
vi.mock('~/components/media-library', () => ({ MediaLibrary: () => null }));

const node = (id: string, name = 'Group', children: CMSComponentData[] = []): CMSComponentData => ({
	id,
	name,
	props: name === 'Text' ? { content: id } : {},
	attrs: { title: id },
	parentComponentId: null,
	childComponents: children.map((child) => ({ ...child, parentComponentId: id })),
});

function ClipboardActions() {
	const { setClipboard } = useEditorSelection();
	return (
		<button data-testid="clear-clipboard" onClick={() => setClipboard(null)}>
			Clear clipboard
		</button>
	);
}

function Canvas({ context }: { context: 'page' | 'layout' }) {
	const page = useCMSPage();
	const layout = useCMSLayout();
	const { components } = context === 'page' ? page : layout;
	return (
		<EditorSelectionProvider>
			{components.map((component, index) => (
				<EditableComponent
					key={component.id}
					{...component}
					initialProps={component.props}
					index={index}
					context={context}
				/>
			))}
			<ClipboardActions />
			<Toaster />
			<output data-testid="tree">{JSON.stringify(components)}</output>
		</EditorSelectionProvider>
	);
}

function editor(components: CMSComponentData[], context: 'page' | 'layout' = 'page', editorId: string = context) {
	return render(
		<CMSPageProvider
			page={{
				id: context === 'page' ? editorId : 'page',
				initialData: { name: 'Page', slug: 'page' },
				components: context === 'page' ? components : [],
			}}
		>
			<CMSLayoutProvider
				layout={{
					id: context === 'layout' ? editorId : 'layout',
					initialData: { name: 'Layout' },
					components: context === 'layout' ? components : [],
				}}
			>
				<Canvas context={context} />
			</CMSLayoutProvider>
		</CMSPageProvider>,
	);
}

const wrapper = (id: string) => screen.getByTestId(`cms-editable-component-${id}`);

const tree = (): CMSComponentData[] => JSON.parse(screen.getByTestId('tree').textContent ?? '[]');
function control(id: string, name: string) {
	const toolbar = wrapper(id).querySelector(':scope > [data-cms-editor-control="toolbar"]');
	if (!(toolbar instanceof HTMLElement)) throw new Error('Missing component toolbar');
	return within(toolbar).getByRole('button', { name });
}
async function paste(id: string, placement: 'Before' | 'As Child' | 'After') {
	await userEvent.click(control(id, 'Paste component'));
	await userEvent.click(screen.getByRole('menuitem', { name: placement }));
}
function allIds(components: CMSComponentData[]): string[] {
	return components.flatMap((component) => [component.id, ...allIds(component.childComponents)]);
}

describe('component clipboard', () => {
	it('shows copy and cut buttons and disables paste until a component is copied or cut', () => {
		editor([node('source')]);
		expect(control('source', 'Copy component')).toBeEnabled();
		expect(control('source', 'Cut component')).toBeEnabled();
		expect(control('source', 'Paste component')).toBeDisabled();
	});

	it.each(['page', 'layout'] as const)(
		'copies an entire subtree into another component in the %s editor',
		async (context) => {
			const source = node('source', 'Group', [node('child', 'Text')]);
			const original = [source, node('target')];
			editor(original, context);
			await userEvent.click(control('source', 'Copy component'));
			expect(tree()).toEqual(original);
			await userEvent.click(control('target', 'Paste component'));
			expect(screen.getAllByRole('menuitem').map((item) => item.textContent)).toEqual(['Before', 'As Child', 'After']);
			await userEvent.click(screen.getByRole('menuitem', { name: 'As Child' }));
			const copied = tree()[1]?.childComponents[0];
			expect(copied).toMatchObject({
				name: 'Group',
				parentComponentId: 'target',
				props: source.props,
				attrs: source.attrs,
			});
			expect(copied?.id).not.toBe('source');
			expect(copied?.childComponents[0]).toMatchObject({
				name: 'Text',
				parentComponentId: copied?.id,
				props: { content: 'child' },
				attrs: { title: 'child' },
			});
			expect(copied?.childComponents[0]?.id).not.toBe('child');
			expect(tree()[0]).toEqual(source);
			expect(original).toEqual([source, node('target')]);
		},
	);

	it.each(['Before', 'After'] as const)('pastes a copy %s a nested sibling', async (placement) => {
		editor([node('source', 'Text'), node('parent', 'Group', [node('target', 'Text')])]);
		await userEvent.click(control('source', 'Copy component'));
		await paste('target', placement);
		const children = tree()[1]?.childComponents ?? [];
		expect(children.map((child) => child.props.content)).toEqual(
			placement === 'Before' ? ['source', 'target'] : ['target', 'source'],
		);
		expect(children.every((child) => child.parentComponentId === 'parent')).toBe(true);
	});

	it('keeps a reusable copy snapshot after the original is edited or removed', async () => {
		editor([node('source', 'Text'), node('target')]);
		await userEvent.click(control('source', 'Copy component'));
		const toolbar = wrapper('source').querySelector('[data-cms-editor-control="toolbar"]');
		if (!(toolbar instanceof HTMLElement)) throw new Error('Missing toolbar');
		await userEvent.click(within(toolbar).getByRole('button', { name: 'Edit' }));
		fireEvent.change(screen.getByLabelText('Content'), { target: { value: 'edited' } });
		await userEvent.click(screen.getByRole('button', { name: 'Update' }));
		await userEvent.click(control('source', 'Remove component'));
		await userEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: /Remove/ }));
		await paste('target', 'As Child');
		await paste('target', 'As Child');
		expect(tree()[0]?.childComponents.map((child) => child.props.content)).toEqual(['source', 'source']);
		const ids = allIds(tree());
		expect(new Set(ids).size).toBe(ids.length);
	});

	it('keeps copied descendant values when the live subtree is edited', async () => {
		editor([node('source', 'Group', [node('child', 'Text')]), node('target')]);
		await userEvent.click(control('source', 'Copy component'));
		await userEvent.click(within(wrapper('child')).getByRole('button', { name: 'Edit' }));
		fireEvent.change(screen.getByLabelText('Content'), { target: { value: 'changed child' } });
		await userEvent.click(screen.getByRole('button', { name: 'Update' }));
		await paste('target', 'As Child');
		expect(tree()[0]?.childComponents[0]?.props.content).toBe('changed child');
		expect(tree()[1]?.childComponents[0]?.childComponents[0]?.props.content).toBe('child');
	});

	it.each(['page', 'layout'] as const)(
		'cuts an entire subtree only after pasting and consumes the cut in the %s editor',
		async (context) => {
			const source = node('source', 'Group', [node('child', 'Text')]);
			editor([source, node('target')], context);
			await userEvent.click(control('source', 'Cut component'));
			expect(wrapper('source')).toHaveAttribute('data-cms-cut', 'true');
			expect(tree()).toEqual([source, node('target')]);
			await paste('target', 'As Child');
			expect(tree()).toEqual([node('target', 'Group', [source])]);
			expect(control('target', 'Paste component')).toBeDisabled();
			expect(wrapper('source')).not.toHaveAttribute('data-cms-cut');
		},
	);

	it('uses the chosen root slot when moving a cut component forward or backward', async () => {
		editor([node('a', 'Text'), node('b', 'Text'), node('c', 'Text')]);
		await userEvent.click(control('a', 'Cut component'));
		await paste('c', 'After');
		expect(tree().map(({ id }) => id)).toEqual(['b', 'c', 'a']);
		await userEvent.click(control('a', 'Cut component'));
		await paste('b', 'Before');
		expect(tree().map(({ id }) => id)).toEqual(['a', 'b', 'c']);
	});

	it.each(['Text', 'Hero'])('hides As Child when %s does not support children', async (name) => {
		editor([node('source', 'Text'), node('target', name)]);
		await userEvent.click(control('source', 'Copy component'));
		await userEvent.click(control('target', 'Paste component'));
		expect(screen.queryByRole('menuitem', { name: 'As Child' })).not.toBeInTheDocument();
		expect(screen.getAllByRole('menuitem').map((item) => item.textContent)).toEqual(['Before', 'After']);
		await userEvent.click(screen.getByRole('menuitem', { name: 'After' }));
		expect(tree()).toHaveLength(3);
	});

	it.each([['cards', 'Card Group does not accept Text as a child.']])(
		'explains an invalid inside paste into %s without changing the layout',
		async (id, message) => {
			const original = [node('source', 'Text'), node('leaf', 'Text'), node('cards', 'CardGroup')];
			editor(original);
			await userEvent.click(control('source', 'Copy component'));
			await userEvent.click(control(id, 'Paste component'));
			expect(screen.getByRole('menuitem', { name: 'As Child' })).not.toHaveAttribute('data-disabled');
			await userEvent.click(screen.getByRole('menuitem', { name: 'As Child' }));
			expect(await screen.findByText(message)).toBeVisible();
			expect(tree()).toEqual(original);
		},
	);

	it('explains why a Section cannot be pasted inside another Section', async () => {
		const original = [node('source', 'Section'), node('target', 'Section')];
		editor(original);
		await userEvent.click(control('source', 'Copy component'));
		await paste('target', 'As Child');
		expect(await screen.findByText('Section does not accept Section as a child.')).toBeVisible();
		expect(tree()).toEqual(original);
		await paste('target', 'After');
		expect(tree()).toHaveLength(3);
	});

	it('rejects cut cycles while allowing a finite snapshot to be copied inside its original', async () => {
		editor([node('source', 'Group', [node('descendant')])]);
		await userEvent.click(control('source', 'Cut component'));
		await userEvent.click(control('descendant', 'Paste component'));
		for (const item of screen.getAllByRole('menuitem')) expect(item).not.toHaveAttribute('data-disabled');
		await userEvent.click(screen.getByRole('menuitem', { name: 'As Child' }));
		expect(
			await screen.findByText('A component cannot be moved inside itself or one of its descendants.'),
		).toBeVisible();
		expect(wrapper('source')).toHaveAttribute('data-cms-cut', 'true');
		await userEvent.click(control('source', 'Copy component'));
		await paste('source', 'As Child');
		expect(tree()[0]?.childComponents).toHaveLength(2);
		const copy = tree()[0]?.childComponents[1];
		expect(copy?.childComponents).toHaveLength(1);
		expect(copy?.id).not.toBe('source');
	});

	it('enforces unique siblings and valid parents for copies without blocking cuts into another region', async () => {
		editor(
			[node('region', 'Region', [node('header', 'RegionHeader')]), node('empty-region', 'Region'), node('group')],
			'layout',
		);
		await userEvent.click(control('header', 'Copy component'));
		await userEvent.click(control('header', 'Paste component'));
		expect(screen.getByRole('menuitem', { name: 'Before' })).not.toHaveAttribute('data-disabled');
		await userEvent.click(screen.getByRole('menuitem', { name: 'Before' }));
		expect(await screen.findByText('Region already contains a Region Header. Only one is allowed.')).toBeVisible();
		await userEvent.click(control('group', 'Paste component'));
		for (const item of screen.getAllByRole('menuitem')) expect(item).not.toHaveAttribute('data-disabled');
		await userEvent.click(screen.getByRole('menuitem', { name: 'As Child' }));
		expect(await screen.findByText('Region Header can only be placed inside Region.')).toBeVisible();
		await userEvent.click(control('header', 'Cut component'));
		await paste('empty-region', 'As Child');
		expect(tree()[0]?.childComponents).toEqual([]);
		expect(tree()[1]?.childComponents[0]?.id).toBe('header');
	});

	it('does not delete the source when the paste menu is dismissed', async () => {
		const original = [node('source'), node('target')];
		editor(original);
		await userEvent.click(control('source', 'Cut component'));
		await userEvent.click(control('target', 'Paste component'));
		await userEvent.keyboard('{Escape}');
		expect(tree()).toEqual(original);
		await paste('target', 'As Child');
		expect(tree()).toEqual([node('target', 'Group', [node('source')])]);
	});
	it('restores a copied subtree after remounting in another document and editor context', async () => {
		const source = node('source', 'Group', [node('child', 'Text')]);
		const first = editor([source]);
		await userEvent.click(control('source', 'Copy component'));
		first.unmount();
		editor([node('target')], 'layout', 'another-layout');
		await waitFor(() => expect(control('target', 'Paste component')).toBeEnabled());
		await paste('target', 'As Child');
		expect(tree()[0]?.childComponents[0]).toMatchObject({
			name: 'Group',
			childComponents: [{ name: 'Text', props: { content: 'child' } }],
		});
	});

	it('restores a pending cut after remounting its original document', async () => {
		const source = node('source', 'Group', [node('child', 'Text')]);
		const original = [source, node('target')];
		const first = editor(original);
		await userEvent.click(control('source', 'Cut component'));
		first.unmount();
		editor(original);
		await waitFor(() => expect(control('target', 'Paste component')).toBeEnabled());
		expect(wrapper('source')).toHaveAttribute('data-cms-cut', 'true');
		await paste('target', 'As Child');
		expect(tree()).toEqual([node('target', 'Group', [source])]);
		expect(sessionStorage.getItem('stormycms:component-clipboard:v1')).toBeNull();
	});

	it.each(['Cancel', 'Escape', 'Close'])(
		'dismisses a cross-document copy using %s without changing either document or the clipboard',
		async (action) => {
			const original = [node('source'), node('target')];
			const first = editor(original);
			await userEvent.click(control('source', 'Cut component'));
			const savedCut = sessionStorage.getItem('stormycms:component-clipboard:v1');
			first.unmount();
			editor(original, 'page', 'another-page');
			await waitFor(() => expect(control('target', 'Paste component')).toBeEnabled());
			expect(wrapper('source')).not.toHaveAttribute('data-cms-cut');
			await paste('target', 'As Child');
			const dialog = await screen.findByRole('dialog', { name: 'Paste as a copy?' });
			expect(within(dialog).getByText(/cut from another document/i)).toBeVisible();
			expect(within(dialog).getByRole('button', { name: 'Paste as copy' })).toBeEnabled();
			if (action === 'Escape') await userEvent.keyboard('{Escape}');
			else await userEvent.click(within(dialog).getByRole('button', { name: action }));
			expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
			expect(tree()).toEqual(original);
			expect(sessionStorage.getItem('stormycms:component-clipboard:v1')).toBe(savedCut);
		},
	);

	it.each(['Before', 'As Child', 'After'] as const)(
		'pastes a cross-document cut as a copy at the requested %s position after confirmation',
		async (placement) => {
			const source = node('source', 'Group', [node('child', 'Text')]);
			const original = [source];
			const first = editor(original);
			await userEvent.click(control('source', 'Cut component'));
			first.unmount();
			const destination = [node('existing', 'Text'), node('target')];
			const second = editor(destination, 'layout', 'another-layout');
			await waitFor(() => expect(control('target', 'Paste component')).toBeEnabled());
			await paste('target', placement);
			expect(tree()).toEqual(destination);
			await userEvent.click(
				within(await screen.findByRole('dialog', { name: 'Paste as a copy?' })).getByRole('button', {
					name: 'Paste as copy',
				}),
			);
			expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
			const result = tree();
			const copy = placement === 'As Child' ? result[1]?.childComponents[0] : result[placement === 'Before' ? 1 : 2];
			expect(copy).toMatchObject({
				name: 'Group',
				props: source.props,
				attrs: source.attrs,
				childComponents: [{ name: 'Text', props: { content: 'child' } }],
			});
			expect(copy?.id).not.toBe('source');
			expect(copy?.childComponents[0]?.id).not.toBe('child');
			expect(copy?.parentComponentId).toBe(placement === 'As Child' ? 'target' : null);
			expect(copy?.childComponents[0]?.parentComponentId).toBe(copy?.id);
			second.unmount();
			editor(original);
			await waitFor(() => expect(control('source', 'Paste component')).toBeEnabled());
			expect(tree()).toEqual(original);
			expect(wrapper('source')).not.toHaveAttribute('data-cms-cut');
		},
	);

	it('retains validation and the pending cut when Paste as copy would insert an invalid child', async () => {
		const first = editor([node('source', 'Section')]);
		await userEvent.click(control('source', 'Cut component'));
		const savedCut = sessionStorage.getItem('stormycms:component-clipboard:v1');
		first.unmount();
		const destination = [node('target', 'Section')];
		editor(destination, 'page', 'another-page');
		await waitFor(() => expect(control('target', 'Paste component')).toBeEnabled());
		await paste('target', 'As Child');
		await userEvent.click(
			within(await screen.findByRole('dialog', { name: 'Paste as a copy?' })).getByRole('button', {
				name: 'Paste as copy',
			}),
		);
		expect(await screen.findByText('Section does not accept Section as a child.')).toBeVisible();
		expect(tree()).toEqual(destination);
		expect(sessionStorage.getItem('stormycms:component-clipboard:v1')).toBe(savedCut);
	});

	it('ignores malformed stored clipboard data', () => {
		sessionStorage.setItem('stormycms:component-clipboard:v1', '{invalid JSON');
		editor([node('target')]);
		expect(control('target', 'Paste component')).toBeDisabled();
	});
	it('keeps copy and paste usable when session storage writes fail', async () => {
		const storageFailure = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
			throw new DOMException('Storage is full', 'QuotaExceededError');
		});
		try {
			editor([node('source', 'Text'), node('target')]);
			await userEvent.click(control('source', 'Copy component'));
			await paste('target', 'As Child');
			expect(tree()[1]?.childComponents[0]?.props.content).toBe('source');
		} finally {
			storageFailure.mockRestore();
		}
	});
	it('ignores a paste when the clipboard is cleared while the placement menu is open', async () => {
		const original = [node('source', 'Text'), node('target')];
		editor(original);
		await userEvent.click(control('source', 'Copy component'));
		await userEvent.click(control('target', 'Paste component'));
		fireEvent.click(screen.getByTestId('clear-clipboard'));
		await userEvent.click(screen.getByRole('menuitem', { name: 'Before' }));
		expect(tree()).toEqual(original);
		expect(sessionStorage.getItem('stormycms:component-clipboard:v1')).toBeNull();
	});
});
