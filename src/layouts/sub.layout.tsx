import type { AuthRole } from "@/interfaces/auth.interface";
import { useInspectorStore } from "@/stores/inspector.store";
import { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

export default function SubLayout({
  children,
  roles,
}: {
  children: ReactNode;
  roles: AuthRole[];
}) {
  const { inspector } = useInspectorStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (inspector?.auth.role && !roles.includes(inspector?.auth.role)) {
      navigate("/unauthorized");
    }
  }, [inspector?.auth.role, navigate]);

  return <>{children}</>;
}
