import { useState } from "react";
import { MOCK_CALLS } from "@/const/mock-calls.data";
import type { ICalls } from "@/interfaces/calls.interface";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Phone, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const statusConfig: {
  [key in ICalls["status"]]: { label: string; className: string };
} = {
  pending: {
    label: "Kutilmoqda",
    className: "bg-yellow-100 text-yellow-800 border-yellow-300",
  },
  in_progress: {
    label: "Jarayonda",
    className: "bg-blue-100 text-blue-800 border-blue-300",
  },
  resolved: {
    label: "Hal qilindi",
    className: "bg-green-100 text-green-800 border-green-300",
  },
  escalated: {
    label: "Kuchaytirildi",
    className: "bg-orange-100 text-orange-800 border-orange-300",
  },
  closed: { label: "Yopildi", className: "bg-gray-100 text-gray-800 border-gray-300" },
};

const priorityConfig: {
  [key in ICalls["priority"]]: { label: string; className: string };
} = {
  low: { label: "Past", className: "bg-gray-200 text-gray-800" },
  medium: { label: "O'rta", className: "bg-yellow-200 text-yellow-800" },
  high: { label: "Yuqori", className: "bg-orange-200 text-orange-800" },
  critical: { label: "Shoshilinch", className: "bg-red-200 text-red-800" },
};

export default function CallsPage() {
  const [calls] = useState<ICalls[]>(MOCK_CALLS);

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="space-y-6 mx-auto">
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-t-lg">
            <div className="flex flex-row items-center justify-between py-2">
              <CardTitle className="text-2xl font-bold flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Phone className="h-6 w-6" />
                </div>
                Chaqiruvlar ro'yxati
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="px-2 py-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Hodisa</TableHead>
                  <TableHead>Turi</TableHead>
                  <TableHead>Holati</TableHead>
                  <TableHead>Ustuvorlik</TableHead>
                  <TableHead>Inspektor</TableHead>
                  <TableHead className="text-right">Amallar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {calls.map((call) => (
                  <TableRow key={call.id}>
                    <TableCell className="font-medium">{call.incident}</TableCell>
                    <TableCell>{call.type}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={statusConfig[call.status].className}
                      >
                        {statusConfig[call.status].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={priorityConfig[call.priority].className}
                      >
                        {priorityConfig[call.priority].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {call.inspector
                        ? `${call.inspector.first_name} ${call.inspector.last_name}`
                        : "Tayinlanmagan"}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Batafsil</DropdownMenuItem>
                          <DropdownMenuItem>Qabul qilish</DropdownMenuItem>
                          <DropdownMenuItem>Rad etish</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}