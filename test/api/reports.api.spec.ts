import { test, expect } from '../fixtures/test.fixtures';

test.describe('Reports API', () => {
    test('should get all reports', async ({ authenticatedApi }) => {
        const [reports, response] = await authenticatedApi.getAllReports();

        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        expect(reports).not.toBeNull();
        expect(typeof reports).toBe('object');
    });
});
