export type Variable = Function; // TODO better typing

export interface Theme {
  BaseFrameBG?: Color;
  BaseFrameText?: Color;
  FrameBG?: Color;
  FrameText?: Color;
  ButtonBG?: Color;
  ButtonText?: Color;
  CheckboxBG?: Color;
  CheckboxText?: Color;
  InputBG?: Color;
  InputText?: Color;
  TextfieldBG?: Color;
  TextfieldText?: Color;
  ListBG?: Color;
  ListText?: Color;
  MenubarBG?: Color;
  MenubarText?: Color;
  DropdownBG?: Color;
  DropdownText?: Color;
  RadioBG?: Color;
  RadioText?: Color;
  SelectionBG?: Color;
  SelectionText?: Color;
  GraphicBG?: Color;
  ImageBG?: Color;
  PaneBG?: Color;
  ProgramBG?: Color;
  ProgressbarBG?: Color;
  ProgressbarText?: Color;
  ProgressbarActiveBG?: Color;
  ScrollbarBG?: Color;
  ScrollbarText?: Color;
  ScrollbarSymbolColor?: Color;
  SliderBG?: boolean;
  SliderText?: Color;
  SliderSymbolColor?: Color;
  SwitchBG?: Color;
  SwitchText?: Color;
  LabelBG?: boolean;
  LabelText?: Color;
  GraphBG?: Color;
  GraphText?: Color;
}
