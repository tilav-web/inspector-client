import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar as CalendarIcon,
  Plus,
  Clock,
  MapPin,
  CheckCircle,
  XCircle,
  Hourglass,
  ChevronDown,
} from "lucide-react";
import { MOCK_TIMETABLES } from "./mock-timetables";

import {
  format,
  addDays,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
} from "date-fns";
import { uz } from "date-fns/locale";
import type { ITimetableTask, ShiftType, TaskStatus } from "@/interfaces/timetable.interface";
import { useInspectorStore } from "@/stores/inspector.store";

const getTaskStatusColor = (status: TaskStatus) => {
  switch (status) {
    case "COMPLETED":
      return "bg-green-100 text-green-800";
    case "IN_PROGRESS":
      return "bg-blue-100 text-blue-800";
    case "PENDING":
      return "bg-yellow-100 text-yellow-800";
    case "CANCELLED":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getTaskStatusIcon = (status: TaskStatus) => {
  switch (status) {
    case "COMPLETED":
      return <CheckCircle className="w-4 h-4 text-green-600" />;
    case "IN_PROGRESS":
      return <Hourglass className="w-4 h-4 text-blue-600" />;
    case "PENDING":
      return <Clock className="w-4 h-4 text-yellow-600" />;
    case "CANCELLED":
      return <XCircle className="w-4 h-4 text-gray-600" />;
    default:
      return <Clock className="w-4 h-4 text-gray-600" />;
  }
};

const ShiftDisplay = ({ shiftType }: { shiftType: ShiftType }) => {
  switch (shiftType) {
    case "MORNING":
      return (
        <Badge variant="secondary" className="bg-blue-50 text-blue-700">
          Ertalabki smena
        </Badge>
      );
    case "AFTERNOON":
      return (
        <Badge variant="secondary" className="bg-indigo-50 text-indigo-700">
          Tushdan keyingi smena
        </Badge>
      );
    case "WEEKLY":
      return (
        <Badge variant="secondary" className="bg-purple-50 text-purple-700">
          Haftalik reja
        </Badge>
      );
    case "QUARTERLY":
      return (
        <Badge variant="secondary" className="bg-pink-50 text-pink-700">
          Choraklik reja
        </Badge>
      );
    case "FLEXIBLE":
      return (
        <Badge variant="secondary" className="bg-orange-50 text-orange-700">
          Maxsus smena
        </Badge>
      );
    default:
      return <Badge variant="secondary">Noma'lum smena</Badge>;
  }
};

const TaskCard = ({ task }: { task: ITimetableTask }) => (
  <Card className="p-3 shadow-sm hover:shadow-md transition-shadow duration-200 border-l-4 border-blue-400 w-full">
    <div className="flex items-start justify-between mb-2 gap-2">
      <div className="flex items-center gap-2 min-w-0 flex-1">
        {getTaskStatusIcon(task.status)}
        <span className="font-semibold text-gray-800 text-sm truncate">{task.title}</span>
      </div>
      <Badge className={`${getTaskStatusColor(task.status)} text-xs whitespace-nowrap`}>
        {task.status}
      </Badge>
    </div>
    <p className="text-xs text-gray-600 mb-2 line-clamp-2 break-words">{task.description}</p>
    <div className="flex items-center justify-between text-xs text-gray-500 gap-2">
      <div className="flex items-center gap-1 min-w-0">
        <Clock className="w-3 h-3 flex-shrink-0" />
        <span className="truncate">
          {task.startTime} - {task.endTime}
        </span>
      </div>
      {task.location && (
        <div className="flex items-center gap-1 min-w-0">
          <MapPin className="w-3 h-3 flex-shrink-0" />
          <span className="truncate">{task.location}</span>
        </div>
      )}
    </div>
  </Card>
);

export default function TimetablePage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [visibleTasksCount, setVisibleTasksCount] = useState<{ [key: string]: number }>({});
  const { inspector } = useInspectorStore();

  const filteredTimetables = useMemo(() => {
    if (!inspector) return [];
    return MOCK_TIMETABLES.filter(
      (entry) => entry.inspector.id === inspector.id
    );
  }, [inspector]);

  const daysInWeek = useMemo(() => {
    const start = startOfWeek(currentDate, { locale: uz });
    const end = endOfWeek(currentDate, { locale: uz });
    return eachDayOfInterval({ start, end });
  }, [currentDate]);

  const getTimetableForDay = (date: Date) => {
    const dateString = format(date, "yyyy-MM-dd");
    return filteredTimetables.filter(
      (entry) => entry.date === dateString
    );
  };

  const getVisibleTasks = (date: Date) => {
    const dateString = format(date, "yyyy-MM-dd");
    const dayEntries = getTimetableForDay(date);
    const allTasks = dayEntries.flatMap(entry => entry.tasks);
    const visibleCount = visibleTasksCount[dateString] || 5;
    return {
      tasks: allTasks.slice(0, visibleCount),
      hasMore: allTasks.length > visibleCount,
      total: allTasks.length
    };
  };

  const loadMoreTasks = (date: Date) => {
    const dateString = format(date, "yyyy-MM-dd");
    const currentVisible = visibleTasksCount[dateString] || 5;
    setVisibleTasksCount(prev => ({
      ...prev,
      [dateString]: currentVisible + 5
    }));
  };

  return (
    <div className="p-4 md:p-8 min-h-screen">
      <div className="mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <CalendarIcon className="text-blue-600" />
              Ish Jadvali
            </h1>
            <p className="text-gray-500 mt-1">
              {inspector ? `${inspector.first_name} ${inspector.last_name} - kunlik va haftalik ish rejalari` : "Ish jadvali"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button className="bg-blue-600 hover:bg-blue-700 shadow-md">
              <Plus className="h-4 w-4 mr-2" />
              Yangi vazifa
            </Button>
          </div>
        </div>

        {/* Haftalik ko'rinish */}
        <Card className="shadow-lg w-full">
          <CardHeader className="border-b">
            <CardTitle className="text-xl flex items-center justify-between">
              <span>
                {format(startOfWeek(currentDate, { locale: uz }), "dd MMMM", {
                  locale: uz,
                })}{" "}
                -{" "}
                {format(
                  endOfWeek(currentDate, { locale: uz }),
                  "dd MMMM yyyy",
                  { locale: uz }
                )}
              </span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentDate((prev) => addDays(prev, -7))}
                >
                  Oldingi hafta
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentDate(new Date())}
                >
                  Bugun
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentDate((prev) => addDays(prev, 7))}
                >
                  Keyingi hafta
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="w-full h-full overflow-x-auto">
              <div className="flex items-start border-b w-full">
                {daysInWeek.map((day) => (
                  <div
                    key={day.toISOString()}
                    className="text-center p-6 bg-gray-50 border-r last:border-r-0 min-w-[300px]"
                  >
                    <p className="text-sm font-medium text-gray-700">
                      {format(day, "EEE", { locale: uz })}
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      {format(day, "dd")}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex items-stretch">
                {daysInWeek.map((day) => {
                  const { tasks, hasMore, total } = getVisibleTasks(day);
                  const dayEntries = getTimetableForDay(day);
                  
                  return (
                    <div
                      key={day.toISOString()}
                      className="p-6 border-r last:border-r-0 min-h-[400px] relative min-w-[300px] overflow-hidden"
                    >
                      {dayEntries.map((entry) => (
                        <div key={entry.id} className="mb-4">
                          <ShiftDisplay shiftType={entry.shiftType} />
                        </div>
                      ))}
                      
                      <div className="space-y-2 w-full">
                        {tasks.map((task) => (
                          <TaskCard key={task.id} task={task} />
                        ))}
                      </div>
                      
                      {hasMore && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full mt-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-xs"
                          onClick={() => loadMoreTasks(day)}
                        >
                          <ChevronDown className="w-3 h-3 mr-1" />
                          Ko'proq ko'rsatish ({total - tasks.length})
                        </Button>
                      )}
                      
                      {tasks.length === 0 && (
                        <p className="text-sm text-gray-400 text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                          Vazifalar yo'q
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
