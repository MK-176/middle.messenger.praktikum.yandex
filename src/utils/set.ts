type Indexed<T = unknown> = {
  [key: string]: T,
};
const merge = (lhsObj: Indexed, rhsObj: Indexed): Indexed => {
  const lhs = {
    ...lhsObj,
  };
  const rhs = {
    ...rhsObj,
  };
  for (const prop in rhs) {
    if (Object.prototype.hasOwnProperty.call(rhs, prop)) {
      try {
        if ((rhs[prop] as Indexed).constructor === Object) {
          rhs[prop] = merge(lhs[prop] as Indexed, rhs[prop] as Indexed);
        } else {
          lhs[prop] = rhs[prop];
        }
      } catch (e) {
        lhs[prop] = rhs[prop];
      }
    }
  }

  return lhs;
};
const set = (
  object: Indexed | {} | unknown,
  path: string,
  value: unknown,
): Indexed | {} | unknown => {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  const result = path.split('.').reduceRight<Indexed>((acc, key) => ({
    [key]: acc,
  }), value as any);
  return merge(object as Indexed, result);
};

export default set;
