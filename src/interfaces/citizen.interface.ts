export interface ICitizen {
  first_name: string;
  last_name: string;
  middle_name: string;
  birthday: string;
  gender: "male" | "female";
  region: string;
  district: string;
  neighborhood: string;
  house: string; // 32-uy
  pinfl: number;
  passport_number: number;
  passport_series: string;
  nationality: string; // millati
  photo: string;
  disability: boolean; // nogironligi bo'lsa true
  employment_status?: string;
  marital_status?: string;
  phone: string;
  education_level?: string; // Harbiy xizmat holati
  military_status?: string;
}
