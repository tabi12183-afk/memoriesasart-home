import { describe, expect, it } from 'vitest';
import { componentDropzoneBounds } from '~/lib/component-dropzone';

const rect = (left: number, top: number, width = 200, height = 100) => ({ left, top, width, height });

describe('componentDropzoneBounds', () => {
	it('returns empty geometry when the anchor is missing or the slot is outside the sibling list', () => {
		expect(componentDropzoneBounds({ siblings: [], index: 0, anchorIndex: 0 })).toEqual({
			left: 0,
			top: 0,
			width: 0,
			height: 0,
		});
		for (const index of [-1, 3]) {
			expect(componentDropzoneBounds({ siblings: [rect(10, 20), rect(250, 20)], index, anchorIndex: 0 })).toEqual({
				left: 0,
				top: 0,
				width: 0,
				height: 0,
			});
		}
	});

	it('covers the full horizontal gap relative to the following component', () => {
		expect(
			componentDropzoneBounds({ siblings: [rect(10, 20), rect(250, 20), rect(490, 20)], index: 1, anchorIndex: 1 }),
		).toEqual({ left: -40, top: 0, width: 40, height: 100 });
	});

	it('covers the full vertical gap relative to the following component', () => {
		expect(componentDropzoneBounds({ siblings: [rect(10, 20), rect(10, 160)], index: 1, anchorIndex: 1 })).toEqual({
			left: 0,
			top: -40,
			width: 200,
			height: 40,
		});
	});

	it('keeps zero-gap slots usable without claiming the component body', () => {
		expect(componentDropzoneBounds({ siblings: [rect(10, 20), rect(10, 120)], index: 1, anchorIndex: 1 })).toEqual({
			left: 0,
			top: -6,
			width: 200,
			height: 12,
		});
	});

	it('recognizes horizontal siblings with different heights aligned at their centers', () => {
		expect(
			componentDropzoneBounds({ siblings: [rect(10, 20, 200, 400), rect(250, 170)], index: 1, anchorIndex: 1 }),
		).toEqual({ left: -40, top: 0, width: 40, height: 100 });
	});

	it.each([
		{
			siblings: [rect(10, 20), rect(250, 20)],
			index: 0,
			anchorIndex: 0,
			expected: { left: -6, top: 0, width: 12, height: 100 },
		},
		{
			siblings: [rect(10, 20), rect(250, 20)],
			index: 2,
			anchorIndex: 1,
			expected: { left: 194, top: 0, width: 12, height: 100 },
		},
		{
			siblings: [rect(10, 20), rect(10, 160)],
			index: 0,
			anchorIndex: 0,
			expected: { left: 0, top: -6, width: 200, height: 12 },
		},
		{
			siblings: [rect(10, 20), rect(10, 160)],
			index: 2,
			anchorIndex: 1,
			expected: { left: 0, top: 94, width: 200, height: 12 },
		},
	])('keeps edge slots aligned with the sibling layout: %j', ({ expected, ...args }) => {
		expect(componentDropzoneBounds(args)).toEqual(expected);
	});

	it('uses vertical slots when a grid wraps onto the next row', () => {
		expect(
			componentDropzoneBounds({ siblings: [rect(250, 20), rect(10, 160)], index: 1, anchorIndex: 1 }),
		).toMatchObject({ top: -40, height: 40 });
	});
});
