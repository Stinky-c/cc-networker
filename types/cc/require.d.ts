/** @noSelfInFile **/
/** @noResolution **/
declare module "cc.require" {
    export function make(env: object|LuaTable, dir: string): LuaMultiReturn<[(name: string) => any, object|LuaTable]>;
}