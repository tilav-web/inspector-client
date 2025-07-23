import type { AuthRoleType } from "@/common/types/auth-role.type";

export interface IAuth {
  _id: string;
  uid: string;
  password: string;
  role: AuthRoleType;
  createdAt?: Date;
  updatedAt?: Date;
}
