'use client';

import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type KeyboardEvent } from 'react';
import type { ImageAsset } from '@stormycms/core';
import ReactMarkdown from 'react-markdown';
import {
	photographyContent,
	memoriesPages,
	type PhotographyPhoto,
	type PhotographyGroup,
	type PhotographyCollection,
} from './content';

export type MemoriesPortfolioProps = {
	pagePath?: string;
	heading?: string;
	intro?: string;
	heroImage?: ImageAsset;
	heroVideo?: string;
	galleryImages?: string;
	clientGalleryUrl?: string;
};

/** Media is limited to same-origin paths or explicit HTTPS destinations. */
export function safeMediaUrl(value?: string) {
	const url = value?.trim() ?? '';
	if (/^\/(?!\/)/.test(url) && !url.includes('\\')) return url;
	try {
		const parsed = new URL(url);
		return parsed.protocol === 'https:' ? parsed.href : '';
	} catch {
		return '';
	}
}

function Photo({
	photo,
	eager = false,
	sizes = '(max-width: 1440px) 44vw, 700px',
}: {
	photo: PhotographyPhoto;
	eager?: boolean;
	sizes?: string;
}) {
	return (
		<img
			src={photo.src}
			alt={photo.alt}
			width={photo.width}
			height={photo.height}
			srcSet={
				photo.smallSrc !== undefined && photo.smallSrc !== photo.src
					? `${photo.smallSrc} ${photo.smallWidth}w, ${photo.src} ${photo.width}w`
					: undefined
			}
			sizes={sizes}
			loading={eager ? 'eager' : 'lazy'}
			fetchPriority={eager ? 'high' : undefined}
			decoding="async"
		/>
	);
}

function CollectionLinks({ groupKey, group }: { groupKey: string; group: PhotographyGroup }) {
	return (
		<>
			{group.items.map((item) => (
				<a key={item.slug} href={`/${groupKey}/${item.slug}/`}>
					{item.label}
				</a>
			))}
		</>
	);
}

function CollectionMenu({ groupKey, group, active }: { groupKey: string; group: PhotographyGroup; active: string }) {
	const [open, setOpen] = useState(false);
	return (
		<div className="collection-nav-group">
			<a href={`/${groupKey}/`} aria-current={active === groupKey ? 'page' : undefined}>
				{group.label}
			</a>
			<button
				className="dropdown-toggle"
				aria-expanded={open}
				aria-controls={`nav-${groupKey}`}
				aria-label={`Show ${group.label.toLowerCase()} portfolios`}
				onClick={() => setOpen(!open)}
			>
				⌄
			</button>
			<div className="dropdown" id={`nav-${groupKey}`} hidden={!open}>
				<CollectionLinks groupKey={groupKey} group={group} />
			</div>
		</div>
	);
}

function Header({ active }: { active: string }) {
	const [open, setOpen] = useState(false);
	return (
		<>
			<a className="skip-link" href="#main">
				Skip to content
			</a>
			<header className="site-header">
				<nav className="header-links" aria-label="Studio">
					<a href="/about/">About</a>
					<a href="/blog/">Journal</a>
				</nav>
				<a className="brand" href="/" aria-label="Memories as Art home">
					<span className="brand-window">
						<img src="/assets/brand-logo-transparent.png" width={1254} height={1254} alt="Memories as Art" />
					</span>
				</a>
				<nav className="header-links right" aria-label="Get in touch">
					<a href="/client-galleries/">Client galleries</a>
					<a href="/inquire/">Inquire ↗</a>
				</nav>
				<button className="menu-toggle" aria-controls="site-menu" aria-expanded={open} onClick={() => setOpen(!open)}>
					Menu <span aria-hidden="true">☰</span>
				</button>
			</header>
			<nav id="site-menu" className="site-menu" aria-label="Main menu" hidden={!open}>
				{Object.entries(photographyContent.collections).map(([key, group]) => (
					<details className="nav-group" key={key}>
						<summary>
							{group.label}
							<span aria-hidden="true">+</span>
						</summary>
						<div>
							<a href={`/${key}/`}>Explore all {group.label.toLowerCase()}</a>
							<CollectionLinks groupKey={key} group={group} />
						</div>
					</details>
				))}
				<a href="/shop/">Shop · Coming soon</a>
				<a href="/about/">About Tabitha</a>
				<a href="/blog/">Journal</a>
				<a href="/client-galleries/">Client galleries</a>
				<a href="/inquire/">Inquire</a>
			</nav>
			{active !== '' ? (
				<nav className="collection-nav" aria-label="Photography collections">
					{Object.entries(photographyContent.collections).map(([key, group]) => (
						<CollectionMenu key={key} groupKey={key} group={group} active={active} />
					))}
					<a href="/shop/">Shop</a>
				</nav>
			) : null}
		</>
	);
}

