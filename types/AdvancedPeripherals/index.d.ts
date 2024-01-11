interface ScanResults extends LuaTable {
  name: string;
  tags: Array<string>;
  x: number;
  y: number;
  z: number;
}
/** @noSelf */
export class GeoScanner implements IPeripheral {
  getFuelLevel(): number;
  getFuelMaxLevel(): number;
  cost(radius: number): number;
  scan(radius: number): ScanResults | LuaMultiReturn<[null, string]>;
  getScanCooldown(): number;
  chunkAnalyze(): ScanResults | LuaMultiReturn<[null, string]>;
}

// interface Filter extends LuaTable {
//     name?:string
//     count?:number
//     nbt?:string

//     toSlot?:number
//     fromSlot?:number
//     fingerprint?:string
// }

interface ItemTable extends LuaTable {
  name: string;
  fingerprint?: string;
  amount: number;
  displayName: string;
  isCraftable: boolean;
  nbt?: string;
  tags: Array<string>;
}
/** @noSelf */
export class MEBridge implements IPeripheral {
  getItem(item: Partial<ItemTable>): ItemTable | string;
}
