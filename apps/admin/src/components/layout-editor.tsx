'use client';

import { useState } from 'react';
import { EditableComponent, AddComponentDialog } from './editable-component';
import { useCMSLayout } from '@stormycms/react/cms/client';
import { buildLayoutTree, LayoutTree, Layout } from '@stormycms/react/cms';
import cmsExports from 'components';
import type { CMSLayoutData } from '@stormycms/core';
import { Button } from '~/components/button';
import { Input } from '~/components/input';
import { Label } from '~/components/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '~/components/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/select';
import { ChevronLeft, Layers, Save, Trash2, Plus } from 'lucide-react';
import Link from 'next/link';
import { EditorSelectionProvider } from './editor-selection';
// Site styles for the preview canvas only — both are scoped to .site-root__*,
// so they cannot affect the admin chrome.
import 'theme/theme.css';
import 'components/styles.css';
import { nullish } from '~/lib/utils';

const NO_PARENT_LAYOUT = '__none__';

export type LayoutEditorProps = {
	layouts: CMSLayoutData[];
};

export const LayoutEditor = ({ layouts }: LayoutEditorProps) => {
	const layout = useCMSLayout();
	const { id: layoutId, initialData, components } = layout;
	const { name } = initialData;

	const [layoutName, setLayoutName] = useState(name);
	const [saved, setSaved] = useState(false);
	const [addOpen, setAddOpen] = useState(false);
	const [deleteOpen, setDeleteOpen] = useState(false);
	const [parentLayoutOpen, setParentLayoutOpen] = useState(false);
	const [selectedParentId, setSelectedParentId] = useState<string>(layout.parentLayoutId ?? NO_PARENT_LAYOUT);

	const parentLayout = nullish(layout.parentLayoutId) ? null : buildLayoutTree(layouts, layout.parentLayoutId);

	const handleSave = async () => {
		setSaved(true);
		try {
			await fetch(`/api/layouts/${layoutId}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: layoutName,
					components,
					parentLayoutId: layout.parentLayoutId ?? null,
				}),
			});
		} catch (err) {
			console.error('Save failed:', err);
		}
		setTimeout(() => setSaved(false), 2000);
	};

	const handleDelete = async () => {
		try {
			await fetch(`/api/layouts/${layoutId}`, { method: 'DELETE' });
			window.location.href = '/layouts';
		} catch (err) {
			console.error('Delete failed:', err);
		}
	};

	const handleChooseParentLayout = () => {
		const parentLayoutId = selectedParentId === NO_PARENT_LAYOUT ? undefined : selectedParentId;
		layout.setParentLayoutId(parentLayoutId);
		setParentLayoutOpen(false);
	};

	return (
		<div className="flex flex-col h-full">
			{/* Toolbar */}
			<header className="flex items-center gap-2 border-b px-4 py-2 bg-background">
				<Button variant="ghost" size="sm" asChild>
					<Link href="/layouts">
						<ChevronLeft className="mr-1 h-4 w-4" /> Back
					</Link>
				</Button>

				<Button variant="outline" size="sm" onClick={() => setParentLayoutOpen(true)}>
					<Layers className="mr-1 h-4 w-4" /> Parent Layout
				</Button>

				<div className="flex items-center gap-1.5">
					<Label htmlFor="layoutName" className="sr-only">
						Layout Name
					</Label>
					<Input
						id="layoutName"
						value={layoutName}
						onChange={(e) => setLayoutName(e.target.value)}
						placeholder="Layout Name"
						className="h-8 w-48"
					/>
				</div>

				<Button size="sm" onClick={handleSave} disabled={saved}>
					{saved ? 'Saving...' : 'Save'}
					<Save className="ml-1 h-4 w-4" />
				</Button>

				<Button size="sm" variant="destructive" onClick={() => setDeleteOpen(true)}>
					<Trash2 className="h-4 w-4" />
				</Button>
			</header>

			{/* Content area. Extra vertical padding keeps the floating add-before/add-after
			    bands of the first and last components inside the scrollable area. */}
			<div className="flex-1 overflow-auto px-4 py-12">
				<EditorSelectionProvider>
					{/* .site-root severs style inheritance from the admin chrome (all: initial);
					    the component styles rebuild the html/body baseline inside it. */}
					<div className="site-root">
						<div className="site-root__html">
							<div className="site-root__body">
								<LayoutTree layout={parentLayout} cmsExports={cmsExports}>
									{components.length === 0 ? (
										<div className="flex flex-col items-center justify-center gap-4 py-20 text-muted-foreground">
											<p>This layout is empty.</p>
											<Button onClick={() => setAddOpen(true)}>
												<Plus className="mr-1 h-4 w-4" /> Add Your First Component
											</Button>
											<AddComponentDialog
												open={addOpen}
												onOpenChange={setAddOpen}
												parentComponentId={null}
												placement="after"
												context="layout"
											/>
										</div>
									) : (
										<Layout>
											{components.map(({ id, props, name: compName, childComponents }, idx) => (
												<EditableComponent
													key={id}
													id={id}
													index={idx}
													parentComponentId={null}
													name={compName}
													initialProps={props}
													childComponents={childComponents}
													context="layout"
												/>
											))}
										</Layout>
									)}
								</LayoutTree>
							</div>
						</div>
					</div>
				</EditorSelectionProvider>
			</div>

			{/* Parent layout picker dialog */}
			<Dialog open={parentLayoutOpen} onOpenChange={setParentLayoutOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Parent Layout</DialogTitle>
					</DialogHeader>
					<div className="grid grid-cols-[minmax(0,1fr)] gap-4">
						<Label>Nest this layout inside another layout.</Label>
						<Select value={selectedParentId} onValueChange={setSelectedParentId}>
							<SelectTrigger>
								<SelectValue placeholder="No parent layout" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value={NO_PARENT_LAYOUT}>No parent layout</SelectItem>
								{layouts
									.filter((l) => l.id !== layoutId)
									.map(({ id, name: lName }) => (
										<SelectItem key={id} value={id}>
											{lName}
										</SelectItem>
									))}
							</SelectContent>
						</Select>
					</div>
					<DialogFooter>
						<Button onClick={handleChooseParentLayout}>Update Layout</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Delete confirmation dialog */}
			<Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Delete Layout</DialogTitle>
					</DialogHeader>
					<p className="text-sm text-muted-foreground">Are you sure you want to delete this layout?</p>
					<DialogFooter>
						<Button variant="outline" onClick={() => setDeleteOpen(false)}>
							Cancel
						</Button>
						<Button variant="destructive" onClick={handleDelete}>
							Delete
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};
