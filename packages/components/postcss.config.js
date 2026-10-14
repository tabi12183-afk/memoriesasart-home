/**
 * The compiled stylesheet is always scoped: every selector is prefixed with
 * `.site-root__html`, the same convention the site theme uses. The site sets
 * that class on <html>, so the styles apply everywhere there; hosts that embed
 * the components (like the admin's page-builder preview) set it on a wrapper,
 * and the styles can't leak outside it.
 *
 * Preflight's document-level selectors are remapped instead of prefixed, so
 * the site root carries its own baseline (box model, typography resets)
 * wherever it's mounted, rather than inheriting the host document's.
 */
const prefix = '.site-root__html';

const postcssConfig = {
	plugins: {
		'@tailwindcss/postcss': {},
		'postcss-prefix-selector': {
			prefix,
			transform(_prefix, selector, prefixedSelector) {
				if (selector === 'html' || selector === ':host') return prefix;
				if (selector === 'body') return '.site-root__body';
				// Apply universal resets to the site root itself, not just descendants.
				if (selector === '*') return `${prefix}, ${prefix} *`;
				// The isolation boundary wraps the site root; leave it unscoped.
				if (selector === '.site-root') return selector;
				return prefixedSelector;
			},
		},
	},
};

export default postcssConfig;
