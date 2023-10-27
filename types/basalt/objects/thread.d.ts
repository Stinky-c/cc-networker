type ThisThread = Thread;
export class Thread {
  start(func: Function): ThisThread;
  stop(): ThisThread;
  getStatus(): "running" | "normal" | "suspended" | "dead";
}
