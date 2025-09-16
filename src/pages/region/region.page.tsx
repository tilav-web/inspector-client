import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MOCK_CITIZENS,
  MOCK_INSPECTORS,
  districtsByRegion,
} from "@/const/mock.data";
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
import { Building, Users, UserCheck, Home } from "lucide-react";
import { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

// Let's assume the region is passed via props or URL params
// For now, we can hardcode it to 'Toshkent viloyati'
const CURRENT_REGION = "Toshkent viloyati";

export default function RegionPage() {
  // In a real app, you'd get the region name from the URL like this:
  // const { regionName } = useParams();
  const regionName = CURRENT_REGION;

  const districts =
    districtsByRegion[
      regionName
        .toLowerCase()
        .replace(" viloyati", "_vil")
        .replace(" shahri", "_sh")
    ] || [];

  const inspectorsInRegion = useMemo(() => {
    return MOCK_INSPECTORS.filter((i) => i.region === regionName);
  }, [regionName]);

  const citizensInRegion = useMemo(() => {
    return MOCK_CITIZENS.filter((c) => c.region === regionName);
  }, [regionName]);

  const neighborhoodsInRegion = useMemo(() => {
    const neighborhoodSet = new Set<string>();
    citizensInRegion.forEach((c) => neighborhoodSet.add(c.neighborhood));
    return Array.from(neighborhoodSet);
  }, [citizensInRegion]);

  const kpiData = [
    {
      title: "Jami tumanlar",
      value: districts.length,
      icon: Building,
      color: "text-sky-500",
    },
    {
      title: "Jami mahallalar",
      value: neighborhoodsInRegion.length,
      icon: Home,
      color: "text-teal-500",
    },
    {
      title: "Jami inspektorlar",
      value: inspectorsInRegion.length,
      icon: UserCheck,
      color: "text-green-500",
    },
    {
      title: "Jami fuqarolar",
      value: citizensInRegion.length,
      icon: Users,
      color: "text-orange-500",
    },
  ];

  const citizensByDistrict = useMemo(() => {
    const counts: { [key: string]: number } = {};
    for (const citizen of citizensInRegion) {
      counts[citizen.district] = (counts[citizen.district] || 0) + 1;
    }
    return districts.map((district) => ({
      name: district,
      fuqarolar: counts[district] || 0,
    }));
  }, [citizensInRegion, districts]);

  const inspectorRanks = useMemo(() => {
    const counts: { [key: string]: number } = {};
    for (const inspector of inspectorsInRegion) {
      counts[inspector.rank] = (counts[inspector.rank] || 0) + 1;
    }
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [inspectorsInRegion]);

  const districtStats = useMemo(() => {
    return districts.map((district) => {
      const inspectorsInDistrict = inspectorsInRegion.filter(
        (i) => i.district === district
      ).length;
      const citizensInDistrict = citizensInRegion.filter(
        (c) => c.district === district
      ).length;
      return {
        name: district,
        inspectors: inspectorsInDistrict,
        citizens: citizensInDistrict,
      };
    });
  }, [districts, inspectorsInRegion, citizensInRegion]);

  return (
    <div className="min-h-screen p-4 md:p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">
        {regionName} bo'yicha umumiy statistika
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card
            key={index}
            className="shadow-md hover:shadow-lg transition-all"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
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
            <CardTitle>Tumanlar bo'yicha fuqarolar soni</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={citizensByDistrict}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={80}
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
            <CardTitle>Inspektorlar unvonlari bo'yicha</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={inspectorRanks}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={(entry) => `${entry.name}: ${entry.value}`}
                >
                  {inspectorRanks.map((_entry, index) => (
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
          <CardTitle>Tumanlar kesimida statistika</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tuman</TableHead>
                <TableHead className="text-right">Inspektorlar soni</TableHead>
                <TableHead className="text-right">Fuqarolar soni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {districtStats.map((district) => (
                <TableRow key={district.name}>
                  <TableCell className="font-medium capitalize">
                    {district.name}
                  </TableCell>
                  <TableCell className="text-right">
                    {district.inspectors}
                  </TableCell>
                  <TableCell className="text-right">
                    {district.citizens}
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
