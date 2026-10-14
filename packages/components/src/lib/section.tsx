import React from 'react';
import { flowStyles } from './flow';

type SectionProps = React.PropsWithChildren<{
	label?: string;
}>;

/**
 * A band of the page.
 *
 * Owns the space between the things inside it and the readable column they sit
 * in, which is why nothing in here carries a margin or a width of its own. A
 * child that belongs edge-to-edge (a Hero, say) says so about itself and lands
 * in the wide track without anyone repositioning it. See ./flow.ts.
 */
export function Section({ children, label }: SectionProps) {
	return (
		<>
			<style>{flowStyles}</style>
			<section className="stormy-flow" data-rhythm="distinct">
				{label !== undefined && label !== '' ? (
					<p className="text-muted-foreground text-sm font-medium">{label}</p>
				) : null}
				{children}
			</section>
		</>
	);
}
