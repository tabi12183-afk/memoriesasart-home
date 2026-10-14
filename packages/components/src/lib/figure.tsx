import type { ImageAsset } from '@stormycms/core';
import Image from 'next/image';

/** What the image actually shows. */
export type FigureDepicts = 'photograph' | 'illustration' | 'screenshot' | 'diagram' | 'portrait' | 'logo';

/** Whether the image carries meaning or only supports the surrounding content. */
export type FigureRole = 'informative' | 'decorative';

type FigureProps = {
	image?: ImageAsset;
	depicts?: FigureDepicts;
	role?: FigureRole;
	/** Explains the image to the reader. Shown beneath it. */
	caption?: string;
	/** Who the image belongs to, e.g. "Photo: Jane Doe". */
	credit?: string;
};

/**
 * How each kind of image is framed, and why.
 *
 * Private on purpose. Authors choose what an image *is*; every border, radius,
 * shadow and crop below follows from that choice, so the look can be changed
 * for every site at once without asking anyone to re-pick a style.
 */
const framing: Record<FigureDepicts, { box: string; media: string; reason: string }> = {
	// A photograph fills its frame and can be cropped without losing meaning.
	photograph: {
		box: 'aspect-3/2 overflow-hidden rounded-lg shadow-sm',
		media: 'object-cover',
		reason: 'Reads as a print: soft corners, slight lift off the page.',
	},
	// Illustrations are usually drawn to their own edges and often transparent,
	// so a frame would fight the artwork and a crop would cut it.
	illustration: {
		box: 'aspect-4/3',
		media: 'object-contain',
		reason: 'Unframed and uncropped so the artwork keeps its own silhouette.',
	},
	// A screenshot's own background is often the same near-white as the page, so
	// without a boundary it bleeds and the reader cannot tell where the UI ends.
	screenshot: {
		box: 'border-border bg-muted aspect-16/10 overflow-hidden rounded-md border',
		media: 'object-contain',
		reason: 'Bordered because a UI capture otherwise dissolves into the page.',
	},
	// Line art is drawn for one background. Giving it a consistent surface keeps
	// it legible no matter what sits behind it.
	diagram: {
		box: 'bg-muted aspect-4/3 overflow-hidden rounded-md p-6',
		media: 'object-contain',
		reason: 'Padded neutral surface so line work stays legible in any scheme.',
	},
	// A face belongs in the middle of the frame and is conventionally cropped
	// round; a wide crop of a person reads as an accident.
	portrait: {
		box: 'mx-auto aspect-square w-full max-w-64 overflow-hidden rounded-full',
		media: 'object-cover object-top',
		reason: 'Circular and centred, the convention for a person.',
	},
	// A logo is a trademark. Cropping or tinting it is not ours to do.
	logo: {
		box: 'h-24 w-full',
		media: 'object-contain object-left',
		reason: 'Never cropped, never framed — a mark has to stay exactly itself.',
	},
};

/**
 * An image presented as a self-contained piece of content, optionally captioned.
 *
 * Renders a real `<figure>`. Choose what the image *is* and the framing follows;
 * there is deliberately no way to ask for a border, a radius or a shadow
 * directly, because those answers should be able to change site-wide.
 */
export function Figure({ image, depicts = 'photograph', role = 'informative', caption, credit }: FigureProps) {
	const { box, media } = framing[depicts];
	const decorative = role === 'decorative';
	const hasCaption =
		!decorative && ((caption !== undefined && caption !== '') || (credit !== undefined && credit !== ''));

	if (image?.src === undefined || image.src === '') {
		return (
			<figure className="w-full">
				<div
					className={`border-border bg-muted text-muted-foreground flex w-full items-center justify-center border border-dashed text-sm ${box}`}
				>
					{depicts.charAt(0).toUpperCase() + depicts.slice(1)}
				</div>
			</figure>
		);
	}

	return (
		<figure className="w-full" aria-hidden={decorative ? true : undefined}>
			<div className={`relative w-full ${box}`}>
				<Image
					src={image.src}
					// A decorative image is announced by nothing; an informative one
					// falls back to the alt text stored with the asset.
					alt={decorative ? '' : (image.alt ?? '')}
					fill
					unoptimized
					className={media}
				/>
			</div>
			{hasCaption ? (
				<figcaption className="text-muted-foreground mt-3 text-sm">
					{caption !== undefined && caption !== '' ? <span>{caption}</span> : null}
					{credit !== undefined && credit !== '' ? (
						<span className="mt-1 block text-xs opacity-80">{credit}</span>
					) : null}
				</figcaption>
			) : null}
		</figure>
	);
}
