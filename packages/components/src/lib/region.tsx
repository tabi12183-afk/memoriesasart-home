import React from 'react';
import { flowStyles, marked } from './flow';

/**
 * Matches a region slot whether it is a direct child (live site) or wrapped in
 * a page-builder editing container. The direct-child chain keeps nested regions
 * from leaking into outer grids.
 */
const slot = (area: string) => marked('.stormy-region', `data-region-area='${area}'`);

/**
 * The entire region layout is defined once, here. Each slot pins itself to a
 * named grid area via `data-region-area`, so source order can never scramble
 * the layout and content editors cannot complicate it.
 *
 * - Areas with no content collapse to nothing (auto rows and a fit-content
 *   column size to zero when empty), so an empty region is effectively "main".
 * - Spacing comes from slot margins rather than a container gap, so absent
 *   slots leave no ghost gaps behind. The region still owns that space — the
 *   slots do not set it on themselves — so the rule in ./flow.ts holds.
 * - Below the md breakpoint everything stacks into a single column.
 */
const regionStyles = /* css */ `
.stormy-region {
	display: grid;
	width: 100%;
	/* Fill the space the container provides, so a region standing alone reaches
	   the bottom of the screen and its footer settles there. 100% rather than a
	   viewport unit: the site layout's rows already subtract anything else on
	   screen (the attribution footer), and a viewport measurement would shove
	   those siblings off it. Inside content-sized parents this resolves to
	   nothing and the region takes only what it needs. */
	min-height: 100%;
	grid-template-areas: 'header header' 'aside main' 'footer footer';
	grid-template-columns: fit-content(16rem) minmax(0, 1fr);
	grid-template-rows: auto minmax(0, 1fr) auto;
}
${slot('header')} {
	grid-area: header;
	margin-bottom: var(--flow-rhythm-distinct);
}
${slot('aside')} {
	grid-area: aside;
	margin-right: var(--flow-rhythm-distinct);
}
${slot('main')} {
	grid-area: main;
}
/* Main holds the page's bands, so it owns the space between them. On the
   component's own element, not the slot selector: in the builder the slot
   matches the editing wrapper, and inner layout set there never reaches the
   real section. Placement rules go through slot(); inner layout stays here. */
.stormy-region [data-region-area='main'] {
	display: grid;
	align-content: start;
	row-gap: var(--flow-rhythm-separate);
}
/* Rule 3, vertical: header and footer hold content directly against the
   screen's top and bottom, so each clears its edge — the same clearance the
   flow track applies horizontally. Inside another boundary --flow-inset is
   zero and this collapses. Main stays clear-free so a full-bleed opener on a
   headerless page can still reach the top. */
.stormy-region [data-region-area='header'] {
	padding-top: var(--flow-inset);
}
.stormy-region [data-region-area='footer'] {
	padding-bottom: var(--flow-inset);
}
${slot('footer')} {
	grid-area: footer;
	margin-top: var(--flow-rhythm-distinct);
}
@media (max-width: 767px) {
	.stormy-region {
		grid-template-areas: 'header' 'aside' 'main' 'footer';
		grid-template-columns: minmax(0, 1fr);
		grid-template-rows: auto auto minmax(0, 1fr) auto;
	}
	${slot('aside')} {
		margin-right: 0;
		margin-bottom: var(--flow-rhythm-distinct);
	}
}
`;

/**
 * A layout shell built from semantic HTML5 landmarks. Holds at most one of
 * each slot: RegionHeader, RegionAside, RegionMain, and RegionFooter.
 *
 * Standing alone it is the page and fills the screen; nested inside anything
 * it takes only what its content needs. Decided by CSS nesting, not a prop.
 */
export function Region({ children }: React.PropsWithChildren) {
	return (
		<>
			<style>{flowStyles}</style>
			<style>{regionStyles}</style>
			<div className="stormy-region w-full">{children}</div>
		</>
	);
}

/**
 * The header, aside and footer hold content directly, so each is the boundary
 * between that content and the screen and holds it clear of the edge. Main is
 * the exception: it holds the page's bands, and a band owns its own edges — that
 * is exactly what lets a banner inside one reach them.
 */
export function RegionHeader({ children }: React.PropsWithChildren) {
	return (
		<header data-region-area="header" className="stormy-flow" data-rhythm="related">
			{children}
		</header>
	);
}

export function RegionAside({ children }: React.PropsWithChildren) {
	return (
		<aside data-region-area="aside" className="stormy-flow" data-rhythm="distinct">
			{children}
		</aside>
	);
}

/** Rendered as `<section>`: `<main>` cannot be guaranteed unique across nested layouts. */
export function RegionMain({ children }: React.PropsWithChildren) {
	return (
		<section data-region-area="main" className="w-full">
			{children}
		</section>
	);
}

export function RegionFooter({ children }: React.PropsWithChildren) {
	return (
		<footer data-region-area="footer" className="stormy-flow" data-rhythm="related">
			{children}
		</footer>
	);
}
