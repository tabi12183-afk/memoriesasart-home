type HeadingProps = {
	text?: string;
	level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};

export function Heading({ text, level: Tag = 'h2' }: HeadingProps) {
	return <Tag className="text-3xl font-semibold tracking-normal text-foreground">{text ?? 'Heading'}</Tag>;
}
