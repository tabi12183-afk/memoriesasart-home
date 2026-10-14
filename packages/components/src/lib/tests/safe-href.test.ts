import { describe, expect, it } from 'vitest';
import { safeHref } from '../safe-href';

describe('safeHref', () => {
	it.each(['/about', 'about', '#details', '?page=2', 'https://example.com', 'mailto:hello@example.com'])(
		'keeps safe link %s',
		(href) => expect(safeHref(href)).toBe(href),
	);

	it.each(['javascript:alert(1)', 'data:text/html,bad', 'vbscript:msgbox(1)'])('rejects executable link %s', (href) =>
		expect(safeHref(href)).toBe('#'),
	);

	it.each([undefined, '', '   '])('falls back when the link is missing or blank (%j)', (href) =>
		expect(safeHref(href)).toBe('#'),
	);

	it('rejects protocol-looking values that are not valid URLs', () => {
		expect(safeHref('http://')).toBe('#');
	});

	it('honors a custom fallback', () => {
		expect(safeHref('javascript:alert(1)', '/home')).toBe('/home');
	});
});
