import type { IInspector } from "../interfaces/inspector.interface";
import type { ICitizen, IHousehold } from "../interfaces/citizen.interface";

const authId1 = "a1b2c3d4-e5f6-7890-1234-567890abcdef";
const authId2 = "b2c3d4e5-f6a7-8901-2345-67890abcdef0";
const authId3 = "c3d4e5f6-a7b8-9012-3456-7890abcdef01";
const authId4 = "d4e5f6a7-b8c9-0123-4567-890abcdef012";

// Helper function to generate a simple UUID-like string
const generateUuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// Helper function to generate random names
const getRandomName = (
  type: "first" | "last" | "middle",
  gender: "male" | "female"
) => {
  const maleFirstNames = [
    "Ali",
    "Vali",
    "G'ani",
    "Botir",
    "Rustam",
    "Jasur",
    "Farhod",
    "Bekzod",
    "Shuhrat",
    "Dilshod",
  ];
  const femaleFirstNames = [
    "Gulnora",
    "Dilfuza",
    "Zuhra",
    "Nigora",
    "Madina",
    "Laylo",
    "Shahnoza",
    "Feruza",
    "Malika",
    "Sevara",
  ];
  const lastNames = [
    "Ahmedov",
    "Karimov",
    "Alimov",
    "Saidov",
    "Raximov",
    "Usmonov",
    "Sobirov",
    "Azizov",
    "Rustamov",
    "Jalilov",
  ];

  if (type === "first") {
    return gender === "male"
      ? maleFirstNames[Math.floor(Math.random() * maleFirstNames.length)]
      : femaleFirstNames[Math.floor(Math.random() * femaleFirstNames.length)];
  } else if (type === "last") {
    return lastNames[Math.floor(Math.random() * lastNames.length)];
  } else {
    return gender === "male"
      ? lastNames[Math.floor(Math.random() * lastNames.length)] + "ovich"
      : lastNames[Math.floor(Math.random() * lastNames.length)] + "ovna";
  }
};

