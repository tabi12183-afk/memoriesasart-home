import { expect, test } from '@playwright/test';
import { addSelectedComponent, chooseComponent, editableComponent, openEmptyPage } from './helpers';

const portfolioLabel = 'Memories as Art Portfolio';

/** The same native component must work in the editor and on the public site. */
test.describe('Photography portfolio authoring', () => {
	test('author can choose Boudoir and update its semantic content without changing the studio design', async ({
		page,
	}) => {
		await openEmptyPage(page);
		await chooseComponent(page, portfolioLabel);
		await page.locator('#pagePath').click();
		await page.getByRole('option', { name: '/portraits/boudoir/', exact: true }).click();
		await page.locator('input[name="heading"]').fill('A portrait of your confidence');
		await page.locator('textarea[name="intro"]').fill('A personal portrait experience in Greensburg, Pennsylvania.');
		await addSelectedComponent(page, 'MemoriesPortfolio');

		const preview = page.locator('[data-testid="cms-component-memoriesportfolio"] .maa-site');
		await expect(preview.getByRole('heading', { level: 1 })).toHaveText('A portrait of your confidence');
		await expect(
			preview.getByText('A personal portrait experience in Greensburg, Pennsylvania.', { exact: true }),
		).toBeVisible();
		await expect(preview.locator('.photo-grid .photo')).toHaveCount(12);
		await expect(preview.locator('.photo-grid img').first()).toHaveAttribute('alt', /\S/);

		const editor = editableComponent(page, 'MemoriesPortfolio');
		await editor.hover({ position: { x: 15, y: 15 } });
		await editor.locator(':scope > [data-cms-editor-control="toolbar"]').getByRole('button', { name: /Edit/ }).click();
		await expect(page.getByRole('heading', { name: `Edit ${portfolioLabel}`, exact: true })).toBeVisible();
		await page.locator('input[name="heading"]').fill('Your story, your portrait');
		const src = await preview.locator('.photo-grid img').first().getAttribute('src');
		expect(src).not.toBeNull();
		await page.locator('textarea[name="galleryImages"]').fill(`${src!} | A studio portrait selected by the author`);
		await page.getByRole('button', { name: 'Update', exact: true }).click();
		await expect(preview.getByRole('heading', { level: 1 })).toHaveText('Your story, your portrait');
		await expect(preview.locator('.photo-grid .photo')).toHaveCount(1);
		await expect(preview.locator('.photo-grid img')).toHaveAttribute('alt', 'A studio portrait selected by the author');
		await preview.locator('.photo-grid .photo').click();
		const viewer = preview.getByRole('dialog', { name: 'Photograph viewer' });
		await expect(viewer).toBeVisible();
		await expect(viewer.locator('img')).toHaveAttribute('alt', 'A studio portrait selected by the author');
		await page.keyboard.press('Escape');
		await expect(viewer).not.toBeVisible();
	});

	for (const width of [1440, 390]) {
		test(`studio preview remains scoped and usable at ${width}px`, async ({ page }) => {
			await page.setViewportSize({ width, height: 1000 });
			await openEmptyPage(page);
			const shellSave = page.getByRole('button', { name: 'Save', exact: true });
			const shellBefore = await shellSave.evaluate((node) => ({
				font: getComputedStyle(node).fontFamily,
				background: getComputedStyle(node).backgroundColor,
			}));
			await chooseComponent(page, portfolioLabel);
			await addSelectedComponent(page, 'MemoriesPortfolio');
			const preview = page.locator('[data-testid="cms-component-memoriesportfolio"] .maa-site');
			await expect(preview).toBeVisible();
			await expect(preview.locator('.hero-slide')).toHaveCount(23);
			await expect(preview.locator('.hero-slide.is-active img')).toHaveAttribute('alt', /fairy/i);
			await expect(preview.locator('.hero-slide.is-active img')).toHaveCSS('object-fit', 'contain');
			await expect(preview).toHaveCSS('background-color', 'rgb(243, 232, 225)');
			expect(await preview.evaluate((node) => node.scrollWidth - node.clientWidth)).toBeLessThanOrEqual(1);
			expect(
				await shellSave.evaluate((node) => ({
					font: getComputedStyle(node).fontFamily,
					background: getComputedStyle(node).backgroundColor,
				})),
			).toEqual(shellBefore);
			if (width < 760) {
				await preview.getByRole('button', { name: /Menu/ }).click();
				await expect(preview.getByRole('navigation', { name: 'Main menu' })).toBeVisible();
				await expect(
					preview.getByRole('navigation', { name: 'Main menu' }).getByRole('link', { name: 'Boudoir', exact: true }),
				).toBeAttached();
			}
		});
	}
});