function Footer() {
	return (
		<footer className="site-footer">
			<div className="footer-main">
				<a className="footer-name" href="/">
					Memories as Art
				</a>
				<p>
					Photographs with feeling.
					<br />
					Greensburg · Westmoreland County · Pittsburgh
				</p>
				<nav aria-label="Studio links">
					<a href="/about/">About</a>
					<a href="/blog/">Journal</a>
					<a href="/client-galleries/">Client galleries</a>
					<a href="/inquire/">Inquire</a>
				</nav>
			</div>
			<div className="footer-bottom">
				<small>© 2026 Memories as Art Photography</small>
				<nav aria-label="Social media">
					<a href="https://www.instagram.com/memoriesasart_photography/">Instagram</a>
					<a href="https://www.facebook.com/memoriesasartphotography/photos">Facebook</a>
					<a href="https://www.facebook.com/AuthorIllustratorTabithaBowman/photos">Fine art Facebook</a>
					<a href="https://www.tiktok.com/@tabithaashleydavis">TikTok</a>
				</nav>
			</div>
		</footer>
	);
}

const motionQuery = '(prefers-reduced-motion: reduce)';
function subscribeMotion(onChange: () => void) {
	const preference = window.matchMedia(motionQuery);
	preference.addEventListener('change', onChange);
	return () => preference.removeEventListener('change', onChange);
}
function motionSnapshot() {
	return window.matchMedia(motionQuery).matches;
}
function serverMotionSnapshot() {
	return true;
}

