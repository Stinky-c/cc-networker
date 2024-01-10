export class Thread {
  start(func: () => any): this;
  stop(): this;
  getStatus(): "running" | "normal" | "suspended" | "dead";
}
