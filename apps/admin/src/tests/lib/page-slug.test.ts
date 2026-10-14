import { describe, expect, it } from 'vitest';
import { normalizePageSlug, pageNameToSlug } from '~/lib/page-slug';

describe('normalizePageSlug', () => {
	it('strips surrounding whitespace and slashes and lowercases', () => {
		expect(normalizePageSlug('  /About/Team/  ')).toBe('about/team');
	});

	it('leaves interior slashes intact', () => {
		expect(normalizePageSlug('docs/getting-started')).toBe('docs/getting-started');
	});

	it('returns an empty string for the home slug', () => {
		expect(normalizePageSlug('/')).toBe('');
	});
});

describe('pageNameToSlug', () => {
	it('converts names to kebab-case slugs', () => {
		expect(pageNameToSlug('About Our Team!')).toBe('about-our-team');
	});

	it('collapses repeated separators and trims dangling dashes', () => {
		expect(pageNameToSlug('  --Hello,,,   World--  ')).toBe('hello-world');
	});

	it('preserves slashes as path separators', () => {
		expect(pageNameToSlug('Docs/Getting Started')).toBe('docs/getting-started');
	});
});
