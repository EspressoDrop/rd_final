export interface ExpenseRecordDto {
    id: string;
    date: string;
    amount: number;
    currency: string;
    comment: string;
    cash: boolean;
}

export type ExpenseListDto = ExpenseRecordDto[];
