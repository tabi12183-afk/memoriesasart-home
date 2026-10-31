import { MemoriesPortfolio, memoriesPages } from 'components';
import type { Metadata } from 'next';

/** The approved photographic defaults share the same path contract as the CMS. */
export function memoriesPath(slug?: string[]) {
	const parts = slug ?? [];
	return parts.length > 0 ? `/${parts.join('/')}/` : '/';
}

export function getMemoriesDefault(slug?: string[]) {
	const path = memoriesPath(slug);
	return Object.hasOwn(memoriesPages, path) ? memoriesPages[path] : undefined;
}

export function MemoriesDefault({ slug }: { slug?: string[] }) {
	return <MemoriesPortfolio pagePath={memoriesPath(slug)} />;
}

export function memoriesMetadata(slug?: string[]): Metadata | undefined {
	const page = getMemoriesDefault(slug);
	if (page === undefined) return;
	const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL ?? '';
	const origin = configuredOrigin.length > 0 ? configuredOrigin : 'https://www.memoriesasart.com';
	const url = new URL(memoriesPath(slug), origin).href;
	const image = new URL(page.image, origin).href;
	return {
		title: page.title,
		description: page.description,
		alternates: { canonical: url },
		openGraph: { title: page.title, description: page.description, url, images: [image], type: 'website' },
		twitter: { card: 'summary_large_image', title: page.title, description: page.description, images: [image] },
		robots: { index: process.env.MEMORIES_PUBLIC_LAUNCH === '1' && !page.preview, follow: true },
	};
}
