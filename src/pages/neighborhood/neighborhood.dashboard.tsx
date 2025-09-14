import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Calendar,
  Users,
  FileText,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Settings,
  BarChart3,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function NeighborhoodDashboard() {
  // Mock data for dashboard
  const todaysTasks = [
    {
      id: 1,
      time: "08:00-08:30",
      task: "Tezkor brifing va jihozlarni tekshirish",
      status: "bajarildi",
      type: "briefing",
    },
    {
      id: 2,
      time: "08:30-09:30",
      task: "Mahalla yig'ilishlari va maslahatlar",
      status: "jarayonda",
      type: "meeting",
    },
    {
      id: 3,
      time: "09:30-11:00",
      task: "Oilani qo'llab-quvvatlash dasturi monitoringi",
      status: "kutilmoqda",
      type: "monitoring",
    },
    {
      id: 4,
      time: "11:00-12:00",
      task: "Yoshlar tarbiyasi bo'yicha maslahatlar",
      status: "kutilmoqda",
      type: "consultation",
    },
    {
      id: 5,
      time: "14:00-15:00",
      task: "Infratuzilmani boshqarish",
      status: "kutilmoqda",
      type: "infrastructure",
    },
  ];

  const stats = [
    {
      label: "Bugun bajarilgan vazifalar",
      value: "3/8",
      progress: 37.5,
      icon: CheckCircle,
    },
    { label: "Faol fuqarolar", value: "1,247", change: "+12", icon: Users },
    {
      label: "Kutilayotgan hisobotlar",
      value: "5",
      urgent: true,
      icon: FileText,
    },
    {
      label: "Rejalashtirilgan tekshiruvlar",
      value: "12",
      change: "+3",
      icon: MapPin,
    },
  ];

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case "bajarildi":
        return "bg-green-100 text-green-800 border-green-200";
      case "jarayonda":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "kutilmoqda":
        return "bg-yellow-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case "briefing":
        return <Settings className="w-4 h-4" />;
      case "meeting":
        return <Users className="w-4 h-4" />;
      case "monitoring":
        return <BarChart3 className="w-4 h-4" />;
      case "consultation":
        return <FileText className="w-4 h-4" />;
      case "infrastructure":
        return <MapPin className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6 space-y-6">
        {/* Welcome section */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-balance">
            Xayrli tong, Inspektor Karimov
          </h2>
          <p className="text-muted-foreground">
            Bugun uchun 5 ta vazifa rejalashtirilgan. Joriy smena: Ertalab
            (08:00-15:00)
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-2xl font-bold">{stat.value}</p>
                      {stat.change && (
                        <Badge variant="secondary" className="text-xs">
                          {stat.change}
                        </Badge>
                      )}
                      {stat.urgent && (
                        <Badge variant="destructive" className="text-xs">
                          Shoshilinch
                        </Badge>
                      )}
                    </div>
                    {stat.progress && (
                      <Progress value={stat.progress} className="h-2" />
                    )}
                  </div>
                  <stat.icon className="w-8 h-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Today's Schedule */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Bugungi jadval
                </CardTitle>
                <CardDescription>
                  Ertalabki smena vazifalari va tadbirlari
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {todaysTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-3 p-3 rounded-lg border"
                  >
                    <div className="flex-shrink-0">
                      {getTaskIcon(task.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-sm font-medium">
                          {task.time}
                        </span>
                        <Badge
                          className={`text-xs ${getTaskStatusColor(
                            task.status
                          )}`}
                        >
                          {task.status.replace("-", " ")}
                        </Badge>
                      </div>
                      <p className="text-sm text-pretty">{task.task}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <CheckCircle className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Notifications */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tezkor amallar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full justify-start bg-transparent"
                  variant="outline"
                  asChild
                >
                  <Link to="/reports">
                    <FileText className="w-4 h-4 mr-2" />
                    Hisobot yaratish
                  </Link>
                </Button>
                <Button
                  className="w-full justify-start bg-transparent"
                  variant="outline"
                  asChild
                >
                  <Link to="/neighborhood/workflows">
                    <Users className="w-4 h-4 mr-2" />
                    Ish oqimlarini boshqarish
                  </Link>
                </Button>
                <Button
                  className="w-full justify-start bg-transparent"
                  variant="outline"
                  asChild
                >
                  <Link to="/neighborhood/timetable">
                    <Calendar className="w-4 h-4 mr-2" />
                    Jadvalni ko'rish
                  </Link>
                </Button>
                <Button
                  className="w-full justify-start bg-transparent"
                  variant="outline"
                  asChild
                ></Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  So'nggi ogohlantirishlar
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-lg bg-orange-50 border border-orange-200">
                  <p className="text-sm font-medium text-orange-800">
                    Infratuzilma muammosi
                  </p>
                  <p className="text-xs text-orange-600">
                    5-blokda suv ta'minotida uzilishlar qayd etildi
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <p className="text-sm font-medium text-blue-800">
                    Yangi ro'yxatdan o'tish
                  </p>
                  <p className="text-xs text-blue-600">
                    3 ta yangi fuqaro arizalari ko'rib chiqilmoqda
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                  <p className="text-sm font-medium text-green-800">
                    Vazifa bajarildi
                  </p>
                  <p className="text-xs text-green-600">
                    Ertalabki brifing muvaffaqiyatli yakunlandi
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
