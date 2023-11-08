/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoggingLevel, NetworkerEvents } from "./types";
export interface IEvent {
  get_name(): string;
  get_args(): any[];
}

export class CharEvent implements IEvent {
  public character: string = "";
  public get_name() {
    return "char";
  }
  public get_args() {
    return [this.character];
  }
  public static init(args: any[]): IEvent | null {
    if (!(typeof args[0] === "string") || (args[0] as string) !== "char")
      return null;
    const ev = new CharEvent();
    ev.character = args[1] as string;
    return ev;
  }
}

export class KeyEvent implements IEvent {
  public key: Key = 0;
  public isHeld: boolean = false;
  public isUp: boolean = false;
  public get_name() {
    return this.isUp ? "key_up" : "key";
  }
  public get_args() {
    return [this.key, this.isUp ? null : this.isHeld];
  }
  public static init(args: any[]): IEvent | null {
    if (
      !(typeof args[0] === "string") ||
      ((args[0] as string) !== "key" && (args[0] as string) !== "key_up")
    )
      return null;
    const ev = new KeyEvent();
    ev.key = args[1] as number;
    ev.isUp = (args[0] as string) === "key_up";
    ev.isHeld = ev.isUp ? false : (args[2] as boolean);
    return ev;
  }
}

export class PasteEvent implements IEvent {
  public text: string = "";
  public get_name() {
    return "paste";
  }
  public get_args() {
    return [this.text as any];
  }
  public static init(args: any[]): IEvent | null {
    if (!(typeof args[0] === "string") || (args[0] as string) !== "paste")
      return null;
    const ev = new PasteEvent();
    ev.text = args[1] as string;
    return ev;
  }
}

export class TimerEvent implements IEvent {
  public id: number = 0;
  public isAlarm: boolean = false;
  public get_name() {
    return this.isAlarm ? "alarm" : "timer";
  }
  public get_args() {
    return [this.id];
  }
  public static init(args: any[]): IEvent | null {
    if (
      !(typeof args[0] === "string") ||
      ((args[0] as string) !== "timer" && (args[0] as string) !== "alarm")
    )
      return null;
    const ev = new TimerEvent();
    ev.id = args[1] as number;
    ev.isAlarm = (args[0] as string) === "alarm";
    return ev;
  }
}

export class TaskCompleteEvent implements IEvent {
  public id: number = 0;
  public success: boolean = false;
  public error: string | null = null;
  public params: any[] = [];
  public get_name() {
    return "task_complete";
  }
  public get_args() {
    if (this.success) return [this.id, this.success].concat(this.params);
    else return [this.id, this.success, this.error];
  }
  public static init(args: any[]): IEvent | null {
    if (
      !(typeof args[0] === "string") ||
      (args[0] as string) !== "task_complete"
    )
      return null;
    const ev = new TaskCompleteEvent();
    ev.id = args[1] as number;
    ev.success = args[2] as boolean;
    if (ev.success) {
      ev.error = null;
      ev.params = args.slice(3);
    } else {
      ev.error = args[3] as string;
      ev.params = [];
    }
    return ev;
  }
}

export class RedstoneEvent implements IEvent {
  public get_name() {
    return "redstone";
  }
  public get_args() {
    return [];
  }
  public static init(args: any[]): IEvent | null {
    if (!(typeof args[0] === "string") || (args[0] as string) !== "redstone")
      return null;
    const ev = new RedstoneEvent();
    return ev;
  }
}

export class TerminateEvent implements IEvent {
  public get_name() {
    return "terminate";
  }
  public get_args() {
    return [];
  }
  public static init(args: any[]): IEvent | null {
    if (!(typeof args[0] === "string") || (args[0] as string) !== "terminate")
      return null;
    const ev = new TerminateEvent();
    return ev;
  }
}

export class DiskEvent implements IEvent {
  public side: string = "";
  public eject: boolean = false;
  public get_name() {
    return this.eject ? "disk_eject" : "disk";
  }
  public get_args() {
    return [this.side];
  }
  public static init(args: any[]): IEvent | null {
    if (
      !(typeof args[0] === "string") ||
      ((args[0] as string) !== "disk" && (args[0] as string) !== "disk_eject")
    )
      return null;
    const ev = new DiskEvent();
    ev.side = args[1] as string;
    ev.eject = (args[0] as string) === "disk_eject";
    return ev;
  }
}

