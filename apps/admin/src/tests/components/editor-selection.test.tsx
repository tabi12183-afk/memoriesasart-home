import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { EditorSelectionProvider, useEditorSelection } from '~/components/editor-selection';
import type { ComponentClipboard } from '~/lib/component-clipboard';
import { COMPONENT_CLIPBOARD_STORAGE_KEY } from '~/lib/component-clipboard-storage';

const copy: Exclude<ComponentClipboard, null> = {
	kind: 'copy',
	component: {
		id: 'copied',
		name: 'Text',
		props: { content: 'copied text' },
		attrs: {},
		parentComponentId: null,
		childComponents: [],
	},
};
const cut: Exclude<ComponentClipboard, null> = {
	kind: 'cut',
	component: { ...copy.component, id: 'cut' },
	sourceEditor: { id: 'page', context: 'page' },
};

function SelectionProbe() {
	const selection = useEditorSelection();
	return (
		<>
			<output data-testid="selection">
				{JSON.stringify({
					activeId: selection.activeId,
					hoveredId: selection.hoveredId,
					draggingId: selection.draggingId,
					dropTarget: selection.dropTarget,
					clipboard: selection.clipboard,
				})}
			</output>
			<button onClick={() => selection.setActiveId('selected')}>Select</button>
			<button onClick={() => selection.setHoveredId((previous) => `${previous ?? 'first'}-next`)}>Hover</button>
			<button onClick={() => selection.setDraggingId('dragged')}>Drag</button>
			<button onClick={() => selection.setDropTarget('target')}>Target</button>
			<button onClick={() => selection.setClipboard(copy)}>Copy</button>
			<button onClick={() => selection.setClipboard(cut)}>Cut</button>
			<button onClick={() => selection.setClipboard(null)}>Clear clipboard</button>
			<div role="dialog" aria-label="Editor dialog">
				<button>Dialog action</button>
			</div>
		</>
	);
}

function selection() {
	return JSON.parse(screen.getByTestId('selection').textContent ?? '{}');
}

function mount(child = <SelectionProbe />) {
	return render(<EditorSelectionProvider>{child}</EditorSelectionProvider>);
}

afterEach(() => {
	vi.restoreAllMocks();
	sessionStorage.clear();
});

describe('editor selection', () => {
	it('restores both copied and cut clipboard contents from session storage', async () => {
		for (const clipboard of [copy, cut]) {
			sessionStorage.setItem(COMPONENT_CLIPBOARD_STORAGE_KEY, JSON.stringify(clipboard));
			const view = mount();
			await waitFor(() => expect(selection().clipboard).toEqual(clipboard));
			view.unmount();
		}
	});

	it('leaves the clipboard empty for invalid JSON or inaccessible storage', async () => {
		sessionStorage.setItem(COMPONENT_CLIPBOARD_STORAGE_KEY, '{invalid');
		const invalid = mount();
		await act(async () => {});
		expect(selection().clipboard).toBeNull();
		invalid.unmount();

		const read = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
			throw new DOMException('Storage blocked', 'SecurityError');
		});
		mount();
		await waitFor(() => expect(read).toHaveBeenCalledWith(COMPONENT_CLIPBOARD_STORAGE_KEY));
		expect(selection().clipboard).toBeNull();
	});

	it('keeps copy, cut, and clear usable when session storage writes fail', () => {
		const write = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
			throw new DOMException('Storage blocked', 'SecurityError');
		});
		const remove = vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
			throw new DOMException('Storage blocked', 'SecurityError');
		});
		mount();
		fireEvent.click(screen.getByRole('button', { name: 'Copy' }));
		expect(selection().clipboard).toEqual(copy);
		fireEvent.click(screen.getByRole('button', { name: 'Cut' }));
		expect(selection().clipboard).toEqual(cut);
		fireEvent.click(screen.getByRole('button', { name: 'Clear clipboard' }));
		expect(selection().clipboard).toBeNull();
		expect(write).toHaveBeenCalledTimes(2);
		expect(remove).toHaveBeenCalledWith(COMPONENT_CLIPBOARD_STORAGE_KEY);
	});

	it('cancels a pending storage restore when the provider unmounts', async () => {
		sessionStorage.setItem(COMPONENT_CLIPBOARD_STORAGE_KEY, JSON.stringify(copy));
		const queued: VoidFunction[] = [];
		vi.spyOn(globalThis, 'queueMicrotask').mockImplementation((callback) => queued.push(callback));
		const read = vi.spyOn(Storage.prototype, 'getItem');
		const view = mount();
		expect(queued).toHaveLength(1);
		view.unmount();
		await act(async () => queued.forEach((callback) => callback()));
		expect(read).not.toHaveBeenCalled();
	});

	it('keeps a new clipboard action when a queued storage restore runs afterward', async () => {
		sessionStorage.setItem(COMPONENT_CLIPBOARD_STORAGE_KEY, JSON.stringify(copy));
		const queued: VoidFunction[] = [];
		vi.spyOn(globalThis, 'queueMicrotask').mockImplementation((callback) => queued.push(callback));
		vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
			throw new DOMException('Storage blocked', 'SecurityError');
		});
		mount();
		expect(queued).toHaveLength(1);
		fireEvent.click(screen.getByRole('button', { name: 'Cut' }));
		expect(selection().clipboard).toEqual(cut);
		await act(async () => queued.forEach((callback) => callback()));
		expect(selection().clipboard).toEqual(cut);
		expect(JSON.parse(sessionStorage.getItem(COMPONENT_CLIPBOARD_STORAGE_KEY) ?? 'null')).toEqual(copy);
	});

	it('preserves selection on Escape inside a dialog while clearing drag state', () => {
		mount();
		fireEvent.click(screen.getByRole('button', { name: 'Select' }));
		fireEvent.click(screen.getByRole('button', { name: 'Drag' }));
		fireEvent.click(screen.getByRole('button', { name: 'Target' }));
		fireEvent.keyDown(within(screen.getByRole('dialog')).getByRole('button'), { key: 'Escape' });
		expect(selection()).toMatchObject({ activeId: 'selected', draggingId: null, dropTarget: null });
	});

	it('clears selection and drag state on Escape outside a dialog', () => {
		mount();
		for (const name of ['Select', 'Drag', 'Target']) fireEvent.click(screen.getByRole('button', { name }));
		fireEvent.keyDown(window, { key: 'Enter' });
		expect(selection()).toMatchObject({ activeId: 'selected', draggingId: 'dragged', dropTarget: 'target' });
		fireEvent.keyDown(window, { key: 'Escape' });
		expect(selection()).toMatchObject({ activeId: null, draggingId: null, dropTarget: null });
	});

	it.each(['mouseup', 'blur'] as const)('clears drag state on window %s but keeps selection', (event) => {
		mount();
		for (const name of ['Select', 'Drag', 'Target']) fireEvent.click(screen.getByRole('button', { name }));
		fireEvent(window, new Event(event));
		expect(selection()).toMatchObject({ activeId: 'selected', draggingId: null, dropTarget: null });
	});

	it('accepts functional hovered-state updates', () => {
		mount();
		fireEvent.click(screen.getByRole('button', { name: 'Hover' }));
		fireEvent.click(screen.getByRole('button', { name: 'Hover' }));
		expect(selection().hoveredId).toBe('first-next-next');
	});

	it('reports a missing provider to a component using the hook', () => {
		expect(() => render(<SelectionProbe />)).toThrow('Editable components must be inside EditorSelectionProvider.');
	});
});
