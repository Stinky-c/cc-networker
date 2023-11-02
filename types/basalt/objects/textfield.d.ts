import { BasaltVisualObject } from "../object";

// TODO: finish adding methods
export class TextField extends BasaltVisualObject {
  //   getLines(): LuaTable<number, string>;
  getLines(): Array<string>;
  getLine(index: number): string;
  editLine(index: number, text: string): this;
  addLine(text: string, index?: number): this;
  removeLine(index: string): this;
  getTextCursor(): LuaMultiReturn<[number, number]>;
  addKeywords(color: number | Color, keywords: Array<string>): this;

  // lua pattern rules
  addRule(
    pattern: string,
    textColor: number | Color,
    backgroundColor: number | Color
  ): this;
  editRule(
    pattern: string,
    textColor: number | Color,
    backgroundColor: number | Color
  ): this;
  removeRule(
    pattern: string,
    textColor: number | Color,
    backgroundColor: number | Color
  ): this;

  clear(): this;
}
