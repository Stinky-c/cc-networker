import { BasaltVisualObject } from "../object";

export class MonitorFrame extends BasaltVisualObject {
  setMonitor(monitor: string | MonitorPeripheral): this;
  /**
   * see documentation https://basalt.madefor.cc/#/objects/MonitorFrame/setMonitorGroup
   */
  setMonitorGroup(monitors: LuaTable | Map<string, Array<string>>): this;
}
