export class EventBus {
  private static instance: EventBus;

  listeners: Record<string, any> = {};

  public constructor() {
    if (!EventBus.instance) {
      EventBus.instance = this;
    }

    return EventBus.instance;
  }

  on(event: string, callback: Function) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string, callback: Function) {
    this._throwError(event);

    this.listeners[event] = this.listeners[event].filter(
      (listener: Function) => (listener !== callback),
    );
  }

  emit(event: string, ...args: any) {
    this._throwError(event);

    this.listeners[event].forEach((listener: Function) => {
      listener(...args);
    });
  }

  _throwError(event: string) {
    if (event && !this.listeners[event]) {
      throw new Error(`Нет события ${event}`);
    }
  }
}
