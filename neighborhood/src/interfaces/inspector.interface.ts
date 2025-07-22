import type { IAuth } from "./auth.interface";

export interface IInspector {
  _id: string;
  auth: IAuth;
  first_name: string;
  last_name: string;
  middle_name: string;
  short_name: string;
  full_name: string;
}
