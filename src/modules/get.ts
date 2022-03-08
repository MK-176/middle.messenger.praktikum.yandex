export const get = (obj: any, path: string, defaultValue: any): object => {
  const keys: Array<string> = path.split('.');
  let result: any = obj;

  const condition = keys.some((key) => {
    result = result[key];
    return result === undefined;
  });

  if (condition) {
    return defaultValue;
  }

  return result ?? defaultValue;
};
