import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class ReportsPage extends BasePage {
    private readonly pageTitle = this.page.locator('h1, h2').first();
    private readonly reportsTable = this.page.locator('table');
    private readonly reportRows = this.page.locator('table tbody tr');

    public constructor(page: Page) {
        super(page);
    }

    public async navigate(): Promise<void> {
        await this.page.goto('/reports/all');
        await this.waitForPageLoad();
    }

    public async isReportsPageLoaded(): Promise<boolean> {
        return await this.isVisible(this.pageTitle);
    }
}
