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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useInspectorStore } from "@/stores/inspector.store";
import { Bell, LogOut, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
            <SheetContent></SheetContent>
          </Sheet>
          <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground h-6 w-6 flex items-center justify-center rounded-full">
            3
          </Badge>
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
