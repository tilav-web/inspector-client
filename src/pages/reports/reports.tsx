import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Plus, Filter, MoreHorizontal } from 'lucide-react';
import { MOCK_REPORTS } from './mock-reports'; // Test ma'lumotlarini import qilish
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import type { IReport, ReportStatus, ReportType } from '@/interfaces/report.interface';

const statusConfig: { [key in ReportStatus]: { label: string; className: string } } = {
    DRAFT: { label: 'Qoralama', className: 'bg-gray-100 text-gray-800 border-gray-300' },
    SUBMITTED: { label: 'Yuborilgan', className: 'bg-blue-100 text-blue-800 border-blue-300' },
    APPROVED: { label: 'Tasdiqlangan', className: 'bg-green-100 text-green-800 border-green-300' },
    REJECTED: { label: 'Rad etilgan', className: 'bg-red-100 text-red-800 border-red-300' },
};

const typeConfig: { [key in ReportType]: { label: string } } = {
    DAILY_ACTIVITY: { label: 'Kunlik faoliyat' },
    QUARTERLY: { label: 'Choraklik' },
    INFRASTRUCTURE: { label: 'Infratuzilma' },
    SOCIAL_ISSUES: { label: 'Ijtimoiy muammolar' },
    FINANCIAL: { label: 'Moliyaviy' },
};

const ReportCard = ({ report }: { report: IReport }) => (
    <Card className="shadow-md hover:shadow-xl transition-all duration-300 flex flex-col">
        <CardHeader>
            <div className="flex justify-between items-start">
                <div>
                    <Badge variant="outline" className={statusConfig[report.status].className}>{statusConfig[report.status].label}</Badge>
                    <CardTitle className="mt-2 text-lg font-bold text-gray-800">{report.title}</CardTitle>
                    <CardDescription className="text-sm">{typeConfig[report.type].label} hisoboti</CardDescription>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>Ko'rish</DropdownMenuItem>
                        <DropdownMenuItem>Tahrirlash</DropdownMenuItem>
                        <DropdownMenuItem>Eksport (PDF)</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500">O'chirish</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </CardHeader>
        <CardContent className="flex-grow">
            <div className="text-sm text-gray-600 space-y-2">
                <p><strong>Muallif:</strong> {report.author.first_name} {report.author.last_name}</p>
                <p><strong>Sana:</strong> {new Date(report.creationDate).toLocaleDateString()}</p>
            </div>
        </CardContent>
        <CardFooter className="bg-gray-50 p-4">
            <Button className="w-full" variant="outline">Batafsil ko'rish</Button>
        </CardFooter>
    </Card>
);

export default function ReportsPage() {
    const [reports, setReports] = useState<IReport[]>(MOCK_REPORTS);

    return (
        <div className="p-4 md:p-8 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                            <FileText className="text-blue-600" />
                            Hisobotlar Boshqaruvi
                        </h1>
                        <p className="text-gray-500 mt-1">Mavjud hisobotlarni ko'rish, yaratish va boshqarish.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline"><Filter className="h-4 w-4 mr-2" />Filter</Button>
                        <Button className="bg-blue-600 hover:bg-blue-700 shadow-md"><Plus className="h-4 w-4 mr-2" />Yangi hisobot</Button>
                    </div>
                </div>

                <Tabs defaultValue="all">
                    <TabsList className="mb-4">
                        <TabsTrigger value="all">Barchasi</TabsTrigger>
                        <TabsTrigger value="DAILY_ACTIVITY">Kunlik</TabsTrigger>
                        <TabsTrigger value="QUARTERLY">Choraklik</TabsTrigger>
                        <TabsTrigger value="FINANCIAL">Moliyaviy</TabsTrigger>
                        <TabsTrigger value="DRAFT">Qoralamalar</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {reports.map(report => <ReportCard key={report.id} report={report} />)}
                        </div>
                    </TabsContent>
                    {Object.keys(typeConfig).map(type => (
                        <TabsContent key={type} value={type}>
                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {reports.filter(r => r.type === type).map(report => <ReportCard key={report.id} report={report} />)}
                            </div>
                        </TabsContent>
                    ))}
                     <TabsContent value="DRAFT">
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {reports.filter(r => r.status === 'DRAFT').map(report => <ReportCard key={report.id} report={report} />)}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}