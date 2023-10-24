import * as BasaltObjects from "./objects";

type ThisBasaltObject = ThisType<BasaltObject>;

type ObjectType = unknown; // TODO: better defintion

export class BasaltObject {
  // Object management
  enable(): ThisBasaltObject;
  getType(): ObjectType;
  isType(obj: ObjectType): boolean;
  getName(): string;
  getParent(): BasaltObject;
  setParent(obj: BasaltObject): ThisBasaltObject;

  getZIndex(): number;
  remove(): ThisBasaltObject;

  // events
  // TODO: specify retuned events
  onClick(
    func: (
      self: ThisBasaltObject,
      event: string,
      button: BasaltObjects.Button,
      x: number,
      y: number
    ) => void
  ): ThisBasaltObject;

  onClickUp(
    func: (
      self: ThisBasaltObject,
      event: string,
      button: BasaltObjects.Button,
      x: number,
      y: number
    ) => void
  ): ThisBasaltObject;

  onRelease(
    func: (
      self: ThisBasaltObject,
      event: string,
      button: BasaltObjects.Button,
      x: number,
      y: number
    ) => void
  ): ThisBasaltObject;

  onScroll(
    func: (
      self: ThisBasaltObject,
      event: string,
      direction: any,
      x: number,
      y: number
    ) => void
  ): ThisBasaltObject;

  onDrag(
    func: (
      self: ThisBasaltObject,
      event: string,
      x: number,
      y: number,
      xOffset: number,
      yOffset: number
    ) => void
  ): ThisBasaltObject;

  onKey(
    func: (self: ThisBasaltObject, event: string, key: Key) => void
  ): ThisBasaltObject;

  onChar(
    func: (self: ThisBasaltObject, event: string, char: Key) => void
  ): ThisBasaltObject;

  onKeyUp(
    func: (self: ThisBasaltObject, event: string, key: Key) => void
  ): ThisBasaltObject;

  onGetFocus(func: (self: ThisBasaltObject) => void): ThisBasaltObject;
  onLoseFocus(func: (self: ThisBasaltObject) => void): ThisBasaltObject;

  onEvent(
    func: (self: ThisBasaltObject, event: string, ...args: any[]) => void
  ): ThisBasaltObject;
}

type ThisBasaltVisualObject = ThisType<BasaltVisualObject>;
export class BasaltVisualObject extends BasaltObject {
  // Visiblity
  show(): ThisBasaltVisualObject;
  hide(): ThisBasaltVisualObject;
  setVisable(state?: boolean): boolean;
  isVisible(): boolean;

  // Positon
  setPosition(
    x: number | string,
    y: number | string,
    add?: boolean
  ): ThisBasaltVisualObject;
  getPosition(): LuaMultiReturn<[number, number]>;
  getX(): number;
  getY(): number;

  // Size
  setSize(): ThisBasaltVisualObject;
  getSize(): LuaMultiReturn<[number, number]>;
  getWidth(): number;
  getHeight(): number;

  // background
  setBackground(
    bgColor: number | Color | false,
    char?: string,
    bgSymbolColor?: number | Color
  ): ThisBasaltVisualObject;
  getBackground(): number | false;

  // foreground
  setForeground(fg: number | Color): ThisBasaltVisualObject;
  getForeground(): number | Color;

  // transparency
  setTransparency(state: boolean): ThisBasaltVisualObject;

  // z-index
  setZIndex(zIndex: number): ThisBasaltVisualObject;

  //
  getAbsolutePosition(
    x: number | null,
    y: number | null
  ): LuaMultiReturn<[number, number]>;

  ignoreOffset(ignore: boolean): ThisBasaltVisualObject;

  isFocused(): boolean;

  setShadow(color: number | Color | false): ThisBasaltVisualObject;
  getShadow(): number | false;

  setBorder(color: number | Color, sides?: string);
  // Animation
  animatePosition(
    x: number,
    y: number,
    duration: number,
    timeOffset?: number,
    mode?: string,
    callback?: () => void
  ): ThisBasaltVisualObject;
  animateSize(
    width: number,
    height: number,
    duration: number,
    timeOffset?: number,
    mode?: string,
    callback?: () => void
  ): ThisBasaltVisualObject;

  animateOffset(
    xOffset: number,
    yOffset: number,
    duration: number,
    timeOffset?: number,
    mode?: string,
    callback?: () => void
  ): ThisBasaltVisualObject;
  // Textures
  addTexture(fp: string, animation?: boolean): ThisBasaltVisualObject;
  setTextureMode(mode: "default" | "center" | "right"): ThisBasaltVisualObject;
  setInfinitePlay(loop: boolean): ThisBasaltVisualObject;
}
