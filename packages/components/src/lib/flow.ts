/**
 * Space is a relationship, not a property.
 *
 * There are two kinds of space, and they belong to different owners:
 *
 *   Between things. Owned by whatever contains them, sized by how closely those
 *   things relate.
 *
 *   Against an edge. Not a relationship between two elements at all — it is
 *   between content and the boundary of whatever holds it, which may be the
 *   screen, a card, or a banner. Owned by the boundary.
 *
 * Four rules follow:
 *
 *   1. Nothing sets space around itself. A component styles its inside only.
 *   2. Whatever contains things owns the space between them.
 *   3. Whatever forms an edge holds its content clear of that edge, and says so.
 *      A boundary inside another boundary adds nothing, because there is nothing
 *      left to clear.
 *   4. A component that is edge-to-edge by nature says so about itself.
 *
 * Rule 1 is what makes the rest possible. The moment a component carries its own
 * outer margin, that margin is wrong in some other context, and the fix is
 * always a negative margin somewhere else.
 *
 * Rule 2 is why there is no Spacer component here. A spacer is an instruction
 * with no meaning: it cannot know it is the last child, that the page is narrow,
 * or that the thing above it was deleted, so it becomes stale the moment the
 * page changes and it doubles the number of things in the editor. Naming the
 * relationship instead says the same thing once, in a way that stays true.
 *
 * Rule 3 is why a Heading never carries padding. Padding on the heading is right
 * against the screen and wrong inside a Card, because a Card already holds its
 * contents clear of its own edge. Instead every boundary declares itself and
 * zeroes `--flow-inset` for everything inside it, so the clearance is applied
 * exactly once no matter how deeply things nest.
 *
 * Rule 4 is the full-width banner. The track below gives every band two columns
 * that occupy the same rows: a readable one, and one that runs to the edges of
 * the screen. A component that belongs edge-to-edge marks itself and lands in
 * the wide track. No negative margins, no absolute positioning, no author
 * decision.
 */

/**
 * How closely the things inside a container relate. These are the only spacing
 * choices in the system, and none of them is a measurement — the values live in
 * the theme, so a customer can retune the whole site's rhythm in one place.
 */
export type Rhythm = 'related' | 'distinct' | 'separate';

/**
 * Matches a marked element whether it is a direct child (the live site) or
 * wrapped by the page builder's editing containers.
 *
 * The builder renders each child inside a `display: contents` list and a
 * wrapper, so a selector written only for the live site silently stops matching
 * inside the editor — and the preview stops looking like the real page, which is
 * the one thing the preview exists to do. Written once here so that the shape of
 * the editor's markup is known in exactly one file.
 */
export const marked = (container: string, attribute: string) =>
	`${container} > [${attribute}], ` +
	`${container} > [data-cms-editable-children] > :has(> [data-cms-component] > [${attribute}])`;

/**
 * Every child the container lays out: direct on the live site, or the builder's
 * wrapper standing in for one. Any rule that places children must use this —
 * a bare `> *` misses the wrappers, and the builder's grid items auto-place
 * into whatever track is free.
 */
export const children = (container: string) => `${container} > *, ${container} > [data-cms-editable-children] > *`;

/**
 * A band of a page: a readable column, and a track that runs to the edges.
 *
 * Both columns occupy the same rows, so children stay in source order whichever
 * track they land in. The readable column is capped at the measure and always
 * keeps the inset clear of the screen edge, which is why nothing inside needs
 * horizontal padding of its own.
 *
 * `--flow-measure` caps the band, not the line. Text still limits its own line
 * length for legibility — a paragraph and a two-column card grid want different
 * widths, and only one of those is a layout concern.
 */
export const flowStyles = /* css */ `
.stormy-flow {
	display: grid;
	grid-template-columns:
		[bleed-start] minmax(var(--flow-inset), 1fr)
		[content-start] min(var(--flow-measure), 100% - var(--flow-inset) * 2) [content-end]
		minmax(var(--flow-inset), 1fr) [bleed-end];
	row-gap: var(--flow-rhythm, var(--flow-rhythm-distinct));
	width: 100%;
}
${children('.stormy-flow')} {
	grid-column: content;
	min-width: 0;
}
${marked('.stormy-flow', "data-flow='bleed'")} {
	grid-column: bleed;
}
.stormy-flow[data-rhythm='related'] {
	--flow-rhythm: var(--flow-rhythm-related);
}
.stormy-flow[data-rhythm='distinct'] {
	--flow-rhythm: var(--flow-rhythm-distinct);
}
.stormy-flow[data-rhythm='separate'] {
	--flow-rhythm: var(--flow-rhythm-separate);
}

/*
 * Rule 3. Anything that forms an edge already holds its content clear of it, so
 * everything inside has nothing left to clear: a band inside a band, a card, a
 * banner with its own padding. Zeroing the inherited inset rather than adding
 * padding per component is what keeps the clearance applied exactly once, and
 * what lets a Heading stay padding-free whether it sits against the screen or
 * inside a Card.
 */
.stormy-flow .stormy-flow,
[data-flow='bounded'],
[data-flow='bleed'] {
	--flow-inset: 0rem;
}
`;
