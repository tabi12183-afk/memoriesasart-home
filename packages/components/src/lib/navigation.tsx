'use client';

import React from 'react';
import { safeHref } from './safe-href';

type NavigationProps = {
	/** Map of link label to URL, e.g. { Home: "/", About: "/about" }. */
	links?: Record<string, string>;
	/**
	 * What this set of links is for, e.g. "Main" or "Legal". Read aloud by
	 * screen readers, which is the only way a visitor can tell two navigations
	 * apart. Not shown on screen.
	 */
	purpose?: string;
};

/** A trailing slash and an empty path both mean the same page as "/". */
const samePage = (a: string, b: string) => {
	const tidy = (value: string) => {
		const trimmed = value.replace(/\/+$/, '');
		return trimmed === '' ? '/' : trimmed;
	};
	return tidy(a) === tidy(b);
};

/**
 * The page the visitor is on, or null on the server — where it is unknowable,
 * so nothing is marked and hydration has nothing to disagree about.
 *
 * A subscription rather than an effect: the location is an external system, so
 * reading it this way also keeps the mark correct when the visitor moves
 * through history instead of leaving the page.
 */
const subscribeToLocation = (onChange: () => void) => {
	window.addEventListener('popstate', onChange);
	return () => {
		window.removeEventListener('popstate', onChange);
	};
};
const readPathname = () => window.location.pathname;
const noPathnameOnServer = () => null;

const menuStyles = /* css */ `
.stormy-nav__toggle {
	display: inline-flex;
	flex-direction: column;
	cursor: pointer;
	padding: 0.625rem;
	/* Reset the user agent's button chrome here rather than relying on the
	   host's preflight: these styles ship with the component and have to hold
	   wherever it is mounted. */
	border: 0;
	background: none;
	font: inherit;
	border-radius: calc(var(--radius) * 0.8);
	color: var(--foreground);
	transition: background-color 180ms ease;
}
.stormy-nav__toggle:hover { background: var(--muted); }
.stormy-nav__toggle:focus-visible { outline: 2px solid var(--ring); outline-offset: 2px; }

.stormy-nav__list {
	position: absolute;
	top: calc(100% + 0.5rem);
	right: 0;
	left: 0;
	z-index: 40;
	display: grid;
	gap: 0.125rem;
	margin: 0;
	padding: 0.5rem;
	list-style: none;
	background: var(--background);
	border: 1px solid var(--border);
	border-radius: var(--radius);
	box-shadow:
		0 16px 40px -16px rgb(0 0 0 / 0.28),
		0 2px 8px -4px rgb(0 0 0 / 0.12);
	transform-origin: top;
	transition:
		opacity 200ms ease,
		transform 240ms cubic-bezier(0.2, 0.8, 0.3, 1),
		visibility 240ms;
}
.stormy-nav__list[data-open='false'] {
	visibility: hidden;
	opacity: 0;
	transform: translateY(-0.5rem) scaleY(0.97);
}
.stormy-nav__list[data-open='true'] {
	visibility: visible;
	opacity: 1;
	transform: none;
}

.stormy-nav__link {
	position: relative;
	display: block;
	padding: 0.625rem 0.75rem;
	border-radius: calc(var(--radius) * 0.7);
	font-size: 0.9375rem;
	font-weight: 500;
	line-height: 1.4;
	color: var(--color-site-1-c-1);
	text-decoration: none;
	transition:
		color 180ms ease,
		background-color 180ms ease;
}
.stormy-nav__link:hover { color: var(--color-site-1-c); background: var(--muted); }
.stormy-nav__link:focus-visible { outline: 2px solid var(--ring); outline-offset: 2px; }
/* The page you are on is marked, not just coloured: aria-current carries the
   meaning, and this is what it looks like. */
.stormy-nav__link[aria-current='page'] { color: var(--color-site-1-c); background: var(--muted); }

/* The three bars converge into an X. Each bar animates independently, so the
   motion reads as one object changing rather than two icons swapping. */
.stormy-nav__bar {
	display: block;
	width: 1.25rem;
	height: 2px;
	border-radius: 2px;
	background: currentColor;
	transition:
		transform 260ms cubic-bezier(0.2, 0.8, 0.3, 1),
		opacity 160ms ease;
}
.stormy-nav__bar + .stormy-nav__bar { margin-top: 0.3125rem; }
[data-open='true'] > .stormy-nav__bar:nth-child(1) { transform: translateY(0.4375rem) rotate(45deg); }
[data-open='true'] > .stormy-nav__bar:nth-child(2) { opacity: 0; transform: scaleX(0.4); }
[data-open='true'] > .stormy-nav__bar:nth-child(3) { transform: translateY(-0.4375rem) rotate(-45deg); }

@media (min-width: 768px) {
	.stormy-nav__toggle { display: none; }
	.stormy-nav__list {
		position: static;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		/* The list owns the space between its links; the links set none. */
		gap: 1.5rem;
		padding: 0;
		background: none;
		border: 0;
		box-shadow: none;
	}
	/* Desktop has no toggle, so the closed state must not hide the links. */
	.stormy-nav__list[data-open='false'] {
		visibility: visible;
		opacity: 1;
		transform: none;
	}
	.stormy-nav__link {
		padding: 0.25rem 0;
		border-radius: 0;
	}
	.stormy-nav__link:hover,
	.stormy-nav__link[aria-current='page'] { background: none; }
	/* A rule that wipes in under the label on approach and retracts the way the
	   pointer left, rather than a block of colour appearing behind the text.
	   Inline links get a line; the stacked panel gets the surface above. */
	.stormy-nav__link::after {
		content: '';
		position: absolute;
		inset-inline: 0;
		bottom: 0;
		height: 2px;
		border-radius: 1px;
		background: currentColor;
		transform: scaleX(0);
		transform-origin: right;
		transition: transform 280ms cubic-bezier(0.2, 0.8, 0.3, 1);
	}
	.stormy-nav__link:hover::after,
	.stormy-nav__link:focus-visible::after,
	.stormy-nav__link[aria-current='page']::after {
		transform: scaleX(1);
		transform-origin: left;
	}
}
@media (prefers-reduced-motion: reduce) {
	.stormy-nav__list,
	.stormy-nav__bar,
	.stormy-nav__link,
	.stormy-nav__link::after {
		transition-duration: 1ms;
	}
}
`;

