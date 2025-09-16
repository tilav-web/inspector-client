import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MOCK_REPORTS } from "./mock-reports"; // Test ma'lumotlarini import qilish
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type {
  IReport,
  ReportStatus,
  ReportType,
} from "@/interfaces/report.interface";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";
import {
  FileText,
  Download,
  TrendingUp,
  TrendingDown,
  Users,
  CheckCircle,
  Clock,
  AlertTriangle,
  MapPin,
  BarChart3,
  PieChartIcon,
  Plus,
  Filter,
  MoreHorizontal,
} from "lucide-react";

const statusConfig: {
  [key in ReportStatus]: { label: string; className: string };
} = {
  DRAFT: {
    label: "Qoralama",
    className: "bg-gray-100 text-gray-800 border-gray-300",
  },
  SUBMITTED: {
    label: "Yuborilgan",
    className: "bg-blue-100 text-blue-800 border-blue-300",
  },
  APPROVED: {
    label: "Tasdiqlangan",
    className: "bg-green-100 text-green-800 border-green-300",
  },
  REJECTED: {
    label: "Rad etilgan",
    className: "bg-red-100 text-red-800 border-red-300",
  },
};

const typeConfig: { [key in ReportType]: { label: string } } = {
  DAILY_ACTIVITY: { label: "Kunlik faoliyat" },
  QUARTERLY: { label: "Choraklik" },
  INFRASTRUCTURE: { label: "Infratuzilma" },
  SOCIAL_ISSUES: { label: "Ijtimoiy muammolar" },
  FINANCIAL: { label: "Moliyaviy" },
};

const ReportCard = ({ report }: { report: IReport }) => (
  <Card className="shadow-md hover:shadow-xl transition-all duration-300 flex flex-col">
    <CardHeader>
      <div className="flex justify-between items-start">
        <div>
          <Badge
            variant="outline"
            className={statusConfig[report.status].className}
          >
            {statusConfig[report.status].label}
          </Badge>
          <CardTitle className="mt-2 text-lg font-bold text-gray-800">
            {report.title}
          </CardTitle>
          <CardDescription className="text-sm">
            {typeConfig[report.type].label} hisoboti
          </CardDescription>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Ko'rish</DropdownMenuItem>
            <DropdownMenuItem>Tahrirlash</DropdownMenuItem>
            <DropdownMenuItem>Eksport (PDF)</DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">
              O'chirish
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </CardHeader>
    <CardContent className="flex-grow">
      <div className="text-sm text-gray-600 space-y-2">
        <p>
          <strong>Muallif:</strong> {report.author.first_name}{" "}
          {report.author.last_name}
        </p>
        <p>
          <strong>Sana:</strong>{" "}
          {new Date(report.creationDate).toLocaleDateString()}
        </p>
      </div>
    </CardContent>
    <CardFooter className="bg-gray-50 p-4">
      <Button className="w-full" variant="outline">
        Batafsil ko'rish
      </Button>
    </CardFooter>
  </Card>
);

