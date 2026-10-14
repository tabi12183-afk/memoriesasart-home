import { StormyServerProvider } from '@stormycms/next';
import { AppSidebar } from '~/components/app-sidebar';
import { SiteHeader } from '~/components/site-header';
import { SidebarInset, SidebarProvider } from '~/components/sidebar';
import { cookies } from 'next/headers';
import { stormyCMSClient } from '@/stormy-cms-client';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
	const cookieStore = await cookies();
	const bypassAuth =
		process.env.E2E_BYPASS_AUTH === 'true' ||
		(process.env.E2E_ALLOW_COOKIE_BYPASS === 'true' && cookieStore.get('e2e_bypass_auth')?.value === 'true');

	return (
		<StormyServerProvider client={stormyCMSClient} guard={!bypassAuth}>
			<SidebarProvider
				style={
					{
						'--sidebar-width': 'calc(var(--spacing) * 72)',
						'--header-height': 'calc(var(--spacing) * 12)',
					} as React.CSSProperties
				}
			>
				<AppSidebar variant="inset" />
				<SidebarInset>
					<SiteHeader />
					<div className="flex flex-1 flex-col">
						<div className="@container/main flex flex-1 flex-col gap-2">
							<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 h-full">{children}</div>
						</div>
					</div>
				</SidebarInset>
			</SidebarProvider>
		</StormyServerProvider>
	);
}
