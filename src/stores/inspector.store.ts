import type { IInspector } from "@/interfaces/inspector.interface";
import { create } from "zustand";

interface InspectorState {
  inspector: undefined | null | IInspector;
  inspector_loading: boolean;
  setInspector: (inspector: IInspector) => void;
  logout: () => void;
  handleInspectorLoading: (inspector_loading: boolean) => void;
}

export const useInspectorStore = create<InspectorState>((set) => ({
  inspector: undefined,
  inspector_loading: false,
  setInspector: (inspector) => set({ inspector }),
  logout: () => set({ inspector: null }),
  handleInspectorLoading: (inspector_loading) => set({ inspector_loading }),
}));
