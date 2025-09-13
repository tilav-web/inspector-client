import type { IInspector } from "../interfaces/inspector.interface";

const authId1 = "a1b2c3d4-e5f6-7890-1234-567890abcdef";
const authId2 = "b2c3d4e5-f6a7-8901-2345-67890abcdef0";
const authId3 = "c3d4e5f6-a7b8-9012-3456-7890abcdef01";
const authId4 = "d4e5f6a7-b8c9-0123-4567-890abcdef012";

// Helper function to generate a simple UUID-like string
const generateUuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

// Helper function to generate random names
const getRandomName = (type: 'first' | 'last' | 'middle', gender: 'male' | 'female') => {
  const maleFirstNames = ["Ali", "Vali", "G'ani", "Botir", "Rustam", "Jasur", "Farhod", "Bekzod", "Shuhrat", "Dilshod"];
  const femaleFirstNames = ["Gulnora", "Dilfuza", "Zuhra", "Nigora", "Madina", "Laylo", "Shahnoza", "Feruza", "Malika", "Sevara"];
  const lastNames = ["Ahmedov", "Karimov", "Alimov", "Saidov", "Raximov", "Usmonov", "Sobirov", "Azizov", "Rustamov", "Jalilov"];

  if (type === 'first') {
    return gender === 'male' ? maleFirstNames[Math.floor(Math.random() * maleFirstNames.length)] : femaleFirstNames[Math.floor(Math.random() * femaleFirstNames.length)];
  } else if (type === 'last') {
    return lastNames[Math.floor(Math.random() * lastNames.length)];
  } else {
    return gender === 'male' ? lastNames[Math.floor(Math.random() * lastNames.length)] + 'ovich' : lastNames[Math.floor(Math.random() * lastNames.length)] + 'ovna';
  }
};

// Helper function to generate random dates
const getRandomDate = (startYear: number, endYear: number) => {
  const year = startYear + Math.floor(Math.random() * (endYear - startYear + 1));
  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
  const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
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
    region: "toshkent_sh",
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
        region: "toshkent_sh",
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
    region: "toshkent_vil",
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
        region: "toshkent_vil",
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
    region: "fargona_vil",
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
        region: "fargona_vil",
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
    region: "andijon_vil",
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
        region: "andijon_vil",
        district: "andijon_sh",
        neighborhood: "soglom_avlod",
        status: true,
      },
    ],
    photo: "https://i.pravatar.cc/300?u=neighborhood_inspector_1",
  },
];

// Generate 30 more neighborhood inspectors
for (let i = 5; i <= 34; i++) {
  const gender = Math.random() > 0.5 ? 'male' : 'female';
  const firstName = getRandomName('first', gender);
  const lastName = getRandomName('last', gender);
  const middleName = getRandomName('middle', gender);
  const authId = generateUuid();
  const inspectorId = generateUuid();

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
    region: "toshkent_sh", // Example region
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
        region: "toshkent_sh",
        district: "chilonzor",
        neighborhood: `neighborhood_${i}`,
        status: true,
      },
    ],
    photo: `https://i.pravatar.cc/300?u=neighborhood_inspector_${i}`,
  });
}