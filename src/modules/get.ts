export const get = (obj: any, path: string, defaultValue: any): object => {
  const keys: Array<string> = path.split('.');
  let result: any = obj;

  for (let key of keys) {
    result = result[key];

    if (result === undefined) {
      return defaultValue;
    }
  }

  return result ?? defaultValue;
};
