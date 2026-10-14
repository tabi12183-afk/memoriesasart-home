'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Pencil, Trash2, Check, ImageIcon, Upload } from 'lucide-react';
import type { MediaItem } from '@stormycms/core';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './dialog';
import { Button } from './button';
import { Field, FieldGroup, FieldLabel } from './field';
import { Input } from './input';
import { SelectionBar } from './selection-bar';
import { notNullish, nullish } from '~/lib/utils';

function getAltText(metadata?: Record<string, unknown>): string | undefined {
	return typeof metadata?.alt === 'string' ? metadata.alt : undefined;
}

interface MediaGridProps {
	media?: MediaItem[];
	emptyMessage?: string;
	selectable?: boolean;
	multiSelect?: boolean;
	editable?: boolean;
	mediaType?: string;
	onSelect?: (items: MediaItem[]) => void;
	onEdit?: (item: MediaItem) => void;
	onDelete?: (item: MediaItem) => void;
	className?: string;
}

export function MediaGrid({
	media: externalMedia,
	emptyMessage = 'No media files yet. Upload your first image to get started.',
	selectable = false,
	multiSelect = false,
	editable = true,
	mediaType,
	onSelect,
	onEdit,
	onDelete,
	className = 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4',
}: MediaGridProps) {
	const [internalMedia, setInternalMedia] = useState<MediaItem[]>([]);
	const [internalLoading, setInternalLoading] = useState(nullish(externalMedia));
	const isControlled = notNullish(externalMedia);
	const media = (isControlled ? externalMedia : internalMedia).filter(
		(item) => nullish(mediaType) || item.type === mediaType,
	);
	const loading = !isControlled && internalLoading;
	const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
	const [mediaToDelete, setMediaToDelete] = useState<MediaItem | null>(null);
	const [selectedItems, setSelectedItems] = useState<MediaItem[]>([]);

	useEffect(() => {
		if (isControlled) return;

		const fetchMedia = async () => {
			try {
				const response = await fetch('/api/media');
				if (!response.ok) {
					throw new Error('Failed to fetch media');
				}
				const data = await response.json();
				setInternalMedia(data.media ?? []);
			} catch (error) {
				console.error('Error fetching media:', error);
			} finally {
				setInternalLoading(false);
			}
		};

		fetchMedia();
	}, [isControlled]);

	const [editOpen, setEditOpen] = useState(false);
	const [deleteOpen, setDeleteOpen] = useState(false);

	const handleEdit = (item: MediaItem) => {
		if (notNullish(onEdit)) {
			onEdit(item);
		} else {
			setSelectedMedia(item);
			setEditOpen(true);
		}
	};

	const handleSave = async (e: React.FormEvent<HTMLFormElement>, media: MediaItem) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const name = formData.get('media-name') as string;
		const alt = formData.get('media-alt') as string;
		const tags = formData.get('media-tags') as string;

		try {
			const response = await fetch('/api/media', {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id: media.id, name, metadata: { alt, tags } }),
			});

			if (!response.ok) {
				throw new Error('Failed to update media');
			}

			const data = await response.json();
			setInternalMedia((prev) => prev.map((m) => (m.id === data.media.id ? data.media : m)));
			setEditOpen(false);
		} catch (error) {
			console.error('Error updating media:', error);
		}
	};

	const handleDeleteClick = (item: MediaItem) => {
		if (notNullish(onDelete)) {
			onDelete(item);
		} else {
			setMediaToDelete(item);
			setDeleteOpen(true);
		}
	};

	const handleConfirmDelete = async (media: MediaItem) => {
		try {
			const response = await fetch(`/api/media?id=${media.id}`, {
				method: 'DELETE',
			});

			if (!response.ok) {
				throw new Error('Failed to delete media');
			}

			setInternalMedia((prev) => prev.filter((m) => m.id !== media.id));
			setMediaToDelete(null);
			setDeleteOpen(false);
		} catch (error) {
			console.error('Error deleting media:', error);
		}
	};

	const handleSelect = (item: MediaItem) => {
		if (multiSelect) {
			setSelectedItems((prev) =>
				prev.some((s) => s.id === item.id) ? prev.filter((s) => s.id !== item.id) : [...prev, item],
			);
		} else {
			setSelectedItems((prev) => (prev.some((s) => s.id === item.id) ? [] : [item]));
		}
	};

	const handleFinalSelect = (selectItems: (items: MediaItem[]) => void) => {
		/* v8 ignore next -- @preserve */
		if (selectedItems.length === 0) return;
		selectItems(selectedItems);
	};

	if (loading) {
		return (
			<div className={className}>
				{Array.from({ length: 6 }).map((_, i) => (
					<div key={i} className="aspect-square rounded-lg bg-muted animate-pulse" />
				))}
			</div>
		);
	}

	return (
		<div data-testid="media-grid">
			{editable && nullish(onEdit) && nullish(onDelete) ? (
				<>
					<Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
						<DialogContent>
							<DialogHeader>
								<DialogTitle className="text-destructive">Delete Media</DialogTitle>
							</DialogHeader>
							{notNullish(mediaToDelete) ? (
								<div className="space-y-4">
									<p className="text-sm text-muted-foreground">
										Are you sure you want to delete <strong>{mediaToDelete.name}</strong>? This action cannot be undone.
									</p>
									<div className="flex gap-2 pt-2">
										<Button type="button" variant="outline" onClick={() => setDeleteOpen(false)}>
											Cancel
										</Button>
										<Button type="button" variant="destructive" onClick={() => handleConfirmDelete(mediaToDelete)}>
											<Trash2 className="mr-2 h-4 w-4" />
											Delete
										</Button>
									</div>
								</div>
							) : null}
						</DialogContent>
					</Dialog>
					<Dialog open={editOpen} onOpenChange={setEditOpen}>
						<DialogContent className="!max-w-4xl h-[90vh] min-h-[420px] flex flex-col overflow-hidden">
							<DialogHeader className="shrink-0">
								<DialogTitle>Edit Media</DialogTitle>
							</DialogHeader>
							<div className="flex-1 overflow-auto min-h-0 space-y-4">
								{notNullish(selectedMedia) ? (
									<>
										<div className="space-y-2">
											<div className="relative h-48 w-full">
												<Image
													src={selectedMedia.url}
													alt={getAltText(selectedMedia.metadata) ?? selectedMedia.name}
													fill
													className="object-cover rounded-md"
													unoptimized
												/>
											</div>
										</div>
										<form onSubmit={(e) => handleSave(e, selectedMedia)}>
											<FieldGroup>
												<Field>
													<FieldLabel htmlFor="media-name">Image Name</FieldLabel>
													<Input id="media-name" name="media-name" defaultValue={selectedMedia.name} />
												</Field>
												<Field>
													<FieldLabel htmlFor="media-tags">Tags</FieldLabel>
													<Input
														id="media-tags"
														name="media-tags"
														placeholder="e.g., nature, landscape, travel"
														defaultValue={
															Array.isArray(selectedMedia.metadata.tags)
																? selectedMedia.metadata.tags.join(', ')
																: ((selectedMedia.metadata.tags as string | undefined) ?? '')
														}
													/>
												</Field>
												<Field>
													<FieldLabel htmlFor="media-alt">Alt Text</FieldLabel>
													<Input
														id="media-alt"
														name="media-alt"
														placeholder="Description for accessibility"
														defaultValue={getAltText(selectedMedia.metadata)}
													/>
												</Field>
												<Field className="flex gap-2 pt-2">
													<Button type="submit">
														<Upload className="mr-2 h-4 w-4" />
														Save Changes
													</Button>
												</Field>
											</FieldGroup>
										</form>
									</>
								) : null}
							</div>
						</DialogContent>
					</Dialog>
				</>
			) : null}

			{selectable && notNullish(onSelect) ? (
				<SelectionBar
					count={selectedItems.length}
					onChoose={() => handleFinalSelect(onSelect)}
					onClear={selectedItems.length > 1 ? () => setSelectedItems([]) : undefined}
					disabled={selectedItems.length === 0}
				/>
			) : null}
			{media.length === 0 ? (
				<div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
					<ImageIcon className="h-16 w-16 mb-4 opacity-50" />
					<p className="text-lg mb-4">{emptyMessage}</p>
				</div>
			) : (
				<div className={className}>
					{media.map((item) => {
						const isSelected = selectedItems.some((s) => s.id === item.id);

						return (
							<div
								key={item.id}
								data-testid="media-item"
								className={`group relative aspect-square rounded-lg overflow-hidden bg-muted border-2 transition-colors ${
									isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-transparent'
								}`}
							>
								<Image
									src={item.url}
									alt={getAltText(item.metadata) ?? item.name}
									fill
									className="object-cover transition-transform duration-300 group-hover:scale-105"
									unoptimized
								/>
								{selectable || editable ? (
									<>
										<div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-200" />
										<div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
											{selectable ? (
												<button
													type="button"
													onClick={() => handleSelect(item)}
													className={`cursor-pointer p-2 rounded-full transition-colors shadow-lg ${
														isSelected
															? 'bg-blue-500 text-white hover:bg-blue-600'
															: 'bg-white/90 text-green-600 hover:bg-white'
													}`}
													aria-label={isSelected ? 'Selected' : 'Select'}
												>
													<Check className="h-4 w-4" />
												</button>
											) : null}
											{editable ? (
												<>
													<button
														type="button"
														onClick={() => handleEdit(item)}
														className="cursor-pointer p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors shadow-lg"
														aria-label="Edit"
													>
														<Pencil className="h-4 w-4" />
													</button>
													<button
														type="button"
														onClick={() => handleDeleteClick(item)}
														className="cursor-pointer p-2 rounded-full bg-white/90 text-destructive hover:bg-white transition-colors shadow-lg"
														aria-label="Delete"
													>
														<Trash2 className="h-4 w-4" />
													</button>
												</>
											) : null}
										</div>
										<div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
											<p className="text-white text-sm font-medium truncate">{item.name}</p>
										</div>
									</>
								) : null}
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}
