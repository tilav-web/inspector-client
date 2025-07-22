export const AuthRoleEnum = {
  PROVINCE_INSPECTOR: "province_inspector", // viloyat_inspektori
  DISTRICT_INSPECTOR: "district_inspector", // tuman_inspektori
  NEIGHBORHOOD_INSPECTOR: "neighborhood_inspector", // mahalla_inspektori
  NEIGHBORHOOD_LEADER: "neighborhood_leader", // mahalla_yetakchisi
  SUPER_ADMIN: "super_admin", // super_admin
};

export type AuthRoleType =
  | "province_inspector"
  | "district_inspector"
  | "neighborhood_inspector"
  | "neighborhood_leader"
  | "super_admin";
