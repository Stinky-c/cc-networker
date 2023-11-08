/** @noSelfInFile **/
// module imports
import { EventRegistry } from "./lib/registry";

import { ModemManager } from "./lib/network";
import { NetworkerSettings, SettingsKeys } from "./lib/settings";
import * as events from "./lib/event";
import { Logger } from "./lib/utils";
import * as basalt from "bf-lib.basalt";

// type imports
import { AppState, LoggingLevel, NetworkerEvents } from "./lib/types";
import * as basaltTypes from "bf-types.basalt";
import * as netTypes from "./lib/networkTypes";

//#region constants and states
const UID = NetworkerSettings.Get(SettingsKeys.uid);
const THEME: Partial<basaltTypes.misc.Theme> = {
  MenubarBG: colors.green,
  MenubarText: colors.white,
};

const STATE: AppState = {
  lastHeartbeatResponse: 0,
  appClose: false,
  runLogger: true,
};

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

let subFrames: { frame: basaltTypes.frame.Frame; name: string }[] = [
  { frame: loggingFrame, name: "Debug Menu" },
  { frame: testFrame, name: "Test Menu" },
];

function openSubFrame(index: number) {
  if (type(index) !== "number") return true;
  const trueIndex = index - 1; // lua is still a 1 index langauge and that does not change here
  // tstl adds one to every slice
  for (let i of subFrames) {
    i.frame.hide();
  }
  if (subFrames[trueIndex] !== undefined) {
    subFrames[trueIndex].frame.show();
    Logger.debug(`${subFrames[trueIndex].name} : ${index} : ${trueIndex}`);
  }
}

let menubar = mainFrame
  .addMenubar()
  .setScrollable(true)
  .setSize(TERM_X, 1)
  .onChange((self) => {
    openSubFrame(self.getItemIndex());
  });

for (let i of subFrames) {
  menubar.addItem(i.name);
}
//#endregion
let loggingField = loggingFrame
  .addTextfield()
  .setPosition(1, 1)
  .setSize(TERM_X, TERM_Y - 1)
  .onKey((a, b, key) => {
    return [keys.up, keys.down, keys.right, keys.left].includes(key);
  })
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
      Logger.debug(`Heartbeat: '${message.sender}'`);
    },
  ],
  [
    "RoleAcquisitionRequest",
    (_message, sendMessage) => {
      const message = _message as netTypes.RoleAcquisitionRequest;
      Logger.info(`Role Aquire: ${message.sender}`);
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
});

//#region  Temp
// events.Networker_LoggingEvent.
EventRegistry.register(NetworkerEvents.logEvent, (_event) => {
  // debug.debug();
  const event = _event as events.Networker_LoggingEvent;
  if (STATE.runLogger) {
    loggingField.addLine(`{${os.time()}} [${event.level}]: ${event.message}`);
  }
});

EventRegistry.register("modem_message", (_event) => {
  const event = _event as events.ModemMessageEvent;
  modem.handleModemEvent(event);
});

//#endregion
// Thread handling
let threadHeartbeat = mainFrame.addThread().start(() => {
  modem.heartbeat(15);
});

// event handling
mainFrame.onEvent((self, eventName, ...args: any[]) => {
  // initalize an event object, even if it is generic to us
  // someone may have a callback for that event
  let eventObj = events.eventInit(...[eventName, ...args]);

  let name = eventObj.get_name();
  EventRegistry.call(name, eventObj);
});

// glory to the start!
basalt.autoUpdate();

/*
TODO
  - close button to safely close the program
  - spilt response/request mapping to seperate file?
    - how to "inject" needed objects?
  - custom module loader
    - provide basalt frame
    - provide registries
  - update to increasing size?
  - monitor support
    - multi-monitor
      - up to 4?
      - clone / mirror or new frames per each
  - move req/res messages to class-like objects?


  - callback to event system?
    - events become class objects
      - a function is called to verify that event names match


  # important
  figure out why menu item names are wrong

*/
