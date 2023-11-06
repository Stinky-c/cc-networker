import { LoggingLevel } from "./types";

export function enumKeys<O extends object, K extends keyof O = keyof O>(
  obj: O
): K[] {
  return Object.keys(obj).filter((k) => Number.isNaN(+k)) as K[];
}

/**
 * Blindly trust that user input has not caused any error
 */
export function blindTrust_tableToMapping(
  table: LuaTable,
  mapKeys: Array<string>
) {
  let tempMap = new Map();
  for (let i of mapKeys) {
    if (table.has(i) === true) {
      tempMap.set(i, table.get(i));
    }
  }
  return tempMap;
}

export class Logger {
  static debug(message: string) {
    this.log(message, LoggingLevel.debug);
  }
  static info(message: string) {
    this.log(message, LoggingLevel.info);
  }
  static warn(message: string) {
    this.log(message, LoggingLevel.warning);
  }
  static error(message: string) {
    this.log(message, LoggingLevel.error);
  }

  static log(message: string, level: LoggingLevel) {
    os.queueEvent("networker_logevent", message, level);
  }
}
