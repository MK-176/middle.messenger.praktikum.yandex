import {TArray} from '../Types';
import setClass from '../utils/setClass';

const data: { [key: string]: string } = {
  block: 'data-input-block',
  input: 'data-input-element',
  init: 'data-input-init',
};
const modify: { [key: string]: string } = {
  filled: 'filled',
  focus: 'focus',
};

export const input = (main: HTMLDivElement | null) => {
  let parent: Document | HTMLElement = main ? main : document;

  parent.querySelectorAll(
    `[${data.input}]`,
  )?.forEach((input: Node) => {
    (input as HTMLInputElement).hasAttribute(data.init) && (input as HTMLInputElement).removeAttribute(data.init);
  });

  const blocks: TArray = Array.from(
    parent.querySelectorAll(`[${data.block}]`),
  );

  blocks.map((block: HTMLDivElement) => {
    const input: HTMLInputElement | null = block.querySelector(`[${data.input}]`);
    if (input && input.hasAttribute(data.init)) {
      setClass(block, modify.filled, input.value.length > 0);
    }

    block.addEventListener('focusin', (ev: Event) => {
      const target = ev.target as HTMLInputElement;
      if (target.nodeName === 'INPUT' && target.hasAttribute(data.input)) {
        setClass(block, modify.filled, true);
      }
    });

    block.addEventListener('focusout', (ev: Event) => {
      const target = ev.target as HTMLInputElement;
      if (target.nodeName === 'INPUT' && target.hasAttribute(data.input)) {
        setClass(block, modify.filled, false);
        setClass(block, modify.focus, target.value !== '');
      }
    });
  });
};
