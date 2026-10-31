import { cache } from 'react';
import { redirect } from 'next/navigation';
import { mapPageData, type CMSPageData } from '@stormycms/core';
import { ComponentTree, LayoutTree } from '@stormycms/react/cms';
import cmsExports from 'components';
import { stormyCMSClient } from '~/stormy-cms-client';
import { buildLayoutTree } from '@stormycms/react/cms';
import { getMemoriesDefault, MemoriesDefault, memoriesMetadata } from '~/memories-defaults';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

// Per request only, shared by generateMetadata and Page, so edits show on the next request.
const getPageBySlug = cache(async (slug: string): Promise<CMSPageData | null> => {
	const page = await stormyCMSClient.getPageBySlug({ slug });
	return page === null ? null : mapPageData(page);
});

const getPage = (slug?: string[]) => getPageBySlug(slug?.join('/') ?? '');

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
	const slug = (await params).slug;
	const page = await getPage(slug);
	if ((page?.components?.length ?? 0) === 0) {
		const metadata = memoriesMetadata(slug);
		if (metadata !== undefined) return metadata;
	}
	if (page === null) {
		return {
			title: 'Page Not Found',
			description: 'The page you are looking for does not exist.',
		};
	}

	return {
		title: page.metadata.title,
		description: page.metadata.description,
	};
}

/**
 * @param params The URL parameters that make up a pseudo-path in a string array. Nextjs automatically parses the slugs from the URL passes the parameters to the function.
 * @returns The Dynamically rendered page content
 */
export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
	const slug = (await params).slug;
	const page = await getPage(slug);
	if ((page?.components?.length ?? 0) === 0 && getMemoriesDefault(slug) !== undefined)
		return <MemoriesDefault slug={slug} />;
	if (page === null) redirect('/404');
	const layout = buildLayoutTree(page.layouts, page.layoutId);
	return (
		<LayoutTree layout={layout} cmsExports={cmsExports}>
			<ComponentTree components={page.components!} cmsExports={cmsExports} />
		</LayoutTree>
	);
}
