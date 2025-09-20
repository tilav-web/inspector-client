import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter, User, Plus } from "lucide-react";
import { InspectorsTable } from "./_components/InspectorsTable";

export default function Inspectors() {
  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="space-y-6 mx-auto">
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
            <div className="flex flex-row items-center justify-between py-2">
              <CardTitle className="text-2xl font-bold flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <User className="h-6 w-6" />
                </div>
                Inspektorlar ro'yxati
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  className="flex items-center gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
                >
                  <Plus className="h-4 w-4" />
                  Qo'shish
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
                >
                  <Filter className="h-4 w-4" />
                  Filterlar
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-2 py-0">
            <InspectorsTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
