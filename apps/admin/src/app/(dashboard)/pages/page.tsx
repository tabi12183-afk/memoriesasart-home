import Link from 'next/link';
import { redirect } from 'next/navigation';
import { stormyCMSClient } from '@/stormy-cms-client';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/card';
import { cookies } from 'next/headers';
import { CreatePageDialog } from '~/components/create-page-dialog';
import { normalizePageSlug, pageNameToSlug } from '~/lib/page-slug';
import { notNullish, nullish } from '~/lib/utils';

export const dynamic = 'force-dynamic';

/** Returns the value only when it is a non-empty string, so callers can chain `??` fallbacks. */
const nonEmpty = (value: string | null | undefined): string | undefined =>
	notNullish(value) && value !== '' ? value : undefined;

const createNewPage = async (formData: FormData) => {
	'use server';

	const pageName = formData.get('page-name');
	const requestedSlug = formData.get('page-slug');
	if (typeof pageName !== 'string' || pageName.trim() === '') {
		throw new Error('Page name is required.');
	}
	const slug = normalizePageSlug(
		typeof requestedSlug === 'string' && requestedSlug !== '' ? requestedSlug : pageNameToSlug(pageName),
	);
	if (slug === '') throw new Error('Page slug is required.');

	const cookieStore = await cookies();
	const sessionToken = cookieStore.get('stormy_session_token')?.value;
	const cookieHeader = cookieStore.toString();
	const session = await stormyCMSClient.getSession(sessionToken, cookieHeader);
	console.log(session.user);
	if (nullish(session.user) || nullish(session.jwt)) {
		redirect('/login');
	}

	const layouts = await stormyCMSClient.getLayouts();
	const defaultLayout = layouts.find((l) => l.isDefault) ?? layouts[0];
	if (nullish(defaultLayout)) {
		throw new Error('No layouts available. Please create a layout first.');
	}

	let pageId: string;
	try {
		const page = await stormyCMSClient.createPage(session.jwt, {
			slug,
			metadata: { title: pageName.trim() },
			components: [],
			layoutId: defaultLayout.id,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		});
		pageId = page.id;
	} catch (error) {
		console.error('Failed to create page:', error);
		throw new Error('Failed to create page. Please try again.');
	}

	redirect(`/pages/${pageId}`);
};

export default async function PagesPage() {
	let pages: Awaited<ReturnType<typeof stormyCMSClient.getPages>> = [];
	try {
		pages = await stormyCMSClient.getPages();
	} catch (err) {
		console.error('Failed to fetch pages:', err);
	}
	return (
		<div className="px-4 lg:px-6">
			<div className="flex items-center justify-between mb-6">
				<h1 className="text-2xl font-bold">Pages</h1>
				<CreatePageDialog action={createNewPage} existingSlugs={pages.map((page) => page.slug ?? '')} />
			</div>
			{pages.length === 0 ? (
				<Card>
					<CardContent className="py-10 text-center text-muted-foreground">
						No pages yet. Create your first page to get started.
					</CardContent>
				</Card>
			) : (
				<div className="grid gap-3">
					{pages.map((page) => (
						<Link key={page.id} href={`/pages/${page.id}`} className="block">
							<Card className="hover:bg-accent transition-colors">
								<CardHeader className="py-3">
									<CardTitle className="text-base">
										{nonEmpty(page.metadata.title) ?? nonEmpty(page.name) ?? 'Untitled'}
									</CardTitle>
									<p className="text-sm text-muted-foreground">/{page.slug}</p>
								</CardHeader>
							</Card>
						</Link>
					))}
				</div>
			)}
		</div>
	);
}
