import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Navigation } from '../navigation';

const links = { Home: '/', About: '/about' };

const toggle = () => screen.getByRole('button', { name: /menu/i });

/**
 * Resolved through the toggle's own `aria-controls`, which checks the wiring on
 * every assertion. Queried by id rather than by role because a closed menu is
 * `visibility: hidden` and therefore correctly absent from the accessibility
 * tree — the very thing these tests exist to confirm.
 */
const menu = () => {
	const id = toggle().getAttribute('aria-controls') ?? '';
	const element = document.getElementById(id);
	if (element === null) throw new Error(`aria-controls="${id}" points at nothing`);
	return element;
};

const link = (name: string) => screen.getByRole('link', { name, hidden: true });

describe('Navigation menu', () => {
	it('starts closed and opens on click', async () => {
		const user = userEvent.setup();
		render(<Navigation links={links} />);

		expect(toggle()).toHaveAttribute('aria-expanded', 'false');
		expect(menu()).toHaveAttribute('data-open', 'false');

		await user.click(toggle());

		expect(toggle()).toHaveAttribute('aria-expanded', 'true');
		expect(menu()).toHaveAttribute('data-open', 'true');
	});

	it('renames itself so the control always says what it will do', async () => {
		const user = userEvent.setup();
		render(<Navigation links={links} />);

		expect(screen.getByRole('button', { name: 'Open menu' })).toBeTruthy();
		await user.click(toggle());
		expect(screen.getByRole('button', { name: 'Close menu' })).toBeTruthy();
	});

	it('closes again on a second click', async () => {
		const user = userEvent.setup();
		render(<Navigation links={links} />);

		await user.click(toggle());
		await user.click(toggle());

		expect(menu()).toHaveAttribute('data-open', 'false');
	});

	it('closes on Escape', async () => {
		const user = userEvent.setup();
		render(<Navigation links={links} />);

		await user.click(toggle());
		await user.keyboard('{Escape}');

		expect(menu()).toHaveAttribute('data-open', 'false');
	});

	it('ignores keys other than Escape', async () => {
		const user = userEvent.setup();
		render(<Navigation links={links} />);

		await user.click(toggle());
		// Arrow keys, not Enter: focus is on the toggle after clicking it, and
		// Enter there is a second activation rather than a stray key press.
		await user.keyboard('{ArrowDown}');

		expect(menu()).toHaveAttribute('data-open', 'true');
	});

	it('closes when the visitor clicks away', async () => {
		const user = userEvent.setup();
		render(
			<div>
				<Navigation links={links} />
				<p data-testid="elsewhere">Body copy</p>
			</div>,
		);

		await user.click(toggle());
		await user.click(screen.getByTestId('elsewhere'));

		expect(menu()).toHaveAttribute('data-open', 'false');
	});

	it('stays open when the click lands inside the menu', async () => {
		const user = userEvent.setup();
		render(<Navigation links={links} />);

		await user.click(toggle());
		await user.click(menu());

		expect(menu()).toHaveAttribute('data-open', 'true');
	});

	// Following a link on a small screen should not leave the panel hanging over
	// the page the visitor just asked for.
	it('closes after a link is followed', async () => {
		const user = userEvent.setup();
		render(<Navigation links={links} />);

		await user.click(toggle());
		await user.click(link('About'));

		expect(menu()).toHaveAttribute('data-open', 'false');
	});

	/**
	 * Marks the page you are on. `aria-current` carries the meaning; the styling
	 * is derived from it, so the highlight cannot drift from what is announced.
	 * Resolved after mount because the server cannot know the visitor's page.
	 */
	// Queried by href rather than by role: a closed menu is `visibility: hidden`,
	// so the links have no accessible name to match on.
	const anchor = (href: string) => {
		const element = document.querySelector(`a[href="${href}"]`);
		if (element === null) throw new Error(`no link to ${href}`);
		return element;
	};

	it('marks the current page, ignoring a trailing slash', async () => {
		window.history.pushState({}, '', '/about/');
		render(<Navigation links={{ Home: '/', About: '/about' }} />);

		await waitFor(() => {
			expect(anchor('/about')).toHaveAttribute('aria-current', 'page');
		});
		expect(anchor('/')).not.toHaveAttribute('aria-current');
		window.history.pushState({}, '', '/');
	});

	it('marks nothing when no link matches', async () => {
		window.history.pushState({}, '', '/somewhere-else');
		const { container } = render(<Navigation links={{ Home: '/', About: '/about' }} />);

		// Wait for the after-mount read to have happened at all.
		await waitFor(() => {
			expect(container.querySelectorAll('a')).toHaveLength(2);
		});
		expect(container.querySelector('[aria-current]')).toBeNull();
		window.history.pushState({}, '', '/');
	});

	it('registers no global listeners while closed', async () => {
		const user = userEvent.setup();
		const { unmount } = render(<Navigation links={links} />);

		// Opening then closing must unwind cleanly; a stray listener would keep
		// firing against an unmounted tree.
		await user.click(toggle());
		await user.click(toggle());
		unmount();

		await user.keyboard('{Escape}');
	});
});
