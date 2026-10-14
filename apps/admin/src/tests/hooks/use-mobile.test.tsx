import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useIsMobile } from '~/hooks/use-mobile';

type ChangeListener = (event: { matches: boolean }) => void;

function stubMatchMedia(initialMatches: boolean) {
	const listeners = new Set<ChangeListener>();
	const mql = {
		matches: initialMatches,
		media: '',
		addEventListener: (_: string, listener: ChangeListener) => listeners.add(listener),
		removeEventListener: (_: string, listener: ChangeListener) => listeners.delete(listener),
	};
	vi.spyOn(window, 'matchMedia').mockReturnValue(mql as unknown as MediaQueryList);
	return {
		emit(matches: boolean) {
			mql.matches = matches;
			listeners.forEach((listener) => listener({ matches }));
		},
		listeners,
	};
}

afterEach(() => vi.restoreAllMocks());

describe('useIsMobile', () => {
	it('reports desktop widths as not mobile', () => {
		stubMatchMedia(false);
		const { result } = renderHook(() => useIsMobile());
		expect(result.current).toBe(false);
	});

	it('reports mobile widths as mobile and reacts to viewport changes', () => {
		const media = stubMatchMedia(true);
		const { result } = renderHook(() => useIsMobile());
		expect(result.current).toBe(true);

		act(() => media.emit(false));
		expect(result.current).toBe(false);
	});

	it('unsubscribes from media query changes on unmount', () => {
		const media = stubMatchMedia(false);
		const { unmount } = renderHook(() => useIsMobile());
		expect(media.listeners.size).toBe(1);
		unmount();
		expect(media.listeners.size).toBe(0);
	});
});
