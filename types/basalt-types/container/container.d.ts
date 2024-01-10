import { Theme } from "../misc";

export class Container {
  addChild(object: this): this; /// Returns object that was added
  getChild(id: string): this | null;

  getDeepChild(id: string): this | null;

  removeChild(id: string): boolean;

  removeChildren(): this;

  setFocusedObject(obj: this, zIndex: number): this;
  setImportant(id: string): this;

  clearFocusedChild(): this;
  setFocusedObject(obj: any): this;

  setTheme(_theme: Theme | string, col?: Color | number): this;
  getTheme(name: string): unknown;
}
