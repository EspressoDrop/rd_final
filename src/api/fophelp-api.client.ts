import { APIResponse } from '@playwright/test';
import { IncomeByMonthDto, IncomeRecordDto } from '../dto/income.dto';
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
            Income: typeof incomeValue === 'string' ? incomeValue : incomeValue.toString(),
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
        try {
            const text = await response.text();
            if (!text) return null;
            return JSON.parse(text) as T;
        } catch {
            return null;
        }
    }

    public findIncomeByComment(incomes: IncomeByMonthDto | null, comment: string): IncomeRecordDto | undefined {
        if (!incomes) return undefined;

        for (const month in incomes) {
            const found = incomes[month].find(inc => inc.Comment === comment);
            if (found) return found;
        }

        return undefined;
    }

    public findIncomeById(incomes: IncomeByMonthDto | null, id: string): IncomeRecordDto | undefined {
        if (!incomes) return undefined;

        for (const month in incomes) {
            const found = incomes[month].find(inc => inc.ID === id);
            if (found) return found;
        }

        return undefined;
    }
}

