import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import emptyModule from '@/empty-module';
import nextConfig from '@/next.config';
import tailwindConfig from '@/tailwind.config';
import { ThemeProvider } from '~/lib/theme-provider';

describe('next.config', () => {
	it('transpiles the shared components package', () => {
		expect(nextConfig.transpilePackages).toContain('components');
	});

	it('only allows https image sources', () => {
		expect(nextConfig.images?.remotePatterns?.length).toBeGreaterThan(0);
		for (const pattern of nextConfig.images?.remotePatterns ?? []) {
			expect(pattern.protocol).toBe('https');
		}
	});
});

describe('tailwind.config', () => {
	it('scans the app source for classes', () => {
		expect(tailwindConfig.content).toContain('./src/app/**/*.{js,ts,jsx,tsx,mdx}');
	});
});

describe('empty-module', () => {
	it('exports an empty stub for aliased-away modules', () => {
		expect(emptyModule).toEqual({});
	});
});

describe('ThemeProvider', () => {
	it('renders children within the next-themes provider', () => {
		render(
			<ThemeProvider defaultTheme="light">
				<span>themed content</span>
			</ThemeProvider>,
		);
		expect(screen.getByText('themed content')).toBeInTheDocument();
	});
});
