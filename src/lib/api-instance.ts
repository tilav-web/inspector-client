import { handleStorage } from "@/utils/handle-storage";
import axios from "axios";

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

apiInstance.interceptors.request.use((config) => {
  const access_token = handleStorage({ key: "access_token" });
  config.headers["Authorization"] = `Bearer ${access_token}`;

  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  } else {
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

export default apiInstance;
