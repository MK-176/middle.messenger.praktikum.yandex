export const last = (arr: unknown[]): unknown => {
  if (!Array.isArray(arr)) {
    return undefined;
  }

  const length = arr.length;

  return length ? arr[length - 1] : undefined;
};
