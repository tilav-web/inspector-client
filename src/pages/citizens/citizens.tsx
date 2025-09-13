import { useState, useMemo } from "react";
import { MOCK_CITIZENS } from "@/const/mock.data";
import type { ICitizen } from "@/interfaces/citizen.interface";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter, Plus, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CitizenFilterSheet } from "./_components/CitizenFilterSheet";
import { CitizenDetailsDialog } from "./_components/CitizenDetailsDialog";
import { CitizensTable, TablePagination } from "./_components/CitizensTable";

const ITEMS_PER_PAGE = 15;

export default function Citizens() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    name: "",
    gender: "",
    region: "",
    district: "",
    neighborhood: "",
  });
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedCitizen, setSelectedCitizen] = useState<ICitizen | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value === "__all__" ? "" : value,
    }));
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({
      name: "",
      gender: "",
      region: "",
      district: "",
      neighborhood: "",
    });
    setCurrentPage(1);
    setIsSheetOpen(false);
  };

  const openCitizenDialog = (citizen: ICitizen) => {
    setSelectedCitizen(citizen);
    setIsDialogOpen(true);
  };

  const handleViewProfile = (citizenId: string) => {
    navigate(`/citizens/${citizenId}`);
  };

  const handleEdit = (citizenId: string) => {
    navigate(`/citizens/edit/${citizenId}`);
  };

  const filteredCitizens = useMemo(() => {
    return MOCK_CITIZENS.filter((citizen) => {
      const matchesName =
        filters.name === "" ||
        `${citizen.first_name} ${citizen.last_name} ${citizen.middle_name}`
          .toLowerCase()
          .includes(filters.name.toLowerCase());
      const matchesGender =
        filters.gender === "" || citizen.gender === filters.gender;
      const matchesRegion =
        filters.region === "" || citizen.region.toLowerCase() === filters.region.toLowerCase();
      const matchesDistrict =
        filters.district === "" || citizen.district.toLowerCase() === filters.district.toLowerCase();
      const matchesNeighborhood =
        filters.neighborhood === "" ||
        citizen.neighborhood.toLowerCase() === filters.neighborhood.toLowerCase();
      return (
        matchesName &&
        matchesGender &&
        matchesRegion &&
        matchesDistrict &&
        matchesNeighborhood
      );
    });
  }, [filters]);

  const totalPages = Math.ceil(filteredCitizens.length / ITEMS_PER_PAGE);
  const paginatedCitizens = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredCitizens.slice(startIndex, endIndex);
  }, [currentPage, filteredCitizens]);

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="space-y-6 mx-auto">
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
            <div className="flex flex-row items-center justify-between py-2">
              <CardTitle className="text-2xl font-bold flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Users className="h-6 w-6" />
                </div>
                Fuqarolar ro'yxati
              </CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
                    onClick={() => setIsSheetOpen(true)}
                  >
                    <Filter className="h-4 w-4" />
                    Filterlar
                  </Button>
                  <Button
                    className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white shadow-lg"
                    onClick={() => navigate('/citizens/add')}
                  >
                    <Plus className="h-4 w-4" />
                    Fuqaro qo'shish
                  </Button>
                </div>
            </div>
          </CardHeader>
          <CardContent className="px-2 py-0">
            <CitizensTable
              citizens={paginatedCitizens}
              onCitizenClick={openCitizenDialog}
              onViewProfile={handleViewProfile}
              onEdit={handleEdit}
            />
            <div className="my-2"></div>
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalCount={filteredCitizens.length}
            />
          </CardContent>
        </Card>
      </div>

      <CitizenFilterSheet
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={resetFilters}
        citizens={MOCK_CITIZENS} 
      />

      <CitizenDetailsDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        citizen={selectedCitizen}
      />
    </div>
  );
}