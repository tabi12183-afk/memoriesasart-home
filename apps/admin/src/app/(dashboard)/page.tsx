import { SiteAnalytics } from '~/components/site-analytics';

export const dynamic = 'force-dynamic';

export default function DashboardPage() {
	return (
		<div className="px-4 lg:px-6">
			<div className="flex items-center justify-between mb-6">
				<h1 className="text-2xl font-bold">Dashboard</h1>
			</div>
			<SiteAnalytics />
		</div>
	);
}
