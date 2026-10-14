'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '~/components/dialog';
import { Button } from '~/components/button';
import { Field, FieldGroup, FieldLabel } from '~/components/field';
import { Input } from '~/components/input';

type CreateLayoutDialogProps = {
	action: (formData: FormData) => void | Promise<void>;
};

export function CreateLayoutDialog({ action }: CreateLayoutDialogProps) {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>
					<Plus className="mr-1 h-4 w-4" /> New Layout
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>New Layout</DialogTitle>
				</DialogHeader>
				<form action={action}>
					<FieldGroup>
						<Field>
							<FieldLabel htmlFor="layout-name">Layout Name</FieldLabel>
							<Input id="layout-name" name="layout-name" />
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