export class PeripheralEvent implements IEvent {
  public side: string = "";
  public detach: boolean = false;
  public get_name() {
    return this.detach ? "peripheral_detach" : "peripheral";
  }
  public get_args() {
    return [this.side];
  }
  public static init(args: any[]): IEvent | null {
    if (
      !(typeof args[0] === "string") ||
      ((args[0] as string) !== "peripheral" &&
        (args[0] as string) !== "peripheral_detach")
    )
      return null;
    const ev = new PeripheralEvent();
    ev.side = args[1] as string;
    ev.detach = (args[0] as string) === "peripheral_detach";
    return ev;
  }
}

export class RednetMessageEvent implements IEvent {
  public sender: number = 0;
  public message: any;
  public protocol: string | null = null;
  public get_name() {
    return "rednet_message";
  }
  public get_args() {
    return [this.sender, this.message, this.protocol];
  }
  public static init(args: any[]): IEvent | null {
    if (
      !(typeof args[0] === "string") ||
      (args[0] as string) !== "rednet_message"
    )
      return null;
    const ev = new RednetMessageEvent();
    ev.sender = args[1] as number;
    ev.message = args[2];
    ev.protocol = args[3] as string;
    return ev;
  }
}

export class ModemMessageEvent implements IEvent {
  public side: string = "";
  public channel: number = 0;
  public replyChannel: number = 0;
  public message: any;
  public distance: number = 0;
  public get_name() {
    return "modem_message";
  }
  public get_args() {
    return [
      this.side,
      this.channel,
      this.replyChannel,
      this.message,
      this.distance,
    ];
  }
  public static init(args: any[]): IEvent | null {
    if (typeof args[0] !== "string" || (args[0] as string) !== "modem_message")
      return null;
    const ev = new ModemMessageEvent();
    ev.side = args[1] as string;
    ev.channel = args[2] as number;
    ev.replyChannel = args[3] as number;
    ev.message = args[4];
    ev.distance = args[5] as number;
    return ev;
  }
}

export class HTTPEvent implements IEvent {
  public url: string = "";
  public handle: HTTPResponse | null = null;
  public error: string | null = null;
  public get_name() {
    return this.error === null ? "http_success" : "http_failure";
  }
  public get_args() {
    return [
      this.url,
      this.error === null ? this.handle : this.error,
      this.error !== null ? this.handle : null,
    ];
  }
  public static init(args: any[]): IEvent | null {
    if (
      !(typeof args[0] === "string") ||
      ((args[0] as string) !== "http_success" &&
        (args[0] as string) !== "http_failure")
    )
      return null;
    const ev = new HTTPEvent();
    ev.url = args[1] as string;
    if ((args[0] as string) === "http_success") {
      ev.error = null;
      ev.handle = args[2] as HTTPResponse;
    } else {
      ev.error = args[2] as string;
      if (ev.error === null) ev.error = "";
      ev.handle = args[3] as HTTPResponse;
    }
    return ev;
  }
}

export class WebSocketEvent implements IEvent {
  public handle: WebSocket | null = null;
  public error: string | null = null;
  public get_name() {
    return this.error === null ? "websocket_success" : "websocket_failure";
  }
  public get_args() {
    return [this.handle === null ? this.error : this.handle];
  }
  public static init(args: any[]): IEvent | null {
    if (
      !(typeof args[0] === "string") ||
      ((args[0] as string) !== "websocket_success" &&
        (args[0] as string) !== "websocket_failure")
    )
      return null;
    const ev = new WebSocketEvent();
    if ((args[0] as string) === "websocket_success") {
      ev.handle = args[1] as WebSocket;
      ev.error = null;
    } else {
      ev.error = args[1] as string;
      ev.handle = null;
    }
    return ev;
  }
}

export enum MouseEventType {
  Click,
  Up,
  Scroll,
  Drag,
  Touch,
  Move,
}

