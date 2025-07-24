import Header from "@/components/common/header/header";
import { AppSidebar } from "@/components/common/sidebar/app-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import Launch from "@/hooks/launch";
import PrivateRoute from "@/private/route.private";

export default function RootLayout() {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <PrivateRoute
        roles={[
          "super_admin",
          "district_inspector",
          "neighborhood_inspector",
          "neighborhood_leader",
          "province_inspector",
        ]}
      >
        <div className="flex h-screen">
          <AppSidebar />
          <SidebarInset className="flex-1 overflow-auto">
            <Header />
            <main className="pt-24">
              <Outlet />
            </main>
          </SidebarInset>
        </div>
      </PrivateRoute>
      <Launch />
    </div>
  );
}