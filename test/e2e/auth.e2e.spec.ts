import { test, expect } from '../fixtures/test.fixtures';

test.describe('Authentication E2E', () => {
    test('should be logged in from global setup', async ({ page }) => {
        // Navigate to homepage and verify we're logged in
        await page.goto('/');

        const welcomeText = page.locator('span[class="welcome-text"]');
        await expect(welcomeText).toBeVisible();
    });
});
