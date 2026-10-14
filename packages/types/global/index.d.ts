 

/**
 * @file These global overrides force the TypeScript compiler to widen or narrow types as needed.
 * Add these only sparingly, we don't want to rewrite all of TypeScript.
 */

export {};

declare module 'react' {
	interface CSSProperties {
		[key: `--${string}`]: string | number;
	}
	interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
		command?: string;
		commandfor?: string;
	}
}
