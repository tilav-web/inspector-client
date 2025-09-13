import { useState, useMemo } from "react";
import { MOCK_INSPECTORS } from "@/const/mock.data";
import type { IInspector } from "@/interfaces/inspector.interface";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FilterSheet } from "./_components/FilterSheet";
import { InspectorsTable, TablePagination } from "./_components/InspectorsTable";
import { InspectorDetailsDialog } from "./_components/InspectorDetailsDialog";

const ITEMS_PER_PAGE = 15;

export default function Inspectors() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    name: "",
    rank: "",
    gender: "",
    region: "",
    district: "",
    neighborhood: "",
  });
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedInspector, setSelectedInspector] = useState<IInspector | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value === "__all__" ? "" : value,
    }));
    setCurrentPage(1); // Reset to first page on filter change
  };

  const resetFilters = () => {
    setFilters({
      name: "",
      rank: "",
      gender: "",
      region: "",
      district: "",
      neighborhood: "",
    });
    setCurrentPage(1);
    setIsSheetOpen(false); // Close sheet after resetting filters
  };

  const openInspectorDialog = (inspector: IInspector) => {
    setSelectedInspector(inspector);
    setIsDialogOpen(true);
  };

  const handleViewProfile = (inspectorId: string) => {
    navigate(`/profile/${inspectorId}`);
  };

  const filteredInspectors = useMemo(() => {
    return MOCK_INSPECTORS.filter((inspector) => {
      const matchesName =
        filters.name === "" ||
        `${inspector.first_name} ${inspector.last_name} ${inspector.middle_name}`
          .toLowerCase()
          .includes(filters.name.toLowerCase());
      const matchesRank =
        filters.rank === "" || inspector.rank.toLowerCase() === filters.rank.toLowerCase();
      const matchesGender =
        filters.gender === "" || inspector.gender === filters.gender;
      const matchesRegion =
        filters.region === "" || inspector.region.toLowerCase() === filters.region.toLowerCase();
      const matchesDistrict =
        filters.district === "" || inspector.district.toLowerCase() === filters.district.toLowerCase();
      const matchesNeighborhood =
        filters.neighborhood === "" ||
        inspector.neighborhood.toLowerCase() === filters.neighborhood.toLowerCase();
      return (
        matchesName &&
        matchesRank &&
        matchesGender &&
        matchesRegion &&
        matchesDistrict &&
        matchesNeighborhood
      );
    });
  }, [filters]);

  const totalPages = Math.ceil(filteredInspectors.length / ITEMS_PER_PAGE);
  const paginatedInspectors = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredInspectors.slice(startIndex, endIndex);
  }, [currentPage, filteredInspectors]);

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
              <Button
                variant="outline"
                className="flex items-center gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
                onClick={() => setIsSheetOpen(true)}
              >
                <Filter className="h-4 w-4" />
                Filterlar
              </Button>
            </div>
          </CardHeader>
          <CardContent className="px-2 py-0">
            <InspectorsTable
              inspectors={paginatedInspectors}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              onInspectorClick={openInspectorDialog}
              onViewProfile={handleViewProfile}
            />
            <div className="my-2"></div>
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalCount={filteredInspectors.length}
            />
          </CardContent>
        </Card>
      </div>

      <FilterSheet
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={resetFilters}
        inspectors={MOCK_INSPECTORS}
      />

      <InspectorDetailsDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        inspector={selectedInspector}
      />
    </div>
  );
}