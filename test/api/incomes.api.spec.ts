import { test, expect } from '../fixtures/test.fixtures';

test.describe('Incomes API', () => {
    test('should get all incomes', async ({ authenticatedApi }) => {
        const [incomes, response] = await authenticatedApi.getIncomes();

        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        expect(incomes).not.toBeNull();
        expect(typeof incomes).toBe('object');
    });

    test('should add a new income', async ({ authenticatedApi }) => {
        const [result, response] = await authenticatedApi.addIncome({
            Income: 50000,
            Currency: 'UAH',
            Comment: 'Test income'
        });

        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBeLessThan(300);
    });

    test.skip('should add and then delete an income', async ({ authenticatedApi }) => {
        const [, addResponse] = await authenticatedApi.addIncome({
            ID: `TEST-${Date.now()}`,
            Income: 25000,
            Currency: 'UAH',
            Comment: 'Income to be deleted'
        });

        expect(addResponse.ok()).toBeTruthy();
    });

    test.skip('should update an existing income', async ({ authenticatedApi }) => {
        const testId = `TEST-${Date.now()}`;
        await authenticatedApi.addIncome({
            ID: testId,
            Income: 30000,
            Currency: 'UAH',
            Comment: 'Original comment'
        });
    });
});
