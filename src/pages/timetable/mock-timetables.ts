import { MOCK_INSPECTORS } from "@/const/mock.data";
import type {
  ITimetableEntry,
  ITimetableTask,
  ShiftType,
  TaskCategory,
  TaskStatus,
} from "@/interfaces/timetable.interface";

const createRandomTask = (
  inspector: (typeof MOCK_INSPECTORS)[0],
  date: string,
  startHour: number,
  durationMinutes: number
): ITimetableTask => {
  const startTime = `${String(startHour).padStart(2, "0")}:00`;
  const endHour = startHour + Math.floor(durationMinutes / 60);
  const endMinute = durationMinutes % 60;
  const endTime = `${String(endHour).padStart(2, "0")}:${String(
    endMinute
  ).padStart(2, "0")}`;

  const categories: TaskCategory[] = [
    "BRIEFING",
    "MEETING",
    "MONITORING",
    "CONSULTATION",
    "INFRASTRUCTURE",
    "SOCIAL_AID",
    "INSPECTION",
    "OTHER",
  ];
  const statuses: TaskStatus[] = ["PENDING", "IN_PROGRESS", "COMPLETED"];
  const priorities: ITimetableTask["priority"][] = ["LOW", "MEDIUM", "HIGH"];

  const randomCategory =
    categories[Math.floor(Math.random() * categories.length)];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  const randomPriority =
    priorities[Math.floor(Math.random() * priorities.length)];

  const titles = {
    BRIEFING: "Tezkor brifing",
    MEETING: "Mahalla yig'ilishi",
    MONITORING: "Dastur monitoringi",
    CONSULTATION: "Aholi bilan maslahat",
    INFRASTRUCTURE: "Infratuzilma tekshiruvi",
    SOCIAL_AID: "Ijtimoiy yordam ko'rsatish",
    INSPECTION: "Uy-joy tekshiruvi",
    OTHER: "Boshqa vazifa",
  };

  return {
    id: crypto.randomUUID(),
    title: titles[randomCategory],
    description: `${titles[randomCategory]} bo'yicha batafsil ma'lumot.`,
    startTime,
    endTime,
    status: randomStatus,
    category: randomCategory,
    assignedTo: inspector,
    location: "Mahalla markazi",
    priority: randomPriority,
  };
};

const createDailyTimetable = (
  inspector: (typeof MOCK_INSPECTORS)[0],
  date: string,
  shiftType: ShiftType
): ITimetableEntry => {
  const tasks: ITimetableTask[] = [];

  if (shiftType === "MORNING") {
    tasks.push(createRandomTask(inspector, date, 8, 30)); // 08:00-08:30
    tasks.push(createRandomTask(inspector, date, 8, 90)); // 08:30-10:00
    tasks.push(createRandomTask(inspector, date, 10, 60)); // 10:00-11:00
    tasks.push(createRandomTask(inspector, date, 11, 60)); // 11:00-12:00
    tasks.push(createRandomTask(inspector, date, 12, 60)); // 12:00-13:00
    tasks.push(createRandomTask(inspector, date, 13, 60)); // 13:00-14:00
    tasks.push(createRandomTask(inspector, date, 14, 60)); // 14:00-15:00
  } else if (shiftType === "AFTERNOON") {
    tasks.push(createRandomTask(inspector, date, 15, 60)); // 15:00-16:00
    tasks.push(createRandomTask(inspector, date, 16, 60)); // 16:00-17:00
    tasks.push(createRandomTask(inspector, date, 17, 90)); // 17:00-18:30
    tasks.push(createRandomTask(inspector, date, 18, 30)); // 18:30-19:00
    tasks.push(createRandomTask(inspector, date, 19, 60)); // 19:00-20:00
    tasks.push(createRandomTask(inspector, date, 20, 120)); // 20:00-22:00
  }

  return {
    id: crypto.randomUUID(),
    date,
    shiftType,
    inspector,
    tasks,
  };
};

export const MOCK_TIMETABLES: ITimetableEntry[] = [];

// Bugungi sana
const today = new Date();

// Keyingi 7 kun uchun jadval yaratish
for (let i = 0; i < 7; i++) {
  const date = new Date(today);
  date.setDate(today.getDate() + i);
  const dateString = date.toISOString().split("T")[0];

  // Har bir inspektor uchun ertalabki va tushdan keyingi smenalar
  MOCK_INSPECTORS.forEach((inspector) => {
    MOCK_TIMETABLES.push(
      createDailyTimetable(inspector, dateString, "MORNING")
    );
    MOCK_TIMETABLES.push(
      createDailyTimetable(inspector, dateString, "AFTERNOON")
    );
  });
}
