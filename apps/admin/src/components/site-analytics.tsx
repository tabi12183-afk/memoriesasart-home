import { cookies } from 'next/headers';
import { stormyCMSClient } from '@/stormy-cms-client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '~/components/card';
import { FileTextIcon, LayoutIcon, BoxIcon, GlobeIcon } from 'lucide-react';
import { notNullish, nullish } from '~/lib/utils';

function countComponents(items: { components?: { childComponents?: unknown[] }[] }[]): number {
	let total = 0;
	for (const item of items) {
		if (nullish(item.components)) continue;
		for (const component of item.components) {
			total += 1;
			if (notNullish(component.childComponents)) {
				total += component.childComponents.length;
			}
		}
	}
	return total;
}

type StatCardProps = {
	title: string;
	value: string | number;
	description: string;
	icon: React.ReactNode;
	testId: string;
};

function StatCard({ title, value, description, icon, testId }: StatCardProps) {
	return (
		<Card data-testid={testId}>
			<CardHeader>
				<div className="flex items-center justify-between">
					<CardDescription>{title}</CardDescription>
					<span className="text-muted-foreground">{icon}</span>
				</div>
				<CardTitle className="text-3xl font-bold tabular-nums">{value}</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="text-xs text-muted-foreground">{description}</p>
			</CardContent>
		</Card>
	);
}

export async function SiteAnalytics() {
	await cookies();

	const [pages, layouts, site] = await Promise.all([
		stormyCMSClient.getPages().catch((err) => {
			console.error('SiteAnalytics getPages failed:', err);
			return [];
		}),
		stormyCMSClient.getLayouts().catch((err) => {
			console.error('SiteAnalytics getLayouts failed:', err);
			return [];
		}),
		stormyCMSClient.getCurrentSite().catch((err) => {
			console.error('SiteAnalytics getCurrentSite failed:', err);
			return null;
		}),
	]);

	const totalComponents = countComponents(pages) + countComponents(layouts);

	return (
		<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
			<StatCard
				testId="stat-total-pages"
				title="Total Pages"
				value={pages.length}
				description="Pages created in this site"
				icon={<FileTextIcon className="h-4 w-4" />}
			/>
			<StatCard
				testId="stat-total-layouts"
				title="Total Layouts"
				value={layouts.length}
				description="Layouts available for pages"
				icon={<LayoutIcon className="h-4 w-4" />}
			/>
			<StatCard
				testId="stat-total-components"
				title="Total Components"
				value={totalComponents}
				description="Components across all pages and layouts"
				icon={<BoxIcon className="h-4 w-4" />}
			/>
			<StatCard
				testId="stat-site-name"
				title="Site"
				value={site?.name ?? 'Unknown'}
				description={site?.id ?? 'No site ID available'}
				icon={<GlobeIcon className="h-4 w-4" />}
			/>
		</div>
	);
}