// Helper function to generate random dates
const getRandomDate = (startYear: number, endYear: number) => {
  const year =
    startYear + Math.floor(Math.random() * (endYear - startYear + 1));
  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0");
  const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const MOCK_INSPECTORS: IInspector[] = [
  {
    id: "ins1pector-1a2b-3c4d-5e6f-7g8h9i0j1k2",
    auth: {
      id: authId1,
      username: "state_admin",
      role: "state",
    },
    first_name: "Aziz",
    last_name: "Azizov",
    middle_name: "Azizovich",
    birthday: "1980-01-01",
    rank: "Davlat inspektori",
    region: "Toshkent shahri",
    district: "yunusobod",
    neighborhood: "moyqorghon",
    pinfl: 12345678901234,
    passport_number: 1234567,
    passport_series: "AB",
    gender: "male",
    phone: "+998901234567",
    nationality: "O'zbek",
    workplace: [
      {
        id: "wp-1-1",
        position: "Bosh inspektor",
        region: "Toshkent shahri",
        district: "yunusobod",
        neighborhood: "moyqorghon",
        status: true,
      },
    ],
    photo: "https://i.pravatar.cc/300?u=state_admin",
  },
  {
    id: "ins2pector-2b3c-4d5e-6f7g-8h9i0j1k2l3",
    auth: {
      id: authId2,
      username: "region_inspector_1",
      role: "region",
    },
    first_name: "Vali",
    last_name: "Valiyev",
    middle_name: "Valiyevich",
    birthday: "1985-05-10",
    rank: "Viloyat inspektori",
    region: "Toshkent viloyati",
    district: "olmaliq",
    neighborhood: "oltin_tepa",
    pinfl: 23456789012345,
    passport_number: 2345678,
    passport_series: "AC",
    gender: "male",
    phone: "+998912345678",
    nationality: "O'zbek",
    workplace: [
      {
        id: "wp-2-1",
        position: "Katta inspektor",
        region: "Toshkent viloyati",
        district: "olmaliq",
        neighborhood: "oltin_tepa",
        status: true,
      },
    ],
    photo: "https://i.pravatar.cc/300?u=region_inspector_1",
  },
  {
    id: "ins3pector-3c4d-5e6f-7g8h-9i0j1k2l3m4",
    auth: {
      id: authId3,
      username: "district_inspector_1",
      role: "district",
    },
    first_name: "Salim",
    last_name: "Salimov",
    middle_name: "Salimovich",
    birthday: "1990-11-20",
    rank: "Tuman inspektori",
    region: "Farg'ona viloyati",
    district: "margilon",
    neighborhood: "yangi_hayot",
    pinfl: 34567890123456,
    passport_number: 3456789,
    passport_series: "AD",
    gender: "male",
    phone: "+998934567890",
    nationality: "O'zbek",
    workplace: [
      {
        id: "wp-3-1",
        position: "Inspektor",
        region: "Farg'ona viloyati",
        district: "margilon",
        neighborhood: "yangi_hayot",
        status: true,
      },
    ],
    photo: "https://i.pravatar.cc/300?u=district_inspector_1",
  },
  {
    id: "ins4pector-4d5e-6f7g-8h9i-0j1k2l3m4n5",
    auth: {
      id: authId4,
      username: "neighborhood_inspector_1",
      role: "neighborhood",
    },
    first_name: "Zarina",
    last_name: "Zarinova",
    middle_name: "Zarinovna",
    birthday: "1995-03-15",
    rank: "Mahalla inspektori",
    region: "Andijon viloyati",
    district: "andijon_sh",
    neighborhood: "soglom_avlod",
    pinfl: 45678901234567,
    passport_number: 4567890,
    passport_series: "AE",
    gender: "female",
    phone: "+998945678901",
    nationality: "O'zbek",
    workplace: [
      {
        id: "wp-4-1",
        position: "MFY Inspektori",
        region: "Andijon viloyati",
        district: "andijon_sh",
        neighborhood: "soglom_avlod",
        status: true,
      },
    ],
    photo: "https://i.pravatar.cc/300?u=neighborhood_inspector_1",
  },
];

// Helper function to get random item from array
const getRandomItem = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

// Regions data
export const regions = [
  { id: 1, name: "Andijon viloyati" },
  { id: 2, name: "Buxoro viloyati" },
  { id: 3, name: "Farg'ona viloyati" },
  { id: 4, name: "Jizzax viloyati" },
  { id: 5, name: "Xorazm viloyati" },
  { id: 6, name: "Namangan viloyati" },
  { id: 7, name: "Navoiy viloyati" },
  { id: 8, name: "Qashqadaryo viloyati" },
  { id: 9, name: "Samarqand viloyati" },
  { id: 10, name: "Sirdaryo viloyati" },
  { id: 11, name: "Surxondaryo viloyati" },
  { id: 12, name: "Toshkent viloyati" },
  { id: 13, name: "Toshkent shahri" },
  { id: 14, name: "Qoraqalpog'iston Respublikasi" },
];

// Generate 30 more neighborhood inspectors
for (let i = 5; i <= 34; i++) {
  const gender = Math.random() > 0.5 ? "male" : "female";
  const firstName = getRandomName("first", gender);
  const lastName = getRandomName("last", gender);
  const middleName = getRandomName("middle", gender);
  const authId = generateUuid();
  const inspectorId = generateUuid();

  const randomRegion = getRandomItem(regions); // Select a random region object
  const randomRegionName = randomRegion.name; // Get its name

  MOCK_INSPECTORS.push({
    id: `ins${i}pector-${inspectorId.substring(0, 10)}`,
    auth: {
      id: authId,
      username: `neighborhood_inspector_${i}`,
      role: "neighborhood",
    },
    first_name: firstName,
    last_name: lastName,
    middle_name: middleName,
    birthday: getRandomDate(1970, 2000),
    rank: "Mahalla inspektori",
    region: randomRegionName, // Use the random region name
    district: "chilonzor", // Example district
    neighborhood: `neighborhood_${i}`, // Unique neighborhood
    pinfl: 10000000000000 + i,
    passport_number: 1000000 + i,
    passport_series: `AZ${String.fromCharCode(65 + (i % 26))}`,
    gender: gender,
    phone: `+9989${Math.floor(Math.random() * 90000000 + 10000000)}`,
    nationality: "O'zbek",
    workplace: [
      {
        id: `wp-${i}-1`,
        position: "MFY Inspektori",
        region: randomRegionName, // Use the random region name
        district: "chilonzor",
        neighborhood: `neighborhood_${i}`,
        status: true,
      },
    ],
    photo: `https://i.pravatar.cc/300?u=neighborhood_inspector_${i}`,
  });
}

// --- MOCK CITIZENS DATA ---

const employmentStatuses = [
  "Ishlaydi",
  "Ishsiz",
  "Talaba",
  "Pensioner",
  "Vaqtincha ishsiz",
];
const maritalStatuses = [
  "Bo'ydoq",
  "Uylangan",
  "Turmushga chiqqan",
  "Ajrashgan",
  "Beva",
];
const educationLevels = [
  "Oliy",
  "Tugallanmagan oliy",
  "O'rta maxsus",
  "O'rta",
  "Boshlang'ich",
];
const militaryStatuses = [
  "Xizmat qilgan",
  "Xizmat qilmagan",
  "Zaxiradagi ofitser",
  "Nogironlik sababli ozod",
];
export const districtsByRegion: { [key: string]: string[] } = {
  toshkent_sh: [
    "chilonzor",
    "yunusobod",
    "mirobod",
    "mirzo_ulugbek",
    "shayxontohur",
  ],
  fargona_vil: ["margilon", "qoqon", "fergana_sh", "rishton", "bogdod"],
};

const generateMockCitizens = (): ICitizen[] => {
  const citizens: ICitizen[] = [];
  const households: { [key: string]: IHousehold } = {};

  for (let i = 0; i < 30; i++) {
    const gender = Math.random() > 0.5 ? "male" : "female";
    const regionObject = getRandomItem(regions); // Get the region object
    const regionName = regionObject.name; // Get the full region name
    const regionSlug = regionName; // Get the slug for districtsByRegion

    const district = getRandomItem(
      districtsByRegion[regionSlug] || ["tuman_1", "tuman_2"]
    );
    const neighborhood = `mahalla_${Math.floor(i / 5) + 1}`;
    const houseNumber = `${Math.floor(Math.random() * 100) + 1}-uy`;
    const householdId = `${regionSlug}-${district}-${neighborhood}-${houseNumber}`;

    const citizen: ICitizen = {
      id: generateUuid(),
      first_name: getRandomName("first", gender),
      last_name: getRandomName("last", gender),
      middle_name: getRandomName("middle", gender),
      birthday: getRandomDate(1950, 2005),
      gender: gender,
      region: regionName, // Use full region name for citizen
      district: district,
      neighborhood: neighborhood,
      house: houseNumber,
      pinfl: 30000000000000 + Math.floor(Math.random() * 10000000000000),
      passport_number: Math.floor(Math.random() * 9000000) + 1000000,
      passport_series: `${String.fromCharCode(
        65 + Math.floor(Math.random() * 26)
      )}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
      nationality: "O'zbek",
      photo: `https://i.pravatar.cc/300?u=${generateUuid()}`,
      disability: Math.random() > 0.9,
      employment_status: getRandomItem(employmentStatuses),
      marital_status: getRandomItem(maritalStatuses),
      phone: `+9989${Math.floor(Math.random() * 90000000 + 10000000)}`,
      education_level: getRandomItem(educationLevels),
      military_status:
        gender === "male" ? getRandomItem(militaryStatuses) : undefined,
      household: {} as IHousehold, // Will be populated later
    };

    if (!households[householdId]) {
      const isPrivate = Math.random() > 0.3;
      households[householdId] = {
        id: householdId,
        region: regionName, // Use full region name for household
        district: district,
        neighborhood: neighborhood,
        house: houseNumber,
        private: isPrivate,
        ownership: isPrivate ? citizen : undefined, // First person in household is owner if private
        families_count: 1,
        citizens: [],
        type: Math.random() > 0.5 ? "yard" : "house",
        land_area: Math.floor(Math.random() * 500) + 50,
        details: {
          avtomobil: Math.random() > 0.7 ? ["Nexia 3"] : [],
          sigir:
            Math.random() > 0.8
              ? [String(Math.floor(Math.random() * 5) + 1)]
              : [],
          qoy:
            Math.random() > 0.6
              ? [String(Math.floor(Math.random() * 20) + 1)]
              : [],
        },
      };
    }

    households[householdId].citizens.push(citizen);
    citizen.household = households[householdId];
    citizens.push(citizen);
  }

  // Update families_count and ownership
  for (const key in households) {
    const household = households[key];
    household.families_count = new Set(
      household.citizens.map((c) => c.last_name)
    ).size;
    if (household.private && !household.ownership) {
      household.ownership = household.citizens[0];
    }
  }

  return citizens;
};

export const MOCK_CITIZENS: ICitizen[] = generateMockCitizens();
