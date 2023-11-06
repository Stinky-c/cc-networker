import { blindTrust_tableToMapping } from "./utils";

export enum SettingsKeys {
  downloadUrl = "networker-downloadurl",
  role = "networker-role",
  broadcastChannel = "networker-broadcastchannel",
  replyChannel = "networker-replychannel",
  secret = "networker-secret",
  uid = "networker-uniqueidentifier",
}

type NetworkerItemType = {
  value?: unknown;
  default: unknown;
  description: string;
};
type NetworkerLuaMappingType = LuaMap<string, NetworkerItemType>;

let NetworkerSettingsDefintion: Map<string, NetworkerItemType> = new Map([
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
      description: "A saved copy of the current held role.",
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

let Placeholder: NetworkerLuaMappingType = new LuaMap();
for (const [k, v] of NetworkerSettingsDefintion) {
  Placeholder.set(k, v);
}

export class NetworkerSettings {
  private static under: NetworkerLuaMappingType = Placeholder;
  private static loaded: boolean = false;

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

      let table = textutils.unserialise(data) as NetworkerLuaMappingType;
      // let newMapping = blindTrust_tableToMapping(
      //   table,
      //   Object.keys(this.under)
      // );
      // caused an excessive buildup of a invalid table keys
      // this.under = new Map([...this.under.entries(), ...newMapping.entries()]);
      this.under = table;
    } else {
      error(`error on loading settings: '${handle[1]}'`);
    }

    this.loaded = true;
  }

  static Get(name: SettingsKeys): unknown {
    if (!this.loaded) {
      this.Load();
    }
    if (Object.values(SettingsKeys).includes(name)) {
      let setting = this.under.get(name);

      if (setting === undefined) {
        error("how did we get here?");
      }
      return setting.value !== undefined ? setting.value : setting.default;
    } else {
      error(`${name} not in settings`);
    }
  }
  static Set(name: SettingsKeys, newValue: unknown) {
    if (!this.loaded) {
      this.Load();
    }
    if (Object.values(SettingsKeys).includes(name)) {
      let setting = this.under.get(name);

      if (setting === undefined) {
        error("how did we get here?");
      }
      setting.value = newValue;
    } else {
      error(`${name} not in settings`);
    }
    this.Save();
  }
}

// TODO: dont reivent the wheel
// LuaMap does not implement a constructor like map does
// function to convert from map to lua tables
