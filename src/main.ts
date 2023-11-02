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
// basalt.setTheme({ MenubarBG: colors.green, MenubarText: colors.white });
let mainFrame = basalt.createFrame();

let loggingFrame = mainFrame
  .addFrame()
  .setPosition(1, 2)
  .setSize("{parent.w}", "{parent.h - 1}");

let testFrame = mainFrame
  .addFrame()
  .setPosition(1, 2)
  .setSize("{parent.w}", "{parent.h - 1}");

//#region Begin menubar setup

let subFrames: basaltTypes.baseObjects.BasaltVisualObject[] = [
  loggingFrame,
  testFrame,
];
let subFramesNames: string[] = ["Debug Menu", "Test Menu"];

function openSubFrame(index: number | null) {
  if (index !== null) {
    for (let i of subFrames) {
      i.hide();
    }
    subFrames[index].show();
  }
}
let menubar = mainFrame
  .addMenubar()
  .setScrollable(true)
  .setSize("{parent.w}")
  .onChange((self, value) => openSubFrame(self.getItemIndex()));

for (let i of subFramesNames) {
  menubar.addItem(i);
}
//#endregion

let loggingField = loggingFrame
  .addTextfield()
  .setPosition(1, 2)
  .setSize("{parent.w}", "{parent.h-1}")
  .onKey(() => false)
  .onKeyUp(() => false)
  .addKeywords(colors.red, [LoggingLevel.warning, LoggingLevel.error])
  .addKeywords(colors.green, [LoggingLevel.info])
  .addKeywords(colors.blue, [LoggingLevel.debug]);

let testing = testFrame
  .addButton()
  .setPosition(3, 3)
  .setSize(7, 3)
  .setText("Click!")
  .onClick((self) => self.hide());

let log = (message: string, level: LoggingLevel) => {
  loggingField.addLine(`[${level}]: ${message}`);
};

// define states and constants
let state: AppState = { lastHeartbeatResponse: 0 };
let UID = NetworkerSettings.Get(SettingsKeys.uid);

// TODO: spilt to seperate file?
//#region Request & Response mapping
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
//#endregion

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

// glory to the start!
basalt.autoUpdate();

/*
TODO: respond to heartbeat?
  "encrypt" messages sent?
  main.lua dedicated for gui if there is one

*/
