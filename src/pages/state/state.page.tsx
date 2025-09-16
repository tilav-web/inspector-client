import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from "@/components/ui/button";

// Sample data for the chart (replace with API data in a real app)
const chartData = [
  { name: 'Tashkent', inspectors: 1500, workflows: 1200 },
  { name: 'Andijan', inspectors: 800, workflows: 600 },
  { name: 'Fergana', inspectors: 900, workflows: 700 },
  { name: 'Qoraqalpog\'iston', inspectors: 400, workflows: 300 },
];


export default function StatePage() {
  // Mock statistics (replace with real data from your backend)
  const stats = {
    totalInspectors: 4500,
    activeWorkflows: 3500,
    completedReports: 3000,
    allocatedResources: 2500000, // in UZS
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">State Admin Statistics</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Inspectors</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-blue-600">{stats.totalInspectors}</p>
            <p className="text-sm text-gray-500">Across all regions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Workflows</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-green-600">{stats.activeWorkflows}</p>
            <p className="text-sm text-gray-500">In progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Completed Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-purple-600">{stats.completedReports}</p>
            <p className="text-sm text-gray-500">This quarter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Allocated Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-yellow-600">{stats.allocatedResources} UZS</p>
            <p className="text-sm text-gray-500">Total budget</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Regional Workflow Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#333" />
                <YAxis stroke="#333" />
                <Tooltip />
                <Legend />
                <Bar dataKey="inspectors" fill="#8884d8" name="Inspectors" />
                <Bar dataKey="workflows" fill="#82ca9d" name="Workflows" />
              </BarChart>
            </ResponsiveContainer>
            <Button className="mt-4" variant="outline">Export Data</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};