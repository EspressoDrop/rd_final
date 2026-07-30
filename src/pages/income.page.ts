import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class IncomePage extends BasePage {
    private readonly addIncomeButton = this.page.locator('button[class="add-button"]');
    private readonly incomeIdInput = this.page.locator('input[name="ID"], input[id="ID"]');
    private readonly incomeDateInput = this.page.locator('input[name="Date"], input[type="date"]');
    private readonly incomeAmountInput = this.page.locator('input[id="amount"]');
    private readonly incomeCurrencySelect = this.page.locator('select[id="currency"]');
    private readonly incomeCommentInput = this.page.locator('textarea[id="comment"]');
    private readonly saveButton = this.page.locator('button[class="btn btn-primary"]');
    private readonly incomesList = this.page.locator('table tbody tr, .income-item');

    public constructor(page: Page) {
        super(page);
    }

    public async navigate(): Promise<void> {
        await this.page.goto('/incomes');
        await this.waitForPageLoad();
    }

    public async clickAddIncome(): Promise<void> {
        await this.click(this.addIncomeButton);
    }

    public async fillIncomeForm(data: {
        id?: string;
        date?: string;
        amount: string;
        currency?: string;
        comment?: string;
    }): Promise<void> {
        if (data.id) {
            await this.fill(this.incomeIdInput, data.id);
        }
        if (data.date) {
            await this.fill(this.incomeDateInput, data.date);
        }
        await this.fill(this.incomeAmountInput, data.amount);
        if (data.currency) {
            await this.incomeCurrencySelect.selectOption(data.currency);
        }
        if (data.comment) {
            await this.fill(this.incomeCommentInput, data.comment);
        }
    }

    public async saveIncome(): Promise<void> {
        await this.click(this.saveButton);
        await this.waitForPageLoad();
    }

    public async isIncomePageLoaded(): Promise<boolean> {
        return await this.isVisible(this.addIncomeButton);
    }
}
