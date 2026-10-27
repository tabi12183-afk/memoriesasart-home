type Bounds = Pick<DOMRect, 'top' | 'left' | 'width' | 'height'>;

/** Position an insertion slot in the coordinate space of one sibling wrapper. */
export function componentDropzoneBounds({
	siblings,
	index,
	anchorIndex,
}: {
	siblings: Bounds[];
	index: number;
	anchorIndex: number;
}): Bounds {
	const anchor = siblings[anchorIndex];
	const previous = siblings[index - 1];
	const next = siblings[index];
	const reference = next ?? previous;
	if (anchor === undefined || reference === undefined) return { left: 0, top: 0, width: 0, height: 0 };
	const pair =
		previous !== undefined && next !== undefined
			? [previous, next]
			: index === 0
				? [siblings[0], siblings[1]]
				: [siblings[siblings.length - 2], siblings[siblings.length - 1]];
	const [first, second] = pair;
	const horizontal =
		first !== undefined &&
		second !== undefined &&
		Math.min(first.top + first.height, second.top + second.height) - Math.max(first.top, second.top) >=
			Math.min(first.height, second.height) / 2 &&
		second.left >= first.left + first.width;
	if (horizontal) {
		const start = previous === undefined ? reference.left : previous.left + previous.width;
		const end = next === undefined ? start : next.left;
		const width = Math.max(12, end - start);
		return {
			left: start + (end - start - width) / 2 - anchor.left,
			top: reference.top - anchor.top,
			width,
			height: reference.height,
		};
	}
	const start = previous === undefined ? reference.top : previous.top + previous.height;
	const end = next === undefined ? start : next.top;
	const height = Math.max(12, end - start);
	return {
		left: reference.left - anchor.left,
		top: start + (end - start - height) / 2 - anchor.top,
		width: reference.width,
		height,
	};
}
