import { chromium } from '@playwright/test';
import { config as envConfig } from '../src/config/env.config';

async function globalSetup(): Promise<void> {
    console.log('🔐 Global Setup: Logging in and saving authentication state...');

    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto('https://new.fophelp.pro');

    // Click login button
    await page.locator('button[class="nav-button signin-button"]').click();
    await page.waitForTimeout(500);

    // Fill and submit login form
    await page.locator('input[id="login-email"]').fill(envConfig.testUser.username);
    await page.locator('input[id="login-password"]').fill(envConfig.testUser.password);
    await page.locator('button[type="submit"]').click();

    // Wait for login to complete
    await page.locator('span[class="welcome-text"]').waitFor({ timeout: 10000 });

    console.log('✅ Login successful!');

    // Save the authenticated state (cookies, localStorage, etc.)
    await page.context().storageState({ path: 'test/.auth/user.json' });
    console.log('✅ Saved authentication state to test/.auth/user.json');

    await browser.close();
}

export default globalSetup;
