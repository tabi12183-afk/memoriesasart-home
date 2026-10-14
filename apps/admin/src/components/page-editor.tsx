'use client';

import { useState } from 'react';
import { EditableComponent, AddComponentDialog } from './editable-component';
import { useCMSPage } from '@stormycms/react/cms/client';
import { buildLayoutTree, LayoutTree } from '@stormycms/react/cms';
import cmsExports from 'components';
import type { CMSLayoutData } from '@stormycms/core';
import { Button } from '~/components/button';
import { Input } from '~/components/input';
import { Label } from '~/components/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '~/components/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/select';
import { ChevronLeft, LayoutGrid, Save, Trash2, Plus } from 'lucide-react';
import Link from 'next/link';
import { normalizePageSlug } from '~/lib/page-slug';
import { EditorSelectionProvider } from './editor-selection';
// Site styles for the preview canvas only — both are scoped to .site-root__*,
// so they cannot affect the admin chrome.
import 'theme/theme.css';
import 'components/styles.css';

export type PageEditorProps = {
	layouts: CMSLayoutData[];
	reservedSlugs: string[];
};

export const PageEditor = ({ layouts, reservedSlugs }: PageEditorProps) => {
	const page = useCMSPage();
	const { id: pageId, initialData, components } = page;
	const { name, slug } = initialData;

	const [pageName, setPageName] = useState(name);
	const [pageSlug, setPageSlug] = useState(slug);
	const [saved, setSaved] = useState(false);
	const [addOpen, setAddOpen] = useState(false);
	const [deleteOpen, setDeleteOpen] = useState(false);
	const [deleting, setDeleting] = useState(false);
	const [deleteError, setDeleteError] = useState('');
	const [layoutOpen, setLayoutOpen] = useState(false);
	const [slugError, setSlugError] = useState('');
	const [selectedLayoutId, setSelectedLayoutId] = useState<string>(page.layoutId ?? '');

	const layout = buildLayoutTree(layouts, page.layoutId);

	const handleSave = async () => {
		const normalizedSlug = normalizePageSlug(pageSlug);
		if (reservedSlugs.map(normalizePageSlug).includes(normalizedSlug)) {
			setSlugError('This slug is already used by another page.');
			return;
		}
		if (normalizedSlug === '' && slug !== '') {
			setSlugError('Slug is required.');
			return;
		}
		setSlugError('');
		setPageSlug(normalizedSlug);
		setSaved(true);
		try {
			const response = await fetch(`/api/pages/${pageId}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					slug: normalizedSlug,
					metadata: { title: pageName, description: '', keywords: [] },
					components,
					layoutId: page.layoutId,
				}),
			});
			if (!response.ok) {
				setSlugError(
					response.status === 409 ? 'This slug is already used by another page.' : 'Unable to save this page.',
				);
			}
		} catch (err) {
			console.error('Save failed:', err);
		}
		setTimeout(() => setSaved(false), 2000);
	};

	const handleDelete = async () => {
		setDeleting(true);
		setDeleteError('');
		try {
			const response = await fetch(`/api/pages/${pageId}`, { method: 'DELETE' });
			if (!response.ok) {
				setDeleteError('Unable to delete this page. Please try again.');
				return;
			}
			window.location.href = '/pages';
		} catch (err) {
			console.error('Delete failed:', err);
			setDeleteError('Unable to delete this page. Please try again.');
		} finally {
			setDeleting(false);
		}
	};

	const handleChooseLayout = () => {
		const layoutId = selectedLayoutId !== '' ? selectedLayoutId : undefined;
		page.setLayoutId(layoutId);
		setLayoutOpen(false);
	};

	return (
		<div className="flex flex-col h-full">
			{/* Toolbar */}
			<header className="flex items-center gap-2 border-b px-4 py-2 bg-background">
				<Button variant="ghost" size="sm" asChild>
					<Link href="/pages">
						<ChevronLeft className="mr-1 h-4 w-4" /> Back
					</Link>
				</Button>

				<Button variant="outline" size="sm" onClick={() => setLayoutOpen(true)}>
					<LayoutGrid className="mr-1 h-4 w-4" /> Layout
				</Button>

				<div className="flex items-center gap-1.5">
					<Label htmlFor="pageName" className="sr-only">
						Page Name
					</Label>
					<Input
						id="pageName"
						value={pageName}
						onChange={(e) => setPageName(e.target.value)}
						placeholder="Page Name"
						className="h-8 w-40"
					/>
				</div>

				{slug !== '' ? (
					<div className="flex items-center gap-1.5">
						<Label htmlFor="pageSlug" className="sr-only">
							Slug
						</Label>
						<Input
							id="pageSlug"
							value={pageSlug}
							onChange={(e) => {
								setPageSlug(e.target.value);
								setSlugError('');
							}}
							placeholder="Slug"
							className="h-8 w-40"
							aria-invalid={slugError !== ''}
							aria-describedby={slugError !== '' ? 'page-slug-error' : undefined}
						/>
						{slugError !== '' ? (
							<p id="page-slug-error" role="alert" className="text-sm text-destructive">
								{slugError}
							</p>
						) : null}
					</div>
				) : null}

				<Button size="sm" onClick={handleSave} disabled={saved}>
					{saved ? 'Saving...' : 'Save'}
					<Save className="ml-1 h-4 w-4" />
				</Button>

				{slug !== '' ? (
					<Button
						size="sm"
						variant="destructive"
						aria-label="Delete page"
						title="Delete page"
						onClick={() => {
							setDeleteError('');
							setDeleteOpen(true);
						}}
					>
						<Trash2 className="h-4 w-4" />
					</Button>
				) : null}
			</header>

			{/* Content area */}
			{/* Extra vertical padding keeps the floating add-before/add-after bands of the
			    first and last components inside the scrollable area at all sizes. */}
			<div className="flex-1 overflow-auto px-4 py-12">
				<EditorSelectionProvider>
					{/* .site-root severs style inheritance from the admin chrome (all: initial);
					    the component styles rebuild the html/body baseline inside it. */}
					<div className="site-root">
						<div className="site-root__html">
							<div className="site-root__body">
								<LayoutTree layout={layout} cmsExports={cmsExports}>
									{components.length === 0 ? (
										<div className="flex flex-col items-center justify-center gap-4 py-20 text-muted-foreground">
											<p>This page is empty.</p>
											<Button onClick={() => setAddOpen(true)}>
												<Plus className="mr-1 h-4 w-4" /> Add Your First Component
											</Button>
											<AddComponentDialog
												open={addOpen}
												onOpenChange={setAddOpen}
												parentComponentId={null}
												placement="after"
												context="page"
											/>
										</div>
									) : (
										components.map(({ id, props, name, childComponents }, idx) => (
											<EditableComponent
												key={id}
												id={id}
												index={idx}
												parentComponentId={null}
												name={name}
												initialProps={props}
												childComponents={childComponents}
												context="page"
											/>
										))
									)}
								</LayoutTree>
							</div>
						</div>
					</div>
				</EditorSelectionProvider>
			</div>

			{/* Layout picker dialog */}
			<Dialog open={layoutOpen} onOpenChange={setLayoutOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Choose Layout</DialogTitle>
					</DialogHeader>
					<div className="grid grid-cols-[minmax(0,1fr)] gap-4">
						<Label>Select a layout for this page.</Label>
						<Select value={selectedLayoutId} onValueChange={setSelectedLayoutId}>
							<SelectTrigger>
								<SelectValue placeholder="Select Layout" />
							</SelectTrigger>
							<SelectContent>
								{layouts.map(({ id, name }) => (
									<SelectItem key={id} value={id}>
										{name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<DialogFooter>
						<Button onClick={handleChooseLayout}>Update Layout</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Delete confirmation dialog */}
			<Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Delete page</DialogTitle>
					</DialogHeader>
					<p className="text-sm text-muted-foreground">
						Permanently delete &ldquo;{pageName}&rdquo;? This action cannot be undone.
					</p>
					{deleteError !== '' ? (
						<p role="alert" className="text-sm text-destructive">
							{deleteError}
						</p>
					) : null}
					<DialogFooter>
						<Button variant="outline" onClick={() => setDeleteOpen(false)} disabled={deleting}>
							Cancel
						</Button>
						<Button variant="destructive" onClick={handleDelete} disabled={deleting}>
							{deleting ? 'Deleting...' : 'Delete page'}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};