function Hero({
	photos,
	home,
	heading,
	video,
}: {
	photos: PhotographyPhoto[];
	home: boolean;
	heading: string;
	video: string;
}) {
	const [index, setIndex] = useState(0);
	const [paused, setPaused] = useState(false);
	const reduced = useSyncExternalStore(subscribeMotion, motionSnapshot, serverMotionSnapshot);
	const move = (step: number) => setIndex((current) => (current + step + photos.length) % photos.length);
	useEffect(() => {
		if (paused || reduced || photos.length < 2 || video !== '') return;
		const timer = window.setInterval(() => setIndex((current) => (current + 1) % photos.length), 6000);
		return () => window.clearInterval(timer);
	}, [paused, reduced, photos.length, video]);
	return (
		<section
			className={`hero-media ${home ? 'home-media' : 'portfolio-media'}`}
			aria-label={home ? 'Selected photography by Memories as Art' : 'Portfolio slideshow'}
		>
			<div className="hero-frames">
				{photos.map((photo, i) => (
					<figure
						key={photo.src}
						className={`hero-slide${i === index ? ' is-active' : ''}`}
						aria-hidden={i !== index}
						style={{ '--slide-image': `url("${photo.src}")` } as CSSProperties}
					>
						<Photo photo={photo} eager={i === 0} sizes="100vw" />
					</figure>
				))}
			</div>
			{video !== '' ? (
				<video
					className="hero-video"
					src={video}
					poster={photos[0]!.src}
					muted
					playsInline
					loop
					controls
					autoPlay={!reduced}
					preload="none"
					aria-label="Photography film"
					style={{ opacity: 1 }}
				/>
			) : null}
			{home ? (
				<div className="hero-caption">
					<p>PHOTOGRAPHY WITH A LITTLE WONDER</p>
					<h1>
						<Markdown inline clientUrl="https://www.memoriesasart.com/client-access">
							{heading}
						</Markdown>
					</h1>
					<span>Greensburg, PA &amp; the Pittsburgh area</span>
				</div>
			) : null}
			<div className="media-controls">
				<button onClick={() => move(-1)} aria-label="Previous slide">
					←
				</button>
				<span className="media-count">
					{String(index + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
				</span>
				<button onClick={() => move(1)} aria-label="Next slide">
					→
				</button>
				<button onClick={() => setPaused(!paused)} aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}>
					<span aria-hidden="true">{paused ? '▶' : 'Ⅱ'}</span>
				</button>
			</div>
		</section>
	);
}

function Viewer({
	photos,
	index,
	onClose,
	onMove,
}: {
	photos: PhotographyPhoto[];
	index: number;
	onClose: () => void;
	onMove: (index: number) => void;
}) {
	const dialog = useRef<HTMLDialogElement>(null);
	useEffect(() => {
		const element = dialog.current!;
		element.showModal();
		return () => element.close();
	}, []);
	const move = (step: number) => onMove((index + step + photos.length) % photos.length);
	const keyboard = (event: KeyboardEvent) => {
		if (event.key === 'Escape') onClose();
		if (event.key === 'ArrowLeft') move(-1);
		if (event.key === 'ArrowRight') move(1);
	};
	return (
		<dialog
			ref={dialog}
			className="lightbox"
			aria-label="Photograph viewer"
			onKeyDown={keyboard}
			onCancel={(event) => {
				event.preventDefault();
				onClose();
			}}
		>
			<button autoFocus className="lightbox-close" aria-label="Close photograph" onClick={onClose}>
				×
			</button>
			<img src={photos[index]!.src} alt={photos[index]!.alt} />
			<div className="lightbox-bar">
				<button onClick={() => move(-1)} aria-label="Previous photograph">
					←
				</button>
				<p className="lightbox-caption" aria-live="polite">
					{photos[index]!.alt}
				</p>
				<button onClick={() => move(1)} aria-label="Next photograph">
					→
				</button>
			</div>
		</dialog>
	);
}

function Gallery({ photos }: { photos: PhotographyPhoto[] }) {
	const [index, setIndex] = useState<number | null>(null);
	return (
		<section className="gallery-section wrap">
			<div className="photo-grid" data-editable-gallery>
				{photos.map((photo, i) => (
					<button
						className="photo"
						key={photo.src}
						aria-label={`View photograph: ${photo.alt}`}
						onClick={() => setIndex(i)}
					>
						<Photo photo={photo} sizes={i % 3 === 2 ? '(max-width: 1440px) 90vw, 1400px' : undefined} />
						<span className="view-photo" aria-hidden="true">
							View photograph ↗
						</span>
					</button>
				))}
			</div>
			{index !== null ? (
				<Viewer photos={photos} index={index} onClose={() => setIndex(null)} onMove={setIndex} />
			) : null}
		</section>
	);
}

function InlineParagraph({ children }: { children?: React.ReactNode }) {
	return <>{children}</>;
}

function Markdown({ children, clientUrl, inline = false }: { children: string; clientUrl: string; inline?: boolean }) {
	return (
		<ReactMarkdown
			components={inline ? { p: InlineParagraph } : undefined}
			urlTransform={(url) => (url === 'https://www.memoriesasart.com/client-access' ? clientUrl : safeMediaUrl(url))}
		>
			{children}
		</ReactMarkdown>
	);
}

function CallToAction({ service }: { service: string }) {
	return (
		<section className="contact-strip">
			<h2>
				Let’s make something <em>worth keeping.</em>
			</h2>
			<a className="text-link" href={`/inquire/?service=${encodeURIComponent(service)}`}>
				Start a conversation <span aria-hidden="true">↗</span>
			</a>
		</section>
	);
}

function Door({ groupKey, group, photo }: { groupKey: string; group: PhotographyGroup; photo: PhotographyPhoto }) {
	const [open, setOpen] = useState(false);
	return (
		<article className="door">
			<a href={`/${groupKey}/`}>
				<div className="door-image">
					<Photo photo={photo} />
				</div>
			</a>
			<div className="door-label">
				<a href={`/${groupKey}/`}>{group.label}</a>
				<button
					className="dropdown-toggle"
					aria-expanded={open}
					aria-controls={`door-${groupKey}`}
					aria-label={`Show ${group.label.toLowerCase()} collections`}
					onClick={() => setOpen(!open)}
				>
					+
				</button>
			</div>
			<div id={`door-${groupKey}`} className="door-dropdown" hidden={!open}>
				<CollectionLinks groupKey={groupKey} group={group} />
			</div>
		</article>
	);
}

function Home() {
	return (
		<>
			<section className="home-collections wrap" id="collections">
				<div className="section-label">
					<span>FIND YOUR STORY</span>
					<span>01 — 04</span>
				</div>
				<div className="four-doors">
					{Object.entries(photographyContent.collections).map(([key, group]) => (
						<Door
							key={key}
							groupKey={key}
							group={group}
							photo={
								photographyContent.photos[
									key === 'portraits' ? 'portfolio-19' : key === 'weddings' ? 'wedding-03' : 'ptba-photo-00'
								]!
							}
						/>
					))}
					<article className="door">
						<a href="/shop/">
							<div className="door-image">
								<Photo photo={photographyContent.photos['portfolio-27']!} />
							</div>
						</a>
						<div className="door-label">
							<a href="/shop/">Shop</a>
							<span aria-hidden="true">↗</span>
						</div>
						<p className="coming-soon">Coming soon</p>
					</article>
				</div>
			</section>
			<section className="home-intro wrap">
				<p className="eyebrow">A little imagination. A lot of heart.</p>
				<h2>
					For the moments that feel
					<br />
					<em>like a little bit of magic.</em>
				</h2>
				<p>
					I’m Tabitha, the photographer and artist behind Memories as Art. I create photographs that hold onto a feeling
					— from the people you love to the stories you are building.
				</p>
				<p className="local-line">
					Portraits, weddings &amp; commercial photography
					<br />
					Greensburg, Pennsylvania · Westmoreland County · Pittsburgh
				</p>
				<a className="text-link" href="/about/">
					Meet the artist ↗
				</a>
			</section>
		</>
	);
}

function Cards({ groupKey, group }: { groupKey: string; group: PhotographyGroup }) {
	return (
		<section className="wrap collection-section">
			<div className="section-label">
				<span>EXPLORE THE COLLECTIONS</span>
				<span>{String(group.items.length).padStart(2, '0')}</span>
			</div>
			<div className="portfolio-cards">
				{group.items.map((item) => (
					<a className="portfolio-card" key={item.slug} href={`/${groupKey}/${item.slug}/`}>
						<div className="card-image">
							<Photo photo={photographyContent.photos[item.images[0]!]!} />
						</div>
						<h3>
							{item.label} <span aria-hidden="true">↗</span>
						</h3>
						<p>{item.summary}</p>
					</a>
				))}
			</div>
		</section>
	);
}

function CollectionStory({ item, clientUrl }: { item: PhotographyCollection; clientUrl: string }) {
	return (
		<>
			<section className="portfolio-story wrap">
				<h2>{item.seo}</h2>
				<div className="story-copy">
					{item.text.map((text) => (
						<Markdown key={text} clientUrl={clientUrl}>
							{text}
						</Markdown>
					))}
				</div>
			</section>

			{item.babyPlan === true ? (
				<section className="baby-plan wrap">
					<div>
						<p className="eyebrow">The baby plan</p>
						<h2>
							A whole year
							<br />
							<em>of little wonders.</em>
						</h2>
						<p>Five chapters, from the very beginning to their first birthday.</p>
					</div>
					<div>
						<ol className="milestones">
							{['Newborn', '3 months', '6 months', '9 months', '12 months'].map((label, index) => (
								<li key={label}>
									<span>{String(index + 1).padStart(2, '0')}</span>
									<p>{label}</p>
								</li>
							))}
						</ol>
						<p className="maternity-note">
							Optional <strong>free maternity session</strong> add-on.
						</p>
						<a className="text-link" href="/inquire/?service=Newborn%20baby%20plan">
							Ask about the baby plan ↗
						</a>
					</div>
				</section>
			) : null}
		</>
	);
}

function Journal() {
	const [category, setCategory] = useState('all');
	return (
		<section className="journal-page wrap">
			<div className="journal-filters" aria-label="Filter stories">
				{(
					[
						['all', 'All stories'],
						['portraits', 'Portraits'],
						['weddings', 'Weddings'],
						['business', 'Business'],
					] as const
				).map(([value, label]) => (
					<button key={value} aria-pressed={category === value} onClick={() => setCategory(value)}>
						{label}
					</button>
				))}
			</div>
			<div className="journal-cards">
				{photographyContent.articles
					.filter((article) => category === 'all' || article.category === category)
					.map((article) => (
						<a className="journal-card" key={article.slug} href={`/blog/${article.slug}/`}>
							<div className="journal-image">
								<Photo photo={photographyContent.photos[article.img]!} />
							</div>
							<p className="eyebrow">{article.tag}</p>
							<h2>{article.title}</h2>
							<p>{article.desc}</p>
						</a>
					))}
			</div>
		</section>
	);
}

/** Shared native presentation for authored photography collections and CMS overrides. */
export function MemoriesPortfolio(props: MemoriesPortfolioProps) {
	const candidatePath = props.pagePath ?? '/';
	const path = memoriesPages[candidatePath] !== undefined ? candidatePath : '/';
	const page = memoriesPages[path]!;
	const parts = path.split('/').filter(Boolean);
	const groupKey = parts[0] ?? '';
	const group = parts.length <= 2 ? photographyContent.collections[groupKey] : undefined;
	const item = group?.items.find((candidate) => candidate.slug === parts[1]);
	const home = path === '/';
	const headingOverride = props.heading?.trim() ?? '';
	const heading =
		headingOverride !== ''
			? headingOverride
			: home
				? 'Your life.  \n*A work of art.*'
				: (item?.title ?? group?.headline ?? page.heading);
	const introOverride = props.intro?.trim() ?? '';
	const intro = introOverride !== '' ? introOverride : (item?.summary ?? group?.description ?? page.intro);
	const clientOverride = safeMediaUrl(props.clientGalleryUrl);
	const clientUrl = clientOverride !== '' ? clientOverride : 'https://www.memoriesasart.com/client-access';
	const poster = safeMediaUrl(props.heroImage?.src);
	const heroIds = home
		? photographyContent.media['/']!.images
		: item !== undefined
			? item.images.slice(0, 3)
			: group !== undefined
				? group.images
				: page.heroIds;
	const photos = (ids: string[]) =>
		ids.filter((id) => id !== 'architecture').map((id) => photographyContent.photos[id]!);
	const heroPhotos =
		poster !== ''
			? [{ src: poster, alt: props.heroImage?.alt ?? 'Selected photography by Memories as Art' }]
			: photos(heroIds);
	const customGallery = (props.galleryImages ?? '')
		.split('\n')
		.map((line) => {
			const [raw, ...caption] = line.split('|');
			return {
				src: safeMediaUrl(raw),
				alt: caption.join('|').trim() === '' ? 'Photograph by Memories as Art' : caption.join('|').trim(),
			};
		})
		.filter((photo) => photo.src !== '');
	const galleryPhotos =
		customGallery.length > 0 ? customGallery : photos(item !== undefined ? item.images : page.galleryIds);
	return (
		<div className="maa-site" data-flow="bleed">
			<Header active={groupKey} />
			<main id="main">
				{!home ? (
					<header className="page-intro">
						<p className="eyebrow">
							{item !== undefined
								? `${group!.label} / ${item.label}`
								: group !== undefined
									? group.eyebrow
									: page.eyebrow}
						</p>
						<h1>
							<Markdown inline clientUrl={clientUrl}>
								{heading}
							</Markdown>
						</h1>
						<p>{intro}</p>
					</header>
				) : null}
				{heroPhotos.length > 0 ? (
					<Hero
						key={`${path}:${poster}`}
						photos={heroPhotos}
						home={home}
						heading={heading}
						video={safeMediaUrl(props.heroVideo)}
					/>
				) : null}{' '}
				{home ? (
					<Home />
				) : item !== undefined ? (
					<>
						<CollectionStory item={item} clientUrl={clientUrl} />
						{item.preview === true ? <p className="preview-note">{item.previewNote}</p> : null}
						<Gallery photos={galleryPhotos} />
						<section className="session-notes wrap">
							<div>
								{item.details.map((detail) => (
									<p key={detail}>{detail}</p>
								))}
							</div>
						</section>
						<CallToAction service={item.label} />
					</>
				) : group !== undefined ? (
					<>
						<Cards groupKey={groupKey} group={group} />
						{groupKey === 'commercial' ? (
							<section className="marketing-note wrap">
								<p className="eyebrow">The bigger picture</p>
								<h2>
									Good photographs.
									<br />
									<em>Thoughtful marketing.</em>
								</h2>
								<p>
									Need help putting your images to work? I also offer digital marketing and design through PTBA Business
									Services.
								</p>
								<a className="text-link" href="https://ptbabusinessservices.com/">
									Explore my marketing work ↗
								</a>
							</section>
						) : null}
						<CallToAction service={group.label} />
					</>
				) : (
					<>
						{path === '/blog/' ? (
							<Journal />
						) : (
							<section className="photography-copy wrap article-copy">
								<Markdown clientUrl={clientUrl}>{page.body}</Markdown>
							</section>
						)}
						{galleryPhotos.length > 0 ? <Gallery photos={galleryPhotos} /> : null}
					</>
				)}
			</main>
			<Footer />
		</div>
	);
}
