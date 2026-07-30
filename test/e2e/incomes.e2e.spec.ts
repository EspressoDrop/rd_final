import { test, expect } from '../fixtures/test.fixtures';

test.describe('Incomes E2E', () => {

    test('should display incomes page', async ({ incomePage }) => {
        await incomePage.navigate();

        const isIncomePageLoaded = await incomePage.isIncomePageLoaded();
        expect(isIncomePageLoaded).toBeTruthy();
    });

    test('should add a new income', async ({ incomePage, page }) => {
        await incomePage.navigate();

        const welcomeText = page.locator('span[class="welcome-text"]');
        await expect(welcomeText).toBeVisible();

        await incomePage.clickAddIncome();

        await incomePage.fillIncomeForm({
            amount: '50000',
            currency: 'UAH',
            comment: 'E2E Test Income'
        });

        await incomePage.saveIncome();

        await expect(page.locator('button[class="add-button"]')).toBeVisible();
    });
});
