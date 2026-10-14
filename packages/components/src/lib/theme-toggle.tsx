'use client';

import React from 'react';

/**
 * Key the visitor's choice is stored under. Also read by the inline script in
 * apps/site/src/app/layout.tsx, which applies the choice before the first
 * paint; change it in both places or the page flashes the wrong scheme.
 */
export const THEME_STORAGE_KEY = 'site-theme';

type ThemeToggleProps = {
	/** Wording for the control, e.g. "Dark mode". */
	label?: string;
};

type Scheme = 'light' | 'dark';

/**
 * The site root: `<html>` on the live site, and the preview wrapper inside the
 * page builder. Walking up to it means the toggle works in both without knowing
 * which one it is in.
 */
const siteRoot = (from: Element | null): HTMLElement | null => from?.closest('.site-root__html') ?? null;

const apply = (root: HTMLElement, scheme: Scheme) => {
	root.classList.toggle('theme--dark', scheme === 'dark');
	root.classList.toggle('theme--light', scheme === 'light');
};

/**
 * Lets a visitor switch the site between light and dark.
 *
 * Place it anywhere — a header, a footer, its own corner. The site is light for
 * everyone until someone chooses otherwise, and the choice is remembered on
 * their next visit.
 */
export function ThemeToggle({ label }: ThemeToggleProps) {
	const buttonRef = React.useRef<HTMLButtonElement>(null);
	const [scheme, setScheme] = React.useState<Scheme>('light');

	// Read the live state after mount rather than during render: the server has
	// no idea what this visitor picked, so rendering anything but the default
	// would mismatch and hydration would tear.
	React.useEffect(() => {
		const root = siteRoot(buttonRef.current);
		if (root === null) return;
		setScheme(root.classList.contains('theme--dark') ? 'dark' : 'light');
	}, []);

	const toggle = () => {
		const root = siteRoot(buttonRef.current);
		if (root === null) return;
		const next: Scheme = scheme === 'dark' ? 'light' : 'dark';
		apply(root, next);
		setScheme(next);
		try {
			window.localStorage.setItem(THEME_STORAGE_KEY, next);
		} catch {
			// Private browsing can refuse storage. The switch still works for
			// this page view; it just will not be remembered.
		}
	};

	const dark = scheme === 'dark';
	const text = label !== undefined && label !== '' ? label : 'Dark mode';

	return (
		<button
			ref={buttonRef}
			type="button"
			role="switch"
			aria-checked={dark}
			aria-label={text}
			onClick={toggle}
			className="border-border text-foreground hover:bg-muted focus-visible:ring-ring inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
		>
			<span
				aria-hidden
				className={`relative h-4 w-7 rounded-full transition-colors ${dark ? 'bg-primary' : 'bg-muted-foreground/40'}`}
			>
				<span
					className={`bg-background absolute top-0.5 h-3 w-3 rounded-full transition-[left] duration-200 ${dark ? 'left-3.5' : 'left-0.5'}`}
				/>
			</span>
			<span>{text}</span>
		</button>
	);
}
