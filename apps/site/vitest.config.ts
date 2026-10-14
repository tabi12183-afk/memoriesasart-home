import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { configDefaults, defineConfig } from 'vitest/config';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	// Next preserves JSX in tsconfig; Vite 8's Oxc transform compiles it for Vitest.
	oxc: { jsx: { runtime: 'automatic' } },
	resolve: {
		alias: {
			'~': path.resolve(rootDir, 'src'),
		},
	},
	test: {
		exclude: [...configDefaults.exclude],
		env: {
			// The StormyCMSClient constructor requires credentials; tests never
			// talk to the real API.
			NEXT_PUBLIC_SITE_URL: 'http://localhost:3000',
			STORMY_CMS_CLIENT_ID: 'test-client-id',
			STORMY_CMS_CLIENT_SECRET: 'test-client-secret',
		},
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
			include: ['src/**/*.{ts,tsx}', 'next.config.ts', 'empty-module.ts'],
			exclude: ['src/tests/**'],
			thresholds: {
				statements: 100,
				branches: 100,
				functions: 100,
				lines: 100,
			},
		},
	},
});
