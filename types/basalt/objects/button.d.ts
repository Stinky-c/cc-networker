import { BasaltVisualObject } from "../object";

export class Button extends BasaltVisualObject {
  setText(text: string): this;
  setHorizontalAlign(align: "left" | "center" | "right"): this;
  setVerticalAlign(align: "top" | "center" | "bottom"): this;
}
