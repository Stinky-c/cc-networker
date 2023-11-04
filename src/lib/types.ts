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
  /**
   * a updating value that provides the computers last time receving a heartbeat response
   */
  lastHeartbeatResponse: number;
  /**
   * A state to enable the close button to gracefully shut down the app
   */
  appClose: boolean; 
}

export enum LoggingLevel {
  debug = "DEBUG",
  info = "INFO ",
  warning = "WARN ",
  error = "ERROR",
}
