import { Page, Locator } from '@playwright/test';

export class BasePage {
    public constructor(public page: Page) {}

    public async goto(url: string): Promise<void> {
        await this.page.goto(url);
    }

    public async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
    }

    public async click(locator: Locator): Promise<void> {
        await locator.click();
    }

    public async fill(locator: Locator, text: string): Promise<void> {
        await locator.fill(text);
    }

    public async getText(locator: Locator): Promise<string> {
        return await locator.textContent() || '';
    }

    public async isVisible(locator: Locator): Promise<boolean> {
        return await locator.isVisible();
    }
}
