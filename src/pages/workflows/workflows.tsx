import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Workflow, Plus, Filter, PlayCircle } from 'lucide-react';
import { MOCK_WORKFLOWS } from './mock-workflows';
import type { IWorkflowInstance, WorkflowInstanceStatus, WorkflowType } from '@/interfaces/workflow.interface';

const statusConfig: { [key in WorkflowInstanceStatus]: { label: string; className: string } } = {
    NOT_STARTED: { label: 'Boshlanmagan', className: 'bg-gray-100 text-gray-800' },
    IN_PROGRESS: { label: 'Bajarilmoqda', className: 'bg-blue-100 text-blue-800' },
    COMPLETED: { label: 'Yakunlangan', className: 'bg-green-100 text-green-800' },
    CANCELLED: { label: 'Bekor qilingan', className: 'bg-gray-100 text-gray-500' },
    NEEDS_ATTENTION: { label: 'E\'tibor talab', className: 'bg-yellow-100 text-yellow-800' },
};

const typeConfig: { [key in WorkflowType]: { label: string } } = {
    TENANT_REGISTRATION: { label: 'Ijarachini ro\'yxatga olish' },
    RESOURCE_ALLOCATION: { label: 'Resurs taqsimoti' },
    INSPECTOR_OVERSIGHT: { label: 'Inspektor nazorati' },
    DISPUTE_RESOLUTION: { label: 'Nizolarni hal qilish' },
    GENERAL_REPORTING: { label: 'Umumiy hisobot' },
};

const WorkflowCard = ({ instance }: { instance: IWorkflowInstance }) => {
    const progress = (instance.currentStep / instance.steps.length) * 100;
    const activeStep = instance.steps[instance.currentStep];

    return (
        <Card className="shadow-md hover:shadow-lg transition-all duration-300 flex flex-col border-l-4" style={{ borderLeftColor: statusConfig[instance.status].className.match(/bg-([a-z]+)-/)?.[0].replace('bg-','').replace('-','') || 'gray' }}>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <Badge variant="outline" className={statusConfig[instance.status].className}>{statusConfig[instance.status].label}</Badge>
                    <span className="text-xs text-gray-500">ID: {instance.id}</span>
                </div>
                <CardTitle className="mt-2 text-lg font-bold text-gray-800">{instance.title}</CardTitle>
                <CardDescription className="text-sm">{typeConfig[instance.type].label}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-medium text-gray-600">Progress</span>
                        <span className="text-xs font-bold">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                </div>
                {activeStep && (
                    <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500">Hozirgi bosqich:</p>
                        <p className="font-semibold text-sm text-gray-800">{activeStep.title}</p>
                        <div className="flex items-center gap-2 mt-2">
                            <Avatar className="w-6 h-6">
                                <AvatarImage src={activeStep.assignedTo.photo} />
                                <AvatarFallback>{activeStep.assignedTo.first_name[0]}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-gray-600">{activeStep.assignedTo.first_name} {activeStep.assignedTo.last_name}</span>
                        </div>
                    </div>
                )}
            </CardContent>
            <CardFooter className="bg-gray-50/50 p-4">
                <Button className="w-full flex items-center gap-2">
                    <PlayCircle className="h-4 w-4" />
                    Jarayonni davom ettirish
                </Button>
            </CardFooter>
        </Card>
    );
};

export default function WorkflowsPage() {
    const [workflows, setWorkflows] = useState<IWorkflowInstance[]>(MOCK_WORKFLOWS);

    return (
        <div className="p-4 md:p-8 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                            <Workflow className="text-blue-600" />
                            Ish Jarayonlari (Workflows)
                        </h1>
                        <p className="text-gray-500 mt-1">Faol jarayonlarni boshqarish va yangilarini yaratish.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline"><Filter className="h-4 w-4 mr-2" />Filter</Button>
                        <Button className="bg-blue-600 hover:bg-blue-700 shadow-md"><Plus className="h-4 w-4 mr-2" />Yangi jarayon</Button>
                    </div>
                </div>

                <Tabs defaultValue="IN_PROGRESS">
                    <TabsList className="mb-4">
                        <TabsTrigger value="IN_PROGRESS">Bajarilmoqda</TabsTrigger>
                        <TabsTrigger value="NEEDS_ATTENTION">E'tibor talab</TabsTrigger>
                        <TabsTrigger value="COMPLETED">Yakunlangan</TabsTrigger>
                        <TabsTrigger value="all">Barchasi</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {workflows.map(instance => <WorkflowCard key={instance.id} instance={instance} />)}
                        </div>
                    </TabsContent>
                    {(Object.keys(statusConfig) as WorkflowInstanceStatus[]).map(status => (
                        <TabsContent key={status} value={status}>
                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {workflows.filter(w => w.status === status).map(instance => <WorkflowCard key={instance.id} instance={instance} />)}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </div>
    );
}