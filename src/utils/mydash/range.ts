const baseRange = (start: number, end: number, step: number, isRight: boolean): number[] => {
  let index = -1;
  let length = Math.max(Math.ceil((end - start) / (step || 1)), 0);
  const result = new Array(length);

  while (length--) {
    result[isRight ? length : ++index] = start;
    start += step;
  }

  return result;
}

const range = (start: number = 0, end: number, step: number, isRight: boolean = false): number[] => {
  if (end === undefined) {
    end = start;
    start = 0;
  }

  step = step === undefined ? (start < end ? 1 : -1) : step;

  return baseRange(start, end, step, isRight);
};

export default range;
