import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Button, buttonVariants } from '../button';
import { CallToAction } from '../call-to-action';
import { Card } from '../card';
import { Group } from '../group';
import { Heading } from '../heading';
import { Hero } from '../hero';
import { Image } from '../image';
import { Navigation } from '../navigation';
import { RichText } from '../rich-text';
import { Section } from '../section';
import { SiteInfo } from '../site-info';
import { Text } from '../text';

describe('Button', () => {
	it('renders a button element with default variant and size', () => {
		const html = renderToStaticMarkup(<Button>Save</Button>);
		expect(html).toContain('<button');
		expect(html).toContain('data-variant="default"');
		expect(html).toContain('data-size="default"');
	});

	it('applies the requested variant, size, and extra classes', () => {
		const html = renderToStaticMarkup(
			<Button variant="outline" size="lg" className="custom-class">
				Save
			</Button>,
		);
		expect(html).toContain('data-variant="outline"');
		expect(html).toContain('data-size="lg"');
		expect(html).toContain('custom-class');
	});

	it('renders into its child when asChild is set', () => {
		const html = renderToStaticMarkup(
			<Button asChild>
				<a href="/somewhere">Go</a>
			</Button>,
		);
		expect(html).not.toContain('<button');
		expect(html).toContain('href="/somewhere"');
		expect(html).toContain('data-slot="button"');
	});

	it('exposes variants for links styled as buttons', () => {
		expect(buttonVariants({ variant: 'link' })).toContain('underline-offset-4');
	});
});

describe('Group', () => {
	it('renders an article with the spacious default layout', () => {
		const html = renderToStaticMarkup(<Group>content</Group>);
		expect(html).toContain('<article');
		expect(html).toContain('grid');
	});

	it('keeps an empty group visible as a content boundary', () => {
		const html = renderToStaticMarkup(<Group />);
		expect(html).toContain('min-h-24');
	});

	it('tightens spacing in the compact density', () => {
		const html = renderToStaticMarkup(<Group density="compact">content</Group>);
		expect(html).toContain('flex-row');
		expect(html).not.toContain('place-items-center');
	});
});

describe('Section', () => {
	it('renders a labelled section', () => {
		const html = renderToStaticMarkup(<Section label="Features">body</Section>);
		expect(html).toContain('<section');
		expect(html).toContain('Features');
	});

	it('omits the label element when no label is given', () => {
		expect(renderToStaticMarkup(<Section>body</Section>)).not.toContain('<p');
	});
});

describe('Text', () => {
	it('renders the provided copy', () => {
		expect(renderToStaticMarkup(<Text content="Hello there" />)).toContain('Hello there');
	});

	it('falls back to placeholder copy', () => {
		expect(renderToStaticMarkup(<Text />)).toContain('Add body copy.');
	});
});

describe('Image', () => {
	it('renders a placeholder when no image is selected', () => {
		const html = renderToStaticMarkup(<Image alt="" />);
		expect(html).not.toContain('<img');
		expect(html).toContain('Image');
	});

	it('renders a placeholder when the asset has no src', () => {
		expect(renderToStaticMarkup(<Image image={{ src: '' }} alt="" />)).not.toContain('<img');
	});

	it('lets an explicit alt prop override the asset alt text', () => {
		const html = renderToStaticMarkup(<Image image={{ src: '/cat.jpg', alt: 'From asset' }} alt="A cat" />);
		expect(html).toContain('src="/cat.jpg"');
		expect(html).toContain('alt="A cat"');
	});

	it('allows an explicitly empty alt for decorative images', () => {
		expect(renderToStaticMarkup(<Image image={{ src: '/cat.jpg' }} alt="" />)).toContain('alt=""');
	});

	// A bare image is the author's asset, not a design element. Framing belongs
	// to Figure, which is told what the image is and can justify the treatment.
	it('imposes no frame or crop of its own', () => {
		const html = renderToStaticMarkup(<Image image={{ src: '/cat.jpg' }} alt="" />);
		expect(html).not.toMatch(/rounded/);
		expect(html).not.toContain('object-cover');
		expect(html).toContain('h-auto');
	});
});

