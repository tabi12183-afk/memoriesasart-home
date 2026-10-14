import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import cmsExports from '../../index';
import { flowStyles, marked } from '../flow';
import { Group } from '../group';
import { Hero } from '../hero';
import { Section } from '../section';

describe('flow', () => {
	it('gives a band a readable column and one that runs to the edges', () => {
		expect(flowStyles).toContain('[content-start]');
		expect(flowStyles).toContain('[bleed-start]');
		// Both tracks share the same rows, so a bleed child stays in source order.
		expect(flowStyles).toContain('grid-column: content');
		expect(flowStyles).toContain('grid-column: bleed');
	});

	it('caps the readable column at the measure and keeps the inset clear', () => {
		expect(flowStyles).toContain('var(--flow-measure)');
		expect(flowStyles).toContain('var(--flow-inset)');
	});

	it('spaces children by named relationship, never by a number', () => {
		expect(flowStyles).toContain('var(--flow-rhythm-related)');
		expect(flowStyles).toContain('var(--flow-rhythm-distinct)');
		expect(flowStyles).toContain('var(--flow-rhythm-separate)');
		// No literal lengths anywhere in the track definition. Zero is exempt: it
		// is the absence of space rather than a chosen amount of it, which is
		// what a boundary inside another boundary has left to contribute.
		const chosenLengths = flowStyles.replace(/\b0(rem|px|em)\b/g, '0');
		expect(chosenLengths).not.toMatch(/:\s*\d+(\.\d+)?(rem|px|em)/);
	});

	/**
	 * The page builder wraps every child in a `display: contents` list and a
	 * wrapper div. A selector written only for the live site silently stops
	 * matching in the editor, and the preview stops resembling the real page.
	 */
	it('matches marked children in the editor as well as on the live site', () => {
		const selector = marked('.thing', "data-flow='bleed'");
		expect(selector).toContain(".thing > [data-flow='bleed']");
		expect(selector).toContain('[data-cms-editable-children]');
		expect(selector).toContain(':has(');
	});

	/**
	 * The bug this guards against shipped: the default placement rule was a bare
	 * `> *`, so in the page builder the wrapper divs matched nothing and
	 * auto-placed into the gutter tracks — buttons in the 24px inset column,
	 * text clipped off the right of the viewport.
	 */
	it('places wrapped builder children in the readable column too', () => {
		expect(flowStyles).toContain('.stormy-flow > [data-cms-editable-children] > *');
		// And never a bare child rule without its editor twin.
		const bare = flowStyles.match(/^\.stormy-flow > \*/gm) ?? [];
		const twinned = flowStyles.match(/\.stormy-flow > \*, \.stormy-flow > \[data-cms-editable-children\] > \*/g) ?? [];
		expect(bare.length).toBe(twinned.length);
	});

	/**
	 * Placement goes through slot()/marked(); a component's inner layout goes on
	 * its own element, which exists identically in both DOM shapes. Main's band
	 * grid on the slot selector styled the builder's wrapper instead of the real
	 * section, and band separation silently vanished from the preview.
	 */
	/**
	 * Rule 3 has a vertical axis too: the header and footer hold content
	 * directly against the screen's top and bottom edges. The clearance is the
	 * same --flow-inset the flow track applies horizontally, so it collapses to
	 * zero inside another boundary, and main stays clear-free so a full-bleed
	 * opener on a headerless page can reach the top.
	 */
	it('clears the vertical screen edges at the header and footer, not main', () => {
		const html = renderToStaticMarkup(<cmsExports.Region />);
		const rule = (area: string) => {
			const start = html.indexOf(`.stormy-region [data-region-area='${area}']`);
			return start === -1 ? '' : html.slice(start, html.indexOf('}', start));
		};
		expect(rule('header')).toContain('padding-top: var(--flow-inset)');
		expect(rule('footer')).toContain('padding-bottom: var(--flow-inset)');
		expect(rule('main')).not.toContain('padding');
	});

	it('keeps main region inner layout on the element, not the slot wrapper', () => {
		const html = renderToStaticMarkup(<cmsExports.Region />);
		expect(html).toContain(".stormy-region [data-region-area='main']");
		const inner = html.slice(html.indexOf(".stormy-region [data-region-area='main']"));
		expect(inner.slice(0, inner.indexOf('}'))).toContain('row-gap');
	});
});

/**
 * Anything a site root needs in order to look like the live site has to live in
 * the shared theme, because the editor's preview canvas imports only the theme
 * and the compiled component styles — never the site app's globals. Putting it
 * in the site's globals is invisible to the preview, which is how both the dark
 * canvas and the collapsed site root happened.
 */
