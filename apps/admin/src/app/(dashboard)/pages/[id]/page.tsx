import { redirect } from 'next/navigation';
import { stormyCMSClient } from '@/stormy-cms-client';
import { mapPageData, mapLayoutData } from '@stormycms/core';
import { CMSPageProvider } from '@stormycms/react/cms/client';
import { PageEditor } from '~/components/page-editor';

export default async function PageEditorPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;

	let pageData;
	try {
		pageData = await stormyCMSClient.getPage({ id });
	} catch {
		redirect('/pages');
	}

	let layoutsRaw: Awaited<ReturnType<typeof stormyCMSClient.getLayouts>> = [];
	let pagesRaw: Awaited<ReturnType<typeof stormyCMSClient.getPages>> = [];
	try {
		layoutsRaw = await stormyCMSClient.getLayouts();
	} catch {
		layoutsRaw = [];
	}
	try {
		pagesRaw = await stormyCMSClient.getPages();
	} catch {
		pagesRaw = [];
	}

	const page = mapPageData(pageData);
	const layouts = layoutsRaw.map(mapLayoutData);

	return (
		<CMSPageProvider
			page={{
				id: page.id,
				components: page.components ?? [],
				initialData: {
					name: page.name,
					slug: page.slug,
					layoutId: page.layoutId ?? undefined,
				},
			}}
		>
			<PageEditor
				layouts={layouts}
				reservedSlugs={pagesRaw
					.filter((candidate) => candidate.id !== page.id)
					.map((candidate) => candidate.slug ?? '')}
			/>
		</CMSPageProvider>
	);
}
