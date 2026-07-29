import { test, expect } from '../fixtures/test.fixtures';

test.describe('Reports E2E', () => {
    // All tests use authenticated state from global-setup.ts

    test('should display all reports page', async ({ page }) => {
        await page.goto('/reports/all');

        // Verify we're on the correct page by checking URL
        await expect(page).toHaveURL(/.*reports\/all.*/);

        // Verify the reports nav link is active
        const reportsNavLink = page.locator('(//div[@class="nav-menu"]//button)[last()]');
        await expect(reportsNavLink).toHaveClass(/nav-link active/);
    });

    test('should show reports navigation is active', async ({ page }) => {
        await page.goto('/reports/all');

        // Check that the last button in nav-menu has the active class
        const activeNavLink = page.locator('(//div[@class="nav-menu"]//button)[last()]');
        await expect(activeNavLink).toBeVisible();
        await expect(activeNavLink).toHaveClass(/active/);
    });
});
