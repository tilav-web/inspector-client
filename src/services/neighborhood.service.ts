import { API_ENDPOINT } from "@/const/shared";
import apiInstance from "@/lib/api-instance";

class NeighborhoodService {
  async findById(id: string) {
    try {
      const res = await apiInstance.get(
        `${API_ENDPOINT.NEIGHBORHOOD.base}/${id}`
      );
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findByRegionAndDistrict({
    region,
    district,
  }: {
    region: string;
    district: string;
  }) {
    try {
      const res = await apiInstance.get(
        API_ENDPOINT.NEIGHBORHOOD.findByRegionAndDistrict({ region, district })
      );
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export const neighborhoodService = new NeighborhoodService();
