export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    ME: "/auth/profile",
    CREATE: "/auth/create", // O'zgartirildi
    UPDATE: (id: string) => `/auth/${id}`,
    DELETE: (id: string) => `/auth/${id}`,
  },
  INSPECTOR: {
    BASE: "/inspector",
    GET_ALL: "/inspector",
    GET_ONE: (id: string) => `/inspector/${id}`,
    CREATE: "/inspector",
    UPDATE: (id: string) => `/inspector/${id}`,
    DELETE: (id: string) => `/inspector/${id}`,
    ME: "/inspector/me",
  },
  REGIONS: {
    BASE: "/regions",
    INSPECTORS: "/regions/inspectors",
  },
};
