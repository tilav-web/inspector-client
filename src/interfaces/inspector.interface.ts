import type { IAuth } from "./auth.interface";

export interface IInspector {
  id: string;
  auth: IAuth; // auth id
  first_name: string;
  last_name: string;
  middle_name: string;
  birthday: string;
  rank: string; // MFY Inspector ==== unvoni
  region: string;
  district: string;
  neighborhood: string;
  pinfl: number;
  passport_number: number;
  passport_series: string;
  gender: "male" | "female";
  phone: string;
  nationality: string; // millati
  workplace: IInspectorWorkplace[];
  photo: string;
}

export interface IInspectorWorkplace {
  id: string;
  position: string; // lavozimi
  region: string;
  district: string;
  neighborhood: string;
  desc?: string;
  status: boolean;
}
