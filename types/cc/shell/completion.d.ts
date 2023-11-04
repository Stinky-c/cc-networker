/** @noSelfInFile **/
/** @noResolution **/
declare module "cc.shell.completion" {
    export function file(shell: object|LuaTable, text: string): string[];
    export function dir(shell: object|LuaTable, text: string): string[];
    export function dirOrFile(shell: object|LuaTable, text: string, previous: string[], add_space?: boolean): string[];
    export function program(shell: object|LuaTable, text: string): string[];
    export function programWithArgs(shell: object|LuaTable, text: string, previous: string[], starting: number): string[];
    export function help(shell: object|LuaTable, text: string, previous: string[]): string[];
    export function choice(shell: object|LuaTable, text: string, previous: string[], choices: string[], add_space?: boolean): string[];
    export function peripheral(shell: object|LuaTable, text: string, previous: string[], add_space?: boolean): string[];
    export function side(shell: object|LuaTable, text: string, previous: string[], add_space?: boolean): string[];
    export function setting(shell: object|LuaTable, text: string, previous: string[], add_space?: boolean): string[];
    export function command(shell: object|LuaTable, text: string, previous: string[], add_space?: boolean): string[];
    export function build(...args: (null | ((text: string, previous: string[]) => string[]) | [(text: string, previous: string[], ...args: any[]) => string[], ...any[]])[]): (index: number, arg: string, previous: string[]) => string[];
}