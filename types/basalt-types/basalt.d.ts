/** @noSelfInFile **/

import type { Frame } from "./container/frame";
import type * as misc from "./misc";

export function getVersion(): string;

// Main loop control
export function autoUpdate(enable?: boolean): void;
export function stopUpdate(): void;
export function update(event: string, ...args: any): void;

// logging / dev info
export function debug(...args: any[]): void;
export function log(message: string, file?: string): void;
export function memory(): number;

// Frame control
export function createFrame(id?: string): Frame;
export function removeFrame(id: string): void;
export function getFrame(id: string): Frame;
export function getActiveFrame(): Frame;
export function setActiveFrame(frame: Frame): void;

// Theme control
export function getTheme(id: string): number;
export function setTheme(theme: misc.Theme): void;

// Variable control
export function getVariable(id: string): misc.Variable;
export function setVariable(key: string, value: any): void;

// event callbacks
export function isKeyDown(key: Key): boolean;
export function onEvent(func: (event: string) => false): void; /// https://basalt.madefor.cc/#/objects/Basalt/onEvent
export function schedule(func: (...args: any) => any): (...args: any) => any;

// extentions
export function addObject(path: string): void;
export function addPlugin(path: string): void;

// Misc
export function setMouseDragThrottle(throttle: number): void;
