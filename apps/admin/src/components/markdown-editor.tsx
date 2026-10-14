'use client';

import {
	BlockTypeSelect,
	BoldItalicUnderlineToggles,
	CreateLink,
	headingsPlugin,
	linkDialogPlugin,
	linkPlugin,
	listsPlugin,
	ListsToggle,
	markdownShortcutPlugin,
	MDXEditor,
	quotePlugin,
	Separator,
	thematicBreakPlugin,
	toolbarPlugin,
	UndoRedo,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import { useTheme } from 'next-themes';
import { useEffect, useRef } from 'react';
import { cn } from '~/lib/utils';
import { Label } from './label';

type MarkdownEditorProps = {
	id: string;
	label: string;
	value: string;
	onChange: (value: string) => void;
};

/**
 * Markdown authoring control adapted from the workspace's proven MDXEditor integration.
 * Only rendered inside dialogs, which mount client-side, so no SSR gating is needed.
 */
export function MarkdownEditor({ id, label, value, onChange }: MarkdownEditorProps) {
	const popupHostRef = useRef<HTMLDivElement>(null);
	// MDXEditor ships its own dark palette behind a `dark-theme` class; mirror the app theme.
	const { resolvedTheme } = useTheme();

	useEffect(() => {
		const host = popupHostRef.current;
		const interval = window.setInterval(() => {
			document.querySelectorAll<HTMLDivElement>('.mdxeditor-popup-container').forEach((popup) => {
				if (popup.parentElement !== host) {
					host?.append(popup);
				}
			});
		}, 100);
		return () => window.clearInterval(interval);
	}, []);

	return (
		<div className="grid grid-cols-[minmax(0,1fr)] gap-1.5">
			<Label htmlFor={id}>{label}</Label>
			{/* Link/select popups get re-homed here; they need the theme class too. */}
			<div ref={popupHostRef} className={cn(resolvedTheme === 'dark' && 'dark-theme')} />
			<MDXEditor
				markdown={value}
				onChange={onChange}
				contentEditableClassName="min-h-40 px-3 py-2 text-foreground"
				className={cn('rounded-md border border-input bg-background', resolvedTheme === 'dark' && 'dark-theme')}
				plugins={[
					headingsPlugin(),
					listsPlugin(),
					quotePlugin(),
					thematicBreakPlugin(),
					markdownShortcutPlugin(),
					linkPlugin(),
					linkDialogPlugin(),
					toolbarPlugin({
						toolbarContents: () => (
							<>
								<UndoRedo />
								<Separator />
								<BoldItalicUnderlineToggles />
								<Separator />
								<ListsToggle />
								<CreateLink />
								<BlockTypeSelect />
							</>
						),
					}),
				]}
			/>
		</div>
	);
}
