export const cloneDeep = <T extends object = object>(obj: T): object => {
  const object = Array.isArray(obj) ? [] : {};

  Object.keys(obj).forEach((key: string) => {
    // @ts-ignore
    const value = obj[key];
    // @ts-ignore
    object[key] = (typeof value === 'object')
      ? cloneDeep(value)
      : value;
  });

  return object;
};
