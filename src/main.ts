/** @noSelfInFile **/
// module imports
import { ModemManager } from "./lib/network";
import { NetworkerSettings, SettingsKeys } from "./lib/settings";
import * as basalt from "bf-lib.basalt";

// type imports
import { AppState, LoggingLevel } from "./lib/types";
import * as basaltTypes from "bf-types.basalt";
import * as netTypes from "./lib/networkTypes";

//#region constants and states
const UID = NetworkerSettings.Get(SettingsKeys.uid);
const THEME: basaltTypes.misc.Theme = {
  MenubarBG: colors.green,
  MenubarText: colors.white,
};

const STATE: AppState = { lastHeartbeatResponse: 0, appClose: false };

//#endregion

// init settings and frames
NetworkerSettings.Load();
let [TERM_X, TERM_Y] = term.getSize();
let mainFrame = basalt.createFrame().setSize(TERM_X, TERM_Y).setTheme(THEME);

let loggingFrame = mainFrame
  .addFrame()
  .setPosition(1, 2)
  .setSize(TERM_X, TERM_Y - 1)
  .show();

let testFrame = mainFrame
  .addFrame()
  .setPosition(1, 2)
  .setSize(TERM_X, TERM_Y - 1)
  .hide();

//#region Begin menubar setup

let subFrames: basaltTypes.baseObjects.BasaltVisualObject[] = [
  loggingFrame,
  testFrame,
];
let subFramesNames: string[] = ["Debug Menu", "Test Menu"];

function openSubFrame(index: number) {
  const trueIndex = index - 1; // lua is still a 1 index langauge and that does not change here
  // tstl adds one to every slice
  if (subFrames[trueIndex] !== undefined) {
    for (let i of subFrames) {
      i.hide();
    }
    subFrames[trueIndex].show();
  }
}

let menubar = mainFrame
  .addMenubar()
  .setScrollable(true)
  .setSize(TERM_X)
  .onChange((self, value) => openSubFrame(self.getItemIndex()));

for (let i of subFramesNames) {
  menubar.addItem(i);
}
//#endregion

let loggingField = loggingFrame
  .addTextfield()
  .setPosition(1, 2)
  .setSize(TERM_X, TERM_Y - 1)
  .onKeyUp((a, b, key) => {
    return [keys.up, keys.down, keys.right, keys.left].includes(key);
  })
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
  loggingField.addLine(`{${os.time()}} [${level}]: ${message}`);
};

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
      log(`Heartbeat: '${message.sender}'`, LoggingLevel.debug);
    },
  ],
  [
    "RoleAcquisitionRequest",
    (_message, sendMessage) => {
      const message = _message as netTypes.RoleAcquisitionRequest;
      log(`Role Aquire: ${message.sender}`, LoggingLevel.info);
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
      STATE.lastHeartbeatResponse = time;
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
TODO
  - close button
  - spilt response/request mapping to seperate file?
  - 'global-ize' logging
    - use event system to push and pull logging messages?
  - custom module loader
    - provide basalt frame
  - update to increasing size?
  - monitor support
    - multi-monitor
      - up to 4?
      - clone / mirror or new frames per each
*/
