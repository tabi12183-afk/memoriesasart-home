import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { CreateLayoutDialog } from '~/components/create-layout-dialog';
import { CreatePageDialog } from '~/components/create-page-dialog';
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSeparator,
	FieldSet,
	FieldTitle,
} from '~/components/field';

describe('Field components', () => {
	it('renders a complete field layout', () => {
		render(
			<FieldSet>
				<FieldLegend variant="label">Legend</FieldLegend>
				<FieldGroup>
					<Field orientation="horizontal">
						<FieldContent>
							<FieldTitle>Title</FieldTitle>
							<FieldDescription>Description</FieldDescription>
						</FieldContent>
						<FieldLabel htmlFor="x">Label</FieldLabel>
					</Field>
					<FieldSeparator>or</FieldSeparator>
				</FieldGroup>
			</FieldSet>,
		);
		expect(screen.getByText('Legend')).toBeInTheDocument();
		expect(screen.getByText('or')).toBeInTheDocument();
		expect(document.querySelector('[data-slot="field"]')).toHaveAttribute('data-orientation', 'horizontal');
	});

	it('renders a separator without content and a responsive field', () => {
		const { container } = render(
			<FieldGroup>
				<Field orientation="responsive">Responsive</Field>
				<FieldSeparator>{null}</FieldSeparator>
			</FieldGroup>,
		);
		expect(container.querySelector('[data-content="false"]')).toBeInTheDocument();
	});

	it('renders nothing without errors or children', () => {
		const { container } = render(<FieldError />);
		expect(container).toBeEmptyDOMElement();
	});

	it('prefers explicit children over the error list', () => {
		render(<FieldError errors={[{ message: 'ignored' }]}>Custom error</FieldError>);
		expect(screen.getByRole('alert')).toHaveTextContent('Custom error');
	});

	it('renders a single unique error as plain text', () => {
		render(<FieldError errors={[{ message: 'Required' }, { message: 'Required' }]} />);
		expect(screen.getByRole('alert')).toHaveTextContent('Required');
		expect(screen.queryByRole('list')).not.toBeInTheDocument();
	});

	it('renders multiple unique errors as a list, skipping blanks', () => {
		render(<FieldError errors={[{ message: 'Too short' }, { message: 'Invalid' }, undefined]} />);
		expect(screen.getByRole('alert')).toBeInTheDocument();
		expect(screen.getAllByRole('listitem')).toHaveLength(2);
	});
});

describe('CreateLayoutDialog', () => {
	it('opens, cancels, and submits the layout form', async () => {
		const action = vi.fn();
		render(<CreateLayoutDialog action={action} />);

		await userEvent.click(screen.getByRole('button', { name: /New Layout/ }));
		expect(await screen.findByLabelText('Layout Name')).toBeInTheDocument();

		await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
		expect(screen.queryByLabelText('Layout Name')).not.toBeInTheDocument();

		await userEvent.click(screen.getByRole('button', { name: /New Layout/ }));
		await userEvent.type(await screen.findByLabelText('Layout Name'), 'Main layout');
		await userEvent.click(screen.getByRole('button', { name: 'Create' }));
		expect(action).toHaveBeenCalled();
	});
});

describe('CreatePageDialog', () => {
	it('derives the slug from the page name until the slug is edited', async () => {
		render(<CreatePageDialog action={vi.fn()} existingSlugs={[]} />);
		await userEvent.click(screen.getByRole('button', { name: /New Page/ }));

		const nameInput = await screen.findByLabelText('Page Name');
		await userEvent.type(nameInput, 'About Us');
		expect(screen.getByLabelText('Slug')).toHaveValue('about-us');

		await userEvent.clear(screen.getByLabelText('Slug'));
		await userEvent.type(screen.getByLabelText('Slug'), 'custom-slug');
		await userEvent.type(nameInput, ' Again');
		expect(screen.getByLabelText('Slug')).toHaveValue('custom-slug');
	});

	it('blocks submission for an empty slug', async () => {
		const action = vi.fn();
		render(<CreatePageDialog action={action} existingSlugs={[]} />);
		await userEvent.click(screen.getByRole('button', { name: /New Page/ }));
		await userEvent.click(await screen.findByRole('button', { name: 'Create' }));
		expect(await screen.findByRole('alert')).toHaveTextContent('Slug is required.');
		expect(action).not.toHaveBeenCalled();
	});

	it('blocks submission for a slug that is already taken', async () => {
		const action = vi.fn();
		render(<CreatePageDialog action={action} existingSlugs={['taken']} />);
		await userEvent.click(screen.getByRole('button', { name: /New Page/ }));
		await userEvent.type(await screen.findByLabelText('Slug'), 'taken');
		await userEvent.click(screen.getByRole('button', { name: 'Create' }));
		expect(await screen.findByRole('alert')).toHaveTextContent('already used');
		expect(action).not.toHaveBeenCalled();
	});

	it('submits and can be cancelled', async () => {
		const action = vi.fn();
		render(<CreatePageDialog action={action} existingSlugs={[]} />);
		await userEvent.click(screen.getByRole('button', { name: /New Page/ }));
		await userEvent.type(await screen.findByLabelText('Page Name'), 'Contact');
		await userEvent.click(screen.getByRole('button', { name: 'Create' }));
		expect(action).toHaveBeenCalled();

		await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
		expect(screen.queryByLabelText('Page Name')).not.toBeInTheDocument();
	});
});
