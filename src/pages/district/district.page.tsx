import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MOCK_CITIZENS, MOCK_INSPECTORS } from "@/const/mock.data";
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
import { Home, Users, UserCheck, Building2 } from "lucide-react";
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

// Let's assume the district is passed via props or URL params
// For now, we can hardcode it to 'chilonzor'
const CURRENT_DISTRICT = "chilonzor";

export default function DistrictPage() {
  // In a real app, you'd get the district name from the URL like this:
  // const { districtName } = useParams();
  const districtName = CURRENT_DISTRICT;

  const inspectorsInDistrict = useMemo(() => {
    return MOCK_INSPECTORS.filter((i) => i.district === districtName);
  }, [districtName]);

  const citizensInDistrict = useMemo(() => {
    return MOCK_CITIZENS.filter((c) => c.district === districtName);
  }, [districtName]);

  const neighborhoodsInDistrict = useMemo(() => {
    const neighborhoodSet = new Set<string>();
    citizensInDistrict.forEach((c) => neighborhoodSet.add(c.neighborhood));
    return Array.from(neighborhoodSet);
  }, [citizensInDistrict]);

  const householdsInDistrict = useMemo(() => {
    const householdSet = new Set<string>();
    citizensInDistrict.forEach((c) => householdSet.add(c.household.id));
    return Array.from(householdSet);
  }, [citizensInDistrict]);

  const kpiData = [
    {
      title: "Jami mahallalar",
      value: neighborhoodsInDistrict.length,
      icon: Home,
      color: "text-sky-500",
    },
    {
      title: "Jami xonadonlar",
      value: householdsInDistrict.length,
      icon: Building2,
      color: "text-teal-500",
    },
    {
      title: "Jami inspektorlar",
      value: inspectorsInDistrict.length,
      icon: UserCheck,
      color: "text-green-500",
    },
    {
      title: "Jami fuqarolar",
      value: citizensInDistrict.length,
      icon: Users,
      color: "text-orange-500",
    },
  ];

  const citizensByNeighborhood = useMemo(() => {
    const counts: { [key: string]: number } = {};
    for (const citizen of citizensInDistrict) {
      counts[citizen.neighborhood] = (counts[citizen.neighborhood] || 0) + 1;
    }
    return neighborhoodsInDistrict.map((neighborhood) => ({
      name: neighborhood,
      fuqarolar: counts[neighborhood] || 0,
    }));
  }, [citizensInDistrict, neighborhoodsInDistrict]);

  const citizenGenders = useMemo(() => {
    const counts: { [key: string]: number } = {
      male: 0,
      female: 0,
    };
    for (const citizen of citizensInDistrict) {
      counts[citizen.gender]++;
    }
    return [
      { name: "Erkaklar", value: counts.male },
      { name: "Ayollar", value: counts.female },
    ];
  }, [citizensInDistrict]);

  const neighborhoodStats = useMemo(() => {
    return neighborhoodsInDistrict.map((neighborhood) => {
      const inspectorsInNeighborhood = inspectorsInDistrict.filter(
        (i) => i.neighborhood === neighborhood
      ).length;
      const citizensInNeighborhood = citizensInDistrict.filter(
        (c) => c.neighborhood === neighborhood
      ).length;
      return {
        name: neighborhood,
        inspectors: inspectorsInNeighborhood,
        citizens: citizensInNeighborhood,
      };
    });
  }, [neighborhoodsInDistrict, inspectorsInDistrict, citizensInDistrict]);

  return (
    <div className="min-h-screen p-4 md:p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 capitalize">
        {districtName} tumani bo'yicha umumiy statistika
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="shadow-md hover:shadow-lg transition-all">
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
            <CardTitle>Mahallalar bo'yicha fuqarolar soni</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={citizensByNeighborhood}>
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
            <CardTitle>Fuqarolarning jinsi bo'yicha</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={citizenGenders}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={(entry) => `${entry.name}: ${entry.value}`}
                >
                  {citizenGenders.map((_entry, index) => (
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
          <CardTitle>Mahallalar kesimida statistika</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mahalla</TableHead>
                <TableHead className="text-right">Inspektorlar soni</TableHead>
                <TableHead className="text-right">Fuqarolar soni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {neighborhoodStats.map((neighborhood) => (
                <TableRow key={neighborhood.name}>
                  <TableCell className="font-medium capitalize">{neighborhood.name}</TableCell>
                  <TableCell className="text-right">{neighborhood.inspectors}</TableCell>
                  <TableCell className="text-right">{neighborhood.citizens}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}