describe('Navigation', () => {
	it('prompts editors to add links when there are none', () => {
		expect(renderToStaticMarkup(<Navigation />)).toContain('Add navigation links.');
		expect(renderToStaticMarkup(<Navigation links={{}} />)).toContain('Add navigation links.');
	});

	it('renders each link with a sanitized href', () => {
		const html = renderToStaticMarkup(<Navigation links={{ Home: '/', Bad: 'javascript:alert(1)' }} />);
		expect(html).toContain('href="/"');
		expect(html).toContain('>Home</a>');
		expect(html).toContain('href="#"');
	});

	it('ships a labelled toggle wired to the menu it controls', () => {
		const html = renderToStaticMarkup(<Navigation links={{ Home: '/' }} />);
		const controls = /aria-controls="([^"]+)"/.exec(html);
		expect(controls).not.toBeNull();
		// Whatever the toggle claims to control has to actually exist, or the
		// menu is unreachable for anyone using assistive tech.
		expect(html).toContain(`id="${controls?.[1] ?? ''}"`);
		expect(html).toContain('aria-expanded="false"');
		expect(html).toContain('aria-label="Open menu"');
	});

	it('names itself so two menus on a page can be told apart', () => {
		expect(renderToStaticMarkup(<Navigation links={{ Home: '/' }} />)).toContain('aria-label="Main"');
		expect(renderToStaticMarkup(<Navigation links={{ Terms: '/terms' }} purpose="Legal" />)).toContain(
			'aria-label="Legal"',
		);
	});
});

describe('Heading', () => {
	it('falls back to placeholder text at the default level', () => {
		const html = renderToStaticMarkup(<Heading />);
		expect(html).toContain('<h2');
		expect(html).toContain('Heading');
	});
});

describe('Card', () => {
	it('omits the title heading when no title is given', () => {
		expect(renderToStaticMarkup(<Card>body</Card>)).not.toContain('<h3');
	});
});

describe('CallToAction', () => {
	it('falls back to placeholder label and href', () => {
		const html = renderToStaticMarkup(<CallToAction />);
		expect(html).toContain('Learn More');
		expect(html).toContain('href="#"');
	});
});

describe('Hero', () => {
	it('falls back to placeholder title without optional content', () => {
		const html = renderToStaticMarkup(<Hero />);
		expect(html).toContain('A clear, meaningful promise');
		expect(html).not.toContain('<img');
		expect(html).not.toContain('<a');
	});

	it('renders the decorative background image when one is set', () => {
		const html = renderToStaticMarkup(<Hero backgroundImage={{ src: '/bg.jpg' }} />);
		expect(html).toContain('src="/bg.jpg"');
		expect(html).toContain('alt=""');
	});

	it('skips the background image when the asset has no src', () => {
		expect(renderToStaticMarkup(<Hero backgroundImage={{ src: '' }} />)).not.toContain('<img');
	});
});

describe('SiteInfo', () => {
	it('renders a bare copyright line when nothing is configured', () => {
		const html = renderToStaticMarkup(<SiteInfo />);
		expect(html).not.toContain('<nav');
		expect(html).not.toContain('<address');
		expect(html).toContain(`© ${new Date().getFullYear()}`);
	});

	it('renders footer links with sanitized hrefs', () => {
		const html = renderToStaticMarkup(<SiteInfo links={{ GitHub: 'https://github.com/acme' }} />);
		expect(html).toContain('<nav');
		expect(html).toContain('href="https://github.com/acme"');
	});

	it.each([
		['address', { address: 'Main Street' }, 'Main Street'],
		['email', { email: 'hi@example.com' }, 'mailto:hi@example.com'],
		['phone', { phone: '(555) 123-4567' }, 'tel:5551234567'],
	])('renders contact info when only %s is set', (_name, props, expected) => {
		const html = renderToStaticMarkup(<SiteInfo {...props} />);
		expect(html).toContain('<address');
		expect(html).toContain(expected);
	});
});

describe('RichText', () => {
	it('prompts editors when content is missing or blank', () => {
		expect(renderToStaticMarkup(<RichText />)).toContain('Add rich text content.');
		expect(renderToStaticMarkup(<RichText content="   " />)).toContain('Add rich text content.');
	});

	it('styles every supported block element', () => {
		const html = renderToStaticMarkup(
			<RichText
				content={[
					'# Title',
					'## Subtitle',
					'### Heading three',
					'- item one',
					'1. step one',
					'> quoted wisdom',
					'[link](https://example.com)',
				].join('\n\n')}
			/>,
		);
		expect(html).toContain('<h1');
		expect(html).toContain('<h2');
		expect(html).toContain('<h3');
		expect(html).toContain('<ul');
		expect(html).toContain('<ol');
		expect(html).toContain('<blockquote');
		expect(html).toContain('href="https://example.com"');
	});
});
