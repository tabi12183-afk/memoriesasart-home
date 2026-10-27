'use client';

import {
	type CSSProperties,
	type ReactNode,
	useCallback,
	useEffect,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import Image from 'next/image';
import type {
	CMSComponentData,
	CMSField,
	CMSFieldValue,
	CMSImageField,
	ImageAsset,
	MediaItem,
	Placement,
} from '@stormycms/core';
import { isCheckboxField, isImageField, isImageValue, isStringArray } from '@stormycms/core';
import type { CMSComponent } from '@stormycms/react/cms';
import { useCMSPage, useCMSLayout } from '@stormycms/react/cms/client';
import { findComponent } from '@stormycms/react/cms';
import { Button } from '~/components/button';
import { Input } from '~/components/input';
import { Label } from '~/components/label';
import { Checkbox } from '~/components/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '~/components/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/select';
import {
	ArrowDown,
	ArrowLeft,
	ArrowRight,
	ArrowUp,
	Plus,
	PlusSquare,
	Pencil,
	Trash2,
	ImageIcon,
	Grip,
	Copy,
	Scissors,
	ClipboardPaste,
} from 'lucide-react';
import cmsExports from 'components';
import { ObjectId } from 'bson';
import { toast } from 'sonner';
import { MediaLibrary } from '~/components/media-library';
import { MarkdownEditor } from '~/components/markdown-editor';
import { useEditorSelection } from './editor-selection';
import { notNullish, nullish } from '~/lib/utils';
import { isValidComponentDrop, moveComponent, type ComponentMetadataMap } from '~/lib/component-drag';
import { componentDropzoneBounds } from '~/lib/component-dropzone';
import { getPasteError, pasteComponent, type ComponentClipboard } from '~/lib/component-clipboard';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/dropdown-menu';

const isValidCMSExport = (name: string): name is keyof typeof cmsExports => {
	return name in cmsExports;
};

/** A keyboard-key chip that makes the shortcut for each navigator action obvious. */
function NavigatorKey({ icon, label }: { icon?: ReactNode; label?: string }) {
	return (
		<kbd className="border-brand-1/30 bg-site-1 text-site-1-c-2 inline-flex h-5 min-w-5 items-center justify-center rounded border px-1 font-sans text-[10px] [&_svg]:size-3">
			{icon ?? label}
		</kbd>
	);
}

/** Shared chrome for floating editor controls: translucent storm surfaces with a brand-blue hover. */
const controlButtonClass =
	'pointer-events-auto gap-1 border border-site-2-1 bg-site-1-1/90 text-site-1-c-1 shadow-md backdrop-blur-sm hover:border-brand-1 hover:bg-site-1-2 hover:text-site-1-c';

const pastePlacements: { placement: Placement; label: string }[] = [
	{ placement: 'before', label: 'Before' },
	{ placement: 'inside', label: 'As Child' },
	{ placement: 'after', label: 'After' },
];

const DefaultComponent = Object.assign(
	function _Default(props: Record<string, unknown> & { children?: ReactNode }) {
		return <div {...props} />;
	},
	{
		componentName: '',
		label: 'Unknown',
		fields: [] as CMSField[],
		noChildren: false,
		layoutOnly: false,
		editable: false,
		validChildren: undefined as string[] | undefined,
		validParents: undefined as string[] | undefined,
	},
) as unknown as CMSComponent<Record<string, unknown>>;

function CMSFieldInput({
	field,
	value,
	onChange,
}: {
	field: CMSField;
	value?: unknown;
	// Record<string, string> covers keyValueList values, which CMSFieldValue does not model yet.
	onChange?: (value: CMSFieldValue | Record<string, string>) => void;
}) {
	if ((field.field as string) === 'markdown') {
		const stringValue = typeof value === 'string' ? value : '';
		return (
			<MarkdownEditor id={field.prop} label={field.label} value={stringValue} onChange={(next) => onChange?.(next)} />
		);
	}
	if (isImageField(field)) {
		return <CMSImageFieldInput field={field} value={value} onChange={onChange} />;
	}
	if (field.field === 'select' || field.field === 'radio') {
		// Radio fields render as a select for now; both are a single choice from static options.
		const stringValue = typeof value === 'string' ? value : undefined;
		const defaultStringValue = typeof field.defaultValue === 'string' ? field.defaultValue : undefined;
		return (
			<div className="grid grid-cols-[minmax(0,1fr)] gap-1.5">
				<Label htmlFor={field.prop}>{field.label}</Label>
				<Select value={stringValue ?? defaultStringValue ?? ''} onValueChange={(v) => onChange?.(v)}>
					<SelectTrigger id={field.prop}>
						<SelectValue placeholder={field.label} />
					</SelectTrigger>
					<SelectContent>
						{field.options.map((option) => (
							<SelectItem key={option} value={option}>
								{option}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
		);
	}
	if (field.field === 'keyValueList') {
		return <CMSKeyValueListInput field={field} value={value} onChange={onChange} />;
	}
	if (isCheckboxField(field)) {
		const checkedValue = value ?? field.defaultValue;
		return (
			<div className="flex items-center gap-2">
				<Checkbox
					id={field.prop}
					name={field.prop}
					checked={checkedValue === true || checkedValue === 'true' || checkedValue === 'on'}
					onCheckedChange={(checked) => onChange?.(checked === true)}
				/>
				<Label htmlFor={field.prop}>{field.label}</Label>
			</div>
		);
	}
	if (field.field === 'noop') {
		return (
			<input type="hidden" id={field.prop} name={field.prop} defaultValue={String(value ?? field.defaultValue ?? '')} />
		);
	}
	if (field.field === 'textarea') {
		const stringValue = typeof value === 'string' ? value : undefined;
		const defaultStringValue = typeof field.defaultValue === 'string' ? field.defaultValue : undefined;
		return (
			<div className="grid grid-cols-[minmax(0,1fr)] gap-1.5">
				<Label htmlFor={field.prop}>{field.label}</Label>
				<textarea
					id={field.prop}
					name={field.prop}
					value={stringValue ?? defaultStringValue ?? ''}
					onChange={(e) => onChange?.(e.target.value)}
					className="border-input bg-background flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm"
				/>
			</div>
		);
	}
	const stringValue = typeof value === 'string' ? value : typeof value === 'number' ? String(value) : undefined;
	const defaultStringValue = typeof field.defaultValue === 'string' ? field.defaultValue : undefined;
	return (
		<div className="grid grid-cols-[minmax(0,1fr)] gap-1.5">
			<Label htmlFor={field.prop}>{field.label}</Label>
			<Input
				id={field.prop}
				name={field.prop}
				type="text"
				value={stringValue ?? defaultStringValue ?? ''}
				onChange={(e) => onChange?.(e.target.value)}
			/>
		</div>
	);
}

function CMSKeyValueListInput({
	field,
	value,
	onChange,
}: {
	field: CMSField;
	value?: unknown;
	onChange?: (value: Record<string, string>) => void;
}) {
	// Stored as Record<string, string>; edited as ordered rows so keys can be typed freely.
	const [rows, setRows] = useState<[string, string][]>(() =>
		notNullish(value) && typeof value === 'object' && !Array.isArray(value)
			? Object.entries(value as Record<string, string>).map(([k, v]) => [k, String(v)])
			: [],
	);

	const emit = (nextRows: [string, string][]) => {
		setRows(nextRows);
		onChange?.(Object.fromEntries(nextRows.filter(([k]) => k.trim() !== '')));
	};

	return (
		<div className="grid grid-cols-[minmax(0,1fr)] gap-1.5">
			<Label>{field.label}</Label>
			{rows.map(([key, val], i) => (
				<div key={i} className="flex items-center gap-2">
					<Input
						aria-label={`${field.label} name ${i + 1}`}
						placeholder="Label"
						value={key}
						onChange={(e) => emit(rows.map((row, j) => (j === i ? [e.target.value, row[1]] : row)))}
					/>
					<Input
						aria-label={`${field.label} value ${i + 1}`}
						placeholder="Value"
						value={val}
						onChange={(e) => emit(rows.map((row, j) => (j === i ? [row[0], e.target.value] : row)))}
					/>
					<Button type="button" variant="ghost" size="icon" onClick={() => emit(rows.filter((_, j) => j !== i))}>
						<Trash2 className="h-4 w-4" />
					</Button>
				</div>
			))}
			<Button type="button" variant="outline" size="sm" onClick={() => emit([...rows, ['', '']])}>
				<Plus className="mr-1 h-3 w-3" /> Add {field.label}
			</Button>
		</div>
	);
}

function CMSImageFieldInput({
	field,
	value,
	onChange,
}: {
	field: CMSImageField;
	value?: unknown;
	onChange?: (value: CMSFieldValue) => void;
}) {
	const [image, setImage] = useState<ImageAsset | null>(isImageValue(value) ? value : null);
	const handleSelect = useCallback(
		(items: MediaItem[]) => {
			const selected = items[0];
			if (nullish(selected)) return;
			const next: ImageAsset = {
				src: selected.url,
				alt: typeof selected.metadata.alt === 'string' ? selected.metadata.alt : undefined,
				mediaId: selected.id,
				name: selected.name,
				tags: isStringArray(selected.metadata.tags) ? selected.metadata.tags : undefined,
			};
			setImage(next);
			onChange?.(next);
		},
		[onChange],
	);

	return (
		<div className="grid grid-cols-[minmax(0,1fr)] gap-2">
			<Label>{field.label}</Label>
			<div className="relative h-48 w-full rounded-md border bg-muted overflow-hidden">
				{notNullish(image?.src) ? (
					<Image
						data-testid="cms-image-preview"
						src={image.src}
						alt={image.alt ?? 'Selected'}
						fill
						className="object-cover"
						unoptimized
					/>
				) : null}
				<div className="absolute inset-0 flex items-center justify-center">
					<MediaLibrary
						selectionMode
						mediaType="image"
						showLibraryTab
						onSelect={handleSelect}
						emptyMessage="No images are available yet."
						renderTrigger={(onClick) => (
							<button
								type="button"
								onClick={onClick}
								className="flex cursor-pointer items-center gap-3 rounded-lg border-2 border-dashed border-white/50 bg-black/40 px-8 py-4 text-white/80 shadow-sm transition-colors hover:border-white hover:bg-black/70 hover:text-white"
							>
								<ImageIcon className="h-8 w-8" />
								<span className="text-lg font-medium">Choose Media</span>
							</button>
						)}
					/>
				</div>
			</div>
		</div>
	);
}

export type EditableComponentProps = {
	id: string;
	index: number;
	parentComponentId: string | null;
	name: string;
	initialProps: Record<string, unknown>;
	childComponents: CMSComponentData[];
	context: 'page' | 'layout';
};

type PendingCrossDocumentPaste = { component: CMSComponentData; placement: Placement };

export const EditableComponent = (props: EditableComponentProps) => {
	const { id, index, parentComponentId, name, initialProps, childComponents, context } = props;
	const pageCtx = useCMSPage();
	const layoutCtx = useCMSLayout();
	const _context = context === 'page' ? pageCtx : layoutCtx;
	const {
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
	} = useEditorSelection();

	const Component: CMSComponent<Record<string, unknown>> = isValidCMSExport(name)
		? (cmsExports[name] as unknown as CMSComponent<Record<string, unknown>>)
		: DefaultComponent;

	const [editOpen, setEditOpen] = useState(false);
	const [addOpen, setAddOpen] = useState(false);
	const [removeOpen, setRemoveOpen] = useState(false);
	const [pasteOpen, setPasteOpen] = useState(false);
	const [pendingCrossDocumentPaste, setPendingCrossDocumentPaste] = useState<PendingCrossDocumentPaste | null>(null);
	const [placement, setPlacement] = useState<Placement>('inside');
	const [editFormValues, setEditFormValues] = useState<Record<string, unknown>>(() =>
		Component.fields.reduce(
			(acc, field) => {
				acc[field.prop] = initialProps[field.prop] ?? field.defaultValue ?? '';
				return acc;
			},
			{} as Record<string, unknown>,
		),
	);
	const [compactControls, setCompactControls] = useState(false);
	const resizeObserverRef = useRef<ResizeObserver | null>(null);
	const editableRef = useCallback((node: HTMLDivElement | null) => {
		resizeObserverRef.current?.disconnect();
		resizeObserverRef.current = null;
		if (nullish(node)) return;
		const observer = new ResizeObserver(([entry]) => {
			// Below this width the navigator and toolbar cannot share the top row.
			setCompactControls((entry?.contentRect.width ?? node.clientWidth) <= 560);
		});
		observer.observe(node);
		resizeObserverRef.current = observer;
	}, []);
	const isLayoutOutlet = context === 'layout' && name === 'Outlet';
	const isActive = activeId === id;
	const parentName = notNullish(parentComponentId) ? findComponent(_context.components, parentComponentId)?.name : null;
	const firstChild = childComponents[0];
	const siblings = useMemo(
		() =>
			notNullish(parentComponentId)
				? (findComponent(_context.components, parentComponentId)?.childComponents ?? [])
				: _context.components,
		[_context.components, parentComponentId],
	);
	const siblingIndex = siblings.findIndex((sibling) => sibling.id === id);
	const prevSibling = siblingIndex > 0 ? siblings[siblingIndex - 1] : undefined;
	const nextSibling = siblingIndex >= 0 ? siblings[siblingIndex + 1] : undefined;
	// The keyboard target: the pinned selection wins; otherwise the deepest hovered component.
	const isCurrent = notNullish(activeId) ? isActive : hoveredId === id;
	const metadata: ComponentMetadataMap = cmsExports;
	const pasteArgs = (pasteClipboard: Exclude<typeof clipboard, null>, pastePlacement: Placement) => ({
		components: _context.components,
		clipboard: pasteClipboard,
		targetId: id,
		editorId: _context.id,
		placement: pastePlacement,
		context,
		metadata,
	});
	const applyPaste = (pastePlacement: Placement) => {
		if (clipboard === null) return;
		if (
			clipboard.kind === 'cut' &&
			(clipboard.sourceEditor.id !== _context.id || clipboard.sourceEditor.context !== context)
		) {
			setPasteOpen(false);
			setPendingCrossDocumentPaste({ component: clipboard.component, placement: pastePlacement });
			return;
		}
		const pasteError = getPasteError(pasteArgs(clipboard, pastePlacement));
		if (pasteError !== null) {
			toast.error(pasteError);
			return;
		}
		_context.setComponents(
			pasteComponent({ ...pasteArgs(clipboard, pastePlacement), createId: () => new ObjectId().toHexString() }),
		);
		if (clipboard.kind === 'cut') setClipboard(null);
	};
	const pastePendingAsCopy = (pending: PendingCrossDocumentPaste) => {
		const copyClipboard: Exclude<ComponentClipboard, null> = {
			kind: 'copy',
			component: pending.component,
		};
		const pasteError = getPasteError(pasteArgs(copyClipboard, pending.placement));
		if (pasteError !== null) {
			toast.error(pasteError);
			return;
		}
		_context.setComponents(
			pasteComponent({
				...pasteArgs(copyClipboard, pending.placement),
				createId: () => new ObjectId().toHexString(),
			}),
		);
		setClipboard(copyClipboard);
		setPendingCrossDocumentPaste(null);
	};
	const dragArgs = (parentId: string | null, targetIndex: number) => ({
		components: _context.components,
		componentId: draggingId ?? '',
		parentComponentId: parentId,
		index: targetIndex,
		context,
		metadata,
	});
	const targetKey = (parentId: string | null, targetIndex: number) => `${parentId ?? 'root'}:${targetIndex}`;
	const showDropzone = notNullish(draggingId) && isValidComponentDrop(dragArgs(id, 0));
	const [slotBounds, setSlotBounds] = useState<{ before: CSSProperties; after: CSSProperties } | null>(null);
	useLayoutEffect(() => {
		if (draggingId === null) return;
		const wrappers = new Map(
			Array.from(document.querySelectorAll<HTMLElement>('[data-cms-editable-component]')).map((element) => [
				element.dataset.cmsComponentId,
				element,
			]),
		);
		const siblingElements = siblings.flatMap((sibling) => {
			const element = wrappers.get(sibling.id);
			return element === undefined ? [] : [element];
		});
		if (siblingElements.length !== siblings.length) return;
		const measure = () => {
			const rects = siblingElements.map((element) => element.getBoundingClientRect());
			setSlotBounds({
				before: componentDropzoneBounds({ siblings: rects, index, anchorIndex: index }),
				after: componentDropzoneBounds({ siblings: rects, index: index + 1, anchorIndex: index }),
			});
		};
		measure();
		const observer = new ResizeObserver(measure);
		for (const element of siblingElements) observer.observe(element);
		return () => observer.disconnect();
	}, [draggingId, siblings, index]);
	const renderDropzone = (parentId: string | null, targetIndex: number, extraClass = '', style?: CSSProperties) => {
		const args = dragArgs(parentId, targetIndex);
		if (nullish(draggingId) || !isValidComponentDrop(args)) return null;
		const key = targetKey(parentId, targetIndex);
		return (
			<div
				key={key}
				aria-hidden="true"
				className={`absolute z-[60] ${extraClass}`}
				style={style}
				data-cms-dropzone={key}
				data-cms-drop-active={dropTarget === key || undefined}
				data-cms-dropzone-surface={
					parentId === id && targetIndex === 0 && childComponents.length === 0 ? 'true' : undefined
				}
				onDragOver={(event) => {
					event.preventDefault();
					event.dataTransfer.dropEffect = 'move';
					setDropTarget(key);
				}}
				onDragLeave={(event) => {
					if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget))
						setDropTarget(null);
				}}
				onDrop={(event) => {
					event.preventDefault();
					event.stopPropagation();
					_context.setComponents(moveComponent(args));
					setDropTarget(null);
					setDraggingId(null);
				}}
			/>
		);
	};

	const firstChildId = firstChild?.id ?? null;
	const prevSiblingId = prevSibling?.id ?? null;
	const nextSiblingId = nextSibling?.id ?? null;
	useEffect(() => {
		if (!isCurrent) return;
		const handleKeyDown = (event: KeyboardEvent) => {
			// Never hijack keys from form fields, dialogs, or open dropdowns.
			const target = event.target;
			if (
				target instanceof HTMLElement &&
				(target.isContentEditable ||
					notNullish(target.closest('input, textarea, select, [role="dialog"], [data-radix-popper-content-wrapper]')))
			) {
				return;
			}
			if (event.key === 'ArrowUp' && notNullish(parentComponentId)) {
				event.preventDefault();
				setActiveId(parentComponentId);
			} else if (event.key === 'ArrowDown' && notNullish(firstChildId)) {
				event.preventDefault();
				setActiveId(firstChildId);
			} else if (event.key === 'ArrowLeft' && notNullish(prevSiblingId)) {
				event.preventDefault();
				setActiveId(prevSiblingId);
			} else if (event.key === 'ArrowRight' && notNullish(nextSiblingId)) {
				event.preventDefault();
				setActiveId(nextSiblingId);
			}
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [isCurrent, parentComponentId, firstChildId, prevSiblingId, nextSiblingId, setActiveId]);

	const openEdit = () => {
		setEditFormValues(
			Component.fields.reduce(
				(acc, field) => {
					acc[field.prop] = initialProps[field.prop] ?? field.defaultValue ?? '';
					return acc;
				},
				{} as Record<string, unknown>,
			),
		);
		setEditOpen(true);
	};

	const openNewComponent = (_placement: Placement) => {
		setPlacement(_placement);
		setAddOpen(true);
	};

	const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		_context.updateComponent(id, editFormValues);
		setEditOpen(false);
	};

	return (
		<>
			<div
				ref={editableRef}
				onMouseOver={(event) => {
					// The deepest editable component under the pointer claims the hover.
					event.stopPropagation();
					setHoveredId((prev) => (prev === id ? prev : id));
				}}
				onMouseLeave={() => setHoveredId((prev) => (prev === id ? null : prev))}
				onClick={(event) => {
					// Clicking a component's body locks it, exactly like arrow-keying while
					// hovered. Clicks on editor controls and dialogs keep their own behavior.
					if (
						event.target instanceof HTMLElement &&
						notNullish(event.target.closest('[data-cms-editor-control], [role="dialog"]'))
					) {
						return;
					}
					// The deepest editable component under the pointer claims the click, and
					// links/buttons inside the preview must not act while editing.
					event.stopPropagation();
					event.preventDefault();
					setActiveId(id);
				}}
				className="relative isolate min-h-9 min-w-32 overflow-visible border border-dashed border-transparent transition-colors hover:z-20"
				data-cms-drop-target={dropTarget?.startsWith(`${id}:`) === true || undefined}
				data-cms-compact-controls={compactControls || undefined}
				data-cms-editable-component
				data-cms-component-id={id}
				data-cms-active={isActive || undefined}
				data-cms-paste-open={pasteOpen || undefined}
				data-cms-cut={
					(clipboard?.kind === 'cut' &&
						clipboard.component.id === id &&
						clipboard.sourceEditor.id === _context.id &&
						clipboard.sourceEditor.context === context) ||
					undefined
				}
				data-testid={`cms-editable-component-${id}`}
			>
				{renderDropzone(
					parentComponentId,
					index,
					slotBounds === null ? 'top-0 left-0 h-2 w-full -translate-y-1/2' : '',
					slotBounds?.before,
				)}
				{index === siblings.length - 1
					? renderDropzone(
							parentComponentId,
							index + 1,
							slotBounds === null ? 'bottom-0 left-0 h-2 w-full translate-y-1/2' : '',
							slotBounds?.after,
						)
					: null}
				{showDropzone && childComponents.length === 0 ? renderDropzone(id, 0, 'inset-0') : null}
				{/* Anchored inside the top-left corner (mirroring the toolbar at top-right) so the
				    pointer never leaves the hover area while reaching for it. The container
				    ignores the pointer so only the buttons intercept clicks. */}
				<div
					className="pointer-events-none absolute top-0 left-0 z-40 hidden max-w-full items-center gap-1 p-1 text-xs"
					data-cms-editor-control="navigator"
				>
					<Button
						type="button"
						variant="secondary"
						size="sm"
						draggable
						aria-label={`Drag ${Component.label}`}
						title={`Drag ${Component.label}`}
						style={{ cursor: draggingId === id ? 'grabbing' : 'grab' }}
						className={`pointer-events-auto ${controlButtonClass}`}
						data-cms-editor-control="drag"
						onMouseDown={(event) => {
							if (event.button === 0) setDraggingId(id);
						}}
						onDragStart={(event) => {
							const editable = event.currentTarget.closest('[data-cms-editable-component]');
							if (!(editable instanceof HTMLElement)) {
								event.preventDefault();
								return;
							}
							event.dataTransfer.effectAllowed = 'move';
							event.dataTransfer.setData('text/plain', id);
							const rect = editable.getBoundingClientRect();
							event.dataTransfer.setDragImage(editable, event.clientX - rect.left, event.clientY - rect.top);
							setDraggingId(id);
						}}
						onDragEnd={() => {
							setDraggingId(null);
							setDropTarget(null);
						}}
					>
						<Grip className="size-3" />
					</Button>
					<span className="bg-brand-1 text-brand-1-c rounded px-1.5 py-1 font-mono text-[10px] font-bold tracking-wider whitespace-nowrap uppercase shadow-md">
						{Component.label}
					</span>
					{notNullish(parentComponentId) ? (
						<Button
							type="button"
							variant="secondary"
							size="sm"
							className={controlButtonClass}
							aria-label={`Select parent ${parentName ?? 'component'}`}
							title={`Press the Up Arrow key or click to select the parent ${parentName ?? 'component'}`}
							onClick={() => setActiveId(parentComponentId)}
						>
							<NavigatorKey icon={<ArrowUp />} />
							Parent
						</Button>
					) : null}
					{notNullish(firstChild) ? (
						<Button
							type="button"
							variant="secondary"
							size="sm"
							className={controlButtonClass}
							aria-label={`Select child ${firstChild.name}`}
							title={`Press the Down Arrow key or click to select the first child (${firstChild.name})`}
							onClick={() => setActiveId(firstChild.id)}
						>
							<NavigatorKey icon={<ArrowDown />} />
							Child
						</Button>
					) : null}
					{notNullish(prevSibling) ? (
						<Button
							type="button"
							variant="secondary"
							size="sm"
							className={controlButtonClass}
							aria-label={`Select previous sibling ${prevSibling.name}`}
							title={`Press the Left Arrow key or click to select the previous sibling (${prevSibling.name})`}
							onClick={() => setActiveId(prevSibling.id)}
						>
							<NavigatorKey icon={<ArrowLeft />} />
						</Button>
					) : null}
					{notNullish(nextSibling) ? (
						<Button
							type="button"
							variant="secondary"
							size="sm"
							className={controlButtonClass}
							aria-label={`Select next sibling ${nextSibling.name}`}
							title={`Press the Right Arrow key or click to select the next sibling (${nextSibling.name})`}
							onClick={() => setActiveId(nextSibling.id)}
						>
							<NavigatorKey icon={<ArrowRight />} />
						</Button>
					) : null}
					{isActive ? (
						<Button
							type="button"
							variant="secondary"
							size="sm"
							className={controlButtonClass}
							aria-label="Clear component selection"
							title="Press Escape or click to clear the selection"
							onClick={() => setActiveId(null)}
						>
							<NavigatorKey label="Esc" />
							Deselect
						</Button>
					) : null}
				</div>
				<div
					className="absolute top-0 right-0 z-40 hidden gap-1 p-1"
					data-cms-editor-control="toolbar"
					data-testid="cms-editor-controls"
				>
					<Button
						type="button"
						size="sm"
						variant="secondary"
						className={controlButtonClass}
						aria-label="Copy component"
						title="Copy component"
						onClick={() => {
							const component = findComponent(_context.components, id);
							if (notNullish(component)) setClipboard({ kind: 'copy', component: structuredClone(component) });
						}}
					>
						<Copy className="size-3" />
					</Button>
					<Button
						type="button"
						size="sm"
						variant="secondary"
						className={controlButtonClass}
						aria-label="Cut component"
						title="Cut component"
						onClick={() => {
							const component = findComponent(_context.components, id);
							if (notNullish(component)) {
								setClipboard({
									kind: 'cut',
									component: structuredClone(component),
									sourceEditor: { id: _context.id, context },
								});
							}
						}}
					>
						<Scissors className="size-3" />
					</Button>
					<DropdownMenu open={pasteOpen} onOpenChange={setPasteOpen}>
						<DropdownMenuTrigger asChild>
							<Button
								type="button"
								size="sm"
								variant="secondary"
								className={controlButtonClass}
								aria-label="Paste component"
								title="Paste component"
								disabled={clipboard === null}
							>
								<ClipboardPaste className="size-3" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							data-cms-editor-control="paste-menu"
							align="end"
							onCloseAutoFocus={(event) => {
								if (pendingCrossDocumentPaste !== null) event.preventDefault();
							}}
						>
							{pastePlacements
								.filter(({ placement: pastePlacement }) => pastePlacement !== 'inside' || !Component.noChildren)
								.map(({ placement: pastePlacement, label }) => (
									<DropdownMenuItem
										key={pastePlacement}
										className="cursor-pointer"
										onSelect={() => applyPaste(pastePlacement)}
									>
										{label}
									</DropdownMenuItem>
								))}
						</DropdownMenuContent>
					</DropdownMenu>
					{Component.noChildren ? null : (
						<Button
							size="sm"
							variant="secondary"
							className={controlButtonClass}
							onClick={() => openNewComponent('inside')}
						>
							<PlusSquare className="mr-1 h-3 w-3" /> Add Child
						</Button>
					)}
					{Component.editable === false ? null : (
						<Button size="sm" variant="secondary" className={controlButtonClass} onClick={openEdit}>
							<Pencil className="mr-1 h-3 w-3" /> Edit
						</Button>
					)}
					<Button
						size="sm"
						variant="destructive"
						className="shadow-md"
						aria-label="Remove component"
						onClick={() => {
							setRemoveOpen(true);
						}}
					>
						<Trash2 className="h-3 w-3" />
					</Button>
				</div>

				{/* Fully above the top edge (flush, so hover never breaks) in its own band,
				    clear of the label/navigator/toolbar row inside the component. */}
				<Button
					type="button"
					variant="secondary"
					className={`absolute bottom-full left-1/2 z-50 hidden min-w-24 -translate-x-1/2 ${controlButtonClass}`}
					data-cms-editor-control="before"
					onClick={() => openNewComponent('before')}
				>
					<Plus className="h-3 w-3" />
					Add before
				</Button>

				<div data-cms-component data-testid={`cms-component-${name.toLowerCase()}`}>
					{isLayoutOutlet ? (
						<div
							data-testid="cms-outlet-placeholder"
							className="text-muted-foreground flex min-h-60 flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed p-16 font-sans"
						>
							<span className="text-sm font-medium">Page Outlet</span>
							<span className="text-xs">Page content appears here</span>
						</div>
					) : (
						<Component {...initialProps}>
							{childComponents.length > 0 ? (
								<div className="contents" data-cms-editable-children>
									{childComponents.map(
										({ id: childId, name: childName, props: childProps, childComponents: grandChildren }, idx) => (
											<EditableComponent
												key={childId}
												id={childId}
												index={idx}
												parentComponentId={id}
												name={childName}
												initialProps={childProps}
												childComponents={grandChildren}
												context={context}
											/>
										),
									)}
								</div>
							) : null}
						</Component>
					)}
				</div>

				{/* Fully below the bottom edge, mirroring the add-before band. */}
				<Button
					type="button"
					variant="secondary"
					className={`absolute top-full left-1/2 z-50 hidden min-w-24 -translate-x-1/2 ${controlButtonClass}`}
					data-cms-editor-control="after"
					onClick={() => openNewComponent('after')}
				>
					<Plus className="h-3 w-3" />
					Add after
				</Button>
			</div>

			{/* Confirm cross-document cut as copy */}
			{pendingCrossDocumentPaste === null ? null : (
				<Dialog open onOpenChange={() => setPendingCrossDocumentPaste(null)}>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Paste as a copy?</DialogTitle>
							<DialogDescription>
								This component was cut from another document. Pasting it here creates a copy and leaves the original
								unchanged.
							</DialogDescription>
						</DialogHeader>
						<DialogFooter>
							<Button variant="outline" onClick={() => setPendingCrossDocumentPaste(null)}>
								Cancel
							</Button>
							<Button onClick={() => pastePendingAsCopy(pendingCrossDocumentPaste)}>Paste as copy</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			)}

			{/* Edit Dialog */}
			<Dialog open={editOpen} onOpenChange={setEditOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Edit {Component.label}</DialogTitle>
					</DialogHeader>
					<form onSubmit={handleEditSubmit} className="grid grid-cols-[minmax(0,1fr)] gap-4">
						{Component.fields.map((cmsField, idx) => (
							<CMSFieldInput
								key={`field_${idx}`}
								field={cmsField}
								value={editFormValues[cmsField.prop]}
								onChange={(value) => setEditFormValues((prev) => ({ ...prev, [cmsField.prop]: value }))}
							/>
						))}
						<DialogFooter>
							<Button type="submit">Update</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>

			{/* Remove Dialog */}
			<Dialog open={removeOpen} onOpenChange={setRemoveOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Remove Component</DialogTitle>
					</DialogHeader>
					<p className="text-sm text-muted-foreground">Are you sure you want to remove this component?</p>
					<DialogFooter>
						<Button variant="outline" onClick={() => setRemoveOpen(false)}>
							Cancel
						</Button>
						<Button
							variant="destructive"
							onClick={() => {
								_context.removeComponent(id, parentComponentId);
								// A removed component can no longer hold the selection.
								if (isActive) setActiveId(null);
								setRemoveOpen(false);
							}}
						>
							Remove
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Add Component Dialog */}
			<AddComponentDialog
				open={addOpen}
				onOpenChange={setAddOpen}
				index={index}
				placement={placement}
				parentComponentId={placement === 'inside' ? id : parentComponentId}
				context={context}
			/>
		</>
	);
};

// ---------------------------------------------------------------------------
// AddComponentDialog — inline to avoid circular deps
// ---------------------------------------------------------------------------

type AddComponentDialogProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	parentComponentId: string | null;
	placement: Placement;
	index?: number;
	context: 'page' | 'layout';
};

const AddComponentDialog = ({
	open,
	onOpenChange,
	parentComponentId,
	placement,
	context,
	index,
}: AddComponentDialogProps) => {
	const pageCtx = useCMSPage();
	const layoutCtx = useCMSLayout();
	const _context = context === 'page' ? pageCtx : layoutCtx;

	const parentName = nullish(parentComponentId)
		? ''
		: (findComponent(_context.components, parentComponentId)?.name ?? '');

	const ParentComponent: CMSComponent<Record<string, unknown>> = isValidCMSExport(parentName)
		? (cmsExports[parentName] as unknown as CMSComponent<Record<string, unknown>>)
		: DefaultComponent;

	const validChildren = ParentComponent.validChildren ?? Object.keys(cmsExports);
	// The new component's future siblings, used to enforce unique (singleton) children.
	const siblings = nullish(parentComponentId)
		? _context.components
		: (findComponent(_context.components, parentComponentId)?.childComponents ?? []);

	const validExports = Object.entries(cmsExports).reduce(
		(acc, [exportName, component]) => {
			const comp = component as unknown as CMSComponent<Record<string, unknown>>;
			const validParents = comp.validParents ?? Object.keys(cmsExports);
			const validateParent = notNullish(comp.validParents);
			const isValidParent = validateParent ? validParents.includes(parentName) : true;
			const isValidContext = context === 'layout' || !comp.layoutOnly;
			// `unique` is not in the installed CMSComponent type yet; read it defensively.
			const isUnique = (comp as { unique?: boolean }).unique === true;
			const isAvailable = !isUnique || !siblings.some((sibling) => sibling.name === exportName);
			if (validChildren.includes(exportName) && isValidParent && isValidContext && isAvailable) {
				acc[exportName] = comp;
			}
			return acc;
		},
		{} as Record<string, CMSComponent<Record<string, unknown>>>,
	);

	const [selectedName, setSelectedName] = useState<string>('');
	const NewComponent: CMSComponent<Record<string, unknown>> | null =
		selectedName !== '' && isValidCMSExport(selectedName)
			? (cmsExports[selectedName] as unknown as CMSComponent<Record<string, unknown>>)
			: null;

	const [newComponentProps, setNewComponentProps] = useState<Record<string, unknown>>({});

	const handleSelectName = (name: string, comp: CMSComponent<Record<string, unknown>>) => {
		setSelectedName(name);
		setNewComponentProps(
			comp.fields.reduce(
				(acc, field) => {
					acc[field.prop] = field.defaultValue ?? '';
					return acc;
				},
				{} as Record<string, unknown>,
			),
		);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (nullish(NewComponent)) return;
		const newComponent: CMSComponentData = {
			id: new ObjectId().toHexString(),
			name: NewComponent.componentName,
			props: newComponentProps,
			attrs: {},
			parentComponentId: parentComponentId,
			childComponents: [],
		};
		if (_context.components.length === 0) {
			_context.addFirstComponent(newComponent);
		} else {
			_context.addComponent(newComponent, placement, index);
		}
		setSelectedName('');
		setNewComponentProps({});
		onOpenChange(false);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-2xl">
				<DialogHeader>
					<DialogTitle>Add Component</DialogTitle>
				</DialogHeader>
				<form
					onSubmit={handleSubmit}
					className="grid grid-cols-[minmax(0,1fr)] gap-4 sm:grid-cols-[11rem_minmax(0,1fr)]"
				>
					{/* Component palette: a side panel of buttons on desktop, a wrapping
					    row on small screens. Scrolls independently so long component lists
					    never push the form or footer out of reach. */}
					<div
						role="group"
						aria-label="Component"
						data-testid="cms-add-component-palette"
						className="border-border flex max-h-32 min-w-0 flex-row flex-wrap content-start gap-1 overflow-y-auto border-b pb-3 sm:max-h-96 sm:flex-col sm:flex-nowrap sm:border-r sm:border-b-0 sm:pr-3 sm:pb-0"
					>
						{Object.entries(validExports).length === 0 ? (
							<p className="text-muted-foreground p-1 text-sm">No components can be added here.</p>
						) : (
							Object.entries(validExports).map(([exportName, comp]) => (
								<Button
									key={exportName}
									type="button"
									size="sm"
									variant={selectedName === exportName ? 'default' : 'ghost'}
									aria-pressed={selectedName === exportName}
									className="shrink-0 justify-start"
									onClick={() => handleSelectName(exportName, comp)}
								>
									{comp.label}
								</Button>
							))
						)}
					</div>
					<div className="grid min-h-48 content-start gap-4">
						{notNullish(NewComponent) ? (
							NewComponent.fields.length > 0 ? (
								NewComponent.fields.map((cmsField) => (
									<CMSFieldInput
										key={`field_${cmsField.prop}`}
										field={cmsField}
										value={newComponentProps[cmsField.prop]}
										onChange={(value) => setNewComponentProps((prev) => ({ ...prev, [cmsField.prop]: value }))}
									/>
								))
							) : (
								<p className="text-muted-foreground text-sm">This component has no fields to configure.</p>
							)
						) : (
							<p className="text-muted-foreground text-sm">Choose a component from the list to configure it.</p>
						)}
						<DialogFooter className="mt-auto">
							<Button type="submit" disabled={nullish(NewComponent)}>
								Add Component
							</Button>
						</DialogFooter>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export { AddComponentDialog, CMSFieldInput };
