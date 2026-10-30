'use client';

import { useState, useEffect, type ReactNode } from 'react';
import Image from 'next/image';
import { Plus, TriangleAlert, X } from 'lucide-react';
import type { MediaItem } from '@stormycms/core';
import type { FileMetadata } from './dropzone';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './dialog';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { Field, FieldLabel } from './field';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs';
import { Dropzone } from './dropzone';
import { MediaGrid } from './media-grid';
import { SelectionBar } from './selection-bar';
import { toast } from 'sonner';
import { notNullish, nullish } from '~/lib/utils';

interface MediaLibraryProps {
	emptyMessage?: string;
	media?: MediaItem[];
	mediaType?: string;
	onEdit?: (item: MediaItem) => void;
	onDelete?: (item: MediaItem) => void;
	onSelect?: (items: MediaItem[]) => void;
	selectionMode?: boolean;
	multiSelect?: boolean;
	showLibraryTab?: boolean;
	onUpload?: (item: MediaItem) => void;
	renderTrigger?: (onClick: () => void) => ReactNode;
}

function LibrarySelector({
	media,
	mediaType,
	multiSelect,
	onSelect,
	onClose,
}: {
	media: MediaItem[];
	mediaType?: string;
	multiSelect?: boolean;
	onSelect: (items: MediaItem[]) => void;
	onClose: () => void;
}) {
	return (
		<MediaGrid
			media={media}
			mediaType={mediaType}
			selectable
			multiSelect={multiSelect}
			editable={false}
			onSelect={(items) => {
				onSelect(items);
				onClose();
			}}
			className="grid grid-cols-3 gap-2"
		/>
	);
}

