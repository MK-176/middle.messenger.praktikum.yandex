import setClass from '../../utils/setClass';

const search = () => {
  const searchBlocks = Array.from(
    document.querySelectorAll('[data-search]'),
  );

  if (searchBlocks.length) {
    searchBlocks.forEach((block) => {
      const input = block.querySelector('[data-search-input]');

      input.addEventListener('focus', () => {
        setClass(block, 'filled', true);
      });
      input.addEventListener('blur', (ev) => {
        setClass(block, 'filled', false);
        setClass(block, 'focus', ev.target.value !== '');
      });
    });
  }
};

export default search;
