export const isEqual = (object1: Record<string, any>, object2: Record<string, any>): boolean => {
  const props1: string[] = Object.getOwnPropertyNames(object1);
  const props2: string[] = Object.getOwnPropertyNames(object2);

  if (props1.length !== props2.length) {
    return false;
  }

  for (let i = 0; i < props1.length; i += 1) {
    const prop: any = props1[i];
    const bothAreObjects: boolean = typeof (object1[prop]) === 'object'
      && typeof (object2[prop]) === 'object';

    if ((!bothAreObjects && (object1[prop] !== object2[prop]))
      || (bothAreObjects && !isEqual(object1[prop], object2[prop]))) {
      return false;
    }
  }

  return true;
};
