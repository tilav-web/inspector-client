import {
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
    items: [
      {
        name: "Dashboard",
        path: "/",
        icon: Home,
      },
    ],
  },
  {
    label: "Viloyat",
    items: [
      {
        name: "Statistika",
        path: "/",
        icon: ChartColumn,
      },
      {
        name: "Hodimlar",
        path: "/",
        icon: PersonStanding,
      },
    ],
  },
  {
    label: "Tuman",
    items: [
      {
        name: "Statistika",
        path: "/",
        icon: ChartColumn,
      },
      {
        name: "Hodimlar",
        path: "/",
        icon: PersonStanding,
      },
    ],
  },
  {
    label: "Mahalla",
    items: [
      {
        name: "Statistika",
        path: "/",
        icon: ChartColumn,
      },
      {
        name: "Hodimlar",
        path: "/",
        icon: PersonStanding,
      },
    ],
  },
  {
    label: "Super",
    items: [
      {
        name: "Statistika",
        path: "/super",
        icon: ChartColumn,
      },
      {
        name: "Viloyatlar",
        path: "/super/regions",
        icon: Building2,
      },
      {
        name: "Tumanlar",
        path: "/super/districts",
        icon: School,
      },
      {
        name: "Mahallalar",
        path: "/super/neighborhoods",
        icon: Store,
      },
    ],
  },
];
