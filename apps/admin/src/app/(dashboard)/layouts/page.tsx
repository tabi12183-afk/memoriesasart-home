import Link from 'next/link';
import { redirect } from 'next/navigation';
import { stormyCMSClient } from '@/stormy-cms-client';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/card';
import { CreateLayoutDialog } from '~/components/create-layout-dialog';
import { cookies } from 'next/headers';
import { nullish } from '~/lib/utils';

export const dynamic = 'force-dynamic';

const createNewLayout = async (formData: FormData) => {
	'use server';

	const layoutName = formData.get('layout-name');
	if (typeof layoutName !== 'string' || layoutName.trim() === '') {
		throw new Error('Layout name is required.');
	}

	const cookieStore = await cookies();
	const sessionToken = cookieStore.get('stormy_session_token')?.value;
	const cookieHeader = cookieStore.toString();
	const session = await stormyCMSClient.getSession(sessionToken, cookieHeader);
	if (nullish(session.user) || nullish(session.jwt)) {
		redirect('/login');
	}

	let layoutId: string;
	try {
		const layout = await stormyCMSClient.createLayout(session.jwt, {
			name: layoutName.trim(),
			components: [],
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		});
		layoutId = layout.id;
	} catch (error) {
		console.error('Failed to create layout:', error);
		throw new Error('Failed to create layout. Please try again.');
	}

	redirect(`/layouts/${layoutId}`);
};

export default async function LayoutsPage() {
	let layouts: Awaited<ReturnType<typeof stormyCMSClient.getLayouts>> = [];
	try {
		layouts = await stormyCMSClient.getLayouts();
	} catch (err) {
		console.error('Failed to fetch layouts:', err);
	}

	return (
		<div className="px-4 lg:px-6">
			<div className="flex items-center justify-between mb-6">
				<h1 className="text-2xl font-bold">Layouts</h1>
				<CreateLayoutDialog action={createNewLayout} />
			</div>
			{layouts.length === 0 ? (
				<Card>
					<CardContent className="py-10 text-center text-muted-foreground">
						No layouts yet. Create your first layout to get started.
					</CardContent>
				</Card>
			) : (
				<div className="grid gap-3">
					{layouts.map((layout) => (
						<Link key={layout.id} href={`/layouts/${layout.id}`} className="block">
							<Card className="hover:bg-accent transition-colors">
								<CardHeader className="py-3">
									<CardTitle className="text-base">{layout.name}</CardTitle>
									<p className="text-sm text-muted-foreground">
										{layout.isDefault ? 'Default layout' : `${layout.components.length} components`}
									</p>
								</CardHeader>
							</Card>
						</Link>
					))}
				</div>
			)}
		</div>
	);
}
