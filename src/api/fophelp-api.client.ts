import { APIResponse } from '@playwright/test';
import { IncomeByMonthDto, IncomeRecordDto } from '../dto/income.dto';
import { ExpenseListDto, ExpenseRecordDto } from '../dto/expense.dto';
import { IncomeTaxesDto, IncomeTaxesRecordDto } from '../dto/taxes.dto';
import { ReportByQuarterDto } from '../dto/report.dto';
import { ApiService } from './api.service';
import { config } from '../config/env.config';

export class FophelpApiClient {
    private baseURL = config.apiBaseURL;

    public constructor(private apiService: ApiService) {}

    public async getIncomes(): Promise<[IncomeByMonthDto | null, APIResponse]> {
        const response = await this.apiService.get(`${this.baseURL}/incomes`);
        const bodyJson = await this.safeJsonParse<IncomeByMonthDto>(response);
        return [bodyJson, response];
    }

    public async addIncome(income: Partial<IncomeRecordDto>): Promise<[string, APIResponse]> {
        const incomeValue = income.Income || 10000;
        const body = {
            ID: income.ID || `ID-${Math.floor(Math.random() * 100000)}`,
            Date: income.Date || new Date().toISOString().split('T')[0],
            Income: typeof incomeValue === 'string' ? parseFloat(incomeValue) : incomeValue,
            Currency: income.Currency || 'UAH',
            Comment: income.Comment || `autotest-${Date.now()}`,
            Cash: income.Cash ?? true
        };

        const response = await this.apiService.post(`${this.baseURL}/incomes/add`, body);
        const bodyJson = await response.text();
        return [bodyJson, response];
    }

    public async updateIncome(income: IncomeRecordDto): Promise<[IncomeRecordDto | null, APIResponse]> {
        const response = await this.apiService.post(`${this.baseURL}/incomes/update`, income);
        const bodyJson = await this.safeJsonParse<IncomeRecordDto>(response);
        return [bodyJson, response];
    }

    public async deleteIncome(income: IncomeRecordDto): Promise<[IncomeRecordDto | null, APIResponse]> {
        const body = {
            ID: income.ID,
            Date: income.Date.split('T')[0],
            Income: income.Income.toString(),
            Currency: income.Currency,
            Comment: income.Comment,
            Cash: income.Cash
        };

        const response = await this.apiService.delete(`${this.baseURL}/incomes/delete`, body);
        const bodyJson = await this.safeJsonParse<IncomeRecordDto>(response);
        return [bodyJson, response];
    }

    public async getExpenses(): Promise<[ExpenseListDto | null, APIResponse]> {
        const response = await this.apiService.get(`${this.baseURL}/expenses`);
        const bodyJson = await this.safeJsonParse<ExpenseListDto>(response);
        return [bodyJson, response];
    }

    public async deleteExpense(expenseId: string): Promise<APIResponse> {
        return await this.apiService.delete(`${this.baseURL}/expenses/delete`, { id: expenseId });
    }

    public async getCurrentUnpaidTaxes(): Promise<[IncomeTaxesDto | null, APIResponse]> {
        const response = await this.apiService.get(`${this.baseURL}/taxes`);
        const bodyJson = await this.safeJsonParse<IncomeTaxesDto>(response);
        return [bodyJson, response];
    }

    public async getPayedTaxes(): Promise<[IncomeTaxesDto | null, APIResponse]> {
        const response = await this.apiService.get(`${this.baseURL}/taxes/payed`);
        const bodyJson = await this.safeJsonParse<IncomeTaxesDto>(response);
        return [bodyJson, response];
    }

    public async payTax(tax: IncomeTaxesRecordDto): Promise<[string, APIResponse]> {
        const generatedComment = `paid-${Date.now()}`;
        const body: IncomeTaxesRecordDto = {
            ...tax,
            Comment: generatedComment
        };

        const response = await this.apiService.post(`${this.baseURL}/taxes/pay`, body);
        return [generatedComment, response];
    }

    public async getTaxesReports(): Promise<[IncomeTaxesDto | null, APIResponse]> {
        const response = await this.apiService.get(`${this.baseURL}/reports/taxes`);
        const bodyJson = await this.safeJsonParse<IncomeTaxesDto>(response);
        return [bodyJson, response];
    }

    public async getAllReports(): Promise<[ReportByQuarterDto | null, APIResponse]> {
        const response = await this.apiService.get(`${this.baseURL}/reports/all`);
        const bodyJson = await this.safeJsonParse<ReportByQuarterDto>(response);
        return [bodyJson, response];
    }

    private async safeJsonParse<T>(response: APIResponse): Promise<T | null> {
        const contentType = response.headers()['content-type'] ?? '';

        try {
            if (contentType.includes('application/json')) {
                const parsed = await response.json();
                if (typeof parsed === 'string') {
                    return JSON.parse(parsed) as T;
                } else {
                    return parsed as T;
                }
            } else {
                const textBody = await response.text();

                // If response is plain text (like "Successful"), don't try to parse as JSON
                if (!textBody.trim().startsWith('{') && !textBody.trim().startsWith('[')) {
                    console.warn('Response is not JSON:', textBody);
                    return null;
                }

                return JSON.parse(textBody) as T;
            }
        } catch (error) {
            console.error('JSON parsing error:', error);
            return null;
        }
    }
}
