import ReactMarkdown from 'react-markdown';
import { safeHref } from './safe-href';

/** Markdown source. The Stormy CLI maps this named type to a rich-text editor. */
export type Markdown = string;

type RichTextProps = {
	content?: Markdown;
};

/** Renders CommonMark safely; raw HTML is intentionally ignored. */
export function RichText({ content }: RichTextProps) {
	if (content === undefined || content.trim() === '') {
		return <p className="max-w-prose text-base leading-7 text-muted-foreground">Add rich text content.</p>;
	}

	return (
		<div className="grid max-w-prose gap-4 text-base leading-7 text-foreground/80">
			<ReactMarkdown
				skipHtml
				components={{
					a: ({ href, children }) => (
						<a className="text-primary underline underline-offset-4" href={safeHref(href)}>
							{children}
						</a>
					),
					h1: ({ children }) => <h1 className="text-4xl font-bold">{children}</h1>,
					h2: ({ children }) => <h2 className="text-3xl font-semibold">{children}</h2>,
					h3: ({ children }) => <h3 className="text-2xl font-semibold">{children}</h3>,
					ul: ({ children }) => <ul className="list-disc space-y-1 pl-6">{children}</ul>,
					ol: ({ children }) => <ol className="list-decimal space-y-1 pl-6">{children}</ol>,
					blockquote: ({ children }) => <blockquote className="border-l-4 pl-4 italic">{children}</blockquote>,
				}}
			>
				{content}
			</ReactMarkdown>
		</div>
	);
}
