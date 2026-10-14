import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.E2E_BASE_URL ?? 'http://localhost:4000';
const testDir = process.env.E2E_TEST_DIR ?? 'apps/admin/e2e';
const chromiumExecutablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;
const configuredWorkers = process.env.PLAYWRIGHT_WORKERS
	? Number.parseInt(process.env.PLAYWRIGHT_WORKERS, 10)
	: process.env.CI
		? 8
		: 10;

export default defineConfig({
	testDir,
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: configuredWorkers,
	reporter: 'list',
	use: {
		baseURL,
		trace: 'on-first-retry',
		screenshot: 'only-on-failure',
	},

	projects: [
		{
			name: 'chromium',
			use: {
				...devices['Desktop Chrome'],
				launchOptions: chromiumExecutablePath ? { executablePath: chromiumExecutablePath } : undefined,
			},
		},
		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] },
		},
		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'] },
		},
	],

	webServer: {
		command: 'pnpm turbo dev --filter=admin',
		url: baseURL,
		reuseExistingServer: !process.env.CI,
		timeout: 120_000,
		env: {
			E2E_ALLOW_COOKIE_BYPASS: 'true',
		},
	},
});
