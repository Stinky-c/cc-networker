/** @noSelfInFile **/
// module imports
import { ModemManager } from "./lib/network";
import { NetworkerSettings, SettingsKeys } from "./lib/settings";
import * as basalt from "bf-lib.basalt";

// type imports
import { AppState, LoggingLevel } from "./lib/types";
import * as basaltTypes from "bf-types.basalt";
import * as netTypes from "./lib/networkTypes";

// init settings and frame
NetworkerSettings.Load();
let mainFrame = basalt.createFrame();
let tmp = term.getSize(); // wait for string interp from basalt?
let loggingField = mainFrame
  .addTextfield()
  .setSize(tmp[0], tmp[1]) as basaltTypes.objects.TextField;
// TODO: add keywords to color

let log = (message: string, level: LoggingLevel) => {
  loggingField.addLine(`[${level}]: ${message}`);
};

// define states and constants
let state: AppState = { lastHeartbeatResponse: 0 };
let UID = NetworkerSettings.Get(SettingsKeys.uid);

// TODO: spilt to seperate file?
let requestMapping: netTypes.RequestMapping = new Map([
  [
    "HeartBeatRequest",
    (_message, sendMessage) => {
      const message = _message as netTypes.HeartBeatRequest;
      sendMessage({
        sender: UID,
        recipent: message.sender,
        type: "HeartBeatResponse",
      } as netTypes.HeartBeatResponse);
      log(`i see ${message.sender}'s heartbeat`, LoggingLevel.debug);
    },
  ],
  [
    "RoleAcquisitionRequest",
    (_message, sendMessage) => {
      const message = _message as netTypes.RoleAcquisitionRequest;
      log(
        `i see ${message.sender}'s role request. Denying...`,
        LoggingLevel.debug
      );
      sendMessage({
        sender: UID,
        recipent: message.sender,
        type: "RoleAcquisitionResponse",
      } as netTypes.RoleAcquisitionResponse);
    },
  ],
]);

let responseMapping: netTypes.ResponseMapping = new Map([
  [
    "HeartBeatResponse",
    (_message, sendMessage) => {
      const message = _message as netTypes.HeartBeatResponse;
      let time = os.time();
      state.lastHeartbeatResponse = time;
      basalt.debug(`Got heartbeat at ${time}`);
    },
  ],
]);

const modem = new ModemManager({
  broadcastChannel: NetworkerSettings.Get(
    SettingsKeys.broadcastChannel
  ) as number,
  replyChannel: NetworkerSettings.Get(SettingsKeys.replyChannel) as number,
  responseHandlers: new Map([
    ...requestMapping.entries(),
    ...responseMapping.entries(),
  ]),
  loggingFunc(message, level) {
    log(message, level);
  },
});

// Thread handling
let threadHeartbeat = mainFrame.addThread().start(() => {
  modem.heartbeat(15);
});

let threadHandleMessage = mainFrame.addThread().start(() => {
  modem.handleMessage();
});

// let button1 = mainFrame.addButton().setText("Hello world!");
// button1.onClick((self, _1, _2, x, y) => {
//   self.hide();
// });

// glory to the start!
basalt.autoUpdate();

/*
TODO: respond to heartbeat?
  "encrypt" messages sent?
  main.lua dedicated for gui if there is one

*/
