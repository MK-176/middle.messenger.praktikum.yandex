import setClass from '../../utils/setClass';

const data = {
  block: 'data-input-block',
  input: 'data-input-element',
  init: 'data-input-init',
};

const modify = {
  filled: 'filled',
  focus: 'focus',
};

const input = (main) => {
  let parent = document;

  if (main) {
    parent = main;
    main.querySelectorAll(
      `[${data.input}]`,
    )?.forEach((input) => {
      input.hasAttribute(data.init) && input.removeAttribute(data.init);
    });
  }

  const blocks = Array.from(
    parent.querySelectorAll(`[${data.block}]`),
  );

  if (blocks.length > 0) {
    blocks.map((block) => {
      const input = block.querySelector(`[${data.input}]`);

        if (input?.hasAttribute(data.init)) {
          setClass(block, modify.filled, input.value.length > 0);
        }

        input?.addEventListener('focus', () => {
          setClass(block, modify.filled, true);
        });
        input?.addEventListener('blur', (ev) => {
          setClass(block, modify.filled, false);
          setClass(block, modify.focus, ev.target.value !== '');
        });
    });
  }
};

export default input;
