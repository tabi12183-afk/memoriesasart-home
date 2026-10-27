import { expect, test } from '@playwright/test';
import { addSelectedComponent, chooseComponent, editableComponent, openEmptyPage } from './helpers';

test('copies and cuts complete components using the paste placement menu', async ({ page }) => {
	await openEmptyPage(page);
	await chooseComponent(page, 'Group');
	await addSelectedComponent(page, 'Group');
	const group = editableComponent(page, 'Group');
	await group.hover();
	await expect(group.getByRole('button', { name: 'Paste component', exact: true })).toBeDisabled();
	await group.getByRole('button', { name: 'Add after', exact: true }).click();
	await chooseComponent(page, 'Text');
	await page.getByLabel('Content', { exact: true }).fill('Clipboard content');
	await addSelectedComponent(page, 'Text');
	const source = editableComponent(page, 'Text');
	const sourceId = await source.getAttribute('data-cms-component-id');
	if (sourceId === null) throw new Error('Missing source ID');
	const original = page.getByTestId(`cms-editable-component-${sourceId}`);
	await original.hover({ position: { x: 10, y: 10 } });
	await original.getByRole('button', { name: 'Copy component', exact: true }).click();
	await group.hover();
	await group.getByRole('button', { name: 'Paste component', exact: true }).click();
	await expect(page.getByRole('menuitem')).toHaveText(['Before', 'As Child', 'After']);
	await page.getByRole('menuitem', { name: 'As Child', exact: true }).hover();
	await expect(page.getByRole('menu')).toBeVisible();
	await expect(page.getByRole('menuitem', { name: 'As Child', exact: true })).toHaveCSS('cursor', 'pointer');
	await page.getByRole('menuitem', { name: 'As Child', exact: true }).click();
	await expect(group.locator('[data-cms-editable-component]')).toHaveCount(1);
	await expect(page.getByText('Clipboard content', { exact: true })).toHaveCount(2);

	await original.hover({ position: { x: 10, y: 10 } });
	await original.getByRole('button', { name: 'Cut component', exact: true }).click();
	await expect(page.locator('[data-cms-editable-component]')).toHaveCount(3);
	const child = group.locator('[data-cms-editable-component]');
	await child.hover();
	await child.getByRole('button', { name: 'Paste component', exact: true }).click();
	await expect(page.getByRole('menuitem', { name: 'As Child', exact: true })).toHaveCount(0);
	await page.getByRole('menuitem', { name: 'Before', exact: true }).click();
	await expect(group.locator('[data-cms-editable-component]')).toHaveCount(2);
	await expect(page.locator('[data-cms-editable-component]')).toHaveCount(3);
	await original.hover({ position: { x: 10, y: 10 } });
	await expect(original.getByRole('button', { name: 'Paste component', exact: true })).toBeDisabled();

	await page.getByRole('textbox', { name: 'Slug', exact: true }).fill('clipboard-test');
	const saveRequest = page.waitForRequest(
		(request) => request.method() === 'PUT' && request.url().includes('/api/pages/'),
	);
	await page.getByRole('button', { name: 'Save', exact: true }).click();
	const saved: unknown = (await saveRequest).postDataJSON();
	expect(saved).toMatchObject({
		components: [{ name: 'Group', childComponents: [{ id: sourceId, name: 'Text' }, { name: 'Text' }] }],
	});
});

test('explains why a Section cannot be pasted inside another Section', async ({ page }) => {
	await openEmptyPage(page);
	await chooseComponent(page, 'Section');
	await addSelectedComponent(page, 'Section');
	const section = editableComponent(page, 'Section');
	await section.hover();
	await section.getByRole('button', { name: 'Copy component', exact: true }).click();
	await section.getByRole('button', { name: 'Paste component', exact: true }).click();
	const inside = page.getByRole('menuitem', { name: 'As Child', exact: true });
	await expect(inside).not.toHaveAttribute('data-disabled');
	await expect(inside).toHaveCSS('cursor', 'pointer');
	await inside.click();
	await expect(page.getByText('Section does not accept Section as a child.', { exact: true })).toBeVisible();
	await expect(page.locator('[data-cms-editable-component]')).toHaveCount(1);
	await section.hover();
	await section.getByRole('button', { name: 'Paste component', exact: true }).click();
	await page.getByRole('menuitem', { name: 'After', exact: true }).click();
	await expect(page.locator('[data-cms-editable-component]')).toHaveCount(2);
});

