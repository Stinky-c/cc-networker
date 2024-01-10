import { BasaltVisualObject } from "../object";

import * as objects from "../objects/index";
import { Theme } from "../misc";

export class Frame extends BasaltVisualObject {
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
  setTheme(_theme: string | Theme, col?: number | undefined): this;
  getTheme(name: string): unknown;
  //#endregion

  //#region object impls
  addFrame(): Frame;
  addButton(): objects.Button;
  addThread(): objects.Thread;
  addTextfield(): objects.TextField;
  addList(): objects.List;
  addMenubar(): objects.Menubar;
  addLabel(): objects.Label;
}