/**
 * Site navigation. A row of links on wide screens; below the medium breakpoint
 * it collapses behind a toggle that animates into a close button.
 *
 * Composes into RegionHeader.
 */
export function Navigation({ links, purpose }: NavigationProps) {
	const entries = Object.entries(links ?? {});
	const [open, setOpen] = React.useState(false);
	const menuId = React.useId();
	const navRef = React.useRef<HTMLElement>(null);

	// Read from the document rather than a router hook, so the component stays
	// usable outside one — including inside the page builder's preview.
	const here = React.useSyncExternalStore(subscribeToLocation, readPathname, noPathnameOnServer);

	// Close on Escape and on any click outside. Both are registered only while
	// open so a page full of navigations costs nothing at rest.
	React.useEffect(() => {
		if (!open) return;
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') setOpen(false);
		};
		const onPointerDown = (event: MouseEvent) => {
			const target = event.target;
			if (target instanceof Node && navRef.current?.contains(target) === false) setOpen(false);
		};
		document.addEventListener('keydown', onKeyDown);
		document.addEventListener('mousedown', onPointerDown);
		return () => {
			document.removeEventListener('keydown', onKeyDown);
			document.removeEventListener('mousedown', onPointerDown);
		};
	}, [open]);

	if (entries.length === 0) {
		return <nav className="text-muted-foreground w-full py-2 text-sm">Add navigation links.</nav>;
	}

	return (
		<nav
			ref={navRef}
			aria-label={purpose !== undefined && purpose !== '' ? purpose : 'Main'}
			className="relative w-full py-2"
		>
			<style>{menuStyles}</style>
			<div className="flex items-center justify-end">
				<button
					type="button"
					className="stormy-nav__toggle"
					aria-expanded={open}
					aria-controls={menuId}
					aria-label={open ? 'Close menu' : 'Open menu'}
					data-open={open}
					onClick={() => {
						setOpen((wasOpen) => !wasOpen);
					}}
				>
					<span className="stormy-nav__bar" />
					<span className="stormy-nav__bar" />
					<span className="stormy-nav__bar" />
				</button>
			</div>
			<ul id={menuId} data-open={open} className="stormy-nav__list">
				{entries.map(([label, href]) => {
					const target = safeHref(href);
					const current = here !== null && samePage(target, here);
					return (
						<li key={label}>
							<a
								className="stormy-nav__link"
								href={target}
								aria-current={current ? 'page' : undefined}
								onClick={() => {
									setOpen(false);
								}}
							>
								{label}
							</a>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
