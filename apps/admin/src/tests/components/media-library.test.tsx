import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { MediaItem } from '@stormycms/core';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

const { toast } = vi.hoisted(() => ({
	toast: { success: vi.fn(), error: vi.fn() },
}));

vi.mock('sonner', async (importOriginal) => ({
	...(await importOriginal<typeof import('sonner')>()),
	toast,
}));

import { MediaLibrary } from '~/components/media-library';

const mediaItem = (id: string): MediaItem =>
	({
		id,
		type: 'image',
		url: `https://cdn.test/${id}.png`,
		name: `${id}.png`,
		metadata: {},
		siteId: 'site',
		createdAt: '',
		updatedAt: '',
	}) as MediaItem;

const fetchMock = vi.fn();

beforeAll(() => {
	URL.createObjectURL = vi.fn(() => 'blob:preview');
	URL.revokeObjectURL = vi.fn();
});

beforeEach(() => {
	fetchMock.mockReset();
	toast.success.mockClear();
	toast.error.mockClear();
	vi.stubGlobal('fetch', fetchMock);
	vi.spyOn(console, 'log').mockImplementation(() => {});
	vi.spyOn(console, 'error').mockImplementation(() => {});
});

const openDialog = async (label: RegExp) => {
	await userEvent.click(await screen.findByRole('button', { name: label }));
	expect(await screen.findByRole('dialog')).toBeInTheDocument();
};