describe('site root parity between the live site and the editor preview', () => {
	// Relative to packages/components, where vitest runs.
	const read = (path: string) => readFileSync(resolve(process.cwd(), path), 'utf8');
	const theme = read('../theme/theme.css');
	const siteGlobals = read('../../apps/site/src/app/globals.css');
	const isolation = read('src/styles.css');

	it('defines the height chain in the shared theme', () => {
		expect(theme).toMatch(/\.site-root__html\s*{[^}]*height:\s*100%/);
		expect(theme).toMatch(/\.site-root__body\s*{[^}]*height:\s*100%/);
		// Content takes the room; a trailing attribution footer takes only what
		// it needs, so a full-height region cannot push it off the screen.
		expect(theme).toMatch(/\.site-root__body\s*{[^}]*grid-template-rows:\s*1fr auto/);
	});

	it('defines the colour scheme in the shared theme', () => {
		expect(theme).toMatch(/\.site-root__html\s*{[^}]*color-scheme:\s*light/);
	});

	it('leaves the site app declaring no site-root behaviour of its own', () => {
		// Comments may mention the selectors; declarations may not.
		const withoutComments = siteGlobals.replace(/\/\*[\s\S]*?\*\//g, '');
		expect(withoutComments).not.toContain('.site-root');
	});

	it('lets the isolation boundary fill its host and pass a height down', () => {
		// Grid so the single site root stretches; block would leave it
		// content-sized and `height: 100%` inside would resolve to nothing.
		expect(isolation).toMatch(/\.site-root\s*{[^}]*display:\s*grid/);
		expect(isolation).toMatch(/\.site-root\s*{[^}]*min-height:\s*100%/);
	});
});

describe('the spacing principle', () => {
	/**
	 * Rule 1: nothing sets space around itself. A component that carries its own
	 * outer margin is wrong in some other context, and the fix is always a
	 * negative margin somewhere else — exactly what content editors should never
	 * have to reach for.
	 */
	it('leaves no component setting a margin on itself', () => {
		const offenders: string[] = [];
		for (const [name, Component] of Object.entries(cmsExports)) {
			if (name === 'Outlet') continue;
			const html = renderToStaticMarkup(<Component />);
			// Class-based outer margins on the component's own root element.
			const root = /^<[^>]*class="([^"]*)"/.exec(html)?.[1] ?? '';
			const margin = /(^|\s)-?m[trblxy]?-/.exec(root);
			if (margin !== null) offenders.push(`${name} (${margin[0].trim()})`);
		}
		expect(offenders).toEqual([]);
	});

	// Rule 3: a component that belongs edge-to-edge says so about itself, so
	// there is no prop to expose and no author decision to get wrong.
	it('lets a hero declare itself edge-to-edge with no author input', () => {
		expect(renderToStaticMarkup(<Hero />)).toContain('data-flow="bleed"');
		expect(cmsExports.Hero.fields?.some((field) => field.prop === 'flow')).toBe(false);
	});

	it('puts a hero in the wide track without any repositioning', () => {
		const html = renderToStaticMarkup(
			<Section>
				<Hero />
			</Section>,
		);
		expect(html).toContain('stormy-flow');
		expect(html).toContain('data-flow="bleed"');
		// The escape hatches this design exists to remove.
		expect(html).not.toMatch(/-m[trblxy]?-\d/);
		expect(html).not.toContain('absolute inset-0 w-screen');
	});

	it('has no component whose only purpose is to occupy space', () => {
		const names = Object.keys(cmsExports).map((name) => name.toLowerCase());
		expect(names).not.toContain('spacer');
		expect(names).not.toContain('gap');
		expect(names).not.toContain('divider');
		expect(names).not.toContain('padding');
	});

	/**
	 * Rule 3. Space against an edge is not a relationship between two elements —
	 * it is between content and the boundary holding it. Padding on the Heading
	 * would be right against the screen and wrong inside a Card, so every
	 * boundary declares itself and zeroes the inherited inset instead.
	 */
	it('applies edge clearance once per boundary, however deeply things nest', () => {
		expect(flowStyles).toContain("[data-flow='bounded']");
		// A band inside a band, a card, and a banner all leave nothing to clear.
		const guard = flowStyles.slice(flowStyles.indexOf('.stormy-flow .stormy-flow'));
		expect(guard).toContain('--flow-inset: 0rem');
	});

	it('holds header, aside and footer content clear of the screen', () => {
		// These slots hold content directly, so each is the boundary against the
		// screen. Main is deliberately not: it holds bands, and a band owns its
		// own edges so a banner inside one can reach them.
		for (const Slot of [cmsExports.RegionHeader, cmsExports.RegionAside, cmsExports.RegionFooter]) {
			expect(renderToStaticMarkup(<Slot />)).toContain('stormy-flow');
		}
		expect(renderToStaticMarkup(<cmsExports.RegionMain />)).not.toContain('stormy-flow');
	});

	it('marks a card as its own boundary so nothing inside clears twice', () => {
		expect(renderToStaticMarkup(<cmsExports.Card />)).toContain('data-flow="bounded"');
	});

	it('keeps a heading free of padding so it suits any boundary', () => {
		const heading = renderToStaticMarkup(<cmsExports.Heading text="Title" />);
		expect(heading).not.toMatch(/(^|\s)p[xytrbl]?-\d/);
		expect(heading).not.toMatch(/(^|\s)m[xytrbl]?-\d/);
	});

	it('leaves widths and insets to the band rather than to what sits in it', () => {
		const group = renderToStaticMarkup(<Group />);
		expect(group).not.toMatch(/max-w-/);
		expect(group).not.toMatch(/(^|\s)p[xy]?-\d/);
		expect(group).toContain('--flow-rhythm-distinct');
	});
});
