import { Container, ThisContainer } from "./container";
import { BasaltVisualObject } from "../object";

import * as objects from "../objects/index";

export class Frame extends BasaltVisualObject implements Container {
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

  //#region object impls
  addButton(): objects.Button;
  addThread(): objects.Thread;
  addTextfield(): objects.TextField;
}
