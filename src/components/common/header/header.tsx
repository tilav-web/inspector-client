import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useInspectorStore } from "@/stores/inspector.store";
import { Bell, LogOut, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MOCK_CALLS } from "@/const/mock-calls.data";
import type { ICalls } from "@/interfaces/calls.interface";

interface HeaderProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

export default function Header({
  isSidebarOpen,
  setIsSidebarOpen,
}: HeaderProps) {
  const { inspector, logout } = useInspectorStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  const pendingCalls = MOCK_CALLS.filter(
    (call) => call.status === "pending"
  );

  return (
    <header className="flex items-center justify-between md:justify-end p-4 bg-card border-b relative z-30">
      {/* Left Side - Mobile Only */}
      <div className="md:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Notification */}
        <div className="relative z-40">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="cursor-pointer">
                <Bell className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="px-2">
              <SheetHeader>
                <SheetTitle>Kutilayotgan chaqiruvlar</SheetTitle>
              </SheetHeader>
              <div className="mt-4 space-y-4">
                {pendingCalls.length > 0 ? (
                  pendingCalls.map((call: ICalls) => (
                    <div
                      key={call.id}
                      className="p-4 border rounded-lg bg-card"
                    >
                      <h4 className="font-semibold">{call.incident}</h4>
                      <p className="text-sm text-muted-foreground">
                        {call.location.address}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <Badge
                          className={
                            call.priority === "high"
                              ? "bg-red-500"
                              : call.priority === "medium"
                              ? "bg-yellow-500"
                              : "bg-gray-500"
                          }
                        >
                          {call.priority}
                        </Badge>
                        <div className="space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate("/calls")}
                          >
                            Ko'rish
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground">
                    Yangi chaqiruvlar yo'q.
                  </p>
                )}
              </div>
            </SheetContent>
          </Sheet>
          {pendingCalls.length > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground h-6 w-6 flex items-center justify-center rounded-full">
              {pendingCalls.length}
            </Badge>
          )}
        </div>

        {/* Inspector Info */}
        <div
          onClick={() => navigate("/profile")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="text-right group-hover:underline transition-all">
            <p className="font-semibold">
              {inspector?.first_name} {inspector?.last_name}
            </p>
            <p className="text-sm text-muted-foreground">{inspector?.rank}</p>
          </div>
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={inspector?.photo}
              alt={`${inspector?.first_name} ${inspector?.last_name}`}
            />
            <AvatarFallback>
              {inspector?.first_name?.[0]}
              {inspector?.last_name?.[0]}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Logout Button */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              className="w-24 cursor-pointer hidden sm:flex"
            >
              Chiqish
              <LogOut className="ml-2 h-5 w-5 text-destructive" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Tizimdan chiqish</AlertDialogTitle>
              <AlertDialogDescription>
                Siz rostdan ham tizimdan chiqmoqchimisiz?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Bekor qilish</AlertDialogCancel>
              <AlertDialogAction onClick={handleLogout}>
                Chiqish
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </header>
  );
}