export class MouseEvent implements IEvent {
  public button: number = 0;
  public x: number = 0;
  public y: number = 0;
  public side: string | null = null;
  public type: MouseEventType = MouseEventType.Click;
  public get_name() {
    return {
      [MouseEventType.Click]: "mouse_click",
      [MouseEventType.Up]: "mouse_up",
      [MouseEventType.Scroll]: "mouse_scroll",
      [MouseEventType.Drag]: "mouse_drag",
      [MouseEventType.Touch]: "monitor_touch",
      [MouseEventType.Move]: "mouse_move",
    }[this.type];
  }
  public get_args() {
    return [
      this.type === MouseEventType.Touch ? this.side : this.button,
      this.x,
      this.y,
    ];
  }
  public static init(args: any[]): IEvent | null {
    if (!(typeof args[0] === "string")) return null;
    const ev = new MouseEvent();
    const type = args[0] as string;
    if (type === "mouse_click") {
      ev.type = MouseEventType.Click;
      ev.button = args[1] as number;
      ev.side = null;
    } else if (type === "mouse_up") {
      ev.type = MouseEventType.Up;
      ev.button = args[1] as number;
      ev.side = null;
    } else if (type === "mouse_scroll") {
      ev.type = MouseEventType.Scroll;
      ev.button = args[1] as number;
      ev.side = null;
    } else if (type === "mouse_drag") {
      ev.type = MouseEventType.Drag;
      ev.button = args[1] as number;
      ev.side = null;
    } else if (type === "monitor_touch") {
      ev.type = MouseEventType.Touch;
      ev.button = 0;
      ev.side = args[1] as string;
    } else if (type === "mouse_move") {
      ev.type = MouseEventType.Move;
      ev.button = args[1] as number;
      ev.side = null;
    } else return null;
    ev.x = args[2] as number;
    ev.y = args[3] as number;
    return ev;
  }
}

export class ResizeEvent implements IEvent {
  public side: string | null = null;
  public get_name() {
    return this.side === null ? "term_resize" : "monitor_resize";
  }
  public get_args() {
    return [this.side];
  }
  public static init(args: any[]): IEvent | null {
    if (
      !(typeof args[0] === "string") ||
      ((args[0] as string) !== "term_resize" &&
        (args[0] as string) !== "monitor_resize")
    )
      return null;
    const ev = new ResizeEvent();
    if ((args[0] as string) === "monitor_resize") ev.side = args[1] as string;
    else ev.side = null;
    return ev;
  }
}

export class TurtleInventoryEvent implements IEvent {
  public get_name() {
    return "turtle_inventory";
  }
  public get_args() {
    return [];
  }
  public static init(args: any[]): IEvent | null {
    if (
      !(typeof args[0] === "string") ||
      (args[0] as string) !== "turtle_inventory"
    )
      return null;
    const ev = new TurtleInventoryEvent();
    return ev;
  }
}

class SpeakerAudioEmptyEvent implements IEvent {
  public side: string = "";
  public get_name() {
    return "speaker_audio_empty";
  }
  public get_args() {
    return [this.side];
  }
  public static init(args: any[]): IEvent | null {
    if (
      !(typeof args[0] === "string") ||
      (args[0] as string) !== "speaker_audio_empty"
    )
      return null;
    const ev = new SpeakerAudioEmptyEvent();
    ev.side = args[1] as string;
    return ev;
  }
}

class ComputerCommandEvent implements IEvent {
  public args: string[] = [];
  public get_name() {
    return "computer_command";
  }
  public get_args() {
    return this.args;
  }
  public static init(args: any[]): IEvent | null {
    if (
      !(typeof args[0] === "string") ||
      (args[0] as string) !== "computer_command"
    )
      return null;
    const ev = new ComputerCommandEvent();
    ev.args = args.slice(1);
    return ev;
  }
}

//#region custom-events

export class ChatEvent implements IEvent {
  public username: string = "";
  public message: string = "";
  public uuid: string = "";
  public isHidden: boolean = false;

  public get_name() {
    return "";
  }
  public get_args() {
    return [];
  }
  public static init(args: any[]): IEvent | null {
    if (!(typeof args[0] === "string") || (args[0] as string) !== "chat")
      return null;
    const ev = new ChatEvent();
    ev.username = args[1] as string;
    ev.message = args[2] as string;
    ev.uuid = args[3] as string;
    ev.isHidden = args[4] as boolean;
    return ev;
  }
}
//#region Networker events
export class Networker_LoggingEvent implements IEvent {
  public level: LoggingLevel = LoggingLevel.info;
  public message: string = "";

  public get_name() {
    return NetworkerEvents.logEvent;
  }
  public get_args() {
    return [this.level, this.message];
  }
  public static init(args: any[]): Networker_LoggingEvent | null {
    if (
      !(typeof args[0] === "string") ||
      (args[0] as string) !== NetworkerEvents.logEvent
    )
      return null;
    let ev = new Networker_LoggingEvent();
    ev.level = args[2];
    ev.message = args[1];

    return ev;
  }
}

