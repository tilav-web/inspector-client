import type { IDistrict } from "./district.interface";

export interface INeighborhood {
  _id: string;
  name: string;
  region: string;
  district: IDistrict;
}
