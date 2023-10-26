export enum _PeripheralFace {
  bottom = "bottom",
  top = "top",
  left = "left",
  right = "right",
  front = "front",
  back = "back",
}
export type PeripheralFace = _PeripheralFace | string;

export enum NetworkerRole {
  master,
  slave,
}

export interface AppState {
  lastHeartbeatResponse: number;
}
