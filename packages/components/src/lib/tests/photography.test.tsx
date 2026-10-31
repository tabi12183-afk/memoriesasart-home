import { fireEvent, render, screen, act, within } from '@testing-library/react';
import { renderToStaticMarkup } from 'react-dom/server';
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { MemoriesPortfolio, safeMediaUrl } from '../photography/memories-portfolio';
import { photographyContent } from '../photography/content';

vi.mock('../photography/content', () => {
	const photo = (name: string) => ({
		src: `/assets/${name}.webp`,
		smallSrc: `/assets/${name}-640.webp`,
		width: 1600,
		height: 1067,
		smallWidth: 640,
		alt: `Portrait ${name}`,
	});
	const photos = Object.fromEntries(
		['unicorn', 'wedding', 'lightning', 'senior', 'newborn', 'magic', 'pet', 'architecture'].map((name) => [
			name,
			photo(name),
		]),
	);
	photos['architecture'] = {
		...photo('architecture'),
		src: '/assets/architecture.svg',
		smallSrc: '/assets/architecture.svg',
	};
	Object.assign(photos, {
		'portfolio-19': photo('unicorn'),
		'wedding-03': photo('wedding'),
		'ptba-photo-00': photo('pet'),
		'portfolio-27': photo('magic'),
	});
	const item = (slug: string, extra = {}) => ({
		slug,
		label: slug,
		title: `The **${slug}** collection`,
		seo: slug,
		summary: `About ${slug}`,
		images: ['pet', 'magic'],
		text: ['Photographs with feeling.'],
		details: ['Thoughtfully planned'],
		...extra,
	});
	const collections = {
		portraits: {
			label: 'Portraits',
			eyebrow: 'Portrait stories',
			headline: 'Your **story**',
			description: 'Portrait photography in Greensburg.',
			images: ['senior', 'newborn'],
			items: [item('families'), item('newborn', { babyPlan: true }), item('boudoir')],
		},
		weddings: {
			label: 'Weddings',
			eyebrow: 'Together',
			headline: 'A day to **remember**',
			description: 'Wedding photography.',
			images: ['wedding'],
			items: [item('engagements'), item('destination', { preview: true, previewNote: 'A selected collection.' })],
		},
		commercial: {
			label: 'Commercial',
			eyebrow: 'For business',
			headline: 'A fresh **perspective**',
			description: 'Commercial photography.',
			images: ['pet'],
			items: [item('real-estate', { images: ['architecture'] })],
		},
	};
	const page = (path: string, extra = {}) => ({
		title: path,
		description: `Description ${path}`,
		heading: `Heading ${path}`,
		intro: `Introduction ${path}`,
		eyebrow: 'Stories',
		body: 'A personal story with a [client gallery](https://www.memoriesasart.com/client-access) and [contact](/inquire/).',
		image: '/assets/pet.webp',
		preview: false,
		heroIds: [],
		galleryIds: [],
		...extra,
	});
	const pages = Object.fromEntries(
		[
			'/',
			'/portraits/',
			'/portraits/families/',
			'/portraits/newborn/',
			'/portraits/boudoir/',
			'/weddings/',
			'/weddings/engagements/',
			'/weddings/destination/',
			'/commercial/',
			'/commercial/real-estate/',
			'/about/',
			'/client-galleries/',
			'/blog/',
			'/not-found/',
			'/portraits/newborn/baby-plan/',
		].map((path) => [path, page(path)]),
	);
	pages['/about/'] = page('/about/', { heroIds: ['pet'], galleryIds: ['pet', 'magic'] });
	return {
		photographyContent: {
			photos,
			collections,
			media: { '/': { type: 'slideshow', images: ['unicorn', 'wedding', 'lightning', 'senior', 'newborn', 'magic'] } },
			pages,
			articles: [
				{
					slug: 'portrait-story',
					category: 'portraits',
					tag: 'Portrait notes',
					title: 'Portrait story',
					subtitle: 'Our portrait story.',
					img: 'pet',
					alt: 'A pet',
					desc: 'A portrait note.',
					body: 'An article.',
				},
				{
					slug: 'wedding-story',
					category: 'weddings',
					tag: 'Wedding notes',
					title: 'Wedding story',
					subtitle: 'Our wedding story.',
					img: 'wedding',
					alt: 'A wedding',
					desc: 'A wedding note.',
					body: 'An article.',
				},
				{
					slug: 'business-story',
					category: 'business',
					tag: 'Business notes',
					title: 'Business story',
					subtitle: 'Our business story.',
					img: 'pet',
					alt: 'A business',
					desc: 'A business note.',
					body: 'An article.',
				},
			],
		},
		memoriesPages: pages,
		memoriesPagePaths: Object.keys(pages),
	};
});

