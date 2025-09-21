import type { IInspector } from "./inspector.interface";

export interface ICalls {
  _id: string;
  incident: string;
  type: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  status: "pending" | "in_progress" | "resolved" | "escalated" | "closed";
  priority: "low" | "medium" | "high" | "critical";
  inspector?: IInspector;
  witnesses?: string[];
  evidence?: string[];
  notes?: string;
}
