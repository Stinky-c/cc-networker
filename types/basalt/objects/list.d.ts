import { BasaltChangeableObject } from "../object";

interface ItemTable {
  text: string;
  bgCol: Color | number;
  fgCol: Color | number;
  args: any;
}

export class List extends BasaltChangeableObject {
  addItem(
    name: string,
    bgColor?: Color | number,
    fgColor?: Color | number,
    value?: any
  ): this;
  removeItem(index: number): this;
  editItem(
    index: number,
    name: string,
    bgColor?: Color | number,
    fgColor?: Color | number,
    value?: any
  ): this;

  getItem(index: number): ItemTable;
  getItemCount(): number;

  setOptions(
    ...args:
      | string[]
      | {
          name: string;
          bgColor?: Color | number;
          fgColor?: Color | number;
          value?: any;
        }[]
  ): this;
  getOptions(): LuaTable<
    number,
    {
      name: string;
      bgColor?: Color | number;
      fgColor?: Color | number;
      value?: any;
    }
  >;

  selectItem(index: number): this;
  clear(): this;

  getItemIndex(): number;

  setOffset(offset: number): this;
  getOffset(): number;
  setScrollable(enable: boolean): this;
  setSelectionColor(bgColor: Color | number, fgColor: Color | number): this;
  getSelectionColor(): LuaMultiReturn<[Color | number, Color | number]>;
  isSelectionColorActive(): boolean;
}
