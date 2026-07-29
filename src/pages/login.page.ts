import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { config } from '../config/env.config';

export class LoginPage extends BasePage {
    private readonly loginLink = this.page.locator('button[class="nav-button signin-button"]');
    private readonly usernameInput = this.page.locator('input[id="login-email"]');
    private readonly passwordInput = this.page.locator('input[id="login-password"]');
    private readonly submitButton = this.page.locator('button[type="submit"]');

    public constructor(page: Page) {
        super(page);
    }

    public async navigate(): Promise<void> {
        await this.goto(config.baseURL);
    }

    public async clickLoginLink(): Promise<void> {
        await this.click(this.loginLink);
        await this.page.waitForTimeout(500); // Wait for form to appear
    }

    public async login(username?: string, password?: string): Promise<void> {
        // First click login link to show the form
        await this.clickLoginLink();

        // Then fill and submit
        await this.fill(this.usernameInput, username || config.testUser.username);
        await this.fill(this.passwordInput, password || config.testUser.password);
        await this.click(this.submitButton);
        await this.waitForPageLoad();
    }

    public async isLoginFormVisible(): Promise<boolean> {
        // Check if login link is visible OR form is already visible
        const isLinkVisible = await this.loginLink.isVisible().catch(() => false);
        const isFormVisible = await this.usernameInput.isVisible().catch(() => false);
        return isLinkVisible || isFormVisible;
    }
}
