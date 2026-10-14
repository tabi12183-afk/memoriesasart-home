import React from 'react';

type CardProps = React.PropsWithChildren<{
	title?: string;
}>;

/**
 * A simple, centered content card. Compose inside a CardGroup for grids.
 *
 * A card has an edge of its own and already holds its contents clear of it, so
 * `data-flow="bounded"` tells everything inside that there is nothing left to
 * clear. That is what lets a Heading carry no padding of its own and still look
 * right both in here and against the screen. See ./flow.ts.
 */
export function Card({ children, title }: CardProps) {
	return (
		<div
			data-flow="bounded"
			className="border-border bg-card text-card-foreground flex h-full w-full flex-col items-center justify-center gap-3 rounded-xl border p-6 text-center shadow-sm"
		>
			{title !== undefined ? <h3 className="text-lg font-semibold">{title}</h3> : null}
			{children}
		</div>
	);
}

type CardGroupProps = React.PropsWithChildren;

/**
 * Catalog-style grid of cards: evenly sized columns that wrap to fill the
 * available space, with consistent gaps so every card stays aligned.
 *
 * Owns the space between its cards and nothing else. The padding it used to
 * carry pushed the whole grid in from a band that had already cleared the edge,
 * which is the doubling rule 1 exists to prevent. See ./flow.ts.
 */
export function CardGroup({ children }: CardGroupProps) {
	return (
		<div className="grid w-full grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-(--flow-rhythm-distinct)">
			{children}
		</div>
	);
}
