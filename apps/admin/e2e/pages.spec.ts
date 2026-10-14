import { expect, test } from '@playwright/test';
import { authenticate } from './helpers';

test.describe('Pages Management', () => {
	test('hides slug and deletion controls for the home page', async ({ page }) => {
		await authenticate(page);
		await page.goto('/pages/home-page');

		await expect(page.getByRole('textbox', { name: 'Slug' })).toHaveCount(0);
		await expect(page.getByRole('button', { name: 'Delete page' })).toHaveCount(0);
	});

	test('shows inline feedback when a slug is already used', async ({ page }) => {
		await authenticate(page);
		await page.goto('/pages/69ca07520ab460b930f1d33a');

		await page.getByRole('textbox', { name: 'Slug' }).fill('existing-page');
		await page.getByRole('button', { name: /Save/ }).click();

		await expect(
			page.getByRole('alert').filter({ hasText: 'This slug is already used by another page.' }),
		).toBeVisible();
		await expect(page).toHaveURL(/\/pages\/69ca07520ab460b930f1d33a$/);
	});

	test('prevents creating a page with an existing slug', async ({ page }) => {
		await authenticate(page);
		await page.goto('/pages');

		await page.getByRole('button', { name: 'New Page' }).click();
		await page.getByRole('textbox', { name: 'Page Name' }).fill('Existing Page');
		await expect(page.getByRole('textbox', { name: 'Slug' })).toHaveValue('existing-page');
		await page.getByRole('button', { name: 'Create' }).click();

		await expect(
			page.getByRole('alert').filter({ hasText: 'This slug is already used by another page.' }),
		).toBeVisible();
		await expect(page).toHaveURL(/\/pages$/);
	});

	test('requires confirmation before deleting a page', async ({ page }) => {
		await authenticate(page);
		await page.goto('/pages/69ca07520ab460b930f1d33a');
		await page.waitForLoadState('networkidle');
		await expect(page.getByRole('button', { name: 'Delete page' })).toBeVisible();

		await page.getByRole('button', { name: 'Delete page' }).click();
		const dialog = page.getByRole('dialog', { name: 'Delete page' });
		await expect(dialog).toContainText('Test Page');

		await dialog.getByRole('button', { name: 'Cancel' }).click();
		await expect(dialog).toBeHidden();

		await page.getByRole('button', { name: 'Delete page' }).click();

		const deleteResponse = page.waitForResponse(
			(response) => response.url().includes('/api/pages/') && response.request().method() === 'DELETE',
		);
		await dialog.getByRole('button', { name: 'Delete page' }).click();
		await expect(page).toHaveURL(/\/pages$/);
		await expect((await deleteResponse).ok()).toBe(true);
	});

	test('redirects unauthenticated users to login from the pages list', async ({ page }) => {
		await page.goto('/pages');
		await expect(page.locator('text=Welcome back')).toBeVisible();
	});

	test('redirects unauthenticated users to login from the page editor', async ({ page }) => {
		await page.goto('/pages/69ca07520ab460b930f1d33a');
		await expect(page.locator('text=Welcome back')).toBeVisible();
	});

	test('displays login options on the public pages route', async ({ page }) => {
		await page.goto('/pages');
		await expect(page.locator('text=Login with GitHub')).toBeVisible();
		await expect(page.locator('text=Login with Google')).toBeVisible();
	});
});
