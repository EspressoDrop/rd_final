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

        // Log response details for debugging
        if (!response.ok()) {
            console.log('Response status:', response.status());
            console.log('Response body:', result);
        }

        expect(response.ok(), `Expected response to be ok, but got status ${response.status()}: ${result}`).toBeTruthy();
        expect(response.status()).toBeLessThan(300);
    });

    test('should add and then delete an income', async ({ authenticatedApi }) => {
        // First, add an income with today's date
        const testComment = `DELETE-TEST-${Date.now()}`;
        const [addResult, addResponse] = await authenticatedApi.addIncome({
            Income: 25000,
            Currency: 'UAH',
            Comment: testComment
        });

        expect(addResponse.ok(), `Failed to add income: ${addResponse.status()} - ${addResult}`).toBeTruthy();

        // Get all incomes to find the one we just added
        const [incomes] = await authenticatedApi.getIncomes();

        // IncomeByMonthDto is Record<string, IncomeRecordDto[]>, so we need to search through all months
        let addedIncome;
        if (incomes) {
            for (const month in incomes) {
                addedIncome = incomes[month].find(inc => inc.Comment === testComment);
                if (addedIncome) break;
            }
        }

        expect(addedIncome, 'Added income not found in the list').toBeDefined();

        // Now delete it
        if (addedIncome) {
            const [, deleteResponse] = await authenticatedApi.deleteIncome(addedIncome);
            expect(deleteResponse.ok(), `Failed to delete income: ${deleteResponse.status()}`).toBeTruthy();
        }
    });

    test('should update an existing income', async ({ authenticatedApi }) => {
        // First, add an income with unique comment
        const testComment = `UPDATE-TEST-${Date.now()}`;
        const [, addResponse] = await authenticatedApi.addIncome({
            Income: 30000,
            Currency: 'UAH',
            Comment: testComment
        });

        expect(addResponse.ok()).toBeTruthy();

        // Get all incomes to find the one we just added
        const [incomes] = await authenticatedApi.getIncomes();

        // Search through all months to find the added income
        let addedIncome;
        if (incomes) {
            for (const month in incomes) {
                addedIncome = incomes[month].find(inc => inc.Comment === testComment);
                if (addedIncome) break;
            }
        }

        expect(addedIncome, 'Added income not found').toBeDefined();

        if (addedIncome) {
            // Update the income
            const updatedIncome = {
                ...addedIncome,
                Income: '35000',
                Comment: 'Updated comment'
            };

            const [, updateResponse] = await authenticatedApi.updateIncome(updatedIncome);
            expect(updateResponse.ok(), `Failed to update income: ${updateResponse.status()}`).toBeTruthy();

            // Verify the update
            const [updatedIncomes] = await authenticatedApi.getIncomes();

            // Search for the updated income
            let verifyIncome;
            if (updatedIncomes) {
                for (const month in updatedIncomes) {
                    verifyIncome = updatedIncomes[month].find(inc => inc.ID === addedIncome.ID);
                    if (verifyIncome) break;
                }
            }

            expect(verifyIncome?.Comment).toBe('Updated comment');
        }
    });
});
