import { expect, test } from '@playwright/test';
import { authenticate } from './helpers';

test.describe('Authentication', () => {
	test('redirects an unauthenticated visitor to login when accessing a protected page', async ({ page }) => {
		await page.goto('/pages');
		await expect(page).toHaveURL(/.*login|auth.*/);
	});

	test('clears the session cookie and redirects to /login from the signout endpoint', async ({ page }) => {
		await authenticate(page);
		await page.goto('/api/auth/stormy?action=signout');
		await expect(page).toHaveURL(/.*login.*/);
		const cookies = await page.context().cookies();
		const sessionCookie = cookies.find((c) => c.name === 'stormy_session_token');
		expect(sessionCookie).toBeUndefined();
	});

	test('exposes an E2E authentication bypass through the session endpoint', async ({ page }) => {
		await authenticate(page);

		const response = await page.context().request.get('/api/auth/stormy?action=session');
		expect(response.status()).toBe(200);
	});
});
