const first = (arr) => {
  if (!Array.isArray(arr)) {
    return undefined;
  }

  return arr.length ? arr[0] : undefined;
};

export default first;