export default function ReportsPage() {
  const [reports] = useState<IReport[]>(MOCK_REPORTS);
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for charts and analytics
  const taskCompletionData = [
    { name: "Dush", completed: 12, pending: 3, total: 15 },
    { name: "Sesh", completed: 15, pending: 2, total: 17 },
    { name: "Chor", completed: 8, pending: 5, total: 13 },
    { name: "Pay", completed: 18, pending: 1, total: 19 },
    { name: "Jum", completed: 14, pending: 4, total: 18 },
    { name: "Shan", completed: 6, pending: 2, total: 8 },
    { name: "Yak", completed: 4, pending: 1, total: 5 },
  ];

  const workflowTypeData = [
    { name: "Fuqaro ro'yxatdan o'tkazish", value: 35, color: "#059669" },
    { name: "Resurs taqsimlash", value: 25, color: "#10b981" },
    { name: "Infratuzilma tekshiruvi", value: 20, color: "#34d399" },
    { name: "Nizolarni hal qilish", value: 15, color: "#6ee7b7" },
    { name: "Hisobot berish", value: 5, color: "#a7f3d0" },
  ];

  const monthlyTrendsData = [
    { month: "Okt", workflows: 45, residents: 1200, inspections: 28 },
    { month: "Noy", workflows: 52, residents: 1235, inspections: 31 },
    { month: "Dek", workflows: 48, residents: 1247, inspections: 29 },
    { month: "Yan", workflows: 58, residents: 1268, inspections: 35 },
  ];

  const performanceMetrics = [
    {
      title: "Vazifa bajarish darajasi",
      value: "94.2%",
      change: "+2.1%",
      trend: "up",
      description: "Vaqtida bajarilgan vazifalar",
    },
    {
      title: "O'rtacha javob berish vaqti",
      value: "2.3s",
      change: "-0.5s",
      trend: "up",
      description: "So'rovlarga javob berish vaqti",
    },
    {
      title: "Fuqaro qoniqish darajasi",
      value: "4.6/5",
      change: "+0.2",
      trend: "up",
      description: "O'rtacha qoniqish bahosi",
    },
    {
      title: "Ish jarayoni samaradorligi",
      value: "87%",
      change: "-1.2%",
      trend: "down",
      description: "SLA doirasida yakunlangan ish jarayonlari",
    },
  ];

  const recentReports = [
    {
      id: "RPT001",
      title: "Weekly Task Summary",
      type: "Task Report",
      generatedDate: "2024-01-15",
      status: "completed",
      size: "2.3 MB",
    },
    {
      id: "RPT002",
      title: "Monthly Workflow Analysis",
      type: "Workflow Report",
      generatedDate: "2024-01-10",
      status: "completed",
      size: "4.1 MB",
    },
    {
      id: "RPT003",
      title: "Resident Services Overview",
      type: "Service Report",
      generatedDate: "2024-01-08",
      status: "completed",
      size: "1.8 MB",
    },
    {
      id: "RPT004",
      title: "Infrastructure Inspection Summary",
      type: "Inspection Report",
      generatedDate: "2024-01-05",
      status: "processing",
      size: "3.2 MB",
    },
  ];

  return (
    <div>
      <div className="bg-background">
        <div className="p-6 space-y-6">
                      <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <FileText className="text-blue-600" />
                Hisobotlar Boshqaruvi
              </h1>
              <p className="text-gray-500 mt-1">
                Mavjud hisobotlarni ko'rish, yaratish va boshqarish.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 shadow-md">
                <Plus className="h-4 w-4 mr-2" />
                Yangi hisobot
              </Button>
            </div>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">Samaradorlik ko'rinishi</TabsTrigger>
              <TabsTrigger value="analytics">Batafsil tahlil</TabsTrigger>
              <TabsTrigger value="reports">Yaratilgan hisobotlar</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* KPI Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {performanceMetrics.map((metric, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground">
                            {metric.title}
                          </p>
                          {metric.trend === "up" ? (
                            <TrendingUp className="w-4 h-4 text-green-500" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-red-500" />
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <p className="text-2xl font-bold">{metric.value}</p>
                          <Badge
                            variant={
                              metric.trend === "up" ? "default" : "destructive"
                            }
                            className="text-xs"
                          >
                            {metric.change}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {metric.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Charts Row */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Task Completion Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Haftalik vazifa bajarish
                    </CardTitle>
                    <CardDescription>
                      Kunlik bajarilgan va kutilayotgan vazifalar
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={taskCompletionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar
                          dataKey="completed"
                          fill="#059669"
                          name="Bajarilgan"
                        />
                        <Bar dataKey="pending" fill="#f59e0b" name="Kutilayotgan" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Workflow Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChartIcon className="w-5 h-5" />
                      Ish jarayoni taqsimoti
                    </CardTitle>
                    <CardDescription>
                      Bu oydagi ish jarayoni turlari bo'yicha taqsimot
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={workflowTypeData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, percent }: { name: string; percent: number }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {workflowTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Monthly Trends */}
              <Card>
                <CardHeader>
                  <CardTitle>Oylik tendentsiyalar</CardTitle>
                  <CardDescription>
                    Oxirgi 4 oy davomidagi asosiy ko'rsatkichlar
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyTrendsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="workflows"
                        stroke="#059669"
                        name="Ish jarayonlari"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="residents"
                        stroke="#10b981"
                        name="Faol fuqarolar"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="inspections"
                        stroke="#34d399"
                        name="Tekshiruvlar"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              {/* Detailed Analytics */}
              <div className="grid lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Vazifa bajarish tahlili</CardTitle>
                    <CardDescription>
                      Vazifa bajarish naqshlarining batafsil tahlili
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <AreaChart data={taskCompletionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="total"
                          stackId="1"
                          stroke="#059669"
                          fill="#059669"
                          fillOpacity={0.6}
                        />
                        <Area
                          type="monotone"
                          dataKey="completed"
                          stackId="2"
                          stroke="#10b981"
                          fill="#10b981"
                          fillOpacity={0.8}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Inspektor samaradorligi
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Inspector Nazarov</span>
                          <span>95%</span>
                        </div>
                        <Progress value={95} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Inspector Umarov</span>
                          <span>88%</span>
                        </div>
                        <Progress value={88} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Inspector Tashkent</span>
                          <span>92%</span>
                        </div>
                        <Progress value={92} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Inspector Alimov</span>
                          <span>85%</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Xizmat turlari
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-blue-500" />
                          <span className="text-sm">Uy-joy xizmatlari</span>
                        </div>
                        <span className="text-sm font-medium">342</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-green-500" />
                          <span className="text-sm">Infratuzilma</span>
                        </div>
                        <span className="text-sm font-medium">156</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm">Nizolarni hal qilish</span>
                        </div>
                        <span className="text-sm font-medium">89</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-purple-500" />
                          <span className="text-sm">Ro'yxatdan o'tkazish</span>
                        </div>
                        <span className="text-sm font-medium">234</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Additional Analytics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          O'rtacha hal qilish vaqti
                        </p>
                        <p className="text-2xl font-bold">3.2 kun</p>
                        <p className="text-xs text-green-600">
                          O'tgan oydan -0.5 kun
                        </p>
                      </div>
                      <Clock className="w-8 h-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Faol ish jarayonlari
                        </p>
                        <p className="text-2xl font-bold">47</p>
                        <p className="text-xs text-blue-600">
                          O'tgan haftadan +8
                        </p>
                      </div>
                      <FileText className="w-8 h-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Fuqaro so'rovlari
                        </p>
                        <p className="text-2xl font-bold">128</p>
                        <p className="text-xs text-orange-600">
                          O'tgan haftadan +15
                        </p>
                      </div>
                      <Users className="w-8 h-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              {/* Report Generation */}
              <Card>
                <CardHeader>
                  <CardTitle>Yangi hisobot yaratish</CardTitle>
                  <CardDescription>
                    Turli vaqt davrlari va ko'rsatkichlar uchun maxsus hisobotlar yaratish
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Hisobot turi" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="task-summary">
                          Vazifa hisoboti
                        </SelectItem>
                        <SelectItem value="workflow-analysis">
                          Ish jarayoni tahlili
                        </SelectItem>
                        <SelectItem value="performance-metrics">
                          Samaradorlik ko'rsatkichlari
                        </SelectItem>
                        <SelectItem value="resident-services">
                          Fuqaro xizmatlari
                        </SelectItem>
                        <SelectItem value="infrastructure">
                          Infratuzilma hisoboti
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Vaqt davri" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Kunlik</SelectItem>
                        <SelectItem value="weekly">Haftalik</SelectItem>
                        <SelectItem value="monthly">Oylik</SelectItem>
                        <SelectItem value="quarterly">Choraklik</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button>
                      <FileText className="w-4 h-4 mr-2" />
Hisobot yaratish
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Reports */}
              <Card>
                <CardHeader>
                  <CardTitle>So'nggi hisobotlar</CardTitle>
                  <CardDescription>
                    Ilgari yaratilgan hisobotlar va ularning holati
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentReports.map((report) => (
                      <div
                        key={report.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <FileText className="w-8 h-8 text-primary" />
                          <div>
                            <h4 className="font-medium">{report.title}</h4>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>{report.type}</span>
                              <span>
                                Yaratilgan{" "}
                                {new Date(
                                  report.generatedDate
                                ).toLocaleDateString()}
                              </span>
                              <span>{report.size}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              report.status === "completed"
                                ? "default"
                                : "secondary"
                            }
                            className="text-xs"
                          >
                            {report.status}
                          </Badge>
                          {report.status === "completed" && (
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-2" />
Yuklab olish
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <div className="p-4 md:p-8">
        <div className="mx-auto">
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
                {reports.map((report) => (
                  <ReportCard key={report.id} report={report} />
                ))}
              </div>
            </TabsContent>
            {Object.keys(typeConfig).map((type) => (
              <TabsContent key={type} value={type}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {reports
                    .filter((r) => r.type === type)
                    .map((report) => (
                      <ReportCard key={report.id} report={report} />
                    ))}
                </div>
              </TabsContent>
            ))}
            <TabsContent value="DRAFT">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {reports
                  .filter((r) => r.status === "DRAFT")
                  .map((report) => (
                    <ReportCard key={report.id} report={report} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
