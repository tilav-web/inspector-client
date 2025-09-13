import type { IInspector } from "./inspector.interface";

// Asosiy turlar
export type ReportType = 'DAILY_ACTIVITY' | 'QUARTERLY' | 'INFRASTRUCTURE' | 'SOCIAL_ISSUES' | 'FINANCIAL';
export type ReportStatus = 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'REJECTED';

// Barcha hisobotlar uchun umumiy asos
export interface IReportBase {
    id: string;
    type: ReportType;
    title: string; // Masalan, "2025-09-15 Kunlik Hisoboti"
    author: IInspector; // Hisobot muallifi
    creationDate: string; // Yaratilgan sana (ISO format)
    submissionDate?: string; // Taqdim etilgan sana (ISO format)
    status: ReportStatus;
    region: string;
    district: string;
    neighborhood: string;
    rejectionReason?: string; // Agar rad etilsa, sababi
}

// 1. Kunlik Faoliyat Hisoboti
export interface IDailyActivityTask {
    description: string;
    startTime: string;
    endTime: string;
    status: 'COMPLETED' | 'PENDING' | 'CANCELLED';
    result?: string; // Natija haqida qisqa izoh
}

export interface IDailyActivityReport extends IReportBase {
    type: 'DAILY_ACTIVITY';
    tasks: IDailyActivityTask[];
    identifiedProblems: {
        description: string;
        photos: string[]; // Rasmlar uchun URL manzillari
    }[];
    recommendations: string; // Kun yakuni bo'yicha tavsiyalar
    foundationExpensesNote: string; // Jamg'arma xarajatlari haqida izoh
}

// 2. Choraklik Hisobot
export interface IQuarterlyReport extends IReportBase {
    type: 'QUARTERLY';
    period: 'Q1' | 'Q2' | 'Q3' | 'Q4';
    year: number;
    summary: {
        familyProgramResults: string; // Oilaviy dasturlar natijasi
        inspectionResults: string; // Nazorat tekshiruvlari natijasi
        socialIssuesSummary: string; // Ijtimoiy muammolar xulosasi
    };
    statistics: {
        taskCompletionPercentage: number;
        foundationSpending: number;
        resolvedFamilyDisputes: number; // Hal qilingan oilaviy nizolar soni
    };
}

// 3. Infratuzilma va Resurs Hisoboti
export interface IInfrastructureItem {
    name: string; // Masalan, "Suv nasosi" yoki "Quyosh paneli"
    inventoryId: string; // Inventar raqami yoki QR-kod
    status: 'WORKING' | 'NEEDS_REPAIR' | 'OUT_OF_SERVICE';
    lastCheckDate: string;
}

export interface IInfrastructureReport extends IReportBase {
    type: 'INFRASTRUCTURE';
    inventory: IInfrastructureItem[];
    communalAid: { // "Maxana panch" yordami
        recipientFamily: string;
        aidType: string; // Masalan, "Oziq-ovqat"
        amount: number;
    }[];
    debtors: { // Debitorlik qarzdorlari
        householdId: string;
        debtAmount: number;
    }[];
}

// 4. Ijtimoiy Muammolar Hisoboti
export interface ISocialIssueCase {
    caseId: string;
    issueType: 'FAMILY_DISPUTE' | 'YOUTH_ISSUE' | 'DOMESTIC_VIOLENCE';
    description: string;
    status: 'OPEN' | 'RESOLVED' | 'ESCALATED';
    resolution?: string;
    involvedParties: string[];
    location?: { lat: number; lng: number }; // Muammo joylashuvi xaritada
}

export interface ISocialIssuesReport extends IReportBase {
    type: 'SOCIAL_ISSUES';
    cases: ISocialIssueCase[];
}

// 5. Jamg'arma Moliyaviy Hisoboti
export interface IFinancialTransaction {
    id: string;
    date: string;
    type: 'INCOME' | 'EXPENSE';
    amount: number;
    description: string;
    category: string; // Masalan, "Hayriya", "Kommunal to'lovlar uchun yordam"
    isTargeted: boolean; // Maqsadli sarflanganmi?
}

export interface IFinancialReport extends IReportBase {
    type: 'FINANCIAL';
    openingBalance: number; // Hisobot davri boshi
    closingBalance: number; // Hisobot davri oxiri
    transactions: IFinancialTransaction[];
}

// Barcha hisobot turlarini birlashtirish
export type IReport = IDailyActivityReport | IQuarterlyReport | IInfrastructureReport | ISocialIssuesReport | IFinancialReport;
