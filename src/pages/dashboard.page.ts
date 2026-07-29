import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class DashboardPage extends BasePage {
    private readonly welcomeText = this.page.locator('span[class="welcome-text"]');
    private readonly incomesLink = this.page.locator('a[href*="income"], nav >> text=/income/i');
    private readonly reportsLink = this.page.locator('a[href*="report"], nav >> text=/report/i');
    private readonly taxesLink = this.page.locator('a[href*="tax"], nav >> text=/tax/i');

    public constructor(page: Page) {
        super(page);
    }

    public async navigateToIncomes(): Promise<void> {
        await this.click(this.incomesLink);
        await this.waitForPageLoad();
    }

    public async navigateToReports(): Promise<void> {
        await this.click(this.reportsLink);
        await this.waitForPageLoad();
    }

    public async navigateToTaxes(): Promise<void> {
        await this.click(this.taxesLink);
        await this.waitForPageLoad();
    }

    public async getWelcomeText(): Promise<string> {
        return await this.getText(this.welcomeText);
    }

    public async isDashboardLoaded(): Promise<boolean> {
        return await this.isVisible(this.welcomeText);
    }
}
