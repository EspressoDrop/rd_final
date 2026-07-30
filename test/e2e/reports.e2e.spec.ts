import { test, expect } from '../fixtures/test.fixtures';

test.describe('Reports E2E', () => {
    test('should display all reports page', async ({ reportsPage, page }) => {
        await reportsPage.navigate();
        await expect(page).toHaveURL(/.*reports\/all.*/);
        expect(await reportsPage.isReportsPageLoaded()).toBeTruthy();  // ✅ Better
    });

    test('should show reports navigation is active', async ({ reportsPage, page }) => {
        await reportsPage.navigate();
        const activeNavLink = page.locator('(//div[@class="nav-menu"]//button)[last()]');
        await expect(activeNavLink).toBeVisible();
        await expect(activeNavLink).toHaveClass(/active/);
    });
});
