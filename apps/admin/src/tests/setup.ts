import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import { nullish } from '~/lib/utils';

afterEach(() => {
	cleanup();
	vi.unstubAllEnvs();
});

// jsdom does not implement these browser APIs that Radix, Recharts, and
// responsive hooks rely on.
if (nullish(window.matchMedia)) {
	Object.defineProperty(window, 'matchMedia', {
		writable: true,
		value: (query: string) => {
			const listeners = new Set<(event: MediaQueryListEvent) => void>();
			return {
				matches: false,
				media: query,
				onchange: null,
				addEventListener: (_type: string, listener: (event: MediaQueryListEvent) => void) => listeners.add(listener),
				removeEventListener: (_type: string, listener: (event: MediaQueryListEvent) => void) =>
					listeners.delete(listener),
				addListener: (listener: (event: MediaQueryListEvent) => void) => listeners.add(listener),
				removeListener: (listener: (event: MediaQueryListEvent) => void) => listeners.delete(listener),
				dispatchEvent: () => true,
			};
		},
	});
}

class ResizeObserverStub {
	observe() {}
	unobserve() {}
	disconnect() {}
}
window.ResizeObserver = window.ResizeObserver ?? (ResizeObserverStub as unknown as typeof ResizeObserver);

class IntersectionObserverStub {
	root = null;
	rootMargin = '';
	thresholds = [];
	observe() {}
	unobserve() {}
	disconnect() {}
	takeRecords() {
		return [];
	}
}
window.IntersectionObserver =
	window.IntersectionObserver ?? (IntersectionObserverStub as unknown as typeof IntersectionObserver);

window.HTMLElement.prototype.scrollIntoView = window.HTMLElement.prototype.scrollIntoView ?? (() => {});
window.HTMLElement.prototype.hasPointerCapture = window.HTMLElement.prototype.hasPointerCapture ?? (() => false);
window.HTMLElement.prototype.setPointerCapture = window.HTMLElement.prototype.setPointerCapture ?? (() => {});
window.HTMLElement.prototype.releasePointerCapture = window.HTMLElement.prototype.releasePointerCapture ?? (() => {});
