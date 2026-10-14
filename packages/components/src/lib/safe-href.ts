const SAFE_PROTOCOLS = new Set(['http:', 'https:', 'mailto:', 'tel:']);

/** Keeps editor-authored links useful without allowing executable URL schemes. */
export function safeHref(value: string | undefined, fallback = '#'): string {
	const href = value?.trim() ?? '';
	if (href === '') return fallback;
	if (href.startsWith('/') || href.startsWith('#') || href.startsWith('?')) return href;

	try {
		const url = new URL(href);
		return SAFE_PROTOCOLS.has(url.protocol) ? href : fallback;
	} catch {
		// Bare paths such as "about" are valid same-site links; protocol-looking
		// values that URL rejected are not.
		return /^[a-z][a-z\d+.-]*:/i.test(href) ? fallback : href;
	}
}
