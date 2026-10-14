import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { MediaItem } from '@stormycms/core';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MediaGrid } from '~/components/media-grid';

const mediaItem = (id: string, overrides: Partial<MediaItem> = {}): MediaItem =>
	({
		id,
		type: 'image',
		url: `/uploads/${id}.png`,
		name: `${id}.png`,
		metadata: { alt: `alt-${id}` },
		siteId: 'site',
		createdAt: '',
		updatedAt: '',
		...overrides,
	}) as MediaItem;

const fetchMock = vi.fn();

beforeEach(() => {
	fetchMock.mockReset();
	vi.stubGlobal('fetch', fetchMock);
	vi.spyOn(console, 'error').mockImplementation(() => {});
});

describe('MediaGrid (uncontrolled)', () => {
	it('shows loading skeletons then fetched media', async () => {
		fetchMock.mockResolvedValue({ ok: true, json: async () => ({ media: [mediaItem('m1')] }) });
		const { container } = render(<MediaGrid />);
		expect(container.querySelectorAll('.animate-pulse').length).toBe(6);
		expect(await screen.findByTestId('media-grid')).toBeInTheDocument();
		expect(screen.getByAltText('alt-m1')).toBeInTheDocument();
		expect(fetchMock).toHaveBeenCalledWith('/api/media');
	});

	it('ignores an update whose returned media id is unknown', async () => {
		fetchMock
			.mockResolvedValueOnce({ ok: true, json: async () => ({ media: [mediaItem('m1')] }) })
			.mockResolvedValueOnce({ ok: true, json: async () => ({ media: mediaItem('unknown') }) });

		render(<MediaGrid />);
		await userEvent.click(await screen.findByRole('button', { name: 'Edit' }));
		await userEvent.click(screen.getByRole('button', { name: /Save Changes/ }));

		await waitFor(() => expect(screen.queryByText('Edit Media')).not.toBeInTheDocument());
		expect(screen.getByAltText('alt-m1')).toBeInTheDocument();
	});

	it('handles a missing media array in the response', async () => {
		fetchMock.mockResolvedValue({ ok: true, json: async () => ({}) });
		render(<MediaGrid emptyMessage="Nothing here" />);
		expect(await screen.findByText('Nothing here')).toBeInTheDocument();
	});

	it('recovers from fetch failures with an empty grid', async () => {
		fetchMock.mockResolvedValue({ ok: false });
		render(<MediaGrid />);
		expect(await screen.findByText(/No media files yet/)).toBeInTheDocument();
	});

	it('opens the edit dialog and saves changes', async () => {
		const updated = mediaItem('m1', { name: 'renamed.png' });
		fetchMock
			.mockResolvedValueOnce({ ok: true, json: async () => ({ media: [mediaItem('m1')] }) })
			.mockResolvedValueOnce({ ok: true, json: async () => ({ media: updated }) });

		render(<MediaGrid />);
		await userEvent.click(await screen.findByRole('button', { name: 'Edit' }));
		expect(await screen.findByText('Edit Media')).toBeInTheDocument();

		await userEvent.clear(screen.getByLabelText('Image Name'));
		await userEvent.type(screen.getByLabelText('Image Name'), 'renamed.png');
		await userEvent.click(screen.getByRole('button', { name: /Save Changes/ }));

		await waitFor(() => expect(screen.queryByText('Edit Media')).not.toBeInTheDocument());
		expect(fetchMock).toHaveBeenLastCalledWith('/api/media', expect.objectContaining({ method: 'PUT' }));
		expect(screen.getByAltText(/alt-m1|renamed/)).toBeInTheDocument();
	});

	it('keeps the edit dialog open when saving fails', async () => {
		fetchMock
			.mockResolvedValueOnce({ ok: true, json: async () => ({ media: [mediaItem('m1')] }) })
			.mockResolvedValueOnce({ ok: false });

		render(<MediaGrid />);
		await userEvent.click(await screen.findByRole('button', { name: 'Edit' }));
		await userEvent.click(await screen.findByRole('button', { name: /Save Changes/ }));
		expect(screen.getByText('Edit Media')).toBeInTheDocument();
	});

	it('shows string tags in the edit dialog', async () => {
		fetchMock.mockResolvedValue({
			ok: true,
			json: async () => ({ media: [mediaItem('m1', { metadata: { tags: 'one, two' } } as never)] }),
		});
		render(<MediaGrid />);
		await userEvent.click(await screen.findByRole('button', { name: 'Edit' }));
		expect(await screen.findByLabelText('Tags')).toHaveValue('one, two');
	});

	it('shows array tags joined in the edit dialog', async () => {
		fetchMock.mockResolvedValue({
			ok: true,
			json: async () => ({ media: [mediaItem('m1', { metadata: { tags: ['a', 'b'] } } as never)] }),
		});
		render(<MediaGrid />);
		await userEvent.click(await screen.findByRole('button', { name: 'Edit' }));
		expect(await screen.findByLabelText('Tags')).toHaveValue('a, b');
	});

	it('confirms deletion and removes the item', async () => {
		fetchMock
			.mockResolvedValueOnce({ ok: true, json: async () => ({ media: [mediaItem('m1')] }) })
			.mockResolvedValueOnce({ ok: true });

		render(<MediaGrid />);
		await userEvent.click(await screen.findByRole('button', { name: 'Delete' }));
		expect(await screen.findByText('Delete Media')).toBeInTheDocument();
		await userEvent.click(screen.getByRole('button', { name: /^Delete$/ }));

		await waitFor(() => expect(screen.queryByText('Delete Media')).not.toBeInTheDocument());
		expect(fetchMock).toHaveBeenLastCalledWith('/api/media?id=m1', { method: 'DELETE' });
		expect(screen.getByText(/No media files yet/)).toBeInTheDocument();
	});

	it('can cancel deletion and survives delete failures', async () => {
		fetchMock
			.mockResolvedValueOnce({ ok: true, json: async () => ({ media: [mediaItem('m1')] }) })
			.mockResolvedValueOnce({ ok: false });

		render(<MediaGrid />);
		await userEvent.click(await screen.findByRole('button', { name: 'Delete' }));
		await userEvent.click(await screen.findByRole('button', { name: 'Cancel' }));
		expect(screen.queryByText(/Are you sure/)).not.toBeInTheDocument();

		await userEvent.click(screen.getByRole('button', { name: 'Delete' }));
		await userEvent.click(await screen.findByRole('button', { name: /^Delete$/ }));
		expect(screen.getByText('Delete Media')).toBeInTheDocument();
	});
});

