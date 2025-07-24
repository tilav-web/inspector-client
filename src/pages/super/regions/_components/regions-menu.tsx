import { Button } from "@/components/ui/button";
import type { IRegion } from "@/interfaces/region.interface";
import { regionService } from "@/services/region.service";
import { AlignEndHorizontal, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import RegionAddDialog from "./region-add-dialog";

interface RegionMenuProp {
  handleRegionSelect: (region: IRegion | undefined) => void;
  selectedRegion: IRegion | undefined;
}

export default function RegionsMenu({
  handleRegionSelect,
  selectedRegion,
}: RegionMenuProp) {
  const [regions, setRegions] = useState<IRegion[]>();

  useEffect(() => {
    (async () => {
      try {
        const data = await regionService.findall();
        setRegions(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="">
      <div className="w-full overflow-x-auto">
        <div className="flex gap-3 pb-2 min-w-max px-4">
          <Button
            variant={selectedRegion === undefined ? "default" : "outline"}
            onClick={() => handleRegionSelect(undefined)}
            className={`flex-shrink-0 h-12 px-4 transition-all duration-200 cursor-pointer ${
              selectedRegion === undefined
                ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                : "bg-white hover:bg-gray-50 text-gray-700 border-gray-300"
            }`}
          >
            <div className="flex items-center gap-2">
              <AlignEndHorizontal className="h-4 w-4" />
              <span className="font-medium whitespace-nowrap">Statistics</span>
            </div>
          </Button>
          {regions?.map((region) => (
            <Button
              key={region._id}
              variant={
                selectedRegion?._id === region._id ? "default" : "outline"
              }
              onClick={() => handleRegionSelect(region)}
              className={`flex-shrink-0 h-12 px-4 transition-all duration-200 cursor-pointer ${
                selectedRegion?._id === region._id
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                  : "bg-white hover:bg-gray-50 text-gray-700 border-gray-300"
              }`}
            >
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="font-medium whitespace-nowrap">
                  {region.short_name}
                </span>
              </div>
            </Button>
          ))}
          <RegionAddDialog />
        </div>
      </div>
    </div>
  );
}
