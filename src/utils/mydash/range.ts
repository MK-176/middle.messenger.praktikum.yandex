interface IRange {
  start: number,
}

interface IMainRange extends IRange {
  end?: number,
  step?: number,
  isRight?: boolean,
}

interface IBaseRange extends IRange {
  end: number,
  step: number,
  isRight: boolean,
}

const baseRange = (props: IBaseRange): number[] => {
  const {
    start,
    end,
    step,
    isRight,
  } = props;
  let $start = start;
  let index = -1;
  let length = Math.max(Math.ceil((end - $start) / (step || 1)), 0);
  const result = new Array(length);

  while (length--) {
    result[isRight ? length : ++index] = $start;
    $start += step;
  }

  return result;
};

export const range = (props: IMainRange): number[] => {
  const {
    start = 0,
    end,
    step,
    isRight = false,
  } = props;
  let $start = start;
  let $end = end;
  let $step = step;

  if ($end === undefined) {
    $end = $start;
    $start = 0;
  }

  if ($step === undefined) {
    if ($start < $end) {
      $step = 1;
    } else {
      $step = -1;
    }
  }

  return baseRange({
    start: $start,
    end: $end,
    step: $step,
    isRight,
  });
};