describe('MediaGrid (controlled)', () => {
	it('renders provided media without fetching and filters by type', () => {
		render(
			<MediaGrid
				media={[mediaItem('img1'), mediaItem('vid1', { type: 'video' })]}
				mediaType="image"
				editable={false}
			/>,
		);
		expect(fetchMock).not.toHaveBeenCalled();
		expect(screen.getByAltText('alt-img1')).toBeInTheDocument();
		expect(screen.queryByAltText('alt-vid1')).not.toBeInTheDocument();
	});

	it('falls back to the item name when there is no alt text', () => {
		render(<MediaGrid media={[mediaItem('m1', { metadata: {} } as never)]} editable={false} />);
		expect(screen.getByAltText('m1.png')).toBeInTheDocument();
	});

	it('delegates edit and delete to external handlers', async () => {
		const onEdit = vi.fn();
		const onDelete = vi.fn();
		render(<MediaGrid media={[mediaItem('m1')]} onEdit={onEdit} onDelete={onDelete} />);
		await userEvent.click(screen.getByRole('button', { name: 'Edit' }));
		await userEvent.click(screen.getByRole('button', { name: 'Delete' }));
		expect(onEdit).toHaveBeenCalledWith(expect.objectContaining({ id: 'm1' }));
		expect(onDelete).toHaveBeenCalledWith(expect.objectContaining({ id: 'm1' }));
	});

	it('supports single selection with toggle off', async () => {
		const onSelect = vi.fn();
		render(<MediaGrid media={[mediaItem('m1'), mediaItem('m2')]} selectable editable={false} onSelect={onSelect} />);

		const selectButtons = screen.getAllByRole('button', { name: 'Select' });
		if (selectButtons[0] === undefined) {
			throw new Error('Expected at least one select button');
		}
		await userEvent.click(selectButtons[0]);
		expect(screen.getByRole('button', { name: 'Selected' })).toBeInTheDocument();

		// Single-select swaps the selection to the other item.
		const selectButtons2 = screen.getAllByRole('button', { name: 'Select' });
		if (selectButtons2[0] === undefined) {
			throw new Error('Expected at least one select button');
		}
		await userEvent.click(selectButtons2[0]);
		await userEvent.click(screen.getByRole('button', { name: 'Choose Selected' }));
		expect(onSelect).toHaveBeenCalledTimes(1);
		expect(onSelect.mock.calls[0]?.[0]).toHaveLength(1);

		// Toggling the selected item off empties the selection.
		await userEvent.click(screen.getByRole('button', { name: 'Selected' }));
		expect(screen.queryByRole('button', { name: 'Selected' })).not.toBeInTheDocument();
	});

	it('supports multi selection with Clear All', async () => {
		const onSelect = vi.fn();
		render(
			<MediaGrid
				media={[mediaItem('m1'), mediaItem('m2')]}
				selectable
				multiSelect
				editable={false}
				onSelect={onSelect}
			/>,
		);
		for (const button of screen.getAllByRole('button', { name: 'Select' })) {
			await userEvent.click(button);
		}
		expect(screen.getByText('2 items selected')).toBeInTheDocument();

		// Deselect one to cover the toggle-off branch.
		const selectedButtons = screen.getAllByRole('button', { name: 'Selected' });
		if (selectedButtons[0] === undefined) {
			throw new Error('Expected at least one selected button');
		}
		await userEvent.click(selectedButtons[0]);
		expect(screen.getByText('1 item selected')).toBeInTheDocument();

		// Reselect and confirm.
		const selectButtons = screen.getAllByRole('button', { name: 'Select' });
		if (selectButtons[0] === undefined) {
			throw new Error('Expected at least one select button');
		}
		await userEvent.click(selectButtons[0]);
		await userEvent.click(screen.getByRole('button', { name: 'Choose Selected' }));
		expect(onSelect.mock.calls[0]?.[0]).toHaveLength(2);

		// Clear All empties the selection.
		await userEvent.click(screen.getByRole('button', { name: 'Clear All' }));
		expect(screen.getByText('0 items selected')).toBeInTheDocument();
	});

	it('ignores selection clicks when not selectable', async () => {
		render(<MediaGrid media={[mediaItem('m1')]} editable={false} />);
		expect(screen.queryByRole('button', { name: 'Select' })).not.toBeInTheDocument();
	});
});
