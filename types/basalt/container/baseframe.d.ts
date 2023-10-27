import { BasaltVisualObject } from "../object";
import { Container, ThisContainer } from "./container";

export class BaseFrame extends BasaltVisualObject implements Container {
  //#region container impl
  addChild(object: ThisContainer): ThisContainer;
  getChild(id: string): ThisContainer | null;
  getDeepChild(id: string): ThisContainer | null;
  removeChild(id: string): boolean;
  removeChildren(): ThisContainer;
  setFocusedObject(obj: ThisContainer, zIndex: number): ThisContainer;
  setFocusedObject(obj: any): ThisContainer;
  setImportant(id: string): ThisContainer;
  clearFocusedChild(): ThisContainer;
  //#endregion

  getOffset(): LuaMultiReturn<[number, number]>;
  setOffset(x: number, y: number): LuaMultiReturn<[number, number]>;
}
