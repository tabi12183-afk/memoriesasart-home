import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Figure, type FigureDepicts } from '../figure';

const render = (props: Parameters<typeof Figure>[0]) => renderToStaticMarkup(<Figure {...props} />);

const kinds: FigureDepicts[] = ['photograph', 'illustration', 'screenshot', 'diagram', 'portrait', 'logo'];

describe('Figure', () => {
	it('renders a real figure element', () => {
		expect(render({ image: { src: '/a.jpg' } })).toContain('<figure');
	});

	it('shows a placeholder naming the kind before an image is chosen', () => {
		const html = render({ depicts: 'diagram' });
		expect(html).not.toContain('<img');
		expect(html).toContain('Diagram');
	});

	it('captions and credits an informative image', () => {
		const html = render({ image: { src: '/a.jpg' }, caption: 'The old mill', credit: 'Photo: Jane Doe' });
		expect(html).toContain('<figcaption');
		expect(html).toContain('The old mill');
		expect(html).toContain('Photo: Jane Doe');
	});

	it('omits the caption entirely when there is nothing to say', () => {
		expect(render({ image: { src: '/a.jpg' } })).not.toContain('<figcaption');
	});

	it('accepts a credit without a caption, and a caption without a credit', () => {
		const creditOnly = render({ image: { src: '/a.jpg' }, credit: 'Photo: Jane Doe' });
		expect(creditOnly).toContain('<figcaption');
		expect(creditOnly).toContain('Photo: Jane Doe');

		const captionOnly = render({ image: { src: '/a.jpg' }, caption: 'The old mill' });
		expect(captionOnly).toContain('<figcaption');
		expect(captionOnly).toContain('The old mill');
	});

	// Cleared fields arrive as empty strings, not as absent props, so they must
	// not produce an empty caption bar under the image.
	it('treats cleared caption and credit fields as absent', () => {
		expect(render({ image: { src: '/a.jpg' }, caption: '', credit: '' })).not.toContain('<figcaption');
	});

	/**
	 * A decorative image repeats what the surrounding text already says, so
	 * announcing it is noise. It gets an empty alt and is hidden from the
	 * accessibility tree, and a caption would contradict both.
	 */
	it('hides a decorative image from assistive tech and drops its caption', () => {
		const html = render({ image: { src: '/a.jpg', alt: 'ignored' }, role: 'decorative', caption: 'Nope' });
		expect(html).toContain('aria-hidden="true"');
		expect(html).toContain('alt=""');
		expect(html).not.toContain('<figcaption');
		expect(html).not.toContain('Nope');
	});

	it('falls back to the alt text stored with the asset', () => {
		expect(render({ image: { src: '/a.jpg', alt: 'A mill at dusk' } })).toContain('alt="A mill at dusk"');
	});

	it('gives every kind a distinct treatment', () => {
		const treatments = kinds.map((depicts) => {
			const html = render({ image: { src: '/a.jpg' }, depicts });
			// Every class on the figure, its frame and the image together: two
			// kinds that produced identical markup would be a distinction the
			// author can make but never see.
			return [...html.matchAll(/class="([^"]*)"/g)].map((match) => match[1]).join('|');
		});
		expect(new Set(treatments).size).toBe(kinds.length);
	});

	/**
	 * The reasons each treatment exists, asserted so a future restyle has to
	 * keep them true rather than quietly dropping the one thing that made the
	 * choice defensible.
	 */
	it('borders a screenshot so its edges do not bleed into the page', () => {
		expect(render({ image: { src: '/a.png' }, depicts: 'screenshot' })).toMatch(/border(?!-dashed)/);
	});

	it('never crops a logo or a diagram', () => {
		expect(render({ image: { src: '/logo.svg' }, depicts: 'logo' })).toContain('object-contain');
		expect(render({ image: { src: '/d.svg' }, depicts: 'diagram' })).toContain('object-contain');
	});

	it('gives a diagram a surface of its own to sit on', () => {
		expect(render({ image: { src: '/d.svg' }, depicts: 'diagram' })).toContain('bg-muted');
	});

	it('crops a portrait round and centred', () => {
		const html = render({ image: { src: '/p.jpg' }, depicts: 'portrait' });
		expect(html).toContain('rounded-full');
		expect(html).toContain('aspect-square');
	});
});
