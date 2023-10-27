type ThisContainer = Container;

export class Container {
  addChild(object: ThisContainer): ThisContainer; /// Returns object that was added
  getChild(id: string): ThisContainer | null;

  getDeepChild(id: string): ThisContainer | null;

  removeChild(id: string): boolean;

  removeChildren(): ThisContainer;

  setFocusedObject(obj: ThisContainer, zIndex: number): ThisContainer;
  setImportant(id: string): ThisContainer;

  clearFocusedChild(): ThisContainer;
  setFocusedObject(obj: any): ThisContainer;
}
