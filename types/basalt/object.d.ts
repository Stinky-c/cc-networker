type ThisBasaltObject = BasaltObject;

// TODO: better defintion
type ObjectType = unknown;
type Button = unknown;

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
      this: void,
      self: BasaltVisualObject,
      event: string,
      button: Button,
      x: number,
      y: number
    ) => void
  ): ThisBasaltObject;

  onClickUp(
    func: (
      this: void,
      self: BasaltVisualObject,
      event: string,
      button: Button,
      x: number,
      y: number
    ) => void
  ): ThisBasaltObject;

  onRelease(
    func: (
      this: void,
      self: BasaltVisualObject,
      event: string,
      button: Button,
      x: number,
      y: number
    ) => void
  ): ThisBasaltObject;

  onScroll(
    func: (
      this: void,
      self: BasaltVisualObject,
      event: string,
      direction: any,
      x: number,
      y: number
    ) => void
  ): ThisBasaltObject;

  onDrag(
    func: (
      this: void,
      self: BasaltVisualObject,
      event: string,
      x: number,
      y: number,
      xOffset: number,
      yOffset: number
    ) => void
  ): ThisBasaltObject;

  onKey(
    func: (
      this: void,
      self: BasaltVisualObject,
      event: string,
      key: Key
    ) => void
  ): ThisBasaltObject;

  onChar(
    func: (
      this: void,
      self: BasaltVisualObject,
      event: string,
      char: Key
    ) => void
  ): ThisBasaltObject;

  onKeyUp(
    func: (
      this: void,
      self: BasaltVisualObject,
      event: string,
      key: Key
    ) => void
  ): ThisBasaltObject;

  onGetFocus(
    func: (this: void, self: ThisBasaltObject) => void
  ): ThisBasaltObject;
  onLoseFocus(
    func: (this: void, self: ThisBasaltObject) => void
  ): ThisBasaltObject;

  onEvent(
    func: (
      this: void,
      self: BasaltVisualObject,
      event: string,
      ...args: any[]
    ) => void
  ): ThisBasaltObject;
}


export class BasaltVisualObject extends BasaltObject {
  // Visiblity
  show(): BasaltVisualObject;
  hide(): BasaltVisualObject;
  setVisable(state?: boolean): boolean;
  isVisible(): boolean;

  // Positon
  setPosition(
    x: number | string,
    y: number | string,
    add?: boolean
  ): BasaltVisualObject;
  getPosition(): LuaMultiReturn<[number, number]>;
  getX(): number;
  getY(): number;

  // Size
  setSize(
    width: number | string,
    height: number | string
  ): BasaltVisualObject;
  getSize(): LuaMultiReturn<[number, number]>;
  getWidth(): number;
  getHeight(): number;

  // background
  setBackground(
    bgColor: number | Color | false,
    char?: string,
    bgSymbolColor?: number | Color
  ): BasaltVisualObject;
  getBackground(): number | false;

  // foreground
  setForeground(fg: number | Color): BasaltVisualObject;
  getForeground(): number | Color;

  // transparency
  setTransparency(state: boolean): BasaltVisualObject;

  // z-index
  setZIndex(zIndex: number): BasaltVisualObject;

  //
  getAbsolutePosition(
    x: number | null,
    y: number | null
  ): LuaMultiReturn<[number, number]>;

  ignoreOffset(ignore: boolean): BasaltVisualObject;

  isFocused(): boolean;

  setShadow(color: number | Color | false): BasaltVisualObject;
  getShadow(): number | false;

  setBorder(color: number | Color, sides?: string): BasaltVisualObject;
  // Animation
  animatePosition(
    x: number,
    y: number,
    duration: number,
    timeOffset?: number,
    mode?: string,
    callback?: () => void
  ): BasaltVisualObject;
  animateSize(
    width: number,
    height: number,
    duration: number,
    timeOffset?: number,
    mode?: string,
    callback?: () => void
  ): BasaltVisualObject;

  animateOffset(
    xOffset: number,
    yOffset: number,
    duration: number,
    timeOffset?: number,
    mode?: string,
    callback?: () => void
  ): BasaltVisualObject;
  // Textures
  addTexture(fp: string, animation?: boolean): BasaltVisualObject;
  setTextureMode(mode: "default" | "center" | "right"): BasaltVisualObject;
  setInfinitePlay(loop: boolean): BasaltVisualObject;

  // Drawing

  addDraw(
    id: string,
    func: (this: void) => void,
    positon?: number,
    queue?: 1 | 2 | 3,
    drawImmediately?: boolean
  ): BasaltVisualObject;
  addPreDraw(
    id: string,
    func: (this: void) => void,
    positon?: number,
    drawImmediately?: boolean
  ): BasaltVisualObject;
  addPostDraw(
    id: string,
    func: (this: void) => void,
    positon?: number,
    drawImmediately?: boolean
  ): BasaltVisualObject;

  setDrawState(id: string, state: boolean): BasaltVisualObject;
  getDrawId(id: string): number;

  addText(x: number, y: number, text: string): BasaltVisualObject;
  addBG(x: number, y: number, color: string): BasaltVisualObject;
  addFG(x: number, y: number, color: string): BasaltVisualObject;
  addBlit(
    x: number,
    y: number,
    cfColor: string,
    bgColor: string
  ): BasaltVisualObject;

  addBlit(
    x: number,
    y: number,
    width: string,
    height: string,
    text: string
  ): BasaltVisualObject;

  addBackgroundBox(
    x: number,
    y: number,
    width: string,
    height: string,
    color: number | Color
  ): BasaltVisualObject;
  addForegroundBox(
    x: number,
    y: number,
    width: string,
    height: string,
    color: number | Color
  ): BasaltVisualObject;
  // Events
  onResize(
    func: (this: void, self: BasaltVisualObject) => void
  ): BasaltVisualObject;
  onReposition(
    func: (this: void, self: BasaltVisualObject) => void
  ): BasaltVisualObject;
}
