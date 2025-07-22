import { privateInstance } from "@/common/api/client-api";
import { ENDPOINTS } from "@/common/api/endpoints";

interface InspectorData {
  auth: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  short_name: string;
  full_name: string;
}

class InspectorService {
  async create(data: InspectorData) {
    try {
      const res = await privateInstance.post(ENDPOINTS.INSPECTOR.CREATE, data);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getAll() {
    try {
      const res = await privateInstance.get(ENDPOINTS.INSPECTOR.GET_ALL);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getOne(id: string) {
    try {
      const res = await privateInstance.get(ENDPOINTS.INSPECTOR.GET_ONE(id));
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async update(id: string, data: Partial<InspectorData>) {
    try {
      const res = await privateInstance.put(
        ENDPOINTS.INSPECTOR.UPDATE(id),
        data
      );
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async delete(id: string) {
    try {
      const res = await privateInstance.delete(ENDPOINTS.INSPECTOR.DELETE(id));
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findMe() {
    try {
      const res = await privateInstance.get(ENDPOINTS.INSPECTOR.ME);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export const inspectorService = new InspectorService();
