import Header from "@/components/common/header/header";
import { AppSidebar } from "@/components/common/sidebar/app-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import Launch from "@/hooks/launch";
import PrivateRoute from "@/private/route.private";

export default function RootLayout() {
  return (
    <>
      <PrivateRoute
        roles={[
          "super_admin",
          "district_inspector",
          "neighborhood_inspector",
          "neighborhood_leader",
          "province_inspector",
        ]}
      >
        <AppSidebar />
        <SidebarInset>
          <Header />
          <main className="h-screen overflow-auto">
            <Outlet />
          </main>
        </SidebarInset>
      </PrivateRoute>
      <Launch />
    </>
  );
}
