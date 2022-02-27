import {regExp} from '../helpers';
import {ValidationType} from './EnumValidationType';
import {checkAndRun} from './checkAndRun';

type TValidationOptions = {
  onError: Function,
  onSuccess: Function,
} | null;

export const validation = (type: ValidationType, value: string = '', options: TValidationOptions = null): boolean => {
  const result = (value.match(regExp(type)) as string[])?.length > 0;

  checkAndRun(options, result ? 'onSuccess' : 'onError');

  return result;
};
