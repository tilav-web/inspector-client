import { privateInstance } from "@/common/api/client-api";
import { ENDPOINTS } from "@/common/api/endpoints";

class RegionService {
  async findall() {
    try {
      const res = await privateInstance.get(ENDPOINTS.REGIONS.BASE);
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getDistrictsWithInspectorCounts(search: string) {
    try {
      const res = await privateInstance.get(
        `${ENDPOINTS.REGIONS.INSPECTORS}?search=${search}`
      );
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export const regionService = new RegionService();
