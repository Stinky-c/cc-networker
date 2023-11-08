type ThisBasaltObject = BasaltObject;

// TODO: better defintion
type ObjectType = unknown;
type Button = unknown;

export class BasaltObject {
  // Object management
  enable(): this;
  getType(): ObjectType;
  isType(obj: ObjectType): boolean;
  getName(): string;
  getParent(): BasaltObject;
  setParent(obj: BasaltObject): this;

  getZIndex(): number;
  remove(): this;

  // events
  // TODO: specify retuned events
  onClick(
    func: (
      this: void,
      self: this,
      event: string,
      button: Button,
      x: number,
      y: number
    ) => void
  ): this;

  onClickUp(
    func: (
      this: void,
      self: this,
      event: string,
      button: Button,
      x: number,
      y: number
    ) => void
  ): this;

  onRelease(
    func: (
      this: void,
      self: this,
      event: string,
      button: Button,
      x: number,
      y: number
    ) => void
  ): this;

  onScroll(
    func: (
      this: void,
      self: this,
      event: string,
      direction: any,
      x: number,
      y: number
    ) => void
  ): this;

  onDrag(
    func: (
      this: void,
      self: this,
      event: string,
      x: number,
      y: number,
      xOffset: number,
      yOffset: number
    ) => void
  ): this;

  onKey(func: (this: void, self: this, event: string, key: Key) => void): this;

  onChar(
    func: (this: void, self: this, event: string, char: Key) => void
  ): this;

  onKeyUp(
    func: (this: void, self: this, event: string, key: Key) => void
  ): this;

  onGetFocus(func: (this: void, self: this) => void): this;
  onLoseFocus(func: (this: void, self: this) => void): this;

  onEvent(
    func: (this: void, self: this, event: string, ...args: any[]) => void
  ): this;
}

export class BasaltVisualObject extends BasaltObject {
  // Visiblity
  show(): this;
  hide(): this;
  setVisable(state?: boolean): boolean;
  isVisible(): boolean;

  // Positon
  setPosition(x: number | string, y: number | string, add?: boolean): this;
  getPosition(): LuaMultiReturn<[number, number]>;
  getX(): number;
  getY(): number;

  // Size
  setSize(width: number | string, height: number | string): this;
  getSize(): LuaMultiReturn<[number, number]>;
  getWidth(): number;
  getHeight(): number;

  // background
  setBackground(
    bgColor: number | Color | false,
    char?: string,
    bgSymbolColor?: number | Color
  ): this;
  getBackground(): number | false;

  // foreground
  setForeground(fg: number | Color): this;
  getForeground(): number | Color;

  // transparency
  setTransparency(state: boolean): this;

  // z-index
  setZIndex(zIndex: number): this;

  //
  getAbsolutePosition(
    x: number | null,
    y: number | null
  ): LuaMultiReturn<[number, number]>;

  ignoreOffset(ignore: boolean): this;

  isFocused(): boolean;

  setShadow(color: number | Color | false): this;
  getShadow(): number | false;

  setBorder(color: number | Color, sides?: string): this;
  // Animation
  animatePosition(
    x: number,
    y: number,
    duration: number,
    timeOffset?: number,
    mode?: string,
    callback?: () => void
  ): this;
  animateSize(
    width: number,
    height: number,
    duration: number,
    timeOffset?: number,
    mode?: string,
    callback?: () => void
  ): this;

  animateOffset(
    xOffset: number,
    yOffset: number,
    duration: number,
    timeOffset?: number,
    mode?: string,
    callback?: () => void
  ): this;
  // Textures
  addTexture(fp: string, animation?: boolean): this;
  setTextureMode(mode: "default" | "center" | "right"): this;
  setInfinitePlay(loop: boolean): this;

  // Drawing

  addDraw(
    id: string,
    func: (this: void) => void,
    positon?: number,
    queue?: 1 | 2 | 3,
    drawImmediately?: boolean
  ): this;
  addPreDraw(
    id: string,
    func: (this: void) => void,
    positon?: number,
    drawImmediately?: boolean
  ): this;
  addPostDraw(
    id: string,
    func: (this: void) => void,
    positon?: number,
    drawImmediately?: boolean
  ): this;

  setDrawState(id: string, state: boolean): this;
  getDrawId(id: string): number;

  addText(x: number, y: number, text: string): this;
  addBG(x: number, y: number, color: string): this;
  addFG(x: number, y: number, color: string): this;
  addBlit(x: number, y: number, cfColor: string, bgColor: string): this;

  addBlit(
    x: number,
    y: number,
    width: string,
    height: string,
    text: string
  ): this;

  addBackgroundBox(
    x: number,
    y: number,
    width: string,
    height: string,
    color: number | Color
  ): this;
  addForegroundBox(
    x: number,
    y: number,
    width: string,
    height: string,
    color: number | Color
  ): this;

  // Events
  onResize(func: (this: void, self: this) => void): this;
  onReposition(func: (this: void, self: this) => void): this;
}

export class BasaltChangeableObject extends BasaltVisualObject {
  setValue(value: any): this;
  getValue(): any;

  onChange(
    func: (this: void, self: this, event: any, value: any) => boolean | void
  ): this;
}
