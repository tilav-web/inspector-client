import { API_ENDPOINT } from "@/const/shared";
import apiInstance from "@/lib/api-instance";

class RegionService {
  async findById(id: string) {
    try {
      const res = await apiInstance.get(`${API_ENDPOINT.REGION.base}/${id}`);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findAll() {
    try {
      const res = await apiInstance.get(API_ENDPOINT.REGION.base);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export const regionService = new RegionService();
