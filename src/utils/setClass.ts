export const setClass = (
  element: HTMLElement,
  cls: string = 'active',
  condition: boolean = false,
): HTMLElement => {
  element.classList[condition ? 'add' : 'remove'](cls);

  return element;
};
