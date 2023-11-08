import * as netTypes from "./networkTypes";
import { IEvent } from "./event";

class Registry<T extends CallableFunction> {
  private registry: LuaMap<string, T[]>;
  constructor() {
    this.registry = new LuaMap();
  }
  // Register functions
  register(name: string, func: T): void {
    let items = this.get(name);
    items.push(func);
    this.set(name, items);
  }
  deregister(name: string, index: number): void {
    let items = this.get(name);
    delete items[index];
  }

  list(name: string): T[] {
    return this.get(name);
  }
  call(name: string, ...args: any[]): void {
    let items = this.get(name);
    for (let item of items) {
      item(...args);
    }
  }

  private get(name: string): T[] {
    let temp = this.registry.get(name);
    return temp !== undefined ? temp : [];
  }

  private set(name: string, value: T[]): void {
    this.registry.set(name, value);
  }
}

export type RegisteryType = typeof Registry;

export const ResponseRegistry = new Registry<netTypes.MessageFunction>();
export const RequestRegistry = new Registry<netTypes.MessageFunction>();

export const EventRegistry = new Registry<(event: IEvent) => void>();
