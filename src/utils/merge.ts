import { isObject } from './isObject';

type Indexed<T = unknown> = {
  [key in string]: T;
};

export const merge = (lhs: Indexed, rhs: Indexed): Indexed => {
  const obj: Indexed = {
    ...lhs,
  };

  Object.keys(rhs).forEach((key: string) => {
    const objElement = obj[key] as Indexed;
    const rhsElement = rhs[key] as Indexed;

    if (objElement) {
      if (isObject(objElement)) {
        obj[key] = merge(objElement, rhsElement);
      } else {
        obj[key] = rhsElement;
      }
    } else {
      obj[key] = rhsElement;
    }
  });

  return obj;
};
