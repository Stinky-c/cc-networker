import { blindTrust_tableToMapping } from "./utils";

export enum SettingsKeys {
  downloadUrl = "networker-downloadurl",
  role = "networker-role",
  broadcastChannel = "networker-broadcastchannel",
  replyChannel = "networker-replychannel",
  secret = "networker-secret",
  uid = "networker-uniqueidentifier",
}

type NetworkerMappingType = Map<
  string,
  { value?: unknown; default: unknown; description: string }
>;

let NetworkerSettingsDefintion: NetworkerMappingType = new Map([
  [
    SettingsKeys.broadcastChannel,
    { default: 7701, description: "The channel which messages are sent over" },
  ],
  [
    SettingsKeys.replyChannel,
    { default: 7705, description: "The channel reply messages are sent over" },
  ],
  [
    SettingsKeys.role,
    {
      default: undefined,
      description: "A saved copy of the current held role. currently unused",
    },
  ],
  [
    SettingsKeys.uid,
    {
      default: os.computerID(),
      description:
        "A special idenifier to be used when sending message over the network",
    },
  ],
]);

export class NetworkerSettings {
  private static under: NetworkerMappingType = NetworkerSettingsDefintion;

  static Save(path: string = "/.networker") {
    let handle = fs.open(path, "w");
    if (handle[0] !== null) {
      let data = textutils.serialise(this.under);
      handle[0].write(data);
      handle[0].close();
    } else {
      error(`error on loading settings: '${handle[1]}'`);
    }
  }

  static Load(path: string = "/.networker") {
    // does the file not exist?
    if (!fs.exists(path)) {
      print("file does not existing! Creating one now...");
      this.Save(path);
    }

    let handle = fs.open(path, "r");
    if (handle[0] !== null) {
      let data = handle[0].readAll();
      handle[0].close();

      let table = textutils.unserialise(data) as LuaTable;
      let newMapping = blindTrust_tableToMapping(
        table,
        Object.keys(this.under)
      );
      this.under = new Map([...this.under.entries(), ...newMapping.entries()]);
    } else {
      error(`error on loading settings: '${handle[1]}'`);
    }
  }

  static Get(name: SettingsKeys): unknown {
    if (Object.values(SettingsKeys).includes(name)) {
      let value = this.under.get(name);

      if (value === undefined) {
        error("how did we get here?");
      }
      return value.value !== undefined ? value.value : value.default;
    } else {
      error(`${name} not in settings`);
    }
  }
}
