import type { ImageAsset } from '@stormycms/core';
import Image from 'next/image';
import { buttonVariants } from './button';
import { safeHref } from './safe-href';

type HeroProps = {
	backgroundImage?: ImageAsset;
	title?: string;
	subtitle?: string;
	actionLabel?: string;
	actionHref?: string;
};

/**
 * A page-introduction landmark with a decorative image and a single primary action.
 *
 * Declares itself edge-to-edge: an introduction that stops short of the screen
 * edge reads as a card rather than an opening. `data-flow="bleed"` is a
 * statement about what a Hero is, not a setting — there is no prop for it and no
 * author decision to get wrong. A Section honours it; anywhere else it is simply
 * ignored. See ./flow.ts.
 */
export function Hero({ backgroundImage, title, subtitle, actionLabel, actionHref }: HeroProps) {
	return (
		<section
			data-flow="bleed"
			className="bg-muted relative isolate flex min-h-[28rem] w-full items-center justify-center overflow-hidden px-6 py-20 text-center"
		>
			{backgroundImage?.src !== undefined && backgroundImage.src !== '' ? (
				<Image src={backgroundImage.src} alt="" fill unoptimized className="-z-20 object-cover" />
			) : null}
			<div className="absolute inset-0 -z-10 bg-background/70" />
			<div className="flex max-w-3xl flex-col items-center gap-5">
				<h1 className="text-4xl font-bold tracking-tight sm:text-6xl">{title ?? 'A clear, meaningful promise'}</h1>
				{subtitle !== undefined ? (
					<p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">{subtitle}</p>
				) : null}
				{actionLabel !== undefined ? (
					<a className={buttonVariants({ size: 'lg' })} href={safeHref(actionHref)}>
						{actionLabel}
					</a>
				) : null}
			</div>
		</section>
	);
}