beforeEach(() => {
	vi.stubGlobal(
		'matchMedia',
		vi.fn().mockReturnValue({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() }),
	);
	HTMLDialogElement.prototype.showModal = function () {
		this.setAttribute('open', '');
	};
	HTMLDialogElement.prototype.close = function () {
		this.removeAttribute('open');
	};
});
afterEach(() => {
	vi.useRealTimers();
	vi.unstubAllGlobals();
});

describe('photography media safety', () => {
	it('accepts local or HTTPS media and rejects executable, network-relative, malformed, or escaped paths', () => {
		for (const url of ['/photo.webp', 'https://example.com/photo.webp']) expect(safeMediaUrl(url)).toBe(url);
		for (const url of [
			undefined,
			'',
			' javascript:alert(1)',
			'//example.com/a',
			'/\\evil',
			'http://example.com/a',
			'invalid',
		])
			expect(safeMediaUrl(url)).toBe('');
	});
});

describe('Memories as Art native portfolio', () => {
	it('renders the approved home introduction and slide order, with navigable collections', () => {
		const { container } = render(<MemoriesPortfolio />);
		expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Your life. A work of art.');
		expect([...container.querySelectorAll('.hero-slide img')].map((img) => img.getAttribute('src'))).toEqual(
			['unicorn', 'wedding', 'lightning', 'senior', 'newborn', 'magic'].map((name) => `/assets/${name}.webp`),
		);
		expect(screen.queryByRole('navigation', { name: 'Photography collections' })).not.toBeInTheDocument();
		fireEvent.click(screen.getByRole('button', { name: 'Show portraits collections' }));
		expect(screen.getByRole('link', { name: 'boudoir' })).toBeVisible();
		fireEvent.click(screen.getByRole('button', { name: 'Show portraits collections' }));
		expect(screen.getByRole('button', { name: /Menu/ })).toHaveAttribute('aria-expanded', 'false');
		fireEvent.click(screen.getByRole('button', { name: /Menu/ }));
		expect(screen.getByRole('button', { name: /Menu/ })).toHaveAttribute('aria-expanded', 'true');
		fireEvent.click(screen.getByRole('button', { name: /Menu/ }));
		expect(screen.getByRole('button', { name: /Menu/ })).toHaveAttribute('aria-expanded', 'false');
	});
	it('advances automatically, pauses, wraps in both directions and resumes', () => {
		vi.useFakeTimers();
		render(<MemoriesPortfolio />);
		const count = () => screen.getByText(/\d{2} \/ 06/);
		expect(count()).toHaveTextContent('01 / 06');
		act(() => vi.advanceTimersByTime(6000));
		expect(count()).toHaveTextContent('02 / 06');
		fireEvent.click(screen.getByRole('button', { name: 'Pause slideshow' }));
		act(() => vi.advanceTimersByTime(12000));
		expect(count()).toHaveTextContent('02 / 06');
		fireEvent.click(screen.getByRole('button', { name: 'Previous slide' }));
		expect(count()).toHaveTextContent('01 / 06');
		fireEvent.click(screen.getByRole('button', { name: 'Previous slide' }));
		expect(count()).toHaveTextContent('06 / 06');
		fireEvent.click(screen.getByRole('button', { name: 'Next slide' }));
		expect(count()).toHaveTextContent('01 / 06');
		fireEvent.click(screen.getByRole('button', { name: 'Play slideshow' }));
		act(() => vi.advanceTimersByTime(6000));
		expect(count()).toHaveTextContent('02 / 06');
	});
	it('honors reduced motion and supports an explicitly supplied video', () => {
		vi.useFakeTimers();
		vi.stubGlobal(
			'matchMedia',
			vi.fn().mockReturnValue({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() }),
		);
		const { rerender, container } = render(<MemoriesPortfolio heroVideo="https://example.com/reel.mp4" />);
		expect(container.querySelector('video')).toHaveAttribute('src', 'https://example.com/reel.mp4');
		expect(container.querySelector('video')).not.toHaveAttribute('autoplay');
		act(() => vi.advanceTimersByTime(12000));
		expect(screen.getByText('01 / 06')).toBeInTheDocument();
		rerender(<MemoriesPortfolio heroImage={{ src: '/new.webp', alt: 'New cover' }} heading="My story" intro="Hello" />);
		expect(screen.getByAltText('New cover')).toBeInTheDocument();
		expect(container.querySelector('video')).not.toBeInTheDocument();
		expect(screen.getByText('01 / 01')).toBeInTheDocument();
	});
	it('renders CMS heading, intro, gallery, poster and client destination overrides as content', () => {
		render(
			<MemoriesPortfolio
				pagePath="/client-galleries/"
				heading="Your photographs"
				intro="Welcome back"
				heroImage={{ src: '/cover.webp' }}
				galleryImages={
					' /a.webp | First photograph\nhttps://example.com/b.webp |\n/a3.webp | Third photograph\n javascript:bad | Skip'
				}
				clientGalleryUrl="https://gallery.example.com/"
			/>,
		);
		expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Your photographs');
		expect(screen.getByText('Welcome back')).toBeInTheDocument();
		expect(screen.getByRole('link', { name: 'client gallery' })).toHaveAttribute(
			'href',
			'https://gallery.example.com/',
		);
		expect(screen.getByRole('button', { name: 'View photograph: First photograph' })).toBeInTheDocument();
		expect(screen.getByAltText('Third photograph')).toHaveAttribute('sizes', '(max-width: 1440px) 90vw, 1400px');
		expect(screen.getByRole('button', { name: 'View photograph: Photograph by Memories as Art' })).toBeInTheDocument();
		expect(screen.queryByText('Skip')).not.toBeInTheDocument();
		expect(screen.getByAltText('Selected photography by Memories as Art')).toBeInTheDocument();
	});
	it('preserves defaults for blank overrides and renders collection cards, details and previews', () => {
		const { rerender } = render(
			<MemoriesPortfolio pagePath="/portraits/" heading=" " intro=" " galleryImages="invalid" />,
		);
		expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Your story');
		expect(screen.getByRole('link', { name: /boudoir/ })).toHaveAttribute('href', '/portraits/boudoir/');
		fireEvent.click(screen.getByRole('button', { name: 'Show portraits portfolios' }));
		expect(screen.getByRole('link', { name: 'boudoir' })).toHaveAttribute('href', '/portraits/boudoir/');
		fireEvent.click(screen.getByRole('button', { name: 'Show portraits portfolios' }));

		rerender(<MemoriesPortfolio pagePath="/portraits/newborn/" />);
		expect(screen.getByText('Thoughtfully planned')).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /baby plan/ })).toHaveAttribute(
			'href',
			'/inquire/?service=Newborn%20baby%20plan',
		);
		rerender(<MemoriesPortfolio pagePath="/weddings/destination/" />);
		expect(screen.getByText('A selected collection.')).toBeInTheDocument();
		rerender(<MemoriesPortfolio pagePath="/commercial/" />);
		expect(screen.getByAltText('Portrait architecture')).not.toHaveAttribute('srcset');
		expect(screen.getByRole('link', { name: 'Explore my marketing work ↗' })).toHaveAttribute(
			'href',
			'https://ptbabusinessservices.com/',
		);
		rerender(<MemoriesPortfolio pagePath="/commercial/real-estate/" />);
		expect(screen.queryByRole('button', { name: /View photograph/ })).not.toBeInTheDocument();
		rerender(<MemoriesPortfolio pagePath="/portraits/newborn/baby-plan/" />);
		expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Heading /portraits/newborn/baby-plan/');
		rerender(<MemoriesPortfolio pagePath="/unknown/" />);
		expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Your life. A work of art.');
	});
	it('opens a modal gallery and supports close, keyboard navigation, wrapping and Escape', () => {
		render(<MemoriesPortfolio pagePath="/portraits/families/" />);
		fireEvent.click(screen.getByRole('button', { name: 'View photograph: Portrait pet' }));
		let dialog = screen.getByRole('dialog', { name: 'Photograph viewer' });
		expect(within(dialog).getByRole('img')).toHaveAttribute('src', '/assets/pet.webp');
		fireEvent.keyDown(dialog, { key: 'ArrowLeft' });
		expect(within(dialog).getByRole('img')).toHaveAttribute('src', '/assets/magic.webp');
		fireEvent.keyDown(dialog, { key: 'ArrowRight' });
		expect(within(dialog).getByRole('img')).toHaveAttribute('src', '/assets/pet.webp');
		fireEvent.click(within(dialog).getByRole('button', { name: 'Next photograph' }));
		expect(within(dialog).getByRole('img')).toHaveAttribute('src', '/assets/magic.webp');
		fireEvent.click(within(dialog).getByRole('button', { name: 'Previous photograph' }));
		fireEvent.keyDown(dialog, { key: 'Enter' });
		fireEvent.click(within(dialog).getByRole('button', { name: 'Close photograph' }));
		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
		fireEvent.click(screen.getByRole('button', { name: 'View photograph: Portrait magic' }));
		dialog = screen.getByRole('dialog');
		fireEvent.keyDown(dialog, { key: 'Escape' });
		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
		fireEvent.click(screen.getByRole('button', { name: 'View photograph: Portrait pet' }));
		fireEvent(screen.getByRole('dialog'), new Event('cancel', { bubbles: true, cancelable: true }));
		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
	});
	it('keeps supplementary galleries, links and body copy, and filters journal articles', () => {
		const { rerender } = render(<MemoriesPortfolio pagePath="/about/" />);
		expect(screen.getByText('Heading /about/')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'View photograph: Portrait magic' })).toBeInTheDocument();
		rerender(<MemoriesPortfolio pagePath="/blog/" />);
		expect(screen.getByRole('link', { name: /Portrait story/ })).toBeInTheDocument();
		fireEvent.click(screen.getByRole('button', { name: 'Weddings' }));
		expect(screen.queryByRole('link', { name: /Portrait story/ })).not.toBeInTheDocument();
		expect(screen.getByRole('link', { name: /Wedding story/ })).toBeInTheDocument();
		fireEvent.click(screen.getByRole('button', { name: 'Business' }));
		expect(screen.getByRole('link', { name: /Business story/ })).toBeInTheDocument();
		fireEvent.click(screen.getByRole('button', { name: 'Portraits' }));
		expect(screen.getByRole('link', { name: /Portrait story/ })).toBeInTheDocument();
		fireEvent.click(screen.getByRole('button', { name: 'All stories' }));
		expect(screen.getAllByRole('link', { name: /story/ }).length).toBe(3);
	});
	it('renders on the server without scripts, HTML injection or browser globals', () => {
		const html = renderToStaticMarkup(
			<MemoriesPortfolio pagePath="/portraits/boudoir/" heading={'<script>bad</script>'} />,
		);
		expect(html).not.toContain('<script>bad</script>');
		expect(html).toContain('&lt;script&gt;bad&lt;/script&gt;');
		expect(photographyContent.media['/']!.images).toHaveLength(6);
	});
});
