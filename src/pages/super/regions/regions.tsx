import { useState } from "react";
import RegionsMenu from "./_components/regions-menu";
import type { IRegion } from "@/interfaces/region.interface";

export default function Regions() {
  const [selectedRegion, setSelectedRegion] = useState<IRegion>();

  const handleRegionSelect = (region: IRegion | undefined) => {
    setSelectedRegion(region);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <RegionsMenu
        selectedRegion={selectedRegion}
        handleRegionSelect={handleRegionSelect}
      />
      <div className="flex-1 overflow-y-auto p-4">
        {selectedRegion ? (
          <div>
            <h2>Tanlangan hudud: {selectedRegion.full_name}</h2>
            {/* Bu yerga tanlangan hududga oid kontentni joylashtiring */}
          </div>
        ) : (
          <div>
            <h2>Statistika</h2>
            {/* Bu yerga umumiy statistika kontentini joylashtiring */}
          </div>
        )}
      </div>
    </div>
  );
}
