'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '~/components/dialog';
import { Button } from '~/components/button';
import { Field, FieldGroup, FieldLabel } from '~/components/field';
import { Input } from '~/components/input';
import { normalizePageSlug, pageNameToSlug } from '~/lib/page-slug';

type CreatePageDialogProps = {
	action: (formData: FormData) => void | Promise<void>;
	existingSlugs: string[];
};

export function CreatePageDialog({ action, existingSlugs }: CreatePageDialogProps) {
	const [open, setOpen] = useState(false);
	const [name, setName] = useState('');
	const [slug, setSlug] = useState('');
	const [slugEdited, setSlugEdited] = useState(false);
	const [error, setError] = useState('');
	const reserved = new Set(existingSlugs.map(normalizePageSlug));

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>
					<Plus className="mr-1 h-4 w-4" /> New Page
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>New Page</DialogTitle>
				</DialogHeader>
				<form
					action={action}
					onSubmit={(event) => {
						const normalized = normalizePageSlug(slug);
						if (normalized === '') {
							event.preventDefault();
							setError('Slug is required.');
						} else if (reserved.has(normalized)) {
							event.preventDefault();
							setError('This slug is already used by another page.');
						}
					}}
				>
					<FieldGroup>
						<Field>
							<FieldLabel htmlFor="page-name">Page Name</FieldLabel>
							<Input
								id="page-name"
								name="page-name"
								value={name}
								onChange={(event) => {
									const nextName = event.target.value;
									setName(nextName);
									if (slugEdited === false) setSlug(pageNameToSlug(nextName));
								}}
							/>
						</Field>
						<Field>
							<FieldLabel htmlFor="page-slug">Slug</FieldLabel>
							<Input
								id="page-slug"
								name="page-slug"
								value={slug}
								aria-invalid={error !== ''}
								aria-describedby={error !== '' ? 'new-page-slug-error' : undefined}
								onChange={(event) => {
									setSlugEdited(true);
									setSlug(event.target.value);
									setError('');
								}}
							/>
							{error !== '' ? (
								<p id="new-page-slug-error" role="alert" className="text-sm text-destructive">
									{error}
								</p>
							) : null}
						</Field>
						<Field>
							<Button type="button" variant="outline" onClick={() => setOpen(false)}>
								Cancel
							</Button>
							<Button type="submit">Create</Button>
						</Field>
					</FieldGroup>
				</form>
			</DialogContent>
		</Dialog>
	);
}
