export interface QuarterReportDto {
    quarter: string;
    year: number;
    totalIncome: number;
    totalExpenses: number;
    totalTaxes: number;
}

export type ReportByQuarterDto = QuarterReportDto[];
