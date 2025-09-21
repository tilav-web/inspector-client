import type { IAuth } from "./auth.interface";
import type { IDistrict } from "./district.interface";
import type { INeighborhood } from "./neighborhood.interface";
import type { IRegion } from "./region.interface";

export interface IInspector {
  _id: string;
  auth: IAuth; // auth id
  first_name: string;
  last_name: string;
  middle_name: string;
  birthday: string;
  rank: string; // MFY Inspector ==== unvoni
  address: {
    region: IRegion;
    district: IDistrict;
    neighborhood: INeighborhood;
    detail: string;
  };
  pinfl: number;
  passport_number: number;
  passport_series: string;
  gender: "male" | "female";
  phone: string;
  nationality: string; // millati
  workplaces: IInspectorWorkplace[];
  photo: string;
}

export interface IInspectorWorkplace {
  _id: string;
  position: string; // lavozimi
  region: IRegion;
  district: IDistrict;
  neighborhood: INeighborhood;
  note?: string;
  status: boolean;
}
