import { test as base, APIRequestContext } from '@playwright/test';
import { ApiService } from '../../src/api/api.service';
import { FophelpApiClient } from '../../src/api/fophelp-api.client';
import { AuthHelper } from '../../src/helpers/auth.helper';
import { IncomePage } from '../../src/pages/income.page';
import { ReportsPage } from '../../src/pages/reports.page';

export interface TestFixtures {
    apiContext: APIRequestContext;
    authenticatedApi: FophelpApiClient;
    incomePage: IncomePage;
    reportsPage: ReportsPage;
}

export const test = base.extend<TestFixtures>({
    apiContext: async ({ playwright }, use) => {
        const context = await playwright.request.newContext();
        await use(context);
        await context.dispose();
    },

    authenticatedApi: async ({ playwright }, use) => {
        const context = await playwright.request.newContext();
        await AuthHelper.login(context);
        const apiService = new ApiService(context);
        const client = new FophelpApiClient(apiService);
        await use(client);
        await context.dispose();
    },

    incomePage: async ({ page }, use) => {
        const incomePage = new IncomePage(page);
        await use(incomePage);
    },

    reportsPage: async ({ page }, use) => {
        const reportsPage = new ReportsPage(page);
        await use(reportsPage);
    }
});

export { expect } from '@playwright/test';
