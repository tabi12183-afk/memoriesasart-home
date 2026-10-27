import { createEvent, fireEvent, render, screen, within } from '@testing-library/react';
import { CMSLayoutProvider, CMSPageProvider, useCMSLayout, useCMSPage } from '@stormycms/react/cms/client';
import type { CMSComponentData } from '@stormycms/core';
import { describe, expect, it, vi } from 'vitest';
import { EditableComponent } from '~/components/editable-component';
import { EditorSelectionProvider } from '~/components/editor-selection';

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
			<output data-testid="tree">{JSON.stringify(components)}</output>
		</EditorSelectionProvider>
	);
}

function editor(components: CMSComponentData[], context: 'page' | 'layout' = 'page') {
	return render(
		<CMSPageProvider
			page={{
				id: 'page',
				initialData: { name: 'Page', slug: 'page' },
				components: context === 'page' ? components : [],
			}}
		>
			<CMSLayoutProvider
				layout={{ id: 'layout', initialData: { name: 'Layout' }, components: context === 'layout' ? components : [] }}
			>
				<Canvas context={context} />
			</CMSLayoutProvider>
		</CMSPageProvider>,
	);
}

const wrapper = (id: string) => screen.getByTestId(`cms-editable-component-${id}`);
function handle(id: string) {
	const button = within(wrapper(id)).getAllByRole('button', { name: /^Drag / })[0];
	if (button === undefined) throw new Error('Missing drag handle');
	return button;
}
function zone(parentId: string | null, index: number) {
	const element = document.querySelector(`[data-cms-dropzone="${parentId ?? 'root'}:${index}"]`);
	if (!(element instanceof HTMLElement)) throw new Error(`Missing dropzone ${parentId}:${index}`);
	return element;
}
function begin(id: string) {
	const dataTransfer = { setData: vi.fn(), setDragImage: vi.fn(), effectAllowed: '', dropEffect: '' };
	fireEvent.mouseDown(handle(id), { button: 0 });
	fireEvent.dragStart(handle(id), { dataTransfer });
	return dataTransfer;
}
function drop(parentId: string | null, index: number, dataTransfer: ReturnType<typeof begin>) {
	fireEvent.dragOver(zone(parentId, index), { dataTransfer });
	fireEvent.drop(zone(parentId, index), { dataTransfer });
}
const tree = (): CMSComponentData[] => JSON.parse(screen.getByTestId('tree').textContent ?? '[]');

