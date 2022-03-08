import { REG_EXP } from '../helpers';
import { ValidationType } from './EnumValidationType';
import type { TData } from '../Types';

type TValidationOptions = TData | null;

export const validation = (
  type: ValidationType,
  value: string = '',
  options: TValidationOptions = null,
): boolean => {
  const result = (value.match(REG_EXP(type)) as string[])?.length > 0;
  const method: string = result ? 'onSuccess' : 'onError';

  if (options && Object.prototype.hasOwnProperty.call(options, method)) {
    options[method]();
  }

  return result;
};
