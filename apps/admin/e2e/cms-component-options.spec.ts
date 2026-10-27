import { expect, test } from '@playwright/test';
import { addSelectedComponent, chooseComponent, editableComponent, openEmptyPage } from './helpers';

test.describe('Page editor component palette', () => {
	test('content editor sees component labels and default field values', async ({ page }) => {
		await openEmptyPage(page);
		await chooseComponent(page, 'Call to Action');

		await expect(page.locator('input[name="label"]')).toHaveValue('Learn More');
		await addSelectedComponent(page, 'CallToAction');

		await expect(page.locator('[data-testid="cms-component-calltoaction"]')).toBeVisible();
	});

	test('content editor sees textarea fields for long-form content', async ({ page }) => {
		await openEmptyPage(page);
		await chooseComponent(page, 'Section');

		await addSelectedComponent(page, 'Section');

		const sectionEditor = editableComponent(page, 'Section');
		await expect(sectionEditor).toBeVisible();
		await sectionEditor.hover();
		await sectionEditor
			.locator(':scope > [data-testid="cms-editor-controls"]')
			.getByRole('button', { name: 'Add Child', exact: true })
			.click();
		await chooseComponent(page, 'Text');
		await expect(page.locator('textarea[name="content"]')).toHaveValue('Add body copy.');
	});

	test('content editor uses a markdown editor for rich text fields', async ({ page }) => {
		await openEmptyPage(page);
		await chooseComponent(page, 'Rich Text');
		await expect(page.locator('[contenteditable="true"]')).toBeVisible();
		await expect(page.locator('textarea[name="content"]')).toHaveCount(0);
	});

	test('content editor chooses a semantic heading level for a heading component', async ({ page }) => {
		await openEmptyPage(page);
		await chooseComponent(page, 'Heading');
		await page.locator('#level').click();
		await page.getByRole('option', { name: 'h4', exact: true }).click();
		await addSelectedComponent(page, 'Heading');
		await expect(page.locator('[data-testid="cms-component-heading"] > h4')).toContainText('Heading');
	});

	test('content editor cannot add children to leaf media components', async ({ page }) => {
		await openEmptyPage(page);
		await chooseComponent(page, 'Image');

		await addSelectedComponent(page, 'Image');

		const imageEditor = editableComponent(page, 'Image');
		await expect(imageEditor).toBeVisible();
		await imageEditor.hover();
		const imageControls = imageEditor.locator(':scope > [data-testid="cms-editor-controls"]');
		await expect(imageControls.getByRole('button', { name: 'Add Child', exact: true })).toHaveCount(0);
	});

	test('content editor selects an external image with accessible metadata for an image field', async ({ page }) => {
		await openEmptyPage(page);
		await chooseComponent(page, 'Image');
		await addSelectedComponent(page, 'Image');

		const imageEditor = editableComponent(page, 'Image');
		await imageEditor.hover();
		await imageEditor.getByRole('button', { name: /Edit/ }).click();
		await expect(page.getByRole('heading', { name: 'Edit Image' })).toBeVisible();

		await expect(page.getByTestId('cms-media-field')).toBeVisible();
		await expect(page.locator('input[name="image"]')).toHaveCount(0);

		await page.getByRole('button', { name: 'Choose Media' }).click();
		await page.getByRole('tab', { name: 'URL' }).click();

		const imageUrl = 'https://example.com/external.png';
		const imageAlt = 'A descriptive alt text';
		await page.locator('input#media-url').fill(imageUrl);
		await page.getByRole('button', { name: 'Add Media' }).click();
		await expect(page.getByText('1 item selected')).toBeVisible();

		await page.locator('input[placeholder="Description for accessibility"]').fill(imageAlt);
		await page.locator('input[placeholder="e.g., nature, landscape"]').fill('nature, landscape');
		await page.getByRole('button', { name: 'Choose Selected', exact: true }).click();

		const editDialog = page.getByRole('dialog', { name: 'Edit Image' });
		const preview = editDialog.locator('[data-testid="cms-image-preview"]');
		await expect(preview).toHaveAttribute('src', imageUrl);
		await expect(preview).toHaveAttribute('alt', imageAlt);
		await expect(page.locator('input[name="image"]')).not.toBeVisible();
	});

	test('content editor sees a semantic group content boundary', async ({ page }) => {
		await openEmptyPage(page);
		await chooseComponent(page, 'Group');
		await addSelectedComponent(page, 'Group');

		await expect(page.locator('[data-testid="cms-component-group"] article')).toBeVisible();
	});

	test('content editor sees controls only on the hovered, deepest editable component', async ({ page }) => {
		await openEmptyPage(page);
		await chooseComponent(page, 'Group');
		await addSelectedComponent(page, 'Group');

		const groupEditor = editableComponent(page, 'Group');
		await groupEditor.hover();
		await groupEditor
			.locator(':scope > [data-testid="cms-editor-controls"]')
			.getByRole('button', { name: 'Add Child', exact: true })
			.click();
		await chooseComponent(page, 'Call to Action');
		await addSelectedComponent(page, 'CallToAction');

		const ctaEditor = editableComponent(page, 'CallToAction', 'last');
		await ctaEditor.hover();

		await expect(ctaEditor.locator(':scope > [data-cms-editor-control="toolbar"]')).toBeVisible();
		await expect(groupEditor.locator(':scope > [data-cms-editor-control="toolbar"]')).toBeHidden();

		const editButton = ctaEditor
			.locator(':scope > [data-cms-editor-control="toolbar"]')
			.getByRole('button', { name: /Edit/ });
		const editButtonBox = await editButton.boundingBox();
		const beforeBox = await ctaEditor.locator(':scope > [data-cms-editor-control="before"]').boundingBox();
		const afterBox = await ctaEditor.locator(':scope > [data-cms-editor-control="after"]').boundingBox();
		const overlaps = (a: NonNullable<typeof editButtonBox>, b: NonNullable<typeof beforeBox>) =>
			a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;

		expect(editButtonBox).not.toBeNull();
		expect(beforeBox).not.toBeNull();
		expect(afterBox).not.toBeNull();
		expect(overlaps(editButtonBox!, beforeBox!)).toBe(false);
		expect(overlaps(editButtonBox!, afterBox!)).toBe(false);

		// Reaching the edit button must never un-hover the component. Travel a
		// realistic pointer path: down through the add-after band, then across
		// into the toolbar row, checking the controls stay visible throughout.
		const ctaEditorBox = await ctaEditor.boundingBox();
		expect(ctaEditorBox).not.toBeNull();
		await page.mouse.move(ctaEditorBox!.x + ctaEditorBox!.width / 2, ctaEditorBox!.y + ctaEditorBox!.height / 2);
		await page.mouse.move(afterBox!.x + afterBox!.width / 2, afterBox!.y + afterBox!.height / 2, { steps: 5 });
		await page.mouse.move(afterBox!.x + afterBox!.width / 2, editButtonBox!.y + editButtonBox!.height / 2, {
			steps: 5,
		});
		await page.waitForTimeout(250);
		await expect(editButton).toBeVisible();
		await page.mouse.move(editButtonBox!.x + editButtonBox!.width / 2, editButtonBox!.y + editButtonBox!.height / 2, {
			steps: 10,
		});
		await editButton.click();
		await expect(page.getByRole('heading', { name: 'Edit Call to Action' })).toBeVisible();
	});

	test('content editor sees nested components follow the parent layout rules', async ({ page }) => {
		await openEmptyPage(page);
		await chooseComponent(page, 'Group');
		await addSelectedComponent(page, 'Group');

		const groupEditor = editableComponent(page, 'Group');
		await groupEditor.hover();
		await groupEditor
			.locator(':scope > [data-testid="cms-editor-controls"]')
			.getByRole('button', { name: 'Add Child', exact: true })
			.click();
		await chooseComponent(page, 'Call to Action');
		await addSelectedComponent(page, 'CallToAction');

		const ctaEditor = editableComponent(page, 'CallToAction', 'last');
		await ctaEditor.hover();
		await ctaEditor.locator(':scope > [data-cms-editor-control="after"]').click();
		await chooseComponent(page, 'Heading');
		await addSelectedComponent(page, 'Heading');

		const groupBox = await page.locator('[data-testid="cms-component-group"] article').boundingBox();
		const ctaBox = await page.locator('[data-testid="cms-component-calltoaction"] > a').boundingBox();
		const headingBox = await page.locator('[data-testid="cms-component-heading"] > h2').boundingBox();
		expect(groupBox).not.toBeNull();
		expect(ctaBox).not.toBeNull();
		expect(headingBox).not.toBeNull();

		const groupCenter = groupBox!.x + groupBox!.width / 2;
		expect(Math.abs(ctaBox!.x + ctaBox!.width / 2 - groupCenter)).toBeLessThan(2);
		expect(Math.abs(headingBox!.x + headingBox!.width / 2 - groupCenter)).toBeLessThan(2);
	});

	test('content editor sees only valid child components for the selected parent', async ({ page }) => {
		await openEmptyPage(page);
		const palette = page.locator('[data-testid="cms-add-component-palette"]');
		// Region sub-components are only valid inside a Region.
		await expect(palette.getByRole('button', { name: 'Region Header', exact: true })).toHaveCount(0);
		await chooseComponent(page, 'Region');
		await addSelectedComponent(page, 'Region');

		const regionEditor = editableComponent(page, 'Region');
		await expect(regionEditor).toBeVisible();
		await regionEditor.hover();
		await regionEditor
			.locator(':scope > [data-testid="cms-editor-controls"]')
			.getByRole('button', { name: 'Add Child', exact: true })
			.click();
		await expect(palette.getByRole('button', { name: 'Region Header', exact: true })).toBeVisible();
		await expect(palette.getByRole('button', { name: 'Outlet', exact: true })).toHaveCount(0);
		// Region only accepts its own sub-components as children.
		await expect(palette.getByRole('button', { name: 'Heading', exact: true })).toHaveCount(0);
		await chooseComponent(page, 'Region Main');
		await addSelectedComponent(page, 'RegionMain');

		const mainEditor = editableComponent(page, 'RegionMain');
		await mainEditor.hover();
		await mainEditor
			.locator(':scope > [data-testid="cms-editor-controls"]')
			.getByRole('button', { name: 'Add Child', exact: true })
			.click();
		await chooseComponent(page, 'Call to Action');
		await addSelectedComponent(page, 'CallToAction');

		// Call to Action is a leaf component (noChildren).
		const ctaEditor = editableComponent(page, 'CallToAction', 'last');
		await expect(ctaEditor).toBeVisible();
		await ctaEditor.hover();
		const ctaControls = ctaEditor.locator(':scope > [data-testid="cms-editor-controls"]');
		await expect(ctaControls.getByRole('button', { name: /Edit/ })).toBeVisible();
		await expect(ctaControls.getByRole('button', { name: 'Add Child', exact: true })).toHaveCount(0);
	});

	test('content editor can select an obscured ancestor to keep nesting components', async ({ page }) => {
		await openEmptyPage(page);
		await chooseComponent(page, 'Region');
		await addSelectedComponent(page, 'Region');

		const regionEditor = editableComponent(page, 'Region');
		await regionEditor.hover();
		await regionEditor
			.locator(':scope > [data-testid="cms-editor-controls"]')
			.getByRole('button', { name: 'Add Child', exact: true })
			.click();
		await chooseComponent(page, 'Region Main');
		await addSelectedComponent(page, 'RegionMain');

		const mainEditor = editableComponent(page, 'RegionMain');
		await mainEditor.hover();
		await mainEditor.getByRole('button', { name: 'Select parent Region' }).click();
		await expect(regionEditor.locator(':scope > [data-testid="cms-editor-controls"]')).toBeVisible();

		await regionEditor
			.locator(':scope > [data-testid="cms-editor-controls"]')
			.getByRole('button', { name: 'Add Child', exact: true })
			.click();
		await chooseComponent(page, 'Region Footer');
		await addSelectedComponent(page, 'RegionFooter');
		await expect(editableComponent(page, 'RegionFooter')).toBeVisible();
	});

	test('content editor can add each region slot only once', async ({ page }) => {
		await openEmptyPage(page);
		const palette = page.locator('[data-testid="cms-add-component-palette"]');
		await chooseComponent(page, 'Region');
		await addSelectedComponent(page, 'Region');

		const regionEditor = editableComponent(page, 'Region');
		await regionEditor.hover();
		await regionEditor
			.locator(':scope > [data-testid="cms-editor-controls"]')
			.getByRole('button', { name: 'Add Child', exact: true })
			.click();
		await chooseComponent(page, 'Region Header');
		await addSelectedComponent(page, 'RegionHeader');

		// Re-select the region and open the add dialog again: the header slot is
		// taken, so only the remaining slots are offered.
		const headerEditor = editableComponent(page, 'RegionHeader');
		await headerEditor.hover();
		await page.keyboard.press('ArrowUp');
		await regionEditor
			.locator(':scope > [data-testid="cms-editor-controls"]')
			.getByRole('button', { name: 'Add Child', exact: true })
			.click();
		await expect(palette.getByRole('button', { name: 'Region Header', exact: true })).toHaveCount(0);
		await expect(palette.getByRole('button', { name: 'Region Aside', exact: true })).toBeVisible();
		await expect(palette.getByRole('button', { name: 'Region Main', exact: true })).toBeVisible();
		await expect(palette.getByRole('button', { name: 'Region Footer', exact: true })).toBeVisible();
	});

	test('content editor navigates components with arrow keys', async ({ page }) => {
		await openEmptyPage(page);
		await chooseComponent(page, 'Group');
		await addSelectedComponent(page, 'Group');

		const groupEditor = editableComponent(page, 'Group');
		await groupEditor.hover();
		await groupEditor
			.locator(':scope > [data-testid="cms-editor-controls"]')
			.getByRole('button', { name: 'Add Child', exact: true })
			.click();
		await chooseComponent(page, 'Heading');
		await addSelectedComponent(page, 'Heading');

		const headingEditor = editableComponent(page, 'Heading');
		await headingEditor.hover();
		await headingEditor.locator(':scope > [data-cms-editor-control="after"]').click();
		await chooseComponent(page, 'Text');
		await addSelectedComponent(page, 'Text');

		// Arrow Left selects the previous sibling of the hovered component.
		const textEditor = editableComponent(page, 'Text');
		await textEditor.hover();
		await page.keyboard.press('ArrowLeft');
		await expect(headingEditor.locator(':scope > [data-testid="cms-editor-controls"]')).toBeVisible();

		// Arrow Right moves back to the next sibling.
		await page.keyboard.press('ArrowRight');
		await expect(textEditor.locator(':scope > [data-testid="cms-editor-controls"]')).toBeVisible();

		// The same moves are available as clickable controls.
		await expect(textEditor.getByRole('button', { name: 'Select previous sibling Heading' })).toBeVisible();
		await page.keyboard.press('Escape');
		await headingEditor.hover();
		await expect(headingEditor.getByRole('button', { name: 'Select next sibling Text' })).toBeVisible();
	});

	test('content editor navigates the selection with arrow keys and clears it with escape', async ({ page }) => {
		await openEmptyPage(page);
		await chooseComponent(page, 'Region');
		await addSelectedComponent(page, 'Region');

		const regionEditor = editableComponent(page, 'Region');
		await regionEditor.hover();
		await regionEditor
			.locator(':scope > [data-testid="cms-editor-controls"]')
			.getByRole('button', { name: 'Add Child', exact: true })
			.click();
		await chooseComponent(page, 'Region Main');
		await addSelectedComponent(page, 'RegionMain');

		// Arrow Up selects the parent of the hovered component.
		const mainEditor = editableComponent(page, 'RegionMain');
		await mainEditor.hover();
		await page.keyboard.press('ArrowUp');
		await expect(regionEditor.locator(':scope > [data-testid="cms-editor-controls"]')).toBeVisible();

		// Arrow Down walks back into the first child of the selection.
		await page.keyboard.press('ArrowDown');
		await expect(mainEditor.locator(':scope > [data-testid="cms-editor-controls"]')).toBeVisible();

		// Escape clears the selection and returns to hover-driven controls,
		// where the deepest hovered component wins again.
		await page.keyboard.press('Escape');
		await mainEditor.hover();
		await expect(mainEditor.locator(':scope > [data-testid="cms-editor-controls"]')).toBeVisible();
		await expect(regionEditor.locator(':scope > [data-testid="cms-editor-controls"]')).toBeHidden();
	});

	test('content editor sees layout-only components only in valid contexts', async ({ page }) => {
		await openEmptyPage(page);
		const palette = page.locator('[data-testid="cms-add-component-palette"]');
		await expect(palette.getByRole('button', { name: 'Outlet', exact: true })).toHaveCount(0);
		await page.keyboard.press('Escape');
		await expect(page.getByRole('dialog')).toHaveCount(0);

		await page.goto('/layouts/test-layout');
		const outletEditor = page.locator('[data-testid^="cms-editable-component-"]').first();
		await expect(page.locator('[data-testid="cms-outlet-placeholder"]')).toBeVisible();
		await outletEditor.hover();
		await expect(outletEditor.getByRole('button', { name: /Edit/ })).toHaveCount(0);
	});
});
