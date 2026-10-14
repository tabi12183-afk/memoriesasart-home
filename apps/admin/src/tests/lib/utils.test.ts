import { describe, expect, it } from 'vitest';
import { cn, nullish, notNullish } from '~/lib/utils';

describe('cn', () => {
	it('merges conditional class names', () => {
		const includeB = false;
		expect(cn('a', includeB && 'b', 'c')).toBe('a c');
	});

	it('lets later tailwind classes win conflicts', () => {
		expect(cn('p-2', 'p-4')).toBe('p-4');
	});
});

describe('nullish', () => {
	it('returns true for null', () => {
		expect(nullish(null)).toBe(true);
	});

	it('returns true for undefined', () => {
		expect(nullish(undefined)).toBe(true);
	});

	it('returns false for other values', () => {
		expect(nullish('')).toBe(false);
		expect(nullish(0)).toBe(false);
		expect(nullish(false)).toBe(false);
	});
});

describe('notNullish', () => {
	it('returns false for null', () => {
		expect(notNullish(null)).toBe(false);
	});

	it('returns false for undefined', () => {
		expect(notNullish(undefined)).toBe(false);
	});

	it('returns true for other values', () => {
		expect(notNullish('')).toBe(true);
		expect(notNullish(0)).toBe(true);
		expect(notNullish(false)).toBe(true);
	});
});
