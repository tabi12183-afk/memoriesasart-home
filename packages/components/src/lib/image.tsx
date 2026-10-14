import type { ImageAsset } from '@stormycms/core';
import Image from 'next/image';

type ImageProps = {
	image?: ImageAsset;
	alt?: string;
};

/**
 * A picture, placed as-is.
 *
 * Deliberately unstyled: no border, no corner radius, no crop. A bare image
 * dropped onto a page is the author's asset, not a design element, and framing
 * one without being asked looks like a mistake wherever it lands. Reach for
 * `Figure` when the image is a piece of content in its own right — that is
 * where framing and captions live.
 *
 * The width and height below are only a hint for reserving space during load;
 * `h-auto` hands layout back to the image's real proportions once it arrives,
 * so nothing gets cropped or stretched.
 */
function CMSImage({ image, alt }: ImageProps) {
	if (image?.src === undefined || image.src === '') {
		return (
			<div className="border-border bg-muted text-muted-foreground flex aspect-video w-full items-center justify-center border border-dashed text-sm">
				Image
			</div>
		);
	}

	return (
		<Image
			src={image.src}
			alt={alt ?? image.alt ?? ''}
			width={1600}
			height={900}
			unoptimized
			className="h-auto w-full"
		/>
	);
}

export { CMSImage as Image };
