import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { LogOut, Bot, KeyRound } from "lucide-react";
import { useInspectorStore } from "@/stores/inspector.store";
import { menuGroups } from "./menu";
import PrivateComponent from "@/private/component.private";
import { authService } from "@/services/auth.service";
import { toast } from "sonner";

export const AppSidebar = () => {
  const { inspector } = useInspectorStore();

  const handleLogout = async () => {
    try {
      const data = await authService.logout();
      toast.success(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Bot className="size-8" />
          <span className="text-lg font-semibold group-data-[collapsible=icon]:hidden">
            Inspektor tizimi
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuGroups.map((group, i) => (
            <PrivateComponent roles={group.roles} key={`${group.label}${i}`}>
              <SidebarGroup>
                <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
                {group.items.map((item, itemIndex) => {
                  if (
                    item.path === "/admins" &&
                    inspector?.auth?.role !== "district_inspector"
                  ) {
                    return null;
                  }
                  return (
                    <PrivateComponent
                      roles={item.roles}
                      key={`${item.name}${itemIndex}`}
                    >
                      <SidebarMenuItem>
                        <Link to={item.path}>
                          <SidebarMenuButton tooltip={item.name}>
                            <item.icon className="h-4 w-4" />
                            <span>{item.name}</span>
                          </SidebarMenuButton>
                        </Link>
                      </SidebarMenuItem>
                    </PrivateComponent>
                  );
                })}
              </SidebarGroup>
            </PrivateComponent>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Parolni o'zgartirish">
              <KeyRound className="h-4 w-4" />
              <span>Parolni o'zgartirish</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Logout" onClick={() => handleLogout()}>
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
