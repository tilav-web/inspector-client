
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MOCK_CITIZENS,
  MOCK_INSPECTORS,
  regions,
  districtsByRegion,
} from "@/const/mock.data";
import { MOCK_REPORTS } from "../reports/mock-reports";
import { MOCK_WORKFLOWS } from "../workflows/mock-workflows";
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
  Legend,
} from "recharts";
import { Building, Users, UserCheck, FileText, GitBranch } from "lucide-react";
import { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function StatePage() {
  const totalRegions = regions.length;
  const totalDistricts = Object.values(districtsByRegion).flat().length;
  const totalInspectors = MOCK_INSPECTORS.length;
  const totalCitizens = MOCK_CITIZENS.length;
  const totalReports = MOCK_REPORTS.length;
  const totalWorkflows = MOCK_WORKFLOWS.length;

  const citizensByRegion = useMemo(() => {
    const counts: { [key: string]: number } = {};
    for (const citizen of MOCK_CITIZENS) {
      counts[citizen.region] = (counts[citizen.region] || 0) + 1;
    }
    return regions.map((region) => ({
      name: region.name,
      fuqarolar: counts[region.name] || 0,
    }));
  }, []);

  const inspectorRoles = useMemo(() => {
    const counts: { [key: string]: number } = {};
    for (const inspector of MOCK_INSPECTORS) {
      counts[inspector.auth.role] = (counts[inspector.auth.role] || 0) + 1;
    }
    return Object.entries(counts).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
    }));
  }, []);

  const regionStats = useMemo(() => {
    return regions.map((region) => {
      const inspectorsInRegion = MOCK_INSPECTORS.filter(
        (i) => i.region === region.name
      ).length;
      const citizensInRegion = MOCK_CITIZENS.filter(
        (c) => c.region === region.name
      ).length;
      return {
        name: region.name,
        inspectors: inspectorsInRegion,
        citizens: citizensInRegion,
      };
    });
  }, []);

  const kpiData = [
    {
      title: "Jami viloyatlar",
      value: totalRegions,
      icon: Building,
      color: "text-blue-500",
    },
    {
      title: "Jami tumanlar",
      value: totalDistricts,
      icon: Building,
      color: "text-sky-500",
    },
    {
      title: "Jami inspektorlar",
      value: totalInspectors,
      icon: UserCheck,
      color: "text-green-500",
    },
    {
      title: "Jami fuqarolar",
      value: totalCitizens,
      icon: Users,
      color: "text-orange-500",
    },
    {
      title: "Jami hisobotlar",
      value: totalReports,
      icon: FileText,
      color: "text-indigo-500",
    },
    {
      title: "Jami ish jarayonlari",
      value: totalWorkflows,
      icon: GitBranch,
      color: "text-purple-500",
    },
  ];

  return (
    <div className="min-h-screen p-4 md:p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">
        Respublika bo'yicha umumiy statistika
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="shadow-md hover:shadow-lg transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {kpi.title}
              </CardTitle>
              <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-3 shadow-md">
          <CardHeader>
            <CardTitle>Viloyatlar bo'yicha fuqarolar soni</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={citizensByRegion}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  interval={0}
                  tick={{ fontSize: 12 }}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="fuqarolar" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 shadow-md">
          <CardHeader>
            <CardTitle>Inspektorlar lavozimlari bo'yicha</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={inspectorRoles}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={(entry) => `${entry.name}: ${entry.value}`}
                >
                  {inspectorRoles.map((_entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Viloyatlar kesimida statistika</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Viloyat</TableHead>
                <TableHead className="text-right">Inspektorlar soni</TableHead>
                <TableHead className="text-right">Fuqarolar soni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {regionStats.map((region) => (
                <TableRow key={region.name}>
                  <TableCell className="font-medium">{region.name}</TableCell>
                  <TableCell className="text-right">
                    {region.inspectors}
                  </TableCell>
                  <TableCell className="text-right">
                    {region.citizens}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
