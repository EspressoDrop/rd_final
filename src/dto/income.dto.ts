export interface IncomeRecordDto {
    ID: string;
    Date: string;
    Income: number | string;
    Currency: string;
    Comment: string;
    Cash: boolean;
}

export type IncomeByMonthDto = Record<string, IncomeRecordDto[]>;
