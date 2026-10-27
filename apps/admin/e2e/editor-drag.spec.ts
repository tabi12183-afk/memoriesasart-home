import { expect, test } from '@playwright/test';
import { addSelectedComponent, chooseComponent, editableComponent, openEmptyPage } from './helpers';

test('drags a component into the full surface of an empty parent and back to the root', async ({ page }) => {
	await openEmptyPage(page);
	await chooseComponent(page, 'Group');
	await addSelectedComponent(page, 'Group');
	const group = editableComponent(page, 'Group');
	await group.hover();
	await group.getByRole('button', { name: 'Add after', exact: true }).click();
	await chooseComponent(page, 'Text');
	await addSelectedComponent(page, 'Text');

	const text = editableComponent(page, 'Text');
	await text.hover();
	const handle = text.getByRole('button', { name: 'Drag Text', exact: true });
	await expect(handle).toHaveCSS('cursor', 'grab');
	await handle.hover();
	await page.mouse.down();
	await expect(handle).toHaveCSS('cursor', 'grabbing');
	const targetBox = await group.boundingBox();
	if (targetBox === null) throw new Error('Group is missing');
	await page.mouse.move(targetBox.x + targetBox.width / 2, targetBox.y + targetBox.height / 2, { steps: 12 });
	await page.mouse.move(targetBox.x + targetBox.width / 2 + 1, targetBox.y + targetBox.height / 2);
	await expect(group).toHaveAttribute('data-cms-drop-target', 'true');
	await expect(group.locator(':scope > [data-cms-editor-control="navigator"]')).toBeVisible();
	await expect(group).toHaveCSS('border-style', 'solid');
	await page.mouse.up();
	await expect(group.locator('[data-testid^="cms-editable-component-"]')).toHaveCount(1);
	await text.hover();
	await expect(handle).toHaveCSS('cursor', 'grab');

	await page.keyboard.press('Escape');
	await text.hover();
	await handle.hover();
	await page.mouse.down();
	await page.mouse.move(targetBox.x + targetBox.width / 2, targetBox.y + targetBox.height + 30, { steps: 12 });
	const rootSlot = page.locator('[data-cms-dropzone="root:1"]');
	await expect(rootSlot).toBeAttached();
	await rootSlot.hover();
	const slotBox = await rootSlot.boundingBox();
	if (slotBox === null) throw new Error('Root slot is missing');
	await page.mouse.move(slotBox.x + slotBox.width / 2 + 1, slotBox.y + slotBox.height / 2);
	await page.mouse.up();
	await expect(group.locator('[data-testid^="cms-editable-component-"]')).toHaveCount(0);
	await expect(page.locator('[data-cms-editable-component]')).toHaveCount(2);
});

test('drops into the space between horizontally arranged children', async ({ page }) => {
	await openEmptyPage(page);
	await chooseComponent(page, 'Card Group');
	await addSelectedComponent(page, 'CardGroup');
	const group = editableComponent(page, 'CardGroup');
	await group.hover();
	await group.getByRole('button', { name: 'Add Child', exact: true }).click();
	for (const title of ['First', 'Second', 'Third']) {
		await chooseComponent(page, 'Card');
		await page.getByLabel('Title', { exact: true }).fill(title);
		await addSelectedComponent(page);
		await expect(group.getByRole('heading', { name: title, exact: true })).toBeVisible();
		if (title !== 'Third') {
			const last = editableComponent(page, 'Card', 'last');
			await last.hover();
			await last.getByRole('button', { name: 'Add after', exact: true }).click();
		}
	}
	const cards = page
		.locator('[data-cms-editable-component]')
		.filter({ has: page.locator(':scope > [data-testid="cms-component-card"]') });
	const firstBox = await cards.nth(0).boundingBox();
	const secondBox = await cards.nth(1).boundingBox();
	if (firstBox === null || secondBox === null) throw new Error('Cards are missing');
	expect(secondBox.x).toBeGreaterThan(firstBox.x + firstBox.width);
	await cards.nth(2).hover();
	await cards.nth(2).getByRole('button', { name: 'Drag Card', exact: true }).hover();
	await page.mouse.down();
	const gapX = (firstBox.x + firstBox.width + secondBox.x) / 2;
	const gapY = secondBox.y + secondBox.height / 2;
	await page.mouse.move(gapX, gapY, { steps: 12 });
	await page.mouse.move(gapX + 1, gapY);
	await expect(group).toHaveAttribute('data-cms-drop-target', 'true');
	await expect(group.locator(':scope > [data-cms-editor-control="navigator"]')).toBeVisible();
	await expect(group).toHaveCSS('border-style', 'solid');
	await expect(group).not.toHaveCSS('border-color', 'rgba(0, 0, 0, 0)');
	await page.mouse.up();
	await expect(cards.locator('h3')).toHaveText(['First', 'Third', 'Second']);
});
