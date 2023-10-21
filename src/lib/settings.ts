import { NetworkerRole } from "./misc";
settings.load("/.settings");

enum NetworkerSettingsKeys {
  downloadUrl = "networker-downloadurl",
  role = "networker-role",
  broadcastChannel = "networker-broadcastchannel",
  replyChannel = "networker-replychannel",
  secret = "networker-secret",
  uid = "networker-uniqueidentifier",
}

let NetworkerSettingsDefintion: Array<{
  name: string;
  default: string | number;
  description?: string;
}> = [
  { name: NetworkerSettingsKeys.downloadUrl, default: "..." }, // TODO: file hosting
  {
    name: NetworkerSettingsKeys.broadcastChannel,
    default: 7701, // range 7701-7704
    description: "The channel which messages are sent over",
  },
  {
    name: NetworkerSettingsKeys.replyChannel,
    default: 7705, // range 7705-7709
    description: "The channel reply messages are sent over",
  },
];

export class NetworkerSettings {
  static Save() {
    settings.save("/.settings");
  }

  static Load() {
    settings.load("/.settings");
  }

  static Define() {
    let missing = this.Check();
    NetworkerSettingsDefintion.forEach((value) => {
      if (missing.includes(value.name)) {
        settings.define(value.name, {
          description: value.description,
          default: value.default,
        });
        settings.set(value.name, value.default);
      }
    });
    settings.save("/.settings");
  }

  static Check() {
    let validNames = Object.values(NetworkerSettingsKeys).filter((v) =>
      isNaN(Number(v))
    ) as string[];

    let names = settings.getNames().filter((v) => {
      return !(v.startsWith("networker-") && validNames.includes(v));
    });
    return names;
  }

  static get downloadurl(): string {
    return settings.get(NetworkerSettingsKeys.downloadUrl);
  }
  static set downloadurl(value: string) {
    settings.set(NetworkerSettingsKeys.downloadUrl, value);
  }

  static get role(): NetworkerRole {
    return settings.get(NetworkerSettingsKeys.role);
  }
  static set role(value: NetworkerRole) {
    settings.set(NetworkerSettingsKeys.role, value);
  }

  static get broadcastChannel(): number {
    return settings.get(NetworkerSettingsKeys.broadcastChannel);
  }
  static set broadcastChannel(value: number) {
    settings.set(NetworkerSettingsKeys.broadcastChannel, value);
  }

  static get secret(): string {
    return settings.get(NetworkerSettingsKeys.secret);
  }
  static set secret(value: string) {
    settings.set(NetworkerSettingsKeys.secret, value);
  }

  static get replyChannel(): number {
    return settings.get(NetworkerSettingsKeys.replyChannel);
  }
  static set replyChannel(value: number) {
    settings.set(NetworkerSettingsKeys.replyChannel, value);
  }

  static get uid(): string {
    return settings.get(NetworkerSettingsKeys.uid);
  }
  static set uid(value: string) {
    settings.set(NetworkerSettingsKeys.uid, value);
  }
}
