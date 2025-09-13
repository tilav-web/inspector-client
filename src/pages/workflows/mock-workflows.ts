import { MOCK_CITIZENS, MOCK_INSPECTORS } from "@/const/mock.data";
import type { IWorkflowInstance, IWorkflowStep } from "@/interfaces/workflow.interface";

const createWorkflowSteps = (titles: string[], activeIndex: number): IWorkflowStep[] => {
    return titles.map((title, index) => ({
        id: crypto.randomUUID(),
        title,
        description: `${title} bosqichining tavsifi.`, 
        status: index < activeIndex ? 'COMPLETED' : (index === activeIndex ? 'ACTIVE' : 'PENDING'),
        assignedTo: MOCK_INSPECTORS[index % MOCK_INSPECTORS.length],
        completedDate: index < activeIndex ? new Date().toISOString() : undefined,
    }));
};

export const MOCK_WORKFLOWS: IWorkflowInstance[] = [
    {
        id: 'wf-1',
        type: 'TENANT_REGISTRATION',
        title: `Ijarachi ${MOCK_CITIZENS[10].first_name}ni ro'yxatga olish`,
        description: 'Yangi ijarachini uy-joy fondiga kiritish jarayoni.',
        status: 'IN_PROGRESS',
        initiator: MOCK_INSPECTORS[2],
        startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 kun avval
        currentStep: 1,
        steps: createWorkflowSteps(['Ariza qabul qilish', 'Hujjatlarni tekshirish', 'Vazirlikka yuborish', 'Ro\'yxatga olish'], 1),
        relatedCitizen: MOCK_CITIZENS[10],
    },
    {
        id: 'wf-2',
        type: 'RESOURCE_ALLOCATION',
        title: 'Qo\'shimcha ko\'mir resursini taqsimlash',
        description: "Qish mavsumi uchun kam ta'minlangan oilalarga ko'mir ajratish.",
        status: 'NEEDS_ATTENTION',
        initiator: MOCK_INSPECTORS[1],
        startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        currentStep: 2,
        steps: createWorkflowSteps(['Ehtiyojni baholash', 'Inventar tekshiruvi', 'Taqsimot rejasi', 'Hisobot'], 2),
    },
    {
        id: 'wf-3',
        type: 'INSPECTOR_OVERSIGHT',
        title: 'Haftalik profilaktik tekshiruv',
        description: "Mahalladagi nosozliklar va ijtimoiy holatni o'rganish.",
        status: 'COMPLETED',
        initiator: MOCK_INSPECTORS[3],
        startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        endDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        currentStep: 3,
        steps: createWorkflowSteps(['Vazifa tayinlash', 'Dala tekshiruvi', 'Natijalarni kiritish', 'Yakunlash'], 4),
    },
    {
        id: 'wf-4',
        type: 'DISPUTE_RESOLUTION',
        title: 'Qo\'shnilar o\'rtasidagi nizo',
        description: "25 va 26-xonadonlar o'rtasidagi umumiy yo'lakdan foydalanish bo'yicha nizo.",
        status: 'IN_PROGRESS',
        initiator: MOCK_CITIZENS[5],
        startDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        currentStep: 0,
        steps: createWorkflowSteps(['Shikoyatni qabul qilish', 'Mediatorlik uchrashuvi', 'Qaror qabul qilish'], 0),
    },
];
