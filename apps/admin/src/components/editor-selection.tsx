'use client';

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
	type Dispatch,
	type SetStateAction,
} from 'react';
import { notNullish, nullish } from '~/lib/utils';
import type { ComponentClipboard } from '~/lib/component-clipboard';
import { COMPONENT_CLIPBOARD_STORAGE_KEY, parseComponentClipboard } from '~/lib/component-clipboard-storage';

type EditorSelectionValue = {
	/** The explicitly selected (pinned) component, if any. */
	activeId: string | null;
	setActiveId: (id: string | null) => void;
	/** The deepest editable component currently under the pointer. */
	hoveredId: string | null;
	setHoveredId: Dispatch<SetStateAction<string | null>>;
	draggingId: string | null;
	setDraggingId: (id: string | null) => void;
	dropTarget: string | null;
	setDropTarget: (target: string | null) => void;
	clipboard: ComponentClipboard;
	setClipboard: (clipboard: ComponentClipboard) => void;
};

const EditorSelectionContext = createContext<EditorSelectionValue | null>(null);

export function EditorSelectionProvider({ children }: React.PropsWithChildren) {
	const [activeId, setActiveId] = useState<string | null>(null);
	const [hoveredId, setHoveredId] = useState<string | null>(null);
	const [draggingId, setDraggingId] = useState<string | null>(null);
	const [dropTarget, setDropTarget] = useState<string | null>(null);
	const [clipboard, setClipboardState] = useState<ComponentClipboard>(null);
	const clipboardChanged = useRef(false);
	const setClipboard = useCallback((nextClipboard: ComponentClipboard) => {
		clipboardChanged.current = true;
		setClipboardState(nextClipboard);
		try {
			if (nextClipboard === null) {
				window.sessionStorage.removeItem(COMPONENT_CLIPBOARD_STORAGE_KEY);
			} else {
				window.sessionStorage.setItem(COMPONENT_CLIPBOARD_STORAGE_KEY, JSON.stringify(nextClipboard));
			}
		} catch {
			// The current editor can still use the in-memory clipboard when storage is blocked.
		}
	}, []);
	useEffect(() => {
		let cancelled = false;
		// Defer storage hydration until after the first render, which must match the server's empty clipboard.
		queueMicrotask(() => {
			if (cancelled || clipboardChanged.current) return;
			try {
				const stored = window.sessionStorage.getItem(COMPONENT_CLIPBOARD_STORAGE_KEY);
				if (stored === null) return;
				const parsed: unknown = JSON.parse(stored);
				setClipboardState(parseComponentClipboard(parsed));
			} catch {
				// Invalid or inaccessible storage leaves the clipboard empty.
			}
		});
		return () => {
			cancelled = true;
		};
	}, []);
	useEffect(() => {
		const clearDrag = () => {
			setDraggingId(null);
			setDropTarget(null);
		};
		const clearSelection = (event: KeyboardEvent) => {
			if (event.key !== 'Escape') return;
			clearDrag();
			// Let open dialogs consume Escape without also dropping the selection.
			if (event.target instanceof HTMLElement && notNullish(event.target.closest('[role="dialog"]'))) return;
			setActiveId(null);
		};
		window.addEventListener('keydown', clearSelection);
		window.addEventListener('mouseup', clearDrag);
		window.addEventListener('blur', clearDrag);
		return () => {
			window.removeEventListener('keydown', clearSelection);
			window.removeEventListener('mouseup', clearDrag);
			window.removeEventListener('blur', clearDrag);
		};
	}, []);
	const value = useMemo(
		() => ({
			activeId,
			setActiveId,
			hoveredId,
			setHoveredId,
			draggingId,
			setDraggingId,
			dropTarget,
			setDropTarget,
			clipboard,
			setClipboard,
		}),
		[activeId, hoveredId, draggingId, dropTarget, clipboard, setClipboard],
	);

	return (
		<EditorSelectionContext.Provider value={value}>
			<div
				className="contents"
				data-cms-editor-selection-active={notNullish(activeId) || undefined}
				data-cms-editor-dragging={notNullish(draggingId) || undefined}
			>
				{children}
			</div>
		</EditorSelectionContext.Provider>
	);
}

export function useEditorSelection(): EditorSelectionValue {
	const selection = useContext(EditorSelectionContext);
	if (nullish(selection)) throw new Error('Editable components must be inside EditorSelectionProvider.');
	return selection;
}
