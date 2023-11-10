import { List } from "./list";

export class Menubar extends List {
  setSpace(distance: number): this;
  getSpace(): number;

  onChange(
    func: (
      this: void,
      self: this,
      event: string,
      value: { bgCol: Color; fgCol: Color; text: string; args: any[] }
    ) => boolean | void
  ): this;
}
