import { configDefaults, defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';

export default defineConfig({
	test: {
		exclude: [...configDefaults.exclude, '**/e2e/**'],
		browser: {
			provider: playwright(),
			enabled: true,
			headless: true,
			instances: [{ browser: 'chromium' }],
		},
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
		},
	},
});
