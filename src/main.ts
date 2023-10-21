/** @noSelfInFile **/
import { ModemManager } from "./lib/network";
import { NetworkerSettings } from "./lib/settings";
import * as netType from "./lib/networkTypes";

NetworkerSettings.Load();
NetworkerSettings.Define();

// TODO: spilt to seperate file?
let dummiesGuideToResponding: netType.ResponseMapping = new Map([
  [
    "HeartBeatRequest",
    (_message, sendMessage) => {
      let message = _message as netType.HeartBeatRequest;
      print(`i see ${message.sender}'s heartbeat`);
    },
  ],
  [
    "RoleAcquisitionRequest",
    (_message, sendMessage) => {
      let message = _message as netType.RoleAcquisitionRequest;
      print(`i see ${message.sender}'s role request. Denying...`);
      sendMessage({
        sender: os.computerID(),
        recipent: message.sender,
        type: "RoleAcquisitionResponse",
      } as netType.RoleAcquisitionResponse);
    },
  ],
]);

const modem = new ModemManager({
  broadcastChannel: 7701,
  replyChannel: 7704,
  responseHandlers: dummiesGuideToResponding,
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
    modem.heartbeat();
  }
);

/*
TODO: respond to heartbeat?
  respond to `RoleAcquisitionRequest`
  "encrypt" messages sent?
  main.lua dedicated for gui if there is one

*/
