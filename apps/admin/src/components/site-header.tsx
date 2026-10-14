'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useStormy } from '@stormycms/react/stormy';
import { Separator } from '~/components/separator';
import { SidebarTrigger } from '~/components/sidebar';
import { notNullish } from '~/lib/utils';

export function SiteHeader() {
	const { site } = useStormy();
	const siteName = site?.name;

	// Reflect the "editing {site} with Stormy" relationship in the tab title too.
	useEffect(() => {
		if (notNullish(siteName)) document.title = `${siteName} — Stormy CMS`;
	}, [siteName]);

	return (
		<header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
			<div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
				<SidebarTrigger className="-ml-1" />
				<Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
				<h1 className="min-w-0 truncate text-base font-medium" data-testid="header-site-name">
					{siteName ?? 'Site Editor'}
					<span className="text-muted-foreground ml-2 hidden text-sm font-normal sm:inline">· Site Editor</span>
				</h1>
				<a
					href="https://stormycms.com"
					target="_blank"
					rel="noreferrer"
					className="text-foreground/90 hover:text-foreground ml-auto flex shrink-0 items-center gap-2"
					aria-label="Edited with Stormy CMS — visit stormycms.com"
				>
					<span className="text-muted-foreground hidden text-xs md:inline">Edited with</span>
					<Image src="/stormy-cms-logo.svg" alt="" width={25} height={24} className="h-6 w-auto" unoptimized />
					<span className="font-brand text-sm tracking-wide uppercase">
						<span className="font-light">Stormy</span> <span className="font-bold">CMS</span>
					</span>
				</a>
			</div>
		</header>
	);
}