function getDefaultNameFromUrl(url: string): string {
	try {
		const pathname = new URL(url).pathname;
		const filename = pathname.replace(/^.*\//, '');
		return filename !== '' ? filename : url;
	} catch {
		return url;
	}
}

function parseTagsInput(input: string): string[] {
	return input
		.split(',')
		.map((tag) => tag.trim())
		.filter(Boolean);
}

function formatTagsInput(tags: unknown): string {
	return Array.isArray(tags) ? tags.join(', ') : '';
}

function UrlInput({
	multiSelect,
	onSelect,
	onClose,
	onCreate,
}: {
	multiSelect?: boolean;
	onSelect?: (items: MediaItem[]) => void;
	onClose: () => void;
	onCreate?: (url: string, metadata: FileMetadata) => Promise<MediaItem | undefined>;
}) {
	const [url, setUrl] = useState('');
	const [addedUrls, setAddedUrls] = useState<MediaItem[]>([]);
	const [isLinking, setIsLinking] = useState(false);

	const handleAddUrl = () => {
		if (url === '') return;

		const name = getDefaultNameFromUrl(url);
		// Alt text is edited per row after the URL is added, via updateAlt.
		const item: MediaItem = {
			id: `url-${crypto.randomUUID()}`,
			type: 'image',
			url,
			name,
			metadata: {},
			siteId: '',
		};

		setAddedUrls((prev) => (multiSelect === true ? [...prev, item] : [item]));
		setUrl('');
	};

	const handleRemove = (id: string) => {
		setAddedUrls((prev) => prev.filter((item) => item.id !== id));
	};

	const handleClearAll = () => {
		setAddedUrls([]);
	};

	const handleLinkSelected = async () => {
		/* v8 ignore next -- @preserve */
		if (addedUrls.length === 0 || isLinking) return;
		setIsLinking(true);

		try {
			let items = addedUrls;
			/* v8 ignore else -- @preserve */
			if (notNullish(onCreate)) {
				const createdItems: MediaItem[] = [];
				for (const item of addedUrls) {
					const created = await onCreate(item.url, {
						name: item.name,
						alt: typeof item.metadata.alt === 'string' ? item.metadata.alt : '',
						tags: formatTagsInput(item.metadata.tags),
					});
					/* v8 ignore else -- @preserve */
					if (notNullish(created)) {
						createdItems.push(created);
					}
				}
				items = createdItems;
			}
			onSelect?.(items);
			onClose();
		} catch {
			// The create callback surfaces its own errors; keep the entries for retry.
		} finally {
			setIsLinking(false);
		}
	};

	const updateName = (id: string, name: string) => {
		setAddedUrls((prev) => prev.map((item) => (item.id === id ? { ...item, name } : item)));
	};

	const updateAlt = (id: string, altValue: string) => {
		setAddedUrls((prev) =>
			prev.map((item) =>
				item.id === id
					? { ...item, metadata: { ...item.metadata, alt: altValue !== '' ? altValue : undefined } }
					: item,
			),
		);
	};

	const updateTags = (id: string, tagsInput: string) => {
		const tags = parseTagsInput(tagsInput);
		setAddedUrls((prev) =>
			prev.map((item) => (item.id === id ? { ...item, metadata: { ...item.metadata, tags } } : item)),
		);
	};

	return (
		<div className="flex flex-col gap-4 flex-1 min-h-0">
			<SelectionBar
				count={addedUrls.length}
				onChoose={handleLinkSelected}
				onClear={addedUrls.length > 1 ? handleClearAll : undefined}
				disabled={addedUrls.length === 0 || isLinking}
			/>
			<div className="grid gap-4 shrink-0">
				<div className="grid grid-cols-[minmax(0,1fr)] gap-1.5">
					<Label htmlFor="media-url">URL</Label>
					<div className="flex items-center gap-2">
						<Input
							id="media-url"
							name="media-url"
							type="url"
							placeholder="https://example.com/image.jpg"
							value={url}
							onChange={(e) => setUrl(e.target.value)}
							className="flex-1"
						/>
						<Button type="button" onClick={handleAddUrl}>
							Add Media
						</Button>
					</div>
				</div>
			</div>
			{addedUrls.length > 0 ? (
				<div className="space-y-2 overflow-y-auto min-h-0 flex-1">
					{addedUrls.map((item) => (
						<div key={item.id} className="flex flex-col gap-3 p-3 border rounded-lg">
							<div className="flex items-center gap-3">
								<Image
									src={item.url}
									alt={item.name}
									width={48}
									height={48}
									className="h-12 w-12 object-cover rounded"
									unoptimized
								/>
								<div className="flex-1 min-w-0">
									<p className="text-sm font-medium truncate">{item.url}</p>
								</div>
								<button
									type="button"
									onClick={() => handleRemove(item.id)}
									className="p-1 rounded-full hover:bg-muted transition-colors"
								>
									<X className="h-4 w-4" />
								</button>
							</div>
							<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
								<Field className="space-y-1">
									<FieldLabel className="text-xs">Name</FieldLabel>
									<Input
										type="text"
										value={item.name}
										onChange={(e) => updateName(item.id, e.target.value)}
										placeholder="Media name"
									/>
								</Field>
								<Field className="space-y-1">
									<FieldLabel className="text-xs">Alt Text</FieldLabel>
									<Input
										type="text"
										value={typeof item.metadata.alt === 'string' ? item.metadata.alt : ''}
										onChange={(e) => updateAlt(item.id, e.target.value)}
										placeholder="Description for accessibility"
									/>
								</Field>
								<Field className="space-y-1">
									<FieldLabel className="text-xs">Tags</FieldLabel>
									<Input
										type="text"
										value={formatTagsInput(item.metadata.tags)}
										onChange={(e) => updateTags(item.id, e.target.value)}
										placeholder="e.g., nature, landscape"
									/>
								</Field>
							</div>
						</div>
					))}
				</div>
			) : null}
		</div>
	);
}

const GRID_COLUMNS: Record<number, string> = { 1: 'grid-cols-1', 2: 'grid-cols-2', 3: 'grid-cols-3' };

export function MediaLibrary({
	media: externalMedia,
	mediaType,
	onSelect,
	selectionMode = false,
	multiSelect = false,
	showLibraryTab = true,
	onUpload,
	renderTrigger,
}: MediaLibraryProps) {
	const [internalMedia, setInternalMedia] = useState<MediaItem[]>([]);
	// Off until /api/media confirms storage, so the Upload tab never offers an upload that cannot work.
	const [uploads, setUploads] = useState(false);
	const isControlled = notNullish(externalMedia);
	const media = isControlled ? externalMedia : internalMedia;

	useEffect(() => {
		if (isControlled) return;

		const fetchMedia = async () => {
			try {
				const response = await fetch('/api/media');
				if (!response.ok) {
					throw new Error('Failed to fetch media');
				}
				const data = await response.json();
				const _uploads = data.uploads === true;
				setInternalMedia(data.media ?? []);
				setUploads(_uploads);
				if (!_uploads) {
					console.warn(
						'Uploads are disabled. Set S3_BUCKET, S3_ACCESS_KEY_ID and S3_SECRET_ACCESS_KEY in your environment.',
					);
				}
			} catch (error) {
				console.error('Error fetching media:', error);
			}
		};

		fetchMedia();
	}, [isControlled]);

	const [addOpen, setAddOpen] = useState(false);
	const [activeTab, setActiveTab] = useState('upload');
	const tab = uploads || activeTab !== 'upload' ? activeTab : 'url';
	const tabCount = (uploads ? 1 : 0) + 1 + (showLibraryTab ? 1 : 0);

	const handleAdd = () => {
		/* v8 ignore next -- @preserve */
		if (isControlled) return;
		setAddOpen(true);
	};

	const handleFileUpload = async (file: File, metadata: FileMetadata = { name: file.name, alt: '', tags: '' }) => {
		console.log('[MediaLibrary] handleFileUpload called with file:', file.name, file.size);
		/* v8 ignore next -- @preserve */
		if (isControlled) return;

		try {
			const formData = new FormData();
			formData.append('file', file);
			formData.append('name', metadata.name);
			formData.append('alt', metadata.alt);
			formData.append('tags', metadata.tags);

			console.log('[MediaLibrary] Sending FormData with file:', file.name);
			const response = await fetch('/api/media', {
				method: 'POST',
				body: formData,
			});
			const data = (await response.json().catch(() => ({}))) as { error?: string; details?: string; media?: MediaItem };

			if (!response.ok || nullish(data.media)) {
				const message = data.error ?? 'Unable to upload media. Please try again.';
				throw new Error(message, { cause: data.details });
			}
			const uploadedMedia = data.media;

			console.log('[MediaLibrary] File uploaded successfully:', uploadedMedia.id);
			setInternalMedia((prev) => [...prev, uploadedMedia]);
			onSelect?.([uploadedMedia]);
			onUpload?.(uploadedMedia);
			toast.success(`${file.name} uploaded successfully.`);
			setAddOpen(false);
		} catch (error) {
			console.error('Error uploading file:', error);
			toast.error(error instanceof Error ? error.message : 'Unable to upload media. Please try again.');
			throw error;
		}
	};

	const handleUrlCreate = async (url: string, metadata: FileMetadata): Promise<MediaItem | undefined> => {
		/* v8 ignore next -- @preserve */
		if (isControlled) return;
		try {
			const formData = new FormData();
			formData.append('url', url);
			formData.append('name', metadata.name);
			formData.append('alt', metadata.alt);
			formData.append('tags', metadata.tags);

			const response = await fetch('/api/media', {
				method: 'POST',
				body: formData,
			});
			const data = (await response.json().catch(() => ({}))) as { error?: string; details?: string; media?: MediaItem };

			if (!response.ok || nullish(data.media)) {
				const message = data.error ?? 'Unable to add URL media. Please try again.';
				throw new Error(message, { cause: data.details });
			}
			const createdMedia = data.media;

			console.log('[MediaLibrary] URL media created successfully:', createdMedia.id);
			setInternalMedia((prev) => [...prev, createdMedia]);
			onUpload?.(createdMedia);
			return createdMedia;
		} catch (error) {
			console.error('Error creating URL media:', error);
			toast.error(error instanceof Error ? error.message : 'Unable to add URL media. Please try again.');
			throw error;
		}
	};

	return (
		<div data-testid={selectionMode ? 'cms-media-field' : undefined}>
			<Dialog open={addOpen} onOpenChange={setAddOpen}>
				<DialogContent className="!max-w-4xl h-[90vh] min-h-[420px] flex flex-col overflow-hidden">
					<DialogHeader className="shrink-0">
						<DialogTitle>Add Media</DialogTitle>
					</DialogHeader>
					<Tabs value={tab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
						<TabsList className={`grid w-full shrink-0 ${GRID_COLUMNS[tabCount]}`}>
							{uploads ? <TabsTrigger value="upload">Upload</TabsTrigger> : null}
							<TabsTrigger value="url">URL</TabsTrigger>
							{showLibraryTab ? <TabsTrigger value="library">Library</TabsTrigger> : null}
						</TabsList>
						{uploads ? (
							<TabsContent value="upload" className="mt-4 flex-1 flex flex-col min-h-0 overflow-auto">
								<Dropzone
									mediaType={mediaType}
									multiSelect={multiSelect}
									onFileUpload={async (file, metadata) => {
										console.log('[MediaLibrary] onFileUpload:', file.name, file.size, file.type);
										await handleFileUpload(file, metadata);
									}}
								/>
							</TabsContent>
						) : (
							<div
								role="status"
								className="mt-3 flex shrink-0 items-start gap-2 rounded-md border border-amber-200/70 bg-amber-50/60 px-3 py-2 text-sm text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/20 dark:text-amber-200"
							>
								<TriangleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
								<p>Uploading is off until media storage is set up. You can still add media via URL.</p>
							</div>
						)}
						<TabsContent value="url" className="mt-4 flex-1 flex flex-col min-h-0 overflow-auto">
							<UrlInput
								multiSelect={multiSelect}
								onSelect={onSelect}
								onClose={() => setAddOpen(false)}
								onCreate={isControlled ? undefined : handleUrlCreate}
							/>
						</TabsContent>
						{showLibraryTab ? (
							<TabsContent value="library" className="mt-4 flex-1 flex flex-col min-h-0 overflow-auto">
								<LibrarySelector
									media={media}
									mediaType={mediaType}
									multiSelect={multiSelect}
									onSelect={(items) => {
										onSelect?.(items);
									}}
									onClose={() => setAddOpen(false)}
								/>
							</TabsContent>
						) : null}
					</Tabs>
				</DialogContent>
			</Dialog>
			{!isControlled ? (
				<div className={notNullish(renderTrigger) ? undefined : 'mb-4'}>
					{notNullish(renderTrigger) ? (
						renderTrigger(handleAdd)
					) : (
						<Button type="button" onClick={handleAdd}>
							<Plus className="mr-2 h-4 w-4" />
							{selectionMode ? 'Choose Media' : showLibraryTab || !uploads ? 'Add Media' : 'Upload Media'}
						</Button>
					)}
				</div>
			) : null}
		</div>
	);
}
