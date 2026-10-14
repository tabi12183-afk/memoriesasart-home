import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

const { themeState } = vi.hoisted(() => ({
	themeState: { resolvedTheme: 'light' as string },
}));

vi.mock('next-themes', () => ({
	useTheme: () => themeState,
}));

import { MarkdownEditor } from '~/components/markdown-editor';

afterEach(() => {
	themeState.resolvedTheme = 'light';
	document.querySelectorAll('.mdxeditor-popup-container').forEach((el) => el.remove());
});

describe('MarkdownEditor', () => {
	it('renders a labelled MDX editor with toolbar', async () => {
		const onChange = vi.fn();
		render(<MarkdownEditor id="content" label="Content" value="Hello **world**" onChange={onChange} />);
		expect(screen.getByText('Content')).toBeInTheDocument();
		expect(await screen.findByText(/Hello/)).toBeInTheDocument();
	});

	it('applies the dark theme class when the app is dark', () => {
		themeState.resolvedTheme = 'dark';
		const { container } = render(<MarkdownEditor id="c" label="Content" value="" onChange={() => {}} />);
		expect(container.querySelector('.dark-theme')).not.toBeNull();
	});

	it('re-homes the MDX popup container so dialogs inherit the theme', async () => {
		const { container } = render(<MarkdownEditor id="c" label="Content" value="" onChange={() => {}} />);
		const firstPopup = document.createElement('div');
		firstPopup.className = 'mdxeditor-popup-container';
		document.body.appendChild(firstPopup);

		// Wait for the first popup to be re-homed into the component.
		await waitFor(() => expect(container.contains(firstPopup)).toBe(true), { timeout: 2000 });

		// A popup that is already hosted should be left alone while a body popup is re-homed.
		const secondPopup = document.createElement('div');
		secondPopup.className = 'mdxeditor-popup-container';
		document.body.appendChild(secondPopup);

		await waitFor(() => expect(container.contains(secondPopup)).toBe(true), { timeout: 2000 });
	});
});
