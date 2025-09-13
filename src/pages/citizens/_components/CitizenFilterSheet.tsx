import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { regions, districtsByRegion } from "@/const/mock.data"; // Assuming these are exported
import type { ICitizen } from "@/interfaces/citizen.interface";
import { useMemo } from "react";

interface FilterSheetProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  filters: any;
  onFilterChange: (key: string, value: string) => void;
  onResetFilters: () => void;
  citizens: ICitizen[];
}

export const CitizenFilterSheet = ({
  isOpen,
  onOpenChange,
  filters,
  onFilterChange,
  onResetFilters,
  citizens,
}: FilterSheetProps) => {
  const availableDistricts = useMemo(() => {
    if (filters.region && districtsByRegion[filters.region]) {
      return districtsByRegion[filters.region];
    }
    return [];
  }, [filters.region]);

  const availableNeighborhoods = useMemo(() => {
    if (filters.district) {
      return [
        ...new Set(
          citizens
            .filter((c) => c.district === filters.district)
            .map((c) => c.neighborhood)
        ),
      ];
    }
    return [];
  }, [filters.district, citizens]);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-[350px] sm:w-[450px]">
        <SheetHeader>
          <SheetTitle>Filterlar</SheetTitle>
          <SheetDescription>
            Qidiruvni aniqlashtirish uchun filterlardan foydalaning.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-6 px-4">
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="name">Ism yoki Familiya</Label>
            <Input
              id="name"
              value={filters.name}
              onChange={(e) => onFilterChange("name", e.target.value)}
              placeholder="Ism bo'yicha qidirish..."
            />
          </div>
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="gender">Jinsi</Label>
            <select
              id="gender"
              value={filters.gender}
              onChange={(e) => onFilterChange("gender", e.target.value)}
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="__all__">Barchasi</option>
              <option value="male">Erkak</option>
              <option value="female">Ayol</option>
            </select>
          </div>
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="region">Viloyat</Label>
            <select
              id="region"
              value={filters.region}
              onChange={(e) => onFilterChange("region", e.target.value)}
              className="..."
            >
              <option value="__all__">Barchasi</option>
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
          {filters.region && availableDistricts.length > 0 && (
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="district">Tuman/Shahar</Label>
              <select
                id="district"
                value={filters.district}
                onChange={(e) => onFilterChange("district", e.target.value)}
                className="..."
              >
                <option value="__all__">Barchasi</option>
                {availableDistricts.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          )}
          {filters.district && availableNeighborhoods.length > 0 && (
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="neighborhood">Mahalla</Label>
              <select
                id="neighborhood"
                value={filters.neighborhood}
                onChange={(e) => onFilterChange("neighborhood", e.target.value)}
                className="..."
              >
                <option value="__all__">Barchasi</option>
                {availableNeighborhoods.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        <SheetFooter>
          <Button variant="outline" onClick={onResetFilters}>
            Tozalash
          </Button>
          <Button onClick={() => onOpenChange(false)}>Saqlash</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
