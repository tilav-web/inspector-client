import type { IDistrict } from "./district.interface";

export interface INeighborhood {
  id: string;
  name: string;
  region: string;
  district: IDistrict;
}