test('keeps copied subtrees through navigation to another editor and a reload', async ({ page }) => {
	await openEmptyPage(page);
	await chooseComponent(page, 'Group');
	await addSelectedComponent(page, 'Group');
	const group = editableComponent(page, 'Group');
	await group.hover();
	await group.getByRole('button', { name: 'Add Child', exact: true }).click();
	await chooseComponent(page, 'Text');
	await page.getByLabel('Content', { exact: true }).fill('Persistent clipboard');
	await addSelectedComponent(page, 'Text');
	await group.hover({ position: { x: 5, y: 5 } });
	await group
		.locator(':scope > [data-cms-editor-control="toolbar"]')
		.getByRole('button', { name: 'Copy component', exact: true })
		.click();
	await page.goto('/layouts/test-layout');
	for (let attempt = 0; attempt < 2; attempt++) {
		const outlet = editableComponent(page, 'Outlet');
		await outlet.hover();
		await outlet.getByRole('button', { name: 'Add after', exact: true }).click();
		await chooseComponent(page, 'Group');
		await addSelectedComponent(page, 'Group');
		const target = editableComponent(page, 'Group');
		await target.hover();
		await target.getByRole('button', { name: 'Paste component', exact: true }).click();
		await page.getByRole('menuitem', { name: 'As Child', exact: true }).click();
		await expect(target.getByText('Persistent clipboard', { exact: true })).toBeVisible();
		if (attempt === 0) await page.reload();
	}
});

test('offers cancel or paste as copy for a cut restored in another document', async ({ page }) => {
	await openEmptyPage(page);
	await chooseComponent(page, 'Group');
	await addSelectedComponent(page, 'Group');
	const source = editableComponent(page, 'Group');
	const sourceId = await source.getAttribute('data-cms-component-id');
	await source.hover();
	await source.getByRole('button', { name: 'Add Child', exact: true }).click();
	await chooseComponent(page, 'Text');
	await page.getByLabel('Content', { exact: true }).fill('Cross-document cut');
	await addSelectedComponent(page, 'Text');
	await source.hover({ position: { x: 5, y: 5 } });
	await source
		.locator(':scope > [data-cms-editor-control="toolbar"]')
		.getByRole('button', { name: 'Cut component', exact: true })
		.click();
	await page.goto('/layouts/test-layout');
	await page.reload();
	const outlet = editableComponent(page, 'Outlet');
	await outlet.hover();
	await outlet.getByRole('button', { name: 'Add after', exact: true }).click();
	await chooseComponent(page, 'Group');
	await addSelectedComponent(page, 'Group');
	const target = editableComponent(page, 'Group');
	const toolbar = target.locator(':scope > [data-cms-editor-control="toolbar"]');
	await target.hover();
	await toolbar.getByRole('button', { name: 'Paste component', exact: true }).click();
	await page.getByRole('menuitem', { name: 'As Child', exact: true }).click();
	const dialog = page.getByRole('dialog', { name: 'Paste as a copy?' });
	await expect(dialog).toBeVisible();
	await expect(dialog).toContainText('cut from another document');
	await dialog.getByRole('button', { name: 'Cancel', exact: true }).click();
	await expect(dialog).toBeHidden();
	await expect(target.locator('[data-cms-editable-component]')).toHaveCount(0);
	await target.hover();
	await toolbar.getByRole('button', { name: 'Paste component', exact: true }).click();
	await page.getByRole('menuitem', { name: 'As Child', exact: true }).click();
	await dialog.getByRole('button', { name: 'Paste as copy', exact: true }).click();
	await expect(dialog).toBeHidden();
	await expect(target.getByText('Cross-document cut', { exact: true })).toBeVisible();
	await expect(target.locator('[data-cms-editable-component]').first()).not.toHaveAttribute(
		'data-cms-component-id',
		sourceId ?? 'missing',
	);
	await target.hover({ position: { x: 5, y: 5 } });
	await toolbar.getByRole('button', { name: 'Paste component', exact: true }).click();
	await page.getByRole('menuitem', { name: 'As Child', exact: true }).click();
	await expect(dialog).toBeHidden();
	await expect(target.getByText('Cross-document cut', { exact: true })).toHaveCount(2);
});
