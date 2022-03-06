import {setClass} from '../utils';
import {validation} from './validation';
import {ValidationType} from './EnumValidationType';

const data: { [key: string]: string } = {
  block: 'data-input-block',
  type: 'data-input-type',
};

export const inputFocusIn = (ev: Event, callback: Function | null = null): void => {
  const target = ev.target as HTMLFormElement;

  if (target.nodeName.toLowerCase() === 'input') {
    if (target.hasAttribute(data.type)) {
      const block = target.closest(`[${data.block}]`) as HTMLDivElement;
      const type = target.getAttribute(data.type);
      const {value} = target;

      setClass(block, 'filled', true);

      if (typeof callback === 'function') {
        callback(validation(type as ValidationType, value), value);
      }
    }
  }
};

export const inputFocusOut = (ev: Event, callback: Function | null = null): void => {
  const target = ev.target as HTMLFormElement;

  if (target.nodeName.toLowerCase() === 'input' && target.hasAttribute(data.type)) {
    const block = target.closest(`[${data.block}]`) as HTMLDivElement;
    const type = target.getAttribute(data.type);
    const {value} = target;
    setClass(block, 'filled', false);
    setClass(block, 'focus', target.value !== '');

    if (typeof callback === 'function') {
      callback(validation(type as ValidationType, value), value);
    }
  }
};
