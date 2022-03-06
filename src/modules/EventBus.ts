export class EventBus {
  private static instance: EventBus;

  private _listeners: Record<string, any> = {};

  public constructor() {
    if (!EventBus.instance) {
      EventBus.instance = this;
    }

    return EventBus.instance;
  }

  public on(event: string, callback: Function) {
    if (!this._listeners[event]) {
      this._listeners[event] = [];
    }

    this._listeners[event].push(callback);
  }

  public off(event: string, callback: Function) {
    this._throwError(event);

    this._listeners[event] = this._listeners[event].filter(
      (listener: Function) => (listener !== callback),
    );
  }

  public emit(event: string, ...args: any) {
    this._throwError(event);

    this._listeners[event].forEach((listener: Function) => {
      listener(...args);
    });
  }

  private _throwError(event: string) {
    if (event && !this._listeners[event]) {
      throw new Error(`Нет события ${event}`);
    }
  }
}