//#endregion

//#region custom-events
/*
class Event implements IEvent {
    
    public get_name() {return "";}
    public get_args() {return [(: any)];}
    public static init(args: any[]): IEvent | null {
        if (!(typeof args[0] === "string") || (args[0] as string) !=="") return null;
        let ev: Event;

        return ev;
    }
}
*/

export class GenericEvent implements IEvent {
  public args: any[] = [];
  public get_name() {
    return this.args[0] as string;
  }
  public get_args() {
    return this.args.slice(1);
  }
  public static init(args: any[]): IEvent {
    const ev = new GenericEvent();
    ev.args = args;
    return ev;
  }
}

const eventInitializers: ((args: any[]) => IEvent | null)[] = [
  // default cc event
  CharEvent.init,
  KeyEvent.init,
  PasteEvent.init,
  TimerEvent.init,
  TaskCompleteEvent.init,
  RedstoneEvent.init,
  TerminateEvent.init,
  DiskEvent.init,
  PeripheralEvent.init,
  RednetMessageEvent.init,
  ModemMessageEvent.init,
  HTTPEvent.init,
  WebSocketEvent.init,
  MouseEvent.init,
  ResizeEvent.init,
  TurtleInventoryEvent.init,
  SpeakerAudioEmptyEvent.init,
  ComputerCommandEvent.init,

  // Custom events
  ChatEvent.init,

  // Custom networker events
  Networker_LoggingEvent.init,

  // Should always be the final event
  GenericEvent.init,
];

export function eventInit(...args: any[]) {
  for (const init of eventInitializers) {
    const ev = init(args);
    if (ev !== null) return ev;
  }
  return GenericEvent.init(args);
}
/**
 * all implemented cc events
 */
export enum EventNames {
  alarm = "alarm",
  char = "char",
  computerCommand = "computer_command",

  disk = "disk",
  diskEject = "disk_eject",
  fileTransfer = "file_transfer",

  httpCheck = "http_check",
  httpFailure = "http_failure",
  httpSuccess = "http_success",

  keyUp = "key_up",
  key = "key",
  modemMessage = "modem_message",

  monitorResize = "monitor_resize",
  monitorTouch = "monitor_touch",

  mouseClick = "mouse_click",
  mouseDrag = "mouse_drag",
  mouseScroll = "mouse_scroll",
  mouseUp = "mouse_up",

  paste = "paste",
  peripheral = "peripheral",
  peripheralDetach = "peripheral_detach",
  rednetMessage = "rednet_message",
  redstone = "redstone",
  speakerAudioEmpty = "speaker_audio_empty",
  taskComplete = "task_complete",
  terminate = "terminate",
  timer = "timer",
  turtleInventory = "turtle_inventory",

  websocketClosed = "websocket_closed",
  websocketFailure = "websocket_failure",
  websocketMessage = "websocket_message",
  websocketSucces = "websocket_success",
}

type Constructor<T extends object = object> = new (...args: any[]) => T;
/**
 * @deprecated Use the registry to let basalt handle events
 */
export function pullEventRaw(filter: string | null = null): IEvent | null {
  const args: any[] = coroutine.yield(filter);
  for (const init of eventInitializers) {
    const ev = init(args);
    if (ev !== null) return ev;
  }
  return GenericEvent.init(args);
}
/**
 * @deprecated Use the registry to let basalt handle events
 */
export function pullEvent(filter: string | null = null): IEvent | null {
  const ev = pullEventRaw(filter);
  if (ev instanceof TerminateEvent) throw "Terminated";
  return ev;
}
/**
 * @deprecated Use the registry to let basalt handle events
 */
export function pullEventRawAs<T extends IEvent>(
  type: Constructor<T>,
  filter: string | null = null
): T | null {
  const ev = pullEventRaw(filter);
  if (ev instanceof type) return ev as T;
  else return null;
}
/**
 * @deprecated Use the registry to let basalt handle events
 */
export function pullEventAs<T extends IEvent>(
  type: Constructor<T>,
  filter: string | null = null
): T | null {
  const ev = pullEvent(filter);
  if (ev instanceof type) return ev as T;
  else return null;
}
