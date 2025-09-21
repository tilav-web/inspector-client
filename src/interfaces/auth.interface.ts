export type AuthRole = "state" | "region" | "district" | "neighborhood";

export interface IAuth {
  _id: string;
  username: string;
  password?: string;
  role: AuthRole;
}
