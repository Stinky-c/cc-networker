import { BasaltVisualObject } from "../object";
import { Container } from "./container";

export class BaseFrame extends BasaltVisualObject implements Container {
  //#region container impl
  addChild(object: this): this;
  getChild(id: string): this | null;
  getDeepChild(id: string): this | null;
  removeChild(id: string): boolean;
  removeChildren(): this;
  setFocusedObject(obj: this, zIndex: number): this;
  setFocusedObject(obj: any): this;
  setImportant(id: string): this;
  clearFocusedChild(): this;
  //#endregion

  getOffset(): LuaMultiReturn<[number, number]>;
  setOffset(x: number, y: number): LuaMultiReturn<[number, number]>;
}
