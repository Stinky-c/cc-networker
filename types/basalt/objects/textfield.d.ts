import { BasaltVisualObject } from "../object";

type ThisTextField = TextField;
// TODO: finish adding methods
export class TextField extends BasaltVisualObject {
  //   getLines(): LuaTable<number, string>;
  getLines(): Array<string>;
  getLine(index: number): string;
  editLine(index: number, text: string): ThisTextField;
  addLine(text: string, index?: number): ThisTextField;
  removeLine(index: string): ThisTextField;
  getTextCursor(): LuaMultiReturn<[number, number]>;
  addKeywords(color: number | Color, keywords: Array<string>): ThisTextField;

  // lua pattern rules
  addRule(
    pattern: string,
    textColor: number | Color,
    backgroundColor: number | Color
  ): ThisTextField;
  editRule(
    pattern: string,
    textColor: number | Color,
    backgroundColor: number | Color
  ): ThisTextField;
  removeRule(
    pattern: string,
    textColor: number | Color,
    backgroundColor: number | Color
  ): ThisTextField;

  clear(): ThisTextField;
}
