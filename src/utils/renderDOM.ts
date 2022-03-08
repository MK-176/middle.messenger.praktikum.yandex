import { Block } from '../modules';

export function renderDOM(rootSelector: string | HTMLElement, component: Block) {
  let root;
  if (typeof rootSelector === 'string') {
    root = document.querySelector(rootSelector as string);
  } else {
    root = rootSelector;
  }

  if (!root) {
    throw new Error('Root not found');
  }

  component.dispatchComponentDidMount();

  root.innerHTML = '';
  root.replaceWith(component.getContent()!);
}
