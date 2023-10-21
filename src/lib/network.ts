import { PeripheralFace, NetworkerRole } from "./misc";
import { NetworkerSettings } from "./settings";
import * as netType from "./networkTypes";
import * as event from "./event";
import { pretty_print } from "cc.pretty";

export class ModemManager {
  private modem: ModemPeripheral;
  private broadcastChannel: number = 7701;
  private replyChannel: number = 7704;
  private role: NetworkerRole = NetworkerRole.slave;
  private keepAlive: boolean;
  private keepHandle: boolean;
  private responseHandlers: netType.ResponseMapping;

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
    responseHandlers: netType.ResponseMapping;
  }) {
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

    // this.broadcastChannel = options.broadcastChannel;
    // this.replyChannel = options.replyChannel;
    this.keepAlive = true;
    this.keepHandle = true;
    this.responseHandlers = options.responseHandlers;

    this.modem.open(this.broadcastChannel); // open the broadcast channel
    this.modem.open(this.replyChannel); // open the reply channel

    this.determineRole();
  }
  public message(message: netType.CommonMessage) {
    this.modem.transmit(this.broadcastChannel, this.replyChannel, {
      message: message,
      replyChannel: this.replyChannel,
    } as netType.FullModemMessage);
  }

  public determineRole(): NetworkerRole {
    this.message({
      sender: os.computerID(),
      type: "RoleAcquisitionRequest",
    } as netType.RoleAcquisitionRequest);

    let response = false;

    let timeout1 = () => {
      while (true) {
        let messageEvent = event.pullEventAs(
          event.ModemMessageEvent,
          "modem_message"
        );
        if (messageEvent !== null && messageEvent.message !== null) {
          let root = messageEvent.message as netType.FullModemMessage;
          print(root.message.type);
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
      print("Response detected... setting role to slave");
      this.role = NetworkerRole.slave;
    } else {
      print("No Response deteced... Assuming role of master");
      this.role = NetworkerRole.master;
    }
    return this.role;
  }

  // Loop functions
  public heartbeat(): void {
    while (this.keepAlive) {
      this.message({
        type: "HeartBeatRequest",
        sender: os.computerID(),
      } as netType.HeartBeatRequest);
      sleep(1);
    }
  }

  public handleMessage(): void {
    while (this.keepHandle) {
      let messageEvent = event.pullEventAs(
        event.ModemMessageEvent,
        "modem_message"
      );
      term.clear();
      term.setCursorPos(1, 1);
      print("waiting for message: " + os.time());
      pretty_print(messageEvent);
      sleep(1);
      if (messageEvent !== null && messageEvent.message !== null) {
        let root = messageEvent.message as netType.FullModemMessage;
        // if this computer is meant to receive message
        let messageType = root.message.type;
        let handle = this.responseHandlers.get(messageType);

        // handle message if we know what it is else ignore it
        if (handle !== undefined) {
          handle(root.message, (message: netType.CommonMessage) => {
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
