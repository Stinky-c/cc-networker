export class Thread {
  start(func: Function): this;
  stop(): this;
  getStatus(): "running" | "normal" | "suspended" | "dead";
}