describe('component dragging', () => {
	it('shows a hand handle and keeps the grabbing cursor until the mouse is released', () => {
		editor([node('source')]);
		expect(handle('source')).toHaveStyle({ cursor: 'grab' });
		fireEvent.mouseDown(handle('source'), { button: 0 });
		expect(handle('source')).toHaveStyle({ cursor: 'grabbing' });
		fireEvent.mouseUp(window);
		expect(handle('source')).toHaveStyle({ cursor: 'grab' });
	});

	it.each(['page', 'layout'] as const)(
		'moves an entire subtree into an empty component in the %s editor',
		(context) => {
			const source = node('source', 'Group', [node('child', 'Text')]);
			const original = [source, node('target')];
			editor(original, context);
			const transfer = begin('source');
			expect(transfer.setDragImage).toHaveBeenCalledWith(wrapper('source'), expect.any(Number), expect.any(Number));
			const surface = zone('target', 0);
			expect(surface).toHaveAttribute('data-cms-dropzone-surface', 'true');
			fireEvent.dragOver(surface, { dataTransfer: transfer });
			expect(wrapper('target')).toHaveAttribute('data-cms-drop-target', 'true');
			expect(within(wrapper('target')).getByText('Group')).toBeVisible();
			fireEvent.drop(surface, { dataTransfer: transfer });
			expect(tree()).toEqual([node('target', 'Group', [source])]);
			expect(original).toEqual([source, node('target')]);
			expect(wrapper('target')).not.toHaveAttribute('data-cms-drop-target');
		},
	);

	it('inserts between children and highlights their parent rather than the child', () => {
		editor([node('source', 'Text'), node('target', 'Group', [node('first', 'Text'), node('last', 'Text')])]);
		const transfer = begin('source');
		fireEvent.dragOver(zone('target', 1), { dataTransfer: transfer });
		expect(wrapper('target')).toHaveAttribute('data-cms-drop-target', 'true');
		expect(wrapper('first')).not.toHaveAttribute('data-cms-drop-target');
		drop('target', 1, transfer);
		expect(tree()[0]?.childComponents.map(({ id }) => id)).toEqual(['first', 'source', 'last']);
	});

	it('reorders siblings in both directions using slots before removal', () => {
		editor([node('parent', 'Group', [node('a', 'Text'), node('b', 'Text'), node('c', 'Text')])]);
		drop('parent', 3, begin('a'));
		expect(tree()[0]?.childComponents.map(({ id }) => id)).toEqual(['b', 'c', 'a']);
		drop('parent', 0, begin('a'));
		expect(tree()[0]?.childComponents.map(({ id }) => id)).toEqual(['a', 'b', 'c']);
	});

	it('moves nested components back to the root', () => {
		editor([node('parent', 'Group', [node('child', 'Text')]), node('other', 'Text')]);
		drop(null, 2, begin('child'));
		expect(tree().map(({ id }) => id)).toEqual(['parent', 'other', 'child']);
		expect(tree()[2]?.parentComponentId).toBeNull();
		expect(tree()[0]?.childComponents).toEqual([]);
	});

	it('never offers dropzones in the dragged subtree, leaves, or incompatible parents', () => {
		editor([node('source', 'Group', [node('descendant')]), node('leaf', 'Text'), node('cards', 'CardGroup')]);
		begin('source');
		for (const id of ['source', 'descendant', 'leaf', 'cards']) {
			expect(document.querySelector(`[data-cms-dropzone="${id}:0"]`)).toBeNull();
		}
		fireEvent.drop(wrapper('descendant'));
		expect(tree().map(({ id }) => id)).toEqual(['source', 'leaf', 'cards']);
	});

	it('enforces validParents and singleton children without blocking a singleton reorder', () => {
		editor(
			[
				node('source-region', 'Region', [node('header', 'RegionHeader')]),
				node('occupied-region', 'Region', [node('existing-header', 'RegionHeader')]),
				node('empty-region', 'Region'),
				node('group'),
			],
			'layout',
		);
		const transfer = begin('header');
		expect(document.querySelector('[data-cms-dropzone="occupied-region:0"]')).toBeNull();
		expect(document.querySelector('[data-cms-dropzone="group:0"]')).toBeNull();
		expect(document.querySelector('[data-cms-dropzone="root:0"]')).toBeNull();
		expect(zone('source-region', 0)).toBeInTheDocument();
		drop('empty-region', 0, transfer);
		expect(tree()[0]?.childComponents).toEqual([]);
		expect(tree()[2]?.childComponents[0]?.id).toBe('header');
	});

	it('cancels on Escape without moving the component', () => {
		const original = [node('source'), node('target')];
		editor(original);
		const transfer = begin('source');
		fireEvent.dragOver(zone('target', 0), { dataTransfer: transfer });
		fireEvent.keyDown(window, { key: 'Escape' });
		expect(document.querySelector('[data-cms-dropzone]')).toBeNull();
		expect(wrapper('target')).not.toHaveAttribute('data-cms-drop-target');
		expect(handle('source')).toHaveStyle({ cursor: 'grab' });
		expect(tree()).toEqual(original);
	});

	it('clears highlighting and leaves the tree alone when a drag ends outside a dropzone', () => {
		const original = [node('source'), node('target')];
		editor(original);
		const transfer = begin('source');
		fireEvent.dragOver(zone('target', 0), { dataTransfer: transfer });
		fireEvent.dragLeave(zone('target', 0), { relatedTarget: document.body });
		expect(wrapper('target')).not.toHaveAttribute('data-cms-drop-target');
		fireEvent.dragEnd(handle('source'));
		expect(tree()).toEqual(original);
		expect(handle('source')).toHaveStyle({ cursor: 'grab' });
		expect(document.querySelector('[data-cms-dropzone]')).toBeNull();
	});
	it('keeps the destination highlighted when a drag leave stays within the drop surface', () => {
		editor([node('source'), node('target')]);
		const transfer = begin('source');
		const surface = zone('target', 0);
		fireEvent.dragOver(surface, { dataTransfer: transfer });
		const leave = createEvent.dragLeave(surface);
		Object.defineProperty(leave, 'relatedTarget', { value: surface });
		fireEvent(surface, leave);
		expect(wrapper('target')).toHaveAttribute('data-cms-drop-target', 'true');
		fireEvent.dragEnd(handle('source'));
	});
});
