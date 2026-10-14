import { expect, test } from '@playwright/test';
import { authenticate } from './helpers';

test.describe('Layout Outlet', () => {
	test.beforeEach(async ({ page }) => {
		await authenticate(page);
	});

	test('shows an outlet placeholder when building a layout', async ({ page }) => {
		await page.goto('/layouts/test-layout');

		const placeholder = page.locator('[data-testid="cms-outlet-placeholder"]');
		await expect(placeholder).toBeVisible();

		const box = await placeholder.boundingBox();
		expect(box?.height ?? 0).toBeGreaterThan(150);
	});

	test('stretches components added to an outlet to fill the available width', async ({ page }) => {
		await page.goto('/layouts/test-layout');

		const outletEditor = page.locator('[data-testid^="cms-editable-component-"]').first();
		await outletEditor.hover();
		await outletEditor.getByRole('button', { name: 'Add before' }).click();

		const palette = page.locator('[data-testid="cms-add-component-palette"]');
		await palette.getByRole('button', { name: 'Call to Action', exact: true }).click();
		await page.locator('button[type="submit"]:has-text("Add Component")').click();

		const ctaEditor = page.locator('[data-testid^="cms-editable-component-"]', {
			has: page.locator('[data-testid="cms-component-calltoaction"]'),
		});
		const editorBox = await ctaEditor.boundingBox();
		const ctaBox = await ctaEditor.locator('[data-testid="cms-component-calltoaction"] > a').boundingBox();
		expect(editorBox).not.toBeNull();
		expect(ctaBox).not.toBeNull();
		expect(Math.abs(editorBox!.width - ctaBox!.width)).toBeLessThanOrEqual(2);
	});
});
