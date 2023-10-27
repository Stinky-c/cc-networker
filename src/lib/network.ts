import { PeripheralFace, NetworkerRole } from "./types";
import { NetworkerSettings } from "./settings";
import * as netTypes from "./networkTypes";
import * as event from "./event";

import { LoggingLevel } from "./types";

type logFunc = (message: string, level: LoggingLevel) => void;

export class ModemManager {
  private modem: ModemPeripheral;
  private broadcastChannel: number = 7701;
  private replyChannel: number = 7704;
  private role: NetworkerRole = NetworkerRole.slave;
  private keepAlive: boolean = true;
  private keepHandle: boolean = true;
  private responseHandlers: netTypes.MessageMapping;
  private logger: logFunc;

  /**
   *
   * @param broadcastChannel channel dedicated to broadcasting messages over
   * @param replyChannel channel dedicated to recieving message over
   * @param face an optional face of the modem
   */
  constructor(options: {
    broadcastChannel: number;
    replyChannel: number;
    face?: PeripheralFace;
    responseHandlers: netTypes.RequestMapping;
    loggingFunc: logFunc;
  }) {
    // TODO: make it nicer i guess
    if (options.face !== undefined) {
      this.modem = peripheral.wrap(options.face) as ModemPeripheral;
    } else {
      let phs = peripheral.find("modem");
      if (phs.length > 0) {
        this.modem = phs[0] as ModemPeripheral;
      } else {
        error("Cannot find modem");
      }
    }
    this.modem.closeAll();

    this.responseHandlers = options.responseHandlers;
    this.logger = options.loggingFunc;

    this.modem.open(this.broadcastChannel); // open the broadcast channel
    this.modem.open(this.replyChannel); // open the reply channel

    this.determineRole();
  }
  public message(message: netTypes.CommonMessageResponse) {
    this.modem.transmit(this.broadcastChannel, this.replyChannel, {
      message: message,
      replyChannel: this.replyChannel,
    } as netTypes.FullModemMessage);
  }

  public determineRole(): NetworkerRole {
    this.message({
      sender: os.computerID(),
      type: "RoleAcquisitionRequest",
    } as netTypes.RoleAcquisitionRequest);

    let response = false;

    let timeout1 = () => {
      while (true) {
        let messageEvent = event.pullEventAs(
          event.ModemMessageEvent,
          "modem_message"
        );
        if (messageEvent !== null && messageEvent.message !== null) {
          let root = messageEvent.message as netTypes.FullModemMessage;
          this.logger(root.message.type, LoggingLevel.debug);
          if (root.message.type === "RoleAcquisitionResponse") {
            response = true;
          }
        }
      }
    };
    let timeout2 = () => {
      sleep(5);
    };
    parallel.waitForAny(timeout1, timeout2);

    if (response) {
      this.logger(
        "Response detected... setting role to slave",
        LoggingLevel.info
      );
      this.role = NetworkerRole.slave;
    } else {
      this.logger(
        "No Response deteced... Assuming role of master",
        LoggingLevel.info
      );
      this.role = NetworkerRole.master;
    }
    return this.role;
  }

  // Loop functions
  public heartbeat(time: number = 15): void {
    while (this.keepAlive) {
      this.logger("Sending heartbeat...", LoggingLevel.debug);
      this.message({
        type: "HeartBeatRequest",
        sender: os.computerID(),
      } as netTypes.HeartBeatRequest);
      sleep(time);
    }
  }

  // Main handling
  public handleMessage(): void {
    while (this.keepHandle) {
      let messageEvent = event.pullEventAs(
        event.ModemMessageEvent,
        "modem_message"
      );

      if (messageEvent !== null && messageEvent.message !== null) {
        let root = messageEvent.message as netTypes.FullModemMessage;
        // if this computer is meant to receive message
        let messageType = root.message.type;
        let handle = this.responseHandlers.get(messageType);

        // handle message if we know what it is else ignore it
        if (handle !== undefined) {
          handle(root.message, (message: netTypes.CommonMessageRequest) => {
            this.message(message);
          });
        } else {
          error(
            `Unknown handler for message type '${messageType}' ignoring...`
          );
        }
      } else {
        error("message was null");
      }
    }
  }
}
