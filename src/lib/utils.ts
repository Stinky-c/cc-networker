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
    if (table.has(i)) {
      tempMap.set(i, table.get(i));
    }
  }
  return tempMap;
}
