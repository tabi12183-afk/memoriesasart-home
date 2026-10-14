import React from 'react';

export type GroupDensity = 'default' | 'compact';

type GroupProps = React.PropsWithChildren<{
	/**
	 * Content density: default groups broad ideas; compact groups closely related details.
	 */
	density?: GroupDensity;
}>;

/**
 * A user-friendly replacement for "Article". Still renders as an `<article>` element.
 *
 * Owns the space between its children and nothing else: no margin, no width, no
 * padding. Those belong to the band it sits in, so the same Group reads
 * correctly inside a Section, inside a Card, or on its own. Both spacings come
 * from the theme's named rhythms rather than from numbers here. See ./flow.ts.
 */
export function Group({ children, density = 'default' }: GroupProps) {
	return (
		<article
			className={
				density === 'compact'
					? 'flex min-h-24 w-full flex-row flex-wrap items-center gap-(--flow-rhythm-related)'
					: 'grid min-h-24 w-full place-items-center gap-(--flow-rhythm-distinct)'
			}
		>
			{children}
		</article>
	);
}
