import { Container } from "./container";
import { BasaltVisualObject } from "../object";

import * as objects from "../objects/index";

export class Frame extends BasaltVisualObject implements Container {
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

  //#region object impls
  addFrame(): Frame;
  addButton(): objects.Button;
  addThread(): objects.Thread;
  addTextfield(): objects.TextField;
  addList(): objects.List;
  addMenubar(): objects.Menubar;
}
