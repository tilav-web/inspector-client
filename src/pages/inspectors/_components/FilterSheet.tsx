import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { XCircle, Filter } from "lucide-react";
import type { IInspector } from "@/interfaces/inspector.interface";

interface FilterSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  filters: {
    name: string;
    rank: string;
    gender: string;
    region: string;
    district: string;
    neighborhood: string;
  };
  onFilterChange: (key: string, value: string) => void;
  onResetFilters: () => void;
  inspectors: IInspector[];
}

export const FilterSheet = ({
  isOpen,
  onOpenChange,
  filters,
  onFilterChange,
  onResetFilters,
  inspectors,
}: FilterSheetProps) => {
  // Extract unique filter options
  const uniqueRanks = [...new Set(inspectors.map((i) => i.rank))];
  const uniqueGenders = [...new Set(inspectors.map((i) => i.gender))];
  const uniqueRegions = [...new Set(inspectors.map((i) => i.region))];
  const uniqueDistricts = [...new Set(inspectors.map((i) => i.district))];
  const uniqueNeighborhoods = [...new Set(inspectors.map((i) => i.neighborhood))];

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        className="w-[400px] sm:w-[540px] bg-gradient-to-b from-blue-50 to-white"
        side="right"
      >
        <SheetHeader className="border-b border-blue-100 pb-4">
          <SheetTitle className="text-xl font-semibold text-blue-900 flex items-center gap-2">
            <Filter className="h-5 w-5 text-blue-600" />
            Inspektorlarni filterlash
          </SheetTitle>
          <SheetDescription className="text-blue-700">
            Inspektorlar ro'yxatini filterlash uchun quyidagi maydonlarni to'ldiring.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-6 p-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-blue-900">Qidirish</label>
            <Input
              placeholder="Ism, familiya bo'yicha qidirish..."
              value={filters.name}
              onChange={(e) => onFilterChange("name", e.target.value)}
              className="border-blue-200 focus:border-blue-500 focus:ring-blue-500/20 w-full"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-blue-900">Unvon</label>
            <Select
              value={filters.rank === "" ? "__all__" : filters.rank}
              onValueChange={(value) => onFilterChange("rank", value)}
            >
              <SelectTrigger className="border-blue-200 focus:border-blue-500 focus:ring-blue-500/20 w-full">
                <SelectValue placeholder="Unvon bo'yicha filterlash" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__all__">Barcha unvonlar</SelectItem>
                {uniqueRanks.map((rank) => (
                  <SelectItem key={rank} value={rank}>
                    {rank}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-blue-900">Jinsi</label>
            <Select
              value={filters.gender === "" ? "__all__" : filters.gender}
              onValueChange={(value) => onFilterChange("gender", value)}
            >
              <SelectTrigger className="border-blue-200 focus:border-blue-500 focus:ring-blue-500/20 w-full">
                <SelectValue placeholder="Jinsi bo'yicha filterlash" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__all__">Barcha jinslar</SelectItem>
                {uniqueGenders.map((gender) => (
                  <SelectItem key={gender} value={gender}>
                    {gender === "male" ? "Erkak" : "Ayol"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-blue-900">Viloyat</label>
            <Select
              value={filters.region === "" ? "__all__" : filters.region}
              onValueChange={(value) => onFilterChange("region", value)}
            >
              <SelectTrigger className="border-blue-200 focus:border-blue-500 focus:ring-blue-500/20 w-full">
                <SelectValue placeholder="Viloyat bo'yicha filterlash" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__all__">Barcha viloyatlar</SelectItem>
                {uniqueRegions.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-blue-900">Tuman</label>
            <Select
              value={filters.district === "" ? "__all__" : filters.district}
              onValueChange={(value) => onFilterChange("district", value)}
            >
              <SelectTrigger className="border-blue-200 focus:border-blue-500 focus:ring-blue-500/20 w-full">
                <SelectValue placeholder="Tuman bo'yicha filterlash" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__all__">Barcha tumanlar</SelectItem>
                {uniqueDistricts.map((district) => (
                  <SelectItem key={district} value={district}>
                    {district}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-blue-900">Mahalla</label>
            <Select
              value={filters.neighborhood === "" ? "__all__" : filters.neighborhood}
              onValueChange={(value) => onFilterChange("neighborhood", value)}
            >
              <SelectTrigger className="border-blue-200 focus:border-blue-500 focus:ring-blue-500/20 w-full">
                <SelectValue placeholder="Mahalla bo'yicha filterlash" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__all__">Barcha mahallalar</SelectItem>
                {uniqueNeighborhoods.map((neighborhood) => (
                  <SelectItem key={neighborhood} value={neighborhood}>
                    {neighborhood}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <SheetFooter className="border-t border-blue-100 pt-4">
          <Button
            onClick={onResetFilters}
            variant="outline"
            className="w-full border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300"
          >
            <XCircle className="mr-2 h-4 w-4" />
            Filterlarni tozalash
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
