import Loading from "@/components/common/loading/loading";
import type { AuthRole } from "@/interfaces/auth.interface";
import { inspectorService } from "@/services/inspector.service";
import { useInspectorStore } from "@/stores/inspector.store";
import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/common/header/header";
import Sidebar from "@/components/common/sidebar/sidebar";

export default function SubLayout({
  children,
  roles,
}: {
  children: ReactNode;
  roles: AuthRole[];
}) {
  const { inspector, logout, setInspector } = useInspectorStore();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        if (inspector || inspector === null) return;
        const data = await inspectorService.findMe();
        setInspector(data);
      } catch (error) {
        console.error(error);
        logout();
        navigate("/auth");
      }
    })();
  }, [logout, setInspector, navigate]);

  useEffect(() => {
    if (inspector?.auth.role && !roles?.includes(inspector?.auth.role)) {
      navigate("/unauthorized");
    }
  }, [inspector?.auth.role, navigate]);

  if (inspector === undefined) return <Loading />;
  if (inspector === null) return null;

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
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
