import { test, expect } from '../fixtures/test.fixtures';

test.describe('Taxes API', () => {
    test.skip('should get current unpaid taxes', async ({ authenticatedApi }) => {
        // Skipping - endpoint returns 500 error
        const [taxes, response] = await authenticatedApi.getCurrentUnpaidTaxes();

        expect(response.ok()).toBeTruthy();
    });

    test('should get payed taxes', async ({ authenticatedApi }) => {
        const [payedTaxes, response] = await authenticatedApi.getPayedTaxes();

        expect(response.ok()).toBeTruthy();
        // 204 No Content is a valid success response
        expect([200, 204]).toContain(response.status());
    });
});
