import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { Dropzone } from '~/components/dropzone';
import { nullish } from '~/lib/utils';

beforeAll(() => {
	// jsdom has no object URL support.
	URL.createObjectURL = vi.fn(() => 'blob:preview');
	URL.revokeObjectURL = vi.fn();
});

const file = (name: string) => new File(['data'], name, { type: 'image/png' });

const fileInput = () => document.getElementById('dropzone-file') as HTMLInputElement;

beforeEach(() => {
	vi.clearAllMocks();
});

describe('Dropzone', () => {
	it('selects a single file via the file input and derives its name', async () => {
		render(<Dropzone onFileUpload={vi.fn()} />);
		await userEvent.upload(fileInput(), file('sunset.png'));
		expect(screen.getByText('sunset.png')).toBeInTheDocument();
		expect(screen.getByPlaceholderText('Image name')).toHaveValue('sunset');
		expect(screen.getByText('1 item selected')).toBeInTheDocument();
	});

	it('keeps only the first file when multiSelect is off', async () => {
		render(<Dropzone onFileUpload={vi.fn()} />);
		fireEvent.change(fileInput(), { target: { files: [file('a.png'), file('b.png')] } });
		expect(screen.getByText('a.png')).toBeInTheDocument();
		expect(screen.queryByText('b.png')).not.toBeInTheDocument();
	});

	it('accepts multiple files when multiSelect is on and can clear them all', async () => {
		render(<Dropzone onFileUpload={vi.fn()} multiSelect />);
		await userEvent.upload(fileInput(), [file('a.png'), file('b.png')]);
		expect(screen.getByText('2 items selected')).toBeInTheDocument();
		await userEvent.click(screen.getByRole('button', { name: 'Clear All' }));
		expect(screen.getByText('0 items selected')).toBeInTheDocument();
	});

	it('highlights the target while dragging and accepts dropped files', () => {
		render(<Dropzone onFileUpload={vi.fn()} multiSelect />);
		const target = screen.getByText('Drag & drop files here').closest('div[class*="border-dashed"]')!;
		fireEvent.dragOver(target);
		expect(screen.getByText('Drop files here')).toBeInTheDocument();
		fireEvent.dragLeave(target);
		expect(screen.getByText('Drag & drop files here')).toBeInTheDocument();

		fireEvent.drop(target, { dataTransfer: { files: [file('dropped.png'), file('other.png')] } });
		expect(screen.getByText('dropped.png')).toBeInTheDocument();
		expect(screen.getByText('other.png')).toBeInTheDocument();
	});

	it('drops a single file when multiSelect is off and ignores empty drops', () => {
		render(<Dropzone />);
		const target = screen.getByText('Drag & drop files here').closest('div[class*="border-dashed"]')!;
		fireEvent.drop(target, { dataTransfer: { files: [] } });
		expect(screen.getByText('0 items selected')).toBeInTheDocument();
		fireEvent.drop(target, { dataTransfer: { files: [file('one.png'), file('two.png')] } });
		expect(screen.getByText('one.png')).toBeInTheDocument();
		expect(screen.queryByText('two.png')).not.toBeInTheDocument();
	});

	it('edits per-file metadata and removes files', async () => {
		render(<Dropzone onFileUpload={vi.fn()} />);
		await userEvent.upload(fileInput(), file('photo.png'));

		await userEvent.clear(screen.getByPlaceholderText('Image name'));
		await userEvent.type(screen.getByPlaceholderText('Image name'), 'Renamed');
		await userEvent.type(screen.getByPlaceholderText('Description for accessibility'), 'A photo');
		await userEvent.type(screen.getByPlaceholderText('e.g., nature, landscape'), 'travel');
		expect(screen.getByPlaceholderText('Image name')).toHaveValue('Renamed');
		expect(screen.getByPlaceholderText('Description for accessibility')).toHaveValue('A photo');
		expect(screen.getByPlaceholderText('e.g., nature, landscape')).toHaveValue('travel');

		await userEvent.click(screen.getByRole('button', { name: 'Remove photo.png' }));
		expect(screen.queryByText('photo.png')).not.toBeInTheDocument();
		expect(URL.revokeObjectURL).toHaveBeenCalled();
	});

	it('edits metadata for one of several selected files', async () => {
		render(<Dropzone onFileUpload={vi.fn()} multiSelect />);
		await userEvent.upload(fileInput(), [file('a.png'), file('b.png')]);
		const [name1, name2] = screen.getAllByPlaceholderText('Image name');
		if (nullish(name1) || nullish(name2)) {
			throw new Error('Expected two name inputs');
		}
		await userEvent.clear(name2);
		await userEvent.type(name2, 'Second');
		expect(name2).toHaveValue('Second');
		expect(name1).toHaveValue('a');
	});

	it('uploads every selected file with its metadata', async () => {
		const onFileUpload = vi.fn();
		render(<Dropzone onFileUpload={onFileUpload} multiSelect />);
		await userEvent.upload(fileInput(), [file('a.png'), file('b.png')]);
		await userEvent.click(screen.getByRole('button', { name: 'Choose Selected' }));
		expect(onFileUpload).toHaveBeenCalledTimes(2);
		expect(onFileUpload).toHaveBeenCalledWith(expect.any(File), { name: 'a', alt: '', tags: '' });
		expect(screen.getByText('0 items selected')).toBeInTheDocument();
	});

	it('disables the choose button when no onFileUpload handler is provided', async () => {
		render(<Dropzone />);
		fireEvent.change(fileInput(), { target: { files: [file('a.png')] } });
		const chooseButton = screen.getByRole('button', { name: 'Choose Selected' });
		expect(chooseButton).toBeDisabled();
	});

	it('ignores empty file input changes', () => {
		render(<Dropzone onFileUpload={vi.fn()} />);
		fireEvent.change(fileInput(), { target: { files: [] } });
		expect(screen.getByText('0 items selected')).toBeInTheDocument();
	});

	it('keeps the selection when an upload fails', async () => {
		const onFileUpload = vi.fn().mockRejectedValueOnce(new Error('fail'));
		render(<Dropzone onFileUpload={onFileUpload} />);
		await userEvent.upload(fileInput(), file('fail.png'));
		await userEvent.click(screen.getByRole('button', { name: 'Choose Selected' }));
		expect(screen.getByText('1 item selected')).toBeInTheDocument();
	});

	it('falls back to the image accept filter for unknown media types', () => {
		render(<Dropzone mediaType="video" />);
		expect(fileInput()).toHaveAttribute('accept', 'image/*');
	});
});
