import { expect, test } from '@playwright/test';
import { authenticate } from './helpers';

test.describe('Dashboard Analytics', () => {
	test.beforeEach(async ({ page }) => {
		await authenticate(page);
	});

	test('content editor sees analytics stat cards on the dashboard', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('[data-testid="stat-total-pages"]')).toBeVisible();
		await expect(page.locator('[data-testid="stat-total-layouts"]')).toBeVisible();
		await expect(page.locator('[data-testid="stat-total-components"]')).toBeVisible();
		await expect(page.locator('[data-testid="stat-site-name"]')).toBeVisible();
	});

	test('content editor sees numeric values in the stat cards', async ({ page }) => {
		await page.goto('/');
		const pagesCard = page.locator('[data-testid="stat-total-pages"]');
		const layoutsCard = page.locator('[data-testid="stat-total-layouts"]');
		const componentsCard = page.locator('[data-testid="stat-total-components"]');

		await expect(pagesCard).toBeVisible();
		await expect(layoutsCard).toBeVisible();
		await expect(componentsCard).toBeVisible();

		const pagesText = await pagesCard.textContent();
		const layoutsText = await layoutsCard.textContent();
		const componentsText = await componentsCard.textContent();

		expect(pagesText).toMatch(/\d/);
		expect(layoutsText).toMatch(/\d/);
		expect(componentsText).toMatch(/\d/);
	});

	test('content editor sees the site name in the site info card', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('[data-testid="stat-site-name"]')).toContainText('Test Site');
	});

	test('content editor sees the active site name in the sidebar', async ({ page }) => {
		await page.goto('/');
		await expect(page.getByTestId('sidebar-site-name')).toHaveText('Test Site');
	});
});
