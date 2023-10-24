/** @noSelfInFile **/
import * as frame from "./container/frame";
import * as misc from "./misc";

declare namespace Basalt {
  function getVersion(): string;

  // Main loop control
  function autoUpdate(enable: boolean): void;
  function stopUpdate(): void;
  function update(event: string, ...args: any): void;

  // logging / dev info
  function debug(...args: any[]): void;
  function log(message: string, file?: string): void;
  function memory(): number;

  // Frame control
  function createFrame(id?: string): frame.Frame;
  function removeFrame(id: string): void;
  function getFrame(id: string): frame.Frame;
  function getActiveFrame(): frame.Frame;
  function setActiveFrame(frame: frame.Frame): void;

  // Theme control
  function getTheme(id: string): number;
  function setTheme(theme: misc.Theme): void;

  // Variable control
  function getVariable(id: string): misc.Variable;
  function setVariable(key: string, value: any): void;

  // event callbacks
  function isKeyDown(key: Key): boolean;
  function onEvent(func: (event: string) => false): void; /// https://basalt.madefor.cc/#/objects/Basalt/onEvent
  function schedule(func: (any) => any): Function;

  // extentions
  function addObject(path: string): void;
  function addPlugin(path: string): void;

  // Misc
  function setMouseDragThrottle(throttle: number): void;
}
