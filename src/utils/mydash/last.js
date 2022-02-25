const last = (arr) => {
  if (!Array.isArray(arr)) {
    return undefined;
  }

  const length = arr.length;

  return length ? arr[length - 1] : undefined;
};

export default last;
