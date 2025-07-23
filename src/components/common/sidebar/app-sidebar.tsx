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

export const AppSidebar = () => {
  const { inspector } = useInspectorStore();

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
          {menuGroups.map((group, groupIndex) => (
            <SidebarGroup key={groupIndex}>
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
              {group.items.map((item, itemIndex) => {
                if (
                  item.path === "/admins" &&
                  inspector?.auth?.role !== "district_inspector"
                ) {
                  return null;
                }
                return (
                  <SidebarMenuItem key={itemIndex}>
                    <Link to={item.path}>
                      <SidebarMenuButton tooltip={item.name}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                );
              })}
            </SidebarGroup>
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
            <SidebarMenuButton tooltip="Logout">
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
