import { RequestEmitter, ResponseEmitter } from "./registry";
import { PeripheralFace, NetworkerRole } from "./types";
import { NetworkerSettings, SettingsKeys } from "./settings";
import { Logger } from "./utils";
import * as events from "./event";

import * as netTypes from "./networkTypes";

export class ModemManager {
  private modem: ModemPeripheral;
  public broadcastChannel: number = 7701;
  public replyChannel: number = 7704;
  public role: NetworkerRole = NetworkerRole.slave;
  public keepAlive: boolean = true;

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

    this.modem.open(this.broadcastChannel); // open the broadcast channel
    this.modem.open(this.replyChannel); // open the reply channel

    this.determineRole();
  }
  public message(message: netTypes.CommonMessage) {
    this.modem.transmit(this.broadcastChannel, this.replyChannel, {
      message: message,
      replyChannel: this.replyChannel,
    } as netTypes.FullModemMessage);
  }

  public determineRole(): NetworkerRole {
    // TODO: clean logic flow
    let tmpRole = NetworkerSettings.Get(SettingsKeys.role) as
      | NetworkerRole
      | undefined;
    if (tmpRole !== undefined) {
      this.role = tmpRole;
      return tmpRole;
    }
    this.message({
      sender: os.computerID(),
      type: "RoleAcquisitionRequest",
    } as netTypes.RoleAcquisitionRequest);

    let response = false;

    let timeout1 = () => {
      while (true) {
        let messageEvent = events.pullEventAs(
          events.ModemMessageEvent,
          "modem_message"
        );
        if (messageEvent !== null && messageEvent.message !== null) {
          let root = messageEvent.message as netTypes.FullModemMessage;
          Logger.debug(root.message.type);
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
      Logger.info("Response detected... setting role to slave");
      this.role = NetworkerRole.slave;
    } else {
      Logger.info("No Response deteced... Assuming role of master");
      this.role = NetworkerRole.master;
    }
    NetworkerSettings.Set(SettingsKeys.role, this.role);
    return this.role;
  }

  // Loop functions
  public heartbeat(time: number = 15): void {
    while (this.keepAlive) {
      Logger.debug("Sending heartbeat...");
      this.message({
        type: "HeartBeatRequest",
        sender: os.computerID(),
      } as netTypes.HeartbeatRequest);
      sleep(time);
    }
  }

  // Main handling
  public handleModemEvent(_event: events.ModemMessageEvent): void {
    if (_event.message !== null) {
      let event = _event.message as netTypes.FullModemMessage;
      // if this computer is meant to receive message
      let messageType = event.message.type;
      Logger.debug(`Got '${messageType}' handling now...`);
      let built = {
        message: event.message,
        sendMessage: (x: any) => this.message(x),
      };
      RequestEmitter.emit(messageType, built);
      ResponseEmitter.emit(messageType, built);
    } else {
      Logger.error("message was null");
    }
  }
}
