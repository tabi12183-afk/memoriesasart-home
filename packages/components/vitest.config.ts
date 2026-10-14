import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
	// The package ships source; Vite 8's Oxc transform compiles JSX for Vitest.
	oxc: { jsx: { runtime: 'automatic' } },
	test: {
		// Navigation and ThemeToggle respond to clicks and key presses, which
		// needs a real DOM. The render-to-string tests work here unchanged.
		environment: 'jsdom',
		setupFiles: ['./src/lib/tests/setup.ts'],
		exclude: [...configDefaults.exclude],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
			include: ['src/**/*.{ts,tsx}'],
			exclude: ['src/**/tests/**'],
			thresholds: {
				statements: 100,
				branches: 100,
				functions: 100,
				lines: 100,
			},
		},
	},
});
