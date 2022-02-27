import {TObject} from '../Types';

export const checkAndRun = (obj: TObject | null = null, func: string | null) => {
  if (obj?.hasOwnProperty(func!)) {
    obj[func!]();
  }

  return false;
}
