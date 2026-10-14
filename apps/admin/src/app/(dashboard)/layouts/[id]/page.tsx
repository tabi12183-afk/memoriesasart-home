import { redirect } from 'next/navigation';
import { stormyCMSClient } from '@/stormy-cms-client';
import { mapLayoutData } from '@stormycms/core';
import { CMSLayoutProvider } from '@stormycms/react/cms/client';
import { LayoutEditor } from '~/components/layout-editor';

export default async function LayoutEditorPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;

	let layoutData;
	try {
		layoutData = await stormyCMSClient.getLayout({ id });
	} catch {
		redirect('/layouts');
	}

	let allLayoutsRaw: Awaited<ReturnType<typeof stormyCMSClient.getLayouts>> = [];
	try {
		allLayoutsRaw = await stormyCMSClient.getLayouts();
	} catch {
		allLayoutsRaw = [];
	}

	const layout = mapLayoutData(layoutData);
	const allLayouts = allLayoutsRaw.map(mapLayoutData);

	return (
		<CMSLayoutProvider
			layout={{
				id: layout.id,
				components: layout.components ?? [],
				initialData: {
					name: layout.name,
					parentLayoutId: layout.parentLayoutId ?? undefined,
				},
			}}
		>
			<LayoutEditor layouts={allLayouts} />
		</CMSLayoutProvider>
	);
}
