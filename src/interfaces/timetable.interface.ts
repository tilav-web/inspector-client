import type { IInspector } from "./inspector.interface";

// Asosiy turlar
export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
export type ShiftType = 'MORNING' | 'AFTERNOON' | 'WEEKLY' | 'QUARTERLY' | 'FLEXIBLE';
export type TaskCategory = 'BRIEFING' | 'MEETING' | 'MONITORING' | 'CONSULTATION' | 'INFRASTRUCTURE' | 'SOCIAL_AID' | 'INSPECTION' | 'OTHER';

/**
 * Yagona jadval vazifasi
 */
export interface ITimetableTask {
    id: string;
    title: string;
    description?: string;
    startTime: string; // Masalan, "08:00"
    endTime: string;   // Masalan, "08:30"
    status: TaskStatus;
    category: TaskCategory; // Vazifa turi (briefing, meeting, monitoring, etc.)
    assignedTo: IInspector; // Vazifaga mas'ul inspektor
    location?: string; // Vazifa joylashuvi (Masalan, "Mahalla markazi", "5-blok")
    relatedCitizenId?: string; // Agar vazifa fuqaroga bog'liq bo'lsa
    relatedWorkflowId?: string; // Agar vazifa workflow'ning bir qismi bo'lsa
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
}

/**
 * Kunlik jadval yozuvi (shift)
 */
export interface ITimetableEntry {
    id: string;
    date: string; // YYYY-MM-DD formatida
    shiftType: ShiftType;
    inspector: IInspector; // Bu jadval kimga tegishli
    tasks: ITimetableTask[];
    notes?: string;
}
