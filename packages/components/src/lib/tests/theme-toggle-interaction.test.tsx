import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { THEME_STORAGE_KEY, ThemeToggle } from '../theme-toggle';

/**
 * The site root is `<html>` on the live site and a wrapper div inside the page
 * builder's preview. The toggle walks up to whichever it finds, so the tests
 * mount it under the same wrapper the admin uses.
 */
const inSiteRoot = (ui: React.ReactElement) => {
	const root = document.createElement('div');
	root.className = 'site-root__html';
	document.body.append(root);
	return { root, ...render(ui, { container: root }) };
};

const control = () => screen.getByRole('switch');

afterEach(() => {
	window.localStorage.clear();
	document.querySelectorAll('.site-root__html').forEach((node) => {
		node.remove();
	});
});

describe('ThemeToggle behaviour', () => {
	it('switches the site root to dark and back', async () => {
		const user = userEvent.setup();
		const { root } = inSiteRoot(<ThemeToggle />);

		await user.click(control());
		expect(root.classList.contains('theme--dark')).toBe(true);
		expect(control()).toHaveAttribute('aria-checked', 'true');

		await user.click(control());
		expect(root.classList.contains('theme--dark')).toBe(false);
		expect(root.classList.contains('theme--light')).toBe(true);
		expect(control()).toHaveAttribute('aria-checked', 'false');
	});

	it('remembers the choice for the next visit', async () => {
		const user = userEvent.setup();
		inSiteRoot(<ThemeToggle />);

		await user.click(control());

		expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
	});

	it('adopts the scheme already applied to the site root', () => {
		const root = document.createElement('div');
		root.className = 'site-root__html theme--dark';
		document.body.append(root);
		render(<ThemeToggle />, { container: root });

		// The layout script may have applied a remembered choice before React
		// ran; the control has to agree with the page it is sitting on.
		expect(control()).toHaveAttribute('aria-checked', 'true');
	});

	it('still switches when storage is unavailable', async () => {
		const user = userEvent.setup();
		const setItem = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
			throw new Error('denied');
		});
		const { root } = inSiteRoot(<ThemeToggle />);

		await user.click(control());

		// Private browsing refuses storage. The visitor's click must still work;
		// it just is not remembered.
		expect(root.classList.contains('theme--dark')).toBe(true);
		setItem.mockRestore();
	});

	it('does nothing when it is not inside a site root', async () => {
		const user = userEvent.setup();
		render(<ThemeToggle />);

		await user.click(control());

		expect(control()).toHaveAttribute('aria-checked', 'false');
		expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBeNull();
	});
});
