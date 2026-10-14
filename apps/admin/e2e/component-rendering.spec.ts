import { expect, test } from '@playwright/test';
import { addSelectedComponent, chooseComponent, editableComponent, openEmptyPage } from './helpers';

test.describe('Component Rendering', () => {
	test('content editor sees a rendered component with its default content after adding it', async ({ page }) => {
		await openEmptyPage(page);
		await chooseComponent(page, 'Call to Action');

		await expect(page.locator('input[name="label"]')).toBeVisible();

		await addSelectedComponent(page, 'CallToAction');

		const ctaWrapper = page.locator('[data-testid="cms-component-calltoaction"]');
		await expect(ctaWrapper).toBeVisible();

		const renderedCta = ctaWrapper.locator('a');
		await expect(renderedCta).toBeVisible({ timeout: 5000 });
		await expect(renderedCta).toContainText('Learn More');
	});

	test('content editor sees add-before and add-after controls when hovering a component', async ({ page }) => {
		await openEmptyPage(page);
		await chooseComponent(page, 'Call to Action');
		await addSelectedComponent(page, 'CallToAction');

		const component = editableComponent(page, 'CallToAction');
		await expect(component).toBeVisible();
		await component.hover();

		const addBeforeButton = component.getByRole('button', { name: 'Add before' });
		const addAfterButton = component.getByRole('button', { name: 'Add after' });

		await expect(addBeforeButton).toBeVisible();
		await expect(addAfterButton).toBeVisible();

		await addBeforeButton.hover();
		await expect(addBeforeButton).toBeVisible();

		await addAfterButton.hover();
		await expect(addAfterButton).toBeVisible();
	});

	test('content editor sees the full set of available component types in the palette', async ({ page }) => {
		await openEmptyPage(page);

		const palette = page.locator('[data-testid="cms-add-component-palette"]');
		for (const componentName of [
			'Group',
			'Section',
			'Heading',
			'Text',
			'Rich Text',
			'Image',
			'Call to Action',
			'Card',
			'Card Group',
			'Hero',
			'Region',
			'Navigation',
			'Site Info',
		]) {
			await expect(palette.getByRole('button', { name: componentName, exact: true })).toBeVisible();
		}
		await expect(palette.getByRole('button', { name: 'Outlet', exact: true })).toHaveCount(0);
	});
});
