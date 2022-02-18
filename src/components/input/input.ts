import type {TArray} from "../../Types/TArray";
import setClass from '../../utils/setClass';

const data: {[key: string]: string} = {
  block: 'data-input-block',
  input: 'data-input-element',
  init: 'data-input-init',
};

const modify: {[key: string]: string} = {
  filled: 'filled',
  focus: 'focus',
};

const input = (main: HTMLDivElement | null) => {
  let parent: Document | HTMLElement = document;

  if (main) {
    parent = main;
    main.querySelectorAll(
      `[${data.input}]`,
    )?.forEach((input: HTMLInputElement) => {
      input.hasAttribute(data.init) && input.removeAttribute(data.init);
    });
  }

  const blocks: TArray = Array.from(
    parent.querySelectorAll(`[${data.block}]`),
  );

  if (blocks.length > 0) {
    blocks.map((block: HTMLDivElement) => {
      const input: HTMLInputElement | null = block.querySelector(`[${data.input}]`);

      if (input) {
        if (input.hasAttribute(data.init)) {
          setClass(block, modify.filled, input.value.length > 0);
        }

        input.addEventListener('focus', () => {
          setClass(block, modify.filled, true);
        });
        input.addEventListener('blur', (ev: Event) => {
          setClass(block, modify.filled, false);
          setClass(block, modify.focus, (ev.target as HTMLInputElement).value !== '');
        });
      }
    });
  }
};

export default input;
