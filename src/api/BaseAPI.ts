const NotImplemented = 'Not implemented';

export abstract class BaseAPI {
  protected create() {
    throw new Error(NotImplemented);
  }

  protected request() {
    throw new Error(NotImplemented);
  }

  protected update() {
    throw new Error(NotImplemented);
  }

  protected delete() {
    throw new Error(NotImplemented);
  }
}
