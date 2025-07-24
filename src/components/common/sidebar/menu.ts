import type { AuthRoleType } from "@/common/types/auth-role.type";
import {
  Building,
  Building2,
  ChartColumn,
  Home,
  PersonStanding,
  School,
  Store,
} from "lucide-react";

export const menuGroups = [
  {
    label: "Asosiy",
    roles: ["super_admin", "province_inspector"] as AuthRoleType[],
    items: [
      {
        name: "Dashboard",
        path: "/",
        icon: Home,
        roles: ["super_admin", "province_inspector"] as AuthRoleType[],
      },
    ],
  },
  {
    label: "Viloyat",
    roles: ["super_admin", "province_inspector"] as AuthRoleType[],
    items: [
      {
        name: "Statistika",
        path: "/",
        icon: ChartColumn,
        roles: ["super_admin", "province_inspector"] as AuthRoleType[],
      },
      {
        name: "Tumanlar",
        path: "/regions/inspectors/count",
        icon: Building,
        roles: ["super_admin", "province_inspector"] as AuthRoleType[],
      },
      // {
      //   name: "Hodimlar",
      //   path: "/",
      //   icon: PersonStanding,
      //   roles: ["super_admin", "province_inspector"] as AuthRoleType[],
      // },
    ],
  },
  {
    label: "Tuman",
    roles: [
      "super_admin",
      "province_inspector",
      "district_inspector",
    ] as AuthRoleType[],
    items: [
      {
        name: "Statistika",
        path: "/",
        icon: ChartColumn,
        roles: [
          "super_admin",
          "province_inspector",
          "district_inspector",
        ] as AuthRoleType[],
      },
            {
        name: "Mahallalar",
        path: "/regions/inspectors",
        icon: Building,
        roles: ["super_admin", "province_inspector"] as AuthRoleType[],
      },
      {
        name: "Hodimlar",
        path: "/district/inspectors",
        icon: PersonStanding,
        roles: [
          "super_admin",
          "province_inspector",
          "district_inspector",
        ] as AuthRoleType[],
      },
    ],
  },
  {
    label: "Mahalla",
    roles: [
      "super_admin",
      "district_inspector",
      "province_inspector",
    ] as AuthRoleType[],
    items: [
      {
        name: "Statistika",
        path: "/",
        icon: ChartColumn,
        roles: [
          "super_admin",
          "district_inspector",
          "province_inspector",
        ] as AuthRoleType[],
      },
      {
        name: "Hodimlar",
        path: "/",
        icon: PersonStanding,
        roles: [
          "super_admin",
          "district_inspector",
          "province_inspector",
        ] as AuthRoleType[],
      },
    ],
  },
  {
    label: "Super",
    roles: ["super_admin"] as AuthRoleType[],
    items: [
      {
        name: "Statistika",
        path: "/super",
        icon: ChartColumn,
        roles: ["super_admin"] as AuthRoleType[],
      },
      {
        name: "Viloyatlar",
        path: "/super/regions",
        icon: Building2,
        roles: ["super_admin"] as AuthRoleType[],
      },
      {
        name: "Tumanlar",
        path: "/super/districts",
        icon: School,
        roles: ["super_admin"] as AuthRoleType[],
      },
      {
        name: "Mahallalar",
        path: "/super/neighborhoods",
        icon: Store,
        roles: ["super_admin"] as AuthRoleType[],
      },
    ],
  },
];
