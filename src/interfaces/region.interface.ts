import { type IInspector } from "./inspector.interface";

export interface IRegion {
  id: string;
  name: string;
  inspector: IInspector | null;
}
