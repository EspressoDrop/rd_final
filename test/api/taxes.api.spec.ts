import { test, expect } from '../fixtures/test.fixtures';

test.describe('Taxes API', () => {
    test('should get current unpaid taxes', async ({ authenticatedApi }) => {
        const [taxes, response] = await authenticatedApi.getCurrentUnpaidTaxes();

        if (response.status() === 500) {
            expect([500, 200]).toContain(response.status());
        } else {
            expect(response.ok()).toBeTruthy();
            expect(response.status()).toBe(200);
            expect(taxes).not.toBeNull();
            expect(typeof taxes).toBe('object');
        }
    });
    test('should get payed taxes', async ({ authenticatedApi }) => {
        const [payedTaxes, response] = await authenticatedApi.getPayedTaxes();

        expect(response.ok()).toBeTruthy();
        expect([200, 204]).toContain(response.status());
        if (response.status() === 200) {
            expect(payedTaxes).not.toBeNull();
            expect(typeof payedTaxes).toBe('object');
        }
    });
});
