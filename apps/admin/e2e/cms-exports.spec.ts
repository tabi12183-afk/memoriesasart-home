import { expect, test } from '@playwright/test';

test.describe('Login Page', () => {
	test('loads without hydration errors', async ({ page }) => {
		const consoleErrors: string[] = [];
		page.on('console', (msg) => {
			if (msg.type() === 'error') {
				consoleErrors.push(msg.text());
			}
		});

		await page.goto('/');
		await page.waitForLoadState('networkidle');

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
