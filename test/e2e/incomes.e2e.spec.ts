import { test, expect } from '../fixtures/test.fixtures';

test.describe('Incomes E2E', () => {
    // All tests use authenticated state from global-setup.ts

    test('should display incomes page', async ({ incomePage }) => {
        await incomePage.navigate();

        const isIncomePageLoaded = await incomePage.isIncomePageLoaded();
        expect(isIncomePageLoaded).toBeTruthy();
    });

    test('should add a new income', async ({ incomePage, page }) => {
        await incomePage.navigate();

        // Verify we're logged in (not in demo mode)
        const welcomeText = page.locator('span[class="welcome-text"]');
        await expect(welcomeText).toBeVisible();

        // Click add income button
        await incomePage.clickAddIncome();

        // Fill the form
        await incomePage.fillIncomeForm({
            amount: '50000',
            currency: 'UAH',
            comment: 'E2E Test Income'
        });

        // Save
        await incomePage.saveIncome();

        // Verify we're back on the incomes page (form closed)
        await expect(page.locator('button[class="add-button"]')).toBeVisible();
    });
});
