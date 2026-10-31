import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import cmsExports from '../../index';

describe('CMS exports map', () => {
	it('exposes every component the page builder offers', () => {
		expect(Object.keys(cmsExports).sort()).toEqual(
			[
				'CallToAction',
				'Card',
				'CardGroup',
				'Figure',
				'Group',
				'Heading',
				'Hero',
				'Image',
				'Navigation',
				'MemoriesPortfolio',
				'Outlet',
				'Region',
				'RegionAside',
				'RegionFooter',
				'RegionHeader',
				'RegionMain',
				'RichText',
				'Section',
				'SiteInfo',
				'Text',
				'ThemeToggle',
			].sort(),
		);
	});

	/**
	 * The boilerplate's central design promise: an author says what a thing IS,
	 * never how it should look. Presentation stays a private decision inside the
	 * component so it can be restyled site-wide without anyone re-picking
	 * anything. A field named for an appearance breaks that permanently, because
	 * saved content starts depending on it.
	 */
	it('never asks an author to make a visual decision', () => {
		const visualTerms = [
			'size',
			'style',
			'spacing',
			'color',
			'colour',
			'width',
			'height',
			'align',
			'variant',
			'rounded',
			'shadow',
			'border',
			'padding',
			'margin',
			'font',
			'weight',
		];
		const offenders: string[] = [];
		for (const [name, component] of Object.entries(cmsExports)) {
			for (const field of component.fields ?? []) {
				const prop = field.prop.toLowerCase();
				const term = visualTerms.find((candidate) => prop.includes(candidate));
				if (term !== undefined) offenders.push(`${name}.${field.prop} (reads as "${term}")`);
			}
		}
		expect(offenders).toEqual([]);
	});

	it('marks region slots as unique so a region holds at most one of each', () => {
		expect(cmsExports.RegionHeader.unique).toBe(true);
		expect(cmsExports.RegionAside.unique).toBe(true);
		expect(cmsExports.RegionMain.unique).toBe(true);
		expect(cmsExports.RegionFooter.unique).toBe(true);
	});

	it('preserves the photography CMS content contract and permits Section placement', () => {
		expect(cmsExports.MemoriesPortfolio.fields?.map((field) => field.prop)).toEqual([
			'pagePath',
			'heading',
			'intro',
			'heroImage',
			'heroVideo',
			'galleryImages',
			'clientGalleryUrl',
		]);
		expect(cmsExports.Section.validChildren).toContain('MemoriesPortfolio');
		expect(cmsExports.MemoriesPortfolio.noChildren).toBe(true);
		expect(cmsExports.MemoriesPortfolio.fields?.find((field) => field.prop === 'pagePath')).toMatchObject({
			field: 'select',
			options: expect.arrayContaining(['/portraits/boudoir/']),
		});
	});

	it('wraps renderable components that still render', () => {
		const Heading = cmsExports.Heading;
		expect(renderToStaticMarkup(<Heading text="From CMS" />)).toContain('From CMS');
	});

	it('renders the Image block from the asset alt text when no alt prop is given', () => {
		// This mirrors how the CMS renders the component: only the image asset is
		// passed, so alt comes from the asset (or falls back to an empty string).
		const ImageBlock = cmsExports.Image;
		expect(renderToStaticMarkup(<ImageBlock image={{ src: '/cat.jpg', alt: 'Asset alt' }} />)).toContain(
			'alt="Asset alt"',
		);
		expect(renderToStaticMarkup(<ImageBlock image={{ src: '/cat.jpg' }} />)).toContain('alt=""');
	});
});
