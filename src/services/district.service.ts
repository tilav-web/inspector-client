import { privateInstance } from "@/common/api/client-api";
import type { IInspector } from "@/interfaces/inspector.interface";

interface InspectorResponse {
  data: IInspector[];
  total: number;
  page: number;
  lastPage: number;
}

export const DistrictService = {
  findAllInspectors: async (
    page: number,
    limit: number,
    region?: string,
    district?: string
  ): Promise<InspectorResponse> => {
    const response = await privateInstance.get("/district/inspectors", {
      params: {
        page,
        limit,
        region,
        district,
      },
    });
    return response.data;
  },
};