describe('MediaLibrary (uncontrolled)', () => {
	it('fetches the library and uploads a file successfully', async () => {
		fetchMock
			.mockResolvedValueOnce({ ok: true, json: async () => ({ uploads: true, media: [mediaItem('existing')] }) })
			.mockResolvedValueOnce({ ok: true, json: async () => ({ uploads: true, media: mediaItem('uploaded') }) });
		const onSelect = vi.fn();
		const onUpload = vi.fn();

		render(<MediaLibrary selectionMode onSelect={onSelect} onUpload={onUpload} />);
		expect(screen.getByTestId('cms-media-field')).toBeInTheDocument();
		await openDialog(/Choose Media/);

		const input = document.getElementById('dropzone-file') as HTMLInputElement;
		await userEvent.upload(input, new File(['x'], 'pic.png', { type: 'image/png' }));
		await userEvent.click(screen.getByRole('button', { name: 'Choose Selected' }));

		await waitFor(() => expect(toast.success).toHaveBeenCalledWith('pic.png uploaded successfully.'));
		expect(onSelect).toHaveBeenCalledWith([expect.objectContaining({ id: 'uploaded' })]);
		expect(onUpload).toHaveBeenCalledWith(expect.objectContaining({ id: 'uploaded' }));
		await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
	});

	it('surfaces upload failures as error toasts', async () => {
		fetchMock
			.mockResolvedValueOnce({ ok: true, json: async () => ({ uploads: true, media: [] }) })
			.mockResolvedValueOnce({ ok: false, json: async () => ({ error: 'Storage offline' }) });

		render(<MediaLibrary showLibraryTab={false} />);
		await openDialog(/Upload Media/);

		const input = document.getElementById('dropzone-file') as HTMLInputElement;
		await userEvent.upload(input, new File(['x'], 'pic.png', { type: 'image/png' }));
		await userEvent.click(screen.getByRole('button', { name: 'Choose Selected' }));

		await waitFor(() => expect(toast.error).toHaveBeenCalledWith('Storage offline'));
		expect(screen.getByRole('dialog')).toBeInTheDocument();
	});

	it('reports uploads that return no media', async () => {
		fetchMock
			.mockResolvedValueOnce({ ok: true, json: async () => ({ uploads: true, media: [] }) })
			.mockResolvedValueOnce({ ok: true, json: async () => ({}) });

		render(<MediaLibrary showLibraryTab={false} />);
		await openDialog(/Upload Media/);

		const input = document.getElementById('dropzone-file') as HTMLInputElement;
		await userEvent.upload(input, new File(['x'], 'pic.png', { type: 'image/png' }));
		await userEvent.click(screen.getByRole('button', { name: 'Choose Selected' }));

		await waitFor(() => expect(toast.error).toHaveBeenCalledWith('Unable to upload media. Please try again.'));
	});

	it('reports uploads whose response JSON cannot be parsed', async () => {
		fetchMock
			.mockResolvedValueOnce({ ok: true, json: async () => ({ uploads: true, media: [] }) })
			.mockResolvedValueOnce({
				ok: true,
				json: async () => {
					throw new Error('bad json');
				},
			});

		render(<MediaLibrary showLibraryTab={false} />);
		await openDialog(/Upload Media/);

		const input = document.getElementById('dropzone-file') as HTMLInputElement;
		await userEvent.upload(input, new File(['x'], 'pic.png', { type: 'image/png' }));
		await userEvent.click(screen.getByRole('button', { name: 'Choose Selected' }));

		await waitFor(() => expect(toast.error).toHaveBeenCalledWith('Unable to upload media. Please try again.'));
	});

	it('reports upload failures that are not Error instances', async () => {
		fetchMock
			.mockResolvedValueOnce({ ok: true, json: async () => ({ uploads: true, media: [] }) })
			.mockRejectedValueOnce('network failure');

		render(<MediaLibrary showLibraryTab={false} />);
		await openDialog(/Upload Media/);

		const input = document.getElementById('dropzone-file') as HTMLInputElement;
		await userEvent.upload(input, new File(['x'], 'pic.png', { type: 'image/png' }));
		await userEvent.click(screen.getByRole('button', { name: 'Choose Selected' }));

		await waitFor(() => expect(toast.error).toHaveBeenCalledWith('Unable to upload media. Please try again.'));
	});

	it('creates URL media through the URL tab', async () => {
		fetchMock
			.mockResolvedValueOnce({ ok: true, json: async () => ({ uploads: true, media: [] }) })
			.mockResolvedValueOnce({ ok: true, json: async () => ({ uploads: true, media: mediaItem('from-url') }) });
		const onSelect = vi.fn();
		const onUpload = vi.fn();

		render(<MediaLibrary onSelect={onSelect} onUpload={onUpload} />);
		await openDialog(/Add Media/);
		await userEvent.click(screen.getByRole('tab', { name: 'URL' }));

		await userEvent.type(screen.getByRole('textbox', { name: 'URL' }), 'https://example.com/photos/cat.png');
		await userEvent.click(screen.getByRole('button', { name: 'Add Media' }));
		expect(screen.getByText('https://example.com/photos/cat.png')).toBeInTheDocument();
		expect(screen.getByPlaceholderText('Media name')).toHaveValue('cat.png');

		await userEvent.type(screen.getByPlaceholderText('Description for accessibility'), 'A cat');
		await userEvent.type(screen.getByPlaceholderText('e.g., nature, landscape'), 'pets');

		await userEvent.click(screen.getByRole('button', { name: 'Choose Selected' }));
		await waitFor(() => expect(onSelect).toHaveBeenCalledWith([expect.objectContaining({ id: 'from-url' })]));
		expect(onUpload).toHaveBeenCalled();

		const formData: FormData = fetchMock.mock.calls[1]?.[1].body;
		expect(formData.get('url')).toBe('https://example.com/photos/cat.png');
		expect(formData.get('tags')).toBe('pets');
	});

	it('reports URL creation failures that are not Error instances', async () => {
		fetchMock
			.mockResolvedValueOnce({ ok: true, json: async () => ({ uploads: true, media: [] }) })
			.mockRejectedValueOnce('bad request');

		render(<MediaLibrary />);
		await openDialog(/Add Media/);
		await userEvent.click(screen.getByRole('tab', { name: 'URL' }));
		await userEvent.type(screen.getByRole('textbox', { name: 'URL' }), 'https://example.com/x.png');
		await userEvent.click(screen.getByRole('button', { name: 'Add Media' }));
		await userEvent.click(screen.getByRole('button', { name: 'Choose Selected' }));

		await waitFor(() => expect(toast.error).toHaveBeenCalledWith('Unable to add URL media. Please try again.'));
	});

	it('reports URL creation failures and keeps the dialog open', async () => {
		fetchMock
			.mockResolvedValueOnce({ ok: true, json: async () => ({ uploads: true, media: [] }) })
			.mockResolvedValueOnce({
				ok: false,
				json: async () => {
					throw new Error('bad json');
				},
			});

		render(<MediaLibrary />);
		await openDialog(/Add Media/);
		await userEvent.click(screen.getByRole('tab', { name: 'URL' }));
		await userEvent.type(screen.getByRole('textbox', { name: 'URL' }), 'not-a-valid-url');
		await userEvent.click(screen.getByRole('button', { name: 'Add Media' }));
		// Invalid URLs fall back to the raw string as the name.
		expect(screen.getByPlaceholderText('Media name')).toHaveValue('not-a-valid-url');

		await userEvent.click(screen.getByRole('button', { name: 'Choose Selected' }));
		await waitFor(() => expect(toast.error).toHaveBeenCalledWith('Unable to add URL media. Please try again.'));
	});

	it('falls back to the full URL when the path has no filename', async () => {
		fetchMock.mockResolvedValueOnce({ ok: true, json: async () => ({ uploads: true, media: [] }) });
		render(<MediaLibrary />);
		await openDialog(/Add Media/);
		await userEvent.click(screen.getByRole('tab', { name: 'URL' }));

		await userEvent.type(screen.getByRole('textbox', { name: 'URL' }), 'https://example.com/');
		await userEvent.click(screen.getByRole('button', { name: 'Add Media' }));
		expect(screen.getByPlaceholderText('Media name')).toHaveValue('https://example.com/');
	});

	it('manages URL entries: single-select replacement, remove, and clear all', async () => {
		fetchMock.mockResolvedValueOnce({ ok: true, json: async () => ({ uploads: true, media: [] }) });
		render(<MediaLibrary />);
		await openDialog(/Add Media/);
		await userEvent.click(screen.getByRole('tab', { name: 'URL' }));

		const urlInput = screen.getByRole('textbox', { name: 'URL' });
		// Empty URL is a no-op.
		await userEvent.click(screen.getByRole('button', { name: 'Add Media' }));
		expect(screen.getByText('0 items selected')).toBeInTheDocument();

		await userEvent.type(urlInput, 'https://example.com/a.png');
		await userEvent.click(screen.getByRole('button', { name: 'Add Media' }));
		await userEvent.type(urlInput, 'https://example.com/b.png');
		await userEvent.click(screen.getByRole('button', { name: 'Add Media' }));
		// Single-select keeps only the latest URL.
		expect(screen.queryByText('https://example.com/a.png')).not.toBeInTheDocument();
		expect(screen.getByText('https://example.com/b.png')).toBeInTheDocument();

		await userEvent.clear(screen.getByPlaceholderText('Media name'));
		await userEvent.type(screen.getByPlaceholderText('Media name'), 'renamed');
		expect(screen.getByPlaceholderText('Media name')).toHaveValue('renamed');

		const removeButton = document.querySelector('.space-y-2 button[type="button"]') as HTMLElement;
		await userEvent.click(removeButton);
		expect(screen.queryByText('https://example.com/b.png')).not.toBeInTheDocument();
	});

	it('edits metadata for one of several URL entries', async () => {
		fetchMock.mockResolvedValueOnce({ ok: true, json: async () => ({ uploads: true, media: [] }) });
		render(<MediaLibrary multiSelect />);
		await openDialog(/Add Media/);
		await userEvent.click(screen.getByRole('tab', { name: 'URL' }));

		const urlInput = screen.getByRole('textbox', { name: 'URL' });
		await userEvent.type(urlInput, 'https://example.com/a.png');
		await userEvent.click(screen.getByRole('button', { name: 'Add Media' }));
		await userEvent.type(urlInput, 'https://example.com/b.png');
		await userEvent.click(screen.getByRole('button', { name: 'Add Media' }));

		const nameInputs = screen.getAllByPlaceholderText('Media name');
		if (nameInputs[0] === undefined || nameInputs[1] === undefined) {
			throw new Error('Expected at least two name inputs');
		}
		await userEvent.clear(nameInputs[1]);
		await userEvent.type(nameInputs[1], 'Second');

		const altInputs = screen.getAllByPlaceholderText('Description for accessibility');
		if (altInputs[1] === undefined) {
			throw new Error('Expected at least two alt inputs');
		}
		await userEvent.type(altInputs[1], 'Alt text');
		await userEvent.clear(altInputs[1]);

		const tagInputs = screen.getAllByPlaceholderText('e.g., nature, landscape');
		if (tagInputs[1] === undefined) {
			throw new Error('Expected at least two tag inputs');
		}
		await userEvent.type(tagInputs[1], 'b');

		expect(nameInputs[0]).toHaveValue('a.png');
		expect(nameInputs[1]).toHaveValue('Second');
		expect(altInputs[1]).toHaveValue('');
	});

	it('clears multiple URLs with Clear All in multi-select mode', async () => {
		fetchMock.mockResolvedValueOnce({ ok: true, json: async () => ({ uploads: true, media: [] }) });
		render(<MediaLibrary multiSelect />);
		await openDialog(/Add Media/);
		await userEvent.click(screen.getByRole('tab', { name: 'URL' }));

		const urlInput = screen.getByRole('textbox', { name: 'URL' });
		await userEvent.type(urlInput, 'https://example.com/a.png');
		await userEvent.click(screen.getByRole('button', { name: 'Add Media' }));
		await userEvent.type(urlInput, 'https://example.com/b.png');
		await userEvent.click(screen.getByRole('button', { name: 'Add Media' }));
		expect(screen.getByText('2 items selected')).toBeInTheDocument();

		await userEvent.click(screen.getByRole('button', { name: 'Clear All' }));
		expect(screen.getByText('0 items selected')).toBeInTheDocument();
	});

	it('selects existing media from the library tab', async () => {
		fetchMock.mockResolvedValueOnce({ ok: true, json: async () => ({ uploads: true, media: [mediaItem('lib1')] }) });
		const onSelect = vi.fn();
		render(<MediaLibrary onSelect={onSelect} />);
		await openDialog(/Add Media/);
		await userEvent.click(screen.getByRole('tab', { name: 'Library' }));

		await userEvent.click(await screen.findByRole('button', { name: 'Select' }));
		await userEvent.click(screen.getByRole('button', { name: 'Choose Selected' }));
		expect(onSelect).toHaveBeenCalledWith([expect.objectContaining({ id: 'lib1' })]);
		await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
	});

	it('handles an empty media list from a successful fetch', async () => {
		fetchMock.mockResolvedValueOnce({ ok: true, json: async () => ({}) });
		render(<MediaLibrary />);
		await openDialog(/Add Media/);
		await userEvent.click(screen.getByRole('tab', { name: 'Library' }));
		await waitFor(() => expect(fetchMock).toHaveBeenCalledWith('/api/media'));
		expect(screen.getByText(/No media files yet/)).toBeInTheDocument();
	});

	it('logs when the library fetch returns a non-ok response', async () => {
		fetchMock.mockResolvedValueOnce({ ok: false });
		render(<MediaLibrary />);
		await waitFor(() => expect(console.error).toHaveBeenCalled());
	});

	it('logs but recovers when the library fetch fails', async () => {
		fetchMock.mockRejectedValueOnce(new Error('network down'));
		render(<MediaLibrary />);
		await waitFor(() => expect(console.error).toHaveBeenCalled());
	});

	it('uses a custom trigger when provided', async () => {
		fetchMock.mockResolvedValueOnce({ ok: true, json: async () => ({ uploads: true, media: [] }) });
		render(<MediaLibrary renderTrigger={(onClick) => <button onClick={onClick}>Custom trigger</button>} />);
		await userEvent.click(screen.getByRole('button', { name: 'Custom trigger' }));
		expect(await screen.findByRole('dialog')).toBeInTheDocument();
	});
});

