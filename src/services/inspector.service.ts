import { API_ENDPOINT } from "@/const/shared";
import apiInstance from "@/lib/api-instance";

class InspectorService {
  async login({ username, password }: { username: string; password: string }) {
    try {
      const res = await apiInstance.post(API_ENDPOINT.INSPECTOR.login, {
        username,
        password,
      });
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findMe() {
    try {
      const res = await apiInstance.get(API_ENDPOINT.INSPECTOR.me);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findAll({
    full_name,
    rank,
    gender,
    region,
    district,
    neighborhood,
  }: {
    full_name?: string;
    rank?: string;
    gender?: "male" | "female";
    region?: string;
    district?: string;
    neighborhood?: string;
  }) {
    try {
      const res = await apiInstance.get(API_ENDPOINT.INSPECTOR.base, {
        params: {
          full_name,
          rank,
          gender,
          region,
          district,
          neighborhood,
        },
      });
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export const inspectorService = new InspectorService();
