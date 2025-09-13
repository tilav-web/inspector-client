import { MOCK_INSPECTORS } from "@/const/mock.data";
import type {
  IDailyActivityReport,
  IFinancialReport,
  IQuarterlyReport,
  IReport,
} from "@/interfaces/report.interface";

const createReportBase = (
  type: IReport["type"],
  title: string,
  status: IReport["status"],
  daysAgo: number
) => {
  const creationDate = new Date();
  creationDate.setDate(creationDate.getDate() - daysAgo);

  return {
    id: crypto.randomUUID(),
    type,
    title,
    status,
    author: MOCK_INSPECTORS[Math.floor(Math.random() * MOCK_INSPECTORS.length)],
    creationDate: creationDate.toISOString(),
    submissionDate: status !== "DRAFT" ? creationDate.toISOString() : undefined,
    region: "toshkent_sh",
    district: "yunusobod",
    neighborhood: "moyqorghon",
  };
};

export const MOCK_REPORTS: IReport[] = [
  // Daily Reports
  {
    ...(createReportBase(
      "DAILY_ACTIVITY",
      "2025-09-14 Kunlik hisobot",
      "APPROVED",
      1
    ) as Omit<
      IDailyActivityReport,
      | "tasks"
      | "identifiedProblems"
      | "recommendations"
      | "foundationExpensesNote"
    >),
    type: "DAILY_ACTIVITY",
    tasks: [
      {
        description: "Mahalla maslahatlari",
        startTime: "09:00",
        endTime: "10:30",
        status: "COMPLETED",
        result: "5 ta oila bilan suhbat o'tkazildi",
      },
      {
        description: "Infratuzilma hisobi",
        startTime: "14:00",
        endTime: "15:00",
        status: "COMPLETED",
        result: "2 ta nosozlik aniqlandi",
      },
    ],
    identifiedProblems: [
      {
        description: "Ariq tozalanmagan",
        photos: ["https://via.placeholder.com/150"],
      },
    ],
    recommendations: "Obodonlashtirish bo'limiga xabar berish",
    foundationExpensesNote: "Transport uchun 20,000 so'm sarflandi",
  },
  {
    ...(createReportBase(
      "DAILY_ACTIVITY",
      "2025-09-13 Kunlik hisobot",
      "SUBMITTED",
      2
    ) as Omit<
      IDailyActivityReport,
      | "tasks"
      | "identifiedProblems"
      | "recommendations"
      | "foundationExpensesNote"
    >),
    type: "DAILY_ACTIVITY",
    tasks: [
      {
        description: "Uy-joy tekshiruvi",
        startTime: "11:00",
        endTime: "12:30",
        status: "COMPLETED",
        result: "12 ta xonadon tekshirildi",
      },
    ],
    identifiedProblems: [],
    recommendations: "Yo'q",
    foundationExpensesNote: "Sarflanmadi",
  },
  {
    ...(createReportBase(
      "DAILY_ACTIVITY",
      "2025-09-15 Kunlik hisobot",
      "DRAFT",
      0
    ) as Omit<
      IDailyActivityReport,
      | "tasks"
      | "identifiedProblems"
      | "recommendations"
      | "foundationExpensesNote"
    >),
    type: "DAILY_ACTIVITY",
    tasks: [],
    identifiedProblems: [],
    recommendations: "",
    foundationExpensesNote: "",
  },

  // Quarterly Reports
  {
    ...(createReportBase(
      "QUARTERLY",
      "2025-Q2 Choraklik hisobot",
      "APPROVED",
      80
    ) as Omit<IQuarterlyReport, "period" | "year" | "summary" | "statistics">),
    type: "QUARTERLY",
    period: "Q2",
    year: 2025,
    summary: {
      familyProgramResults: "Zakovat 10 dasturi muvaffaqiyatli o'tdi",
      inspectionResults: "120 ta tekshiruv o'tkazildi",
      socialIssuesSummary: "Oilaviy nizolar soni 15% ga kamaydi",
    },
    statistics: {
      taskCompletionPercentage: 95,
      foundationSpending: 15000000,
      resolvedFamilyDisputes: 25,
    },
  },
  {
    ...(createReportBase(
      "QUARTERLY",
      "2025-Q3 Choraklik hisobot",
      "SUBMITTED",
      5
    ) as Omit<IQuarterlyReport, "period" | "year" | "summary" | "statistics">),
    type: "QUARTERLY",
    period: "Q3",
    year: 2025,
    summary: {
      familyProgramResults: "Yangi dasturlar ishlab chiqilmoqda",
      inspectionResults: "150 ta tekshiruv rejalashtirilgan",
      socialIssuesSummary: "Yoshlar bilan ishlash kuchaytirildi",
    },
    statistics: {
      taskCompletionPercentage: 98,
      foundationSpending: 12500000,
      resolvedFamilyDisputes: 18,
    },
  },

  // Financial Reports
  {
    ...(createReportBase(
      "FINANCIAL",
      "2025-Avgust Moliyaviy hisobot",
      "REJECTED",
      15
    ) as Omit<
      IFinancialReport,
      "openingBalance" | "closingBalance" | "transactions"
    >),
    type: "FINANCIAL",
    rejectionReason: "Xarajatlar smetasi to'liq asoslantirilmagan",
    openingBalance: 5000000,
    closingBalance: 2500000,
    transactions: [
      {
        id: crypto.randomUUID(),
        date: "2025-08-05",
        type: "EXPENSE",
        amount: 2500000,
        description: "Kam ta'minlangan oilalarga yordam",
        category: "Ijtimoiy yordam",
        isTargeted: true,
      },
    ],
  },
];

// Bu mock datani boshqa fayllarda ishlatish uchun MOCK_REPORTS ni export qilamiz.
// Hozircha bu fayl faqat reports.tsx da ishlatish uchun mo'ljallangan, shuning uchun export qilmaymiz.
