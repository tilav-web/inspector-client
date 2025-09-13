export interface ICitizen {
  id: string;
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
  education_level?: string; // oliy, tugallanmagan oliy, abiturent etc...
  military_status?: string; // Harbiy xizmat holati
  household: IHousehold;
}

export interface IHousehold {
  id: string;
  region: string;
  district: string;
  neighborhood: string;
  house: string;
  private: boolean; // uy shaxsiy true yoki ijara false
  ownership?: ICitizen; // uy shaxsiy bo'lsa uy egasi
  families_count: number;
  citizens: ICitizen[];
  type: "yard" | "house";
  land_area: number; // kv
  details: {
    [key: string]: string[]; // "tv": ["sumsung 57"], "avtomobil": ["nexia 3", "matiz"], "sigir": ["6"], "qo'y": ["12"] etc...
  };
}
