import { type IInspector } from './inspector.interface';
import { type ICitizen } from './citizen.interface';
import { type IReport } from './report.interface';

// Asosiy turlar
export type WorkflowType = 'TENANT_REGISTRATION' | 'RESOURCE_ALLOCATION' | 'INSPECTOR_OVERSIGHT' | 'DISPUTE_RESOLUTION' | 'GENERAL_REPORTING';
export type WorkflowInstanceStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'NEEDS_ATTENTION';
export type WorkflowStepStatus = 'PENDING' | 'ACTIVE' | 'COMPLETED' | 'SKIPPED' | 'FAILED';

/**
 * Workflow ichidagi bitta bosqich (qadam)
 */
export interface IWorkflowStep {
    id: string;
    title: string; // Masalan, "Hujjatlarni tekshirish"
    description: string;
    status: WorkflowStepStatus;
    assignedTo: IInspector; // Bosqichga mas'ul xodim
    dueDate?: string; // Bajarishning oxirgi muddati
    completedDate?: string; // Bajarilgan sana
    data?: Record<string, any>; // Shu bosqichga oid ma'lumotlar (masalan, yuklangan fayllar ro'yxati)
}

/**
 * Ishga tushirilgan workflow nusxasi (instance)
 */
export interface IWorkflowInstance {
    id: string;
    type: WorkflowType;
    title: string; // Masalan, "A. Alimovni ijaraga ro'yxatga olish"
    description: string;
    status: WorkflowInstanceStatus;
    initiator: IInspector | ICitizen; // Jarayonni boshlovchi
    startDate: string;
    endDate?: string;
    currentStep: number; // `steps` massividagi faol bosqich indeksi
    steps: IWorkflowStep[];
    relatedCitizen?: ICitizen; // Jarayon bog'liq bo'lgan fuqaro
    relatedReport?: IReport; // Jarayon yakunida yaratiladigan hisobot
}
