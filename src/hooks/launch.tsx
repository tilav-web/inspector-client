import { inspectorService } from "@/services/inspector.service";
import { useInspectorStore } from "@/stores/inspector.store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Launch() {
  const { setInspector } = useInspectorStore();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const inspector = await inspectorService.findMe();
        setInspector(inspector);
      } catch (error) {
        console.error(error);
        setInspector(null);
        navigate("/auth/login");
      }
    })();
  }, [setInspector, navigate]);

  return null;
}
