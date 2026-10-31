import content from './content.json';

export type PhotographyPhoto = {
	src: string;
	smallSrc?: string;
	width?: number;
	height?: number;
	smallWidth?: number;
	alt: string;
};
export type PhotographyCollection = {
	slug: string;
	label: string;
	title: string;
	seo: string;
	summary: string;
	images: string[];
	text: string[];
	details: string[];
	babyPlan?: boolean;
	preview?: boolean;
	previewNote?: string;
};
export type PhotographyGroup = {
	label: string;
	eyebrow: string;
	headline: string;
	description: string;
	images: string[];
	items: PhotographyCollection[];
};
export type MemoriesPage = {
	title: string;
	description: string;
	heading: string;
	intro: string;
	eyebrow: string;
	body: string;
	image: string;
	preview: boolean;
	heroIds: string[];
	galleryIds: string[];
};
export type PhotographyArticle = {
	slug: string;
	category: string;
	tag: string;
	title: string;
	subtitle: string;
	img: string;
	alt: string;
	desc: string;
	body: string;
};
export type PhotographyContent = {
	photos: Record<string, PhotographyPhoto>;
	collections: Record<string, PhotographyGroup>;
	media: Record<string, { type: string; images: string[] }>;
	pages: Record<string, MemoriesPage>;
	articles: PhotographyArticle[];
};
export const photographyContent = content as PhotographyContent;
export const memoriesPages = photographyContent.pages;
export const memoriesPagePaths = Object.keys(memoriesPages).filter((path) => path !== '/not-found/');
