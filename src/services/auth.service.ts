import { privateInstance } from "@/common/api/client-api";
import { ENDPOINTS } from "@/common/api/endpoints";

class AuthService {
  async login({ uid, password }: { uid: string; password: string }) {
    try {
      const res = await privateInstance.post(ENDPOINTS.AUTH.LOGIN, {
        uid,
        password,
      });
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createUser(data: { uid: string; password: string; roles?: string[] }) {
    try {
      const res = await privateInstance.post(ENDPOINTS.AUTH.CREATE, data);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateUser(
    id: string,
    data: { uid?: string; password?: string; roles?: string[] }
  ) {
    try {
      const res = await privateInstance.put(ENDPOINTS.AUTH.UPDATE(id), data);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteUser(id: string) {
    try {
      const res = await privateInstance.delete(ENDPOINTS.AUTH.DELETE(id));
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getProfile() {
    try {
      const res = await privateInstance.get(ENDPOINTS.AUTH.ME);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async logout() {
    try {
      const res = await privateInstance.post(ENDPOINTS.AUTH.LOGOUT);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export const authService = new AuthService();
