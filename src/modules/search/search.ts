import type {TArray} from "../../Types";
import setClass from '../../utils/setClass';

const search = () => {
  const searchBlocks: TArray = Array.from(
    document.querySelectorAll('[data-search]'),
  );

  searchBlocks.forEach((block: HTMLDivElement) => {
    const input: HTMLInputElement | null = block.querySelector('[data-search-input]');

    input?.addEventListener('focus', () => {
      setClass(block, 'filled', true);
    });
    input?.addEventListener('blur', (ev: Event) => {
      setClass(block, 'filled', false);
      setClass(block, 'focus', (ev.target as HTMLInputElement).value !== '');
    });
  });
};

export default search;
