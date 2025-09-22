import { API_ENDPOINT } from "@/const/shared";
import apiInstance from "@/lib/api-instance";

class DistrictService {
  async findById(id: string) {
    try {
      const res = await apiInstance.get(`${API_ENDPOINT.DISTRICT.base}/${id}`);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async findByRegion(id: string) {
    try {
      const res = await apiInstance.get(
        `${API_ENDPOINT.DISTRICT.findByRegion}/${id}`
      );
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findByAll() {
    try {
      const res = await apiInstance.get(API_ENDPOINT.DISTRICT.base);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export const districtService = new DistrictService();
