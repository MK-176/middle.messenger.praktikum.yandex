import { range } from './range';

export const rangeRight = (
  start: number,
  end: number,
  step: number,
): number[] => (range({
  start,
  end,
  step,
}));
