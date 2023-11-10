import { BasaltVisualObject } from "../object";

export class Label extends BasaltVisualObject {
  setText(text: string): this;
  setFontSize(size: 1 | 2 | 3 | 4): this;
  getFontSize(): number;
  setTextAlign(align: "left" | "center" | "right"): this;
}
