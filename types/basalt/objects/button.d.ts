import { BasaltVisualObject } from "../object";

type ThisButton = Button;
export class Button extends BasaltVisualObject {
  setText(text: string): ThisButton;
  setHorizontalAlign(align: "left" | "center" | "right"): ThisButton;
  setVerticalAlign(align: "top" | "center" | "bottom"): ThisButton;
}
