import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { CallToAction } from '../call-to-action';
import { Card, CardGroup } from '../card';
import { Heading } from '../heading';
import { Hero } from '../hero';
import { Region, RegionAside, RegionFooter, RegionHeader, RegionMain } from '../region';
import { RichText } from '../rich-text';
import { SiteInfo } from '../site-info';

describe('components', () => {
	it('renders structured markdown content', () => {
		const html = renderToStaticMarkup(<RichText content={'## Welcome\n\nUse **strong** copy and [links](/about).'} />);
		expect(html).toContain('<h2');
		expect(html).toContain('<strong>strong</strong>');
		expect(html).toContain('href="/about"');
	});

	it('renders the configured heading level', () => {
		expect(renderToStaticMarkup(<Heading level="h4" text="Details" />)).toContain('<h4');
	});

	it('groups cards as direct grid children', () => {
		const html = renderToStaticMarkup(
			<CardGroup>
				<Card title="One" />
				<Card title="Two" />
			</CardGroup>,
		);
		expect(html).not.toContain('<ul');
		expect(html.match(/rounded-xl/g)).toHaveLength(2);
	});

	it('lays out cards as an evenly spaced, evenly sized catalog grid', () => {
		const html = renderToStaticMarkup(
			<CardGroup>
				<Card title="One" />
				<Card title="Two" />
			</CardGroup>,
		);
		// Evenly sized columns that adapt to available space, with breathing room.
		expect(html).toContain('auto-fit');
		expect(html).toMatch(/gap-\d/);
		expect(html).toMatch(/p-\d/);
		// Cards stretch to match row height so the group stays aligned.
		expect(html.match(/h-full/g)).toHaveLength(2);
	});

	it('names call-to-action use cases instead of exposing visual styles', () => {
		const primary = renderToStaticMarkup(<CallToAction label="Start" href="/start" />);
		const secondary = renderToStaticMarkup(<CallToAction label="Read more" href="/docs" priority="secondary" />);
		// Primary is the filled, most prominent treatment.
		expect(primary).toContain('bg-primary');
		// Secondary maps to a quieter treatment without editors picking styles.
		expect(secondary).not.toContain('bg-primary');
		expect(secondary).toContain('href="/docs"');
	});

	it('renders semantic site contact information', () => {
		const html = renderToStaticMarkup(
			<SiteInfo organization="Acme" email="hello@example.com" phone="(555) 123-4567" address="Main Street" />,
		);
		expect(html).toContain('© Acme');
		expect(html).toContain('href="mailto:hello@example.com"');
		expect(html).toContain('href="tel:5551234567"');
	});

	it('defines the region layout once with named grid areas', () => {
		const html = renderToStaticMarkup(
			<Region>
				<RegionHeader />
				<RegionAside />
				<RegionMain />
				<RegionFooter />
			</Region>,
		);
		// One grid definition owned by the Region, not by its children.
		expect(html).toContain('grid-template-areas');
		expect(html).toContain('grid-area: header');
		expect(html).toContain('grid-area: aside');
		expect(html).toContain('grid-area: main');
		expect(html).toContain('grid-area: footer');
	});

	/**
	 * A region fills the space its container provides — never more. The site
	 * layout's rows already subtract the attribution footer, so 100% lands the
	 * region footer at the bottom of the first screen without pushing siblings
	 * off it; a viewport unit here shoved the attribution below the fold.
	 * Inside content-sized parents the percentage resolves to nothing, so
	 * nesting needs no special case and there is nothing for authors to set.
	 */
	it('fills the space its container provides, never the viewport', () => {
		const html = renderToStaticMarkup(<Region />);
		const base = html.slice(html.indexOf('.stormy-region {'));
		expect(base.slice(0, base.indexOf('}'))).toContain('min-height: 100%');
		expect(html).not.toContain('100dvh');
		expect(html).not.toContain('100vh');
		expect(html).not.toContain('data-page');
	});

	it('pins region slots to their areas with semantic elements', () => {
		const html = renderToStaticMarkup(
			<Region>
				<RegionFooter />
				<RegionHeader />
			</Region>,
		);
		// Slots identify themselves; source order cannot scramble the layout.
		expect(html).toContain('<header data-region-area="header"');
		expect(html).toContain('<footer data-region-area="footer"');
	});

	it('renders the main region slot as a section landmark', () => {
		// <main> cannot be guaranteed unique across nested layouts, so use <section>.
		expect(renderToStaticMarkup(<RegionMain />)).toContain('<section data-region-area="main"');
		expect(renderToStaticMarkup(<RegionAside />)).toContain('<aside data-region-area="aside"');
	});

	it('renders a hero with its primary action', () => {
		const html = renderToStaticMarkup(
			<Hero title="Welcome" subtitle="Start here" actionLabel="Explore" actionHref="/start" />,
		);
		expect(html).toContain('<section');
		expect(html).toContain('<h1');
		expect(html).toContain('href="/start"');
	});
});
