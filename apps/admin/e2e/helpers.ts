import { type Page, expect } from '@playwright/test';
import { notNullish } from '../src/lib/utils';

export async function authenticate(page: Page) {
	await page.context().addCookies([{ name: 'e2e_bypass_auth', value: 'true', path: '/', domain: 'localhost' }]);
}

export async function openEmptyPage(page: Page) {
	await authenticate(page);
	await page.goto('/pages/69c9ee40daa567bccfc45e19');
	await page.waitForLoadState('networkidle');
	await page.getByRole('button', { name: 'Add Your First Component' }).click();
	await expect(page.getByRole('dialog')).toBeVisible();
}

export async function chooseComponent(page: Page, name: string) {
	const button = page.locator('[data-testid="cms-add-component-palette"]').getByRole('button', { name, exact: true });
	await expect(button).toBeVisible();
	await button.click();
}

export async function addSelectedComponent(page: Page, componentName?: string) {
	await page.getByRole('button', { name: 'Add Component', exact: true }).click();
	if (notNullish(componentName) && componentName !== '') {
		const renderedComponent = page.locator(`[data-testid="cms-component-${componentName.toLowerCase()}"]`);
		await expect(renderedComponent).toBeAttached({ timeout: 15_000 });
		await expect(editableComponent(page, componentName)).toBeVisible();
		await page.waitForLoadState('networkidle');
	}
}

export function editableComponent(page: Page, componentName: string, position: 'first' | 'last' = 'first') {
	const editors = page
		.locator('[data-testid^="cms-editable-component-"]')
		.filter({ has: page.locator(`:scope > [data-testid="cms-component-${componentName.toLowerCase()}"]`) });

	return position === 'last' ? editors.last() : editors.first();
}