describe('MediaLibrary without media storage', () => {
	it('offers only the URL tab, and says why', async () => {
		fetchMock.mockResolvedValue({ ok: true, json: async () => ({ media: [], uploads: false }) });

		render(<MediaLibrary showLibraryTab={false} />);
		await openDialog(/Add Media/);

		expect(screen.queryByRole('tab', { name: 'Upload' })).not.toBeInTheDocument();
		expect(screen.getByRole('tab', { name: 'URL' })).toHaveAttribute('aria-selected', 'true');
		expect(document.getElementById('dropzone-file')).toBeNull();
		expect(screen.getByRole('status')).toHaveTextContent(
			'Uploading is off until media storage is set up. You can still add media via URL.',
		);
	});

	it('keeps upload hidden when the library cannot be reached to confirm storage', async () => {
		fetchMock.mockRejectedValue(new Error('offline'));

		render(<MediaLibrary selectionMode />);
		await openDialog(/Choose Media/);

		expect(screen.queryByRole('tab', { name: 'Upload' })).not.toBeInTheDocument();
		expect(screen.getByRole('tab', { name: 'URL' })).toHaveAttribute('aria-selected', 'true');
	});
});

describe('MediaLibrary (controlled)', () => {
	it('renders no trigger and never fetches', () => {
		render(<MediaLibrary media={[mediaItem('m1')]} />);
		expect(fetchMock).not.toHaveBeenCalled();
		expect(screen.queryByRole('button', { name: /Add Media/ })).not.toBeInTheDocument();
	});
});
