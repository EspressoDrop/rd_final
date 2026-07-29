import { test as base, APIRequestContext, Page } from '@playwright/test';
import { ApiService } from '../../src/api/api.service';
import { FophelpApiClient } from '../../src/api/fophelp-api.client';
import { AuthHelper } from '../../src/helpers/auth.helper';
import { LoginPage } from '../../src/pages/login.page';
import { DashboardPage } from '../../src/pages/dashboard.page';
import { IncomePage } from '../../src/pages/income.page';
import { ReportsPage } from '../../src/pages/reports.page';

type TestFixtures = {
    apiContext: APIRequestContext;
    apiService: ApiService;
    fophelpApi: FophelpApiClient;
    authenticatedApi: FophelpApiClient;
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    incomePage: IncomePage;
    reportsPage: ReportsPage;
};

export const test = base.extend<TestFixtures>({
    apiContext: async ({ playwright }, use) => {
        const context = await playwright.request.newContext();
        await use(context);
        await context.dispose();
    },

    apiService: async ({ apiContext }, use) => {
        const service = new ApiService(apiContext);
        await use(service);
    },

    fophelpApi: async ({ apiService }, use) => {
        const client = new FophelpApiClient(apiService);
        await use(client);
    },

    authenticatedApi: async ({ playwright }, use) => {
        const context = await playwright.request.newContext();
        await AuthHelper.login(context);
        const apiService = new ApiService(context);
        const client = new FophelpApiClient(apiService);
        await use(client);
        await context.dispose();
    },

    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    dashboardPage: async ({ page }, use) => {
        const dashboardPage = new DashboardPage(page);
        await use(dashboardPage);
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
