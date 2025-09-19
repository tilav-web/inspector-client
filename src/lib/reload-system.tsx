import { inspectorService } from "@/services/inspector.service";
import { useInspectorStore } from "@/stores/inspector.store";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ReloadSystem() {
  const { inspector, setInspector, logout } = useInspectorStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    (async () => {
      try {
        if (inspector === null) return;
        const data = await inspectorService.findMe();
        setInspector(data);
        navigate(location.pathname);
      } catch (error) {
        console.log(error);
        logout();
        navigate("/");
      }
    })();
  }, [navigate, setInspector, logout, location.pathname]);

  return null;
}
