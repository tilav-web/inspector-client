import Header from "@/components/common/header/header";
import Sidebar from "@/components/common/sidebar/sidebar";
import ReloadSystem from "@/lib/reload-system";
import { useState } from "react";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 flex-shrink-0">
        <Sidebar isOpen={true} onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-primary text-primary-foreground transform transition-transform duration-300 ease-in-out md:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>

      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        <Header
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
      <ReloadSystem />
    </div>
  );
}
