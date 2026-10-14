import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { THEME_STORAGE_KEY, ThemeToggle } from '../theme-toggle';

describe('ThemeToggle', () => {
	it('renders as a switch that reports its state', () => {
		const html = renderToStaticMarkup(<ThemeToggle />);
		expect(html).toContain('role="switch"');
		expect(html).toContain('aria-checked="false"');
	});

	it('labels itself for screen readers and on screen', () => {
		const html = renderToStaticMarkup(<ThemeToggle label="Night mode" />);
		expect(html).toContain('aria-label="Night mode"');
		expect(html).toContain('Night mode');
	});

	it('falls back to a sensible label', () => {
		expect(renderToStaticMarkup(<ThemeToggle label="" />)).toContain('Dark mode');
	});

	/**
	 * The server cannot know what this visitor picked, so the button must render
	 * light and correct itself after mount. Rendering the stored choice would
	 * mismatch the HTML the server sent and tear hydration.
	 */
	it('renders the default scheme on the server', () => {
		expect(renderToStaticMarkup(<ThemeToggle />)).toContain('aria-checked="false"');
	});

	/**
	 * apps/site/src/app/layout.tsx inlines a script that reads this exact key
	 * before first paint. If they drift, a returning visitor sees a flash of the
	 * wrong scheme.
	 */
	it('agrees with the layout script about where the choice is stored', () => {
		expect(THEME_STORAGE_KEY).toBe('site-theme');
	});
});
