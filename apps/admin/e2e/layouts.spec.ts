import { expect, test } from '@playwright/test';
import { authenticate } from './helpers';

test.describe('Layouts Management', () => {
	test('redirects unauthenticated users to login from layouts list', async ({ page }) => {
		await page.goto('/layouts');
		await expect(page.locator('text=Welcome back')).toBeVisible();
	});

	test('redirects unauthenticated users to login from layout editor', async ({ page }) => {
		await page.goto('/layouts/69ca07520ab460b930f1d33a');
		await expect(page.locator('text=Welcome back')).toBeVisible();
	});

	test('displays login options on the public layouts route', async ({ page }) => {
		await page.goto('/layouts');
		await expect(page.locator('text=Login with GitHub')).toBeVisible();
		await expect(page.locator('text=Login with Google')).toBeVisible();
	});
});

test.describe('Layouts Create Flow', () => {
	test.beforeEach(async ({ page }) => {
		await authenticate(page);
	});

	test('renders a create dialog mirroring the pages create flow', async ({ page }) => {
		await page.goto('/layouts');

		const trigger = page.getByRole('button', { name: /New Layout/i });
		await expect(trigger).toBeVisible();
		await trigger.click();

		const dialog = page.getByRole('dialog', { name: 'New Layout' });
		await expect(dialog).toBeVisible();
		await expect(dialog.locator('#layout-name')).toBeVisible();
	});

	test('allows a selected parent layout to be cleared', async ({ page }) => {
		await page.goto('/layouts/test-layout');

		await page.getByRole('button', { name: 'Parent Layout', exact: true }).click();
		let dialog = page.getByRole('dialog', { name: 'Parent Layout' });
		await dialog.getByRole('combobox').click();
		await page.getByRole('option', { name: 'Parent Layout Option' }).click();
		await dialog.getByRole('button', { name: 'Update Layout' }).click();

		await page.getByRole('button', { name: 'Parent Layout', exact: true }).click();
		dialog = page.getByRole('dialog', { name: 'Parent Layout' });
		await expect(dialog.getByRole('combobox')).toContainText('Parent Layout Option');
		await dialog.getByRole('combobox').click();
		await page.getByRole('option', { name: 'No parent layout' }).click();
		await dialog.getByRole('button', { name: 'Update Layout' }).click();

		await page.getByRole('button', { name: 'Parent Layout', exact: true }).click();
		await expect(page.getByRole('dialog', { name: 'Parent Layout' }).getByRole('combobox')).toContainText(
			'No parent layout',
		);
	});
});
