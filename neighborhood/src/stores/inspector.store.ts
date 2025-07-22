import type { IInspector } from "@/interfaces/inspector.interface";
import { create } from "zustand";

interface InspectorState {
  inspector: IInspector | undefined | null;
  setInspector: (inspector: IInspector | null) => void;
  clearInspector: () => void;
}

export const useInspectorStore = create<InspectorState>((set) => ({
  inspector: undefined,
  setInspector: (inspector) => set({ inspector }),
  clearInspector: () => set({ inspector: null }),
}));
