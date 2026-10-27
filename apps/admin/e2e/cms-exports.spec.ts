import { expect, test } from '@playwright/test';

test.describe('Login Page', () => {
	test('loads without hydration errors', async ({ page }) => {
		const consoleErrors: string[] = [];
		page.on('console', (msg) => {
			if (msg.type() === 'error') {
				consoleErrors.push(msg.text());
			}
		});

		// A working client-side handler proves hydration without waiting for
		// unrelated prefetches or background requests to become idle.
		await page.route('**/api/auth/stormy?**', (route) =>
			route.fulfill({ status: 200, contentType: 'text/html', body: '<!doctype html><title>Sign in</title>' }),
		);
		await page.goto('/');
		await page.getByTestId('github-login-button').click();
		await expect(page).toHaveURL(/\/api\/auth\/stormy\?action=signin&provider=github$/);

		const hydrationErrors = consoleErrors.filter(
			(e) => e.includes('Hydration') || e.includes('did not match') || e.includes('hydration'),
		);
		expect(hydrationErrors).toHaveLength(0);
	});

	test('renders the login branding and options', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('text=Stormy CMS')).toBeVisible();
		await expect(page.locator('text=Welcome back')).toBeVisible();
	});
});
