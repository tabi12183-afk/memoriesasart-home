import { expect, test } from '@playwright/test';
import { addSelectedComponent, authenticate, chooseComponent, editableComponent, openEmptyPage } from './helpers';

test.describe('Media Library Selection', () => {
	test('content editor can re-select the same file after clearing it', async ({ page }) => {
		await authenticate(page);
		// The Upload tab only renders once /api/media confirms S3 storage, which a fresh site has not set up.
		await page.route('**/api/media', (route) =>
			route.request().method() === 'GET'
				? route.fulfill({
						status: 200,
						contentType: 'application/json',
						body: JSON.stringify({ media: [], uploads: true }),
					})
				: route.fallback(),
		);
		await page.goto('/media');
		await page.getByRole('button', { name: 'Upload Media' }).click();

		const fileInput = page.locator('input[type="file"][accept="image/*"]');
		const image = { name: 'repeat.png', mimeType: 'image/png', buffer: Buffer.from('image') };
		await fileInput.setInputFiles(image);
		await expect(page.getByText('1 item selected')).toBeVisible();

		await page.getByRole('button', { name: 'Remove repeat.png' }).click();
		await expect(page.getByText('0 items selected')).toBeVisible();
		await fileInput.setInputFiles(image);
		await expect(page.getByText('1 item selected')).toBeVisible();
	});

	test('content editor returns to the URL tab after selecting an external image and reopening the dialog', async ({
		page,
	}) => {
		await openEmptyPage(page);
		await chooseComponent(page, 'Image');
		await addSelectedComponent(page, 'Image');

		const imageEditor = editableComponent(page, 'Image');
		await imageEditor.hover();
		await imageEditor.getByRole('button', { name: /Edit/ }).click();
		await expect(page.getByRole('heading', { name: 'Edit Image' })).toBeVisible();

		await page.getByRole('button', { name: 'Choose Media' }).click();
		const addMediaDialog = page.getByRole('dialog', { name: 'Add Media' });
		await expect(addMediaDialog).toBeVisible();

		await page.getByRole('tab', { name: 'URL' }).click();
		await expect(page.getByRole('tab', { name: 'URL' })).toHaveAttribute('aria-selected', 'true');

		const imageUrl = 'https://example.com/external.png';
		await page.locator('input#media-url').fill(imageUrl);
		await page.getByRole('button', { name: 'Add Media' }).click();
		await expect(page.getByText('1 item selected')).toBeVisible();
		await page.getByRole('button', { name: 'Choose Selected', exact: true }).click();

		await expect(addMediaDialog).toBeHidden();
		const editDialog = page.getByRole('dialog', { name: 'Edit Image' });
		await expect(editDialog.locator('[data-testid="cms-image-preview"]')).toHaveAttribute('src', imageUrl);

		// Reopen the media library and verify it returns to the URL tab.
		await page.getByRole('button', { name: 'Choose Media' }).click();
		await expect(addMediaDialog).toBeVisible();
		await expect(page.getByRole('tab', { name: 'URL' })).toHaveAttribute('aria-selected', 'true');
	});
});
