
import type { ICalls } from "../interfaces/calls.interface";
import { MOCK_INSPECTORS } from "./mock.data";

export const MOCK_CALLS: ICalls[] = [
  {
    id: "call-1",
    incident: "Mahallada suv toshqini",
    type: "Favqulodda vaziyat",
    location: {
      latitude: 41.311081,
      longitude: 69.240562,
      address: "Toshkent, Amir Temur ko'chasi, 1-uy",
    },
    status: "pending",
    priority: "high",
    inspector: MOCK_INSPECTORS[0],
    witnesses: ["Aliyev Vali", "Valiyev Ali"],
    evidence: ["photo1.jpg", "video1.mp4"],
    notes: "Suv sathi ko'tarilmoqda, tezkor yordam kerak.",
  },
  {
    id: "call-2",
    incident: "Elektr uzilishi",
    type: "Texnik nosozlik",
    location: {
      latitude: 41.299496,
      longitude: 69.281921,
      address: "Toshkent, Navoiy ko'chasi, 15-uy",
    },
    status: "in_progress",
    priority: "medium",
    inspector: MOCK_INSPECTORS[1],
    notes: "Elektr ta'minoti brigadasi yo'lda.",
  },
  {
    id: "call-3",
    incident: "Yo'l-transport hodisasi",
    type: "Hodisa",
    location: {
      latitude: 41.333333,
      longitude: 69.333333,
      address: "Toshkent, Mustaqillik shoh ko'chasi, 5-uy",
    },
    status: "resolved",
    priority: "high",
    inspector: MOCK_INSPECTORS[2],
    witnesses: ["Salimov Salim"],
    evidence: ["photo2.jpg"],
    notes: "YTH bartaraf etildi, jabrlanganlar yo'q.",
  },
  {
    id: "call-4",
    incident: "Jamoat tartibini buzish",
    type: "Huquqbuzarlik",
    location: {
      latitude: 41.288888,
      longitude: 69.266666,
      address: "Toshkent, Chilonzor tumani, 6-kvartal",
    },
    status: "pending",
    priority: "medium",
    inspector: MOCK_INSPECTORS[3],
    notes: "Fuqarolar o'rtasida janjal kelib chiqqan.",
  },
  {
    id: "call-5",
    incident: "Gaz sizib chiqishi",
    type: "Favqulodda vaziyat",
    location: {
      latitude: 41.322222,
      longitude: 69.299999,
      address: "Toshkent, Yunusobod tumani, 11-kvartal",
    },
    status: "closed",
    priority: "critical",
    inspector: MOCK_INSPECTORS[0],
    notes: "Gaz xizmati tomonidan bartaraf etildi.",
  },
];
