'use client';

import * as React from 'react';

import { useStormy } from '@stormycms/react/stormy';
import { NavMain } from '~/components/nav-main';
import { NavUser } from '~/components/nav-user';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuItem,
} from '~/components/sidebar';
import { LayoutDashboardIcon, ListIcon, CommandIcon, ImageIcon, ExternalLinkIcon } from 'lucide-react';
import { NavSecondary } from '~/components/nav-secondary';
import { notNullish } from '~/lib/utils';

// The public site URL for the "Preview Live Site" link. Locally this is the
// site app dev server; in production set NEXT_PUBLIC_PREVIEW_SITE_URL to the deployed URL.
const liveSiteUrl = process.env.NEXT_PUBLIC_PREVIEW_SITE_URL ?? 'http://localhost:3000';

const data = {
	navMain: [
		{
			title: 'Dashboard',
			url: '/',
			icon: <LayoutDashboardIcon />,
		},
		{
			title: 'Pages',
			url: '/pages',
			icon: <ListIcon />,
		},
		{
			title: 'Layouts',
			url: '/layouts',
			icon: <ListIcon />,
		},
		{
			title: 'Media',
			url: '/media',
			icon: <ImageIcon />,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { site, user } = useStormy();
	const navUser = notNullish(user)
		? { name: user.userName, email: user.email, avatar: user.image ?? '/default-avatar.png' }
		: { name: '', email: '', avatar: '/default-avatar.png' };

	return (
		<Sidebar collapsible="offcanvas" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						{/* Non-interactive title; Dashboard already serves as the home link. */}
						<div className="flex items-center gap-2 p-1.5">
							<CommandIcon className="size-5!" />
							<span className="text-base font-semibold" data-testid="sidebar-site-name">
								{site?.name ?? 'Stormy CMS'}
							</span>
						</div>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				<NavSecondary
					className="mt-auto"
					items={[
						{
							title: 'Preview Live Site',
							url: liveSiteUrl,
							icon: <ExternalLinkIcon />,
						},
					]}
				/>
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={navUser} />
			</SidebarFooter>
		</Sidebar>
	);
}
