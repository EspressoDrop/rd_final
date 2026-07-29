export interface IncomeTaxesRecordDto {
    ID: string;
    Date: string;
    Incomes: number;
    Expenses: number;
    FlatTax: number;
    SSP: number;
    VAT: number;
    Comment: string;
    Payed: boolean;
}

export type IncomeTaxesDto = IncomeTaxesRecordDto[];
