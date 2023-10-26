/** @noSelfInFile **/
import { ModemManager } from "./lib/network";
import { NetworkerSettings, SettingsKeys } from "./lib/settings";
import * as netType from "./lib/networkTypes";
import { AppState } from "./lib/types";

NetworkerSettings.Load();

let state: AppState = { lastHeartbeatResponse: 0 };
let UID = NetworkerSettings.Get(SettingsKeys.uid);

// TODO: spilt to seperate file?
const requestMapping: netType.RequestMapping = new Map([
  [
    "HeartBeatRequest",
    (_message, sendMessage) => {
      const message = _message as netType.HeartBeatRequest;
      sendMessage({
        sender: UID,
        recipent: message.sender,
        type: "HeartBeatResponse",
      } as netType.HeartBeatResponse);
      print(`i see ${message.sender}'s heartbeat`);
    },
  ],
  [
    "RoleAcquisitionRequest",
    (_message, sendMessage) => {
      const message = _message as netType.RoleAcquisitionRequest;
      print(`i see ${message.sender}'s role request. Denying...`);
      sendMessage({
        sender: UID,
        recipent: message.sender,
        type: "RoleAcquisitionResponse",
      } as netType.RoleAcquisitionResponse);
    },
  ],
]);

const responseMapping: netType.ResponseMapping = new Map([
  [
    "HeartBeatResponse",
    (_message, sendMessage) => {
      const message = _message as netType.HeartBeatResponse;
      let time = os.time();
      state.lastHeartbeatResponse = time;
      print(`Got heartbeat at ${time}`);
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
});

// os.sleep(10);

// Main loop
function tick() {
  while (true) {
    // print("Sleeping...");
    sleep(1);
  }
}

parallel.waitForAll(
  tick,
  () => {
    modem.handleMessage();
  },
  () => {
    modem.heartbeat(15);
  }
);

/*
TODO: respond to heartbeat?
  "encrypt" messages sent?
  main.lua dedicated for gui if there is one

*/
