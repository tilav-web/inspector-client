export const API_ENDPOINT = {
  INSPECTOR: {
    base: "/inspectors",
    login: "/inspectors/login",
    me: "/inspectors/me",
    findById: "/inspectors/by",
  },
  REGION: {
    base: "/regions",
  },
  DISTRICT: {
    base: "/districts",
    findByRegion: "/districts/region",
  },
  NEIGHBORHOOD: {
    base: "/neighborhoods",
    findByRegionAndDistrict: ({
      region,
      district,
    }: {
      region: string;
      district: string;
    }) => `/region/${region}/district/${district}`,
  },
};
