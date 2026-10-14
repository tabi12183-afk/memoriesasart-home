type TextProps = {
	content?: string;
};

export function Text({ content }: TextProps) {
	return <p className="max-w-prose text-base leading-7 text-foreground/80">{content ?? 'Add body copy.'}</p>;
}
