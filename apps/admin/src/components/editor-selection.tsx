'use client';

import { createContext, useContext, useEffect, useMemo, useState, type Dispatch, type SetStateAction } from 'react';
import { notNullish, nullish } from '~/lib/utils';

type EditorSelectionValue = {
	/** The explicitly selected (pinned) component, if any. */
	activeId: string | null;
	setActiveId: (id: string | null) => void;
	/** The deepest editable component currently under the pointer. */
	hoveredId: string | null;
	setHoveredId: Dispatch<SetStateAction<string | null>>;
};

const EditorSelectionContext = createContext<EditorSelectionValue | null>(null);

export function EditorSelectionProvider({ children }: React.PropsWithChildren) {
	const [activeId, setActiveId] = useState<string | null>(null);
	const [hoveredId, setHoveredId] = useState<string | null>(null);
	useEffect(() => {
		const clearSelection = (event: KeyboardEvent) => {
			if (event.key !== 'Escape') return;
			// Let open dialogs consume Escape without also dropping the selection.
			if (event.target instanceof HTMLElement && notNullish(event.target.closest('[role="dialog"]'))) return;
			setActiveId(null);
		};
		window.addEventListener('keydown', clearSelection);
		return () => window.removeEventListener('keydown', clearSelection);
	}, []);
	const value = useMemo(() => ({ activeId, setActiveId, hoveredId, setHoveredId }), [activeId, hoveredId]);

	return (
		<EditorSelectionContext.Provider value={value}>
			<div className="contents" data-cms-editor-selection-active={notNullish(activeId) || undefined}>
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
