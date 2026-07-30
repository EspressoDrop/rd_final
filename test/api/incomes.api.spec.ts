import { IncomeRecordDto } from '../../src/dto/income.dto';
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
            Comment: `CI Test income - ${Date.now()}`
        });

        expect(response.ok(), `Expected response to be ok, but got status ${response.status()}: ${result}`).toBeTruthy();
        expect(response.status()).toBeLessThan(300);
    });

    test('should add and then delete an income', async ({ authenticatedApi }) => {
        const testComment = `DELETE-TEST-${Date.now()}`;
        const [addResult, addResponse] = await authenticatedApi.addIncome({
            Income: 25000,
            Currency: 'UAH',
            Comment: testComment
        });

        expect(addResponse.ok(), `Failed to add income: ${addResponse.status()} - ${addResult}`).toBeTruthy();

        const [incomes] = await authenticatedApi.getIncomes();

        const addedIncome = authenticatedApi.findIncomeByComment(incomes, testComment);

        expect(addedIncome, 'Added income not found in the list').toBeDefined();

        if (addedIncome) {
            const [, deleteResponse] = await authenticatedApi.deleteIncome(addedIncome);
            expect(deleteResponse.ok(), `Failed to delete income: ${deleteResponse.status()}`).toBeTruthy();
        }
    });

    test('should update an existing income', async ({ authenticatedApi }) => {
        const testComment = `UPDATE-TEST-${Date.now()}`;
        const [, addResponse] = await authenticatedApi.addIncome({
            Income: 30000,
            Currency: 'UAH',
            Comment: testComment
        });

        expect(addResponse.ok()).toBeTruthy();

        const [incomes] = await authenticatedApi.getIncomes();

        const addedIncome = authenticatedApi.findIncomeByComment(incomes, testComment);

        expect(addedIncome, 'Added income not found').toBeDefined();

        if (addedIncome) {
            const updatedIncome = {
                ...addedIncome,
                Income: '35000',
                Comment: 'Updated comment'
            };

            const [, updateResponse] = await authenticatedApi.updateIncome(updatedIncome);
            expect(updateResponse.ok(), `Failed to update income: ${updateResponse.status()}`).toBeTruthy();

            const [updatedIncomes] = await authenticatedApi.getIncomes();

            const verifyIncome = authenticatedApi.findIncomeById(updatedIncomes, addedIncome.ID);
            expect(verifyIncome).toBeDefined();
            expect(verifyIncome?.Comment).toBe('Updated comment');
            expect(verifyIncome?.Income).toBe(35000);
        }
    });

    test('should reject invalid income amount', async ({ authenticatedApi }) => {
        const [, response] = await authenticatedApi.addIncome({
            Income: -5000,
            Currency: 'UAH',
            Comment: 'Invalid'
        });
        expect(response.ok()).toBe(false);
    });

    test('should handle non-existent income deletion', async ({ authenticatedApi }) => {
        const fakeIncome: IncomeRecordDto = {
            ID: 'nonexistent-id',
            Date: new Date().toISOString(),
            Income: 0,
            Currency: 'UAH',
            Comment: 'fake',
            Cash: false
        };
        const [, response] = await authenticatedApi.deleteIncome(fakeIncome);
        expect(response.ok()).toBe(false);
    });
});
