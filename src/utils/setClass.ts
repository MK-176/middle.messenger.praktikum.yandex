const setClass = (element: HTMLElement, cls: string = 'active', condition: boolean = false): HTMLElement => {
  if (condition) {
    element.classList.add(cls);
  } else {
    element.classList.remove(cls);
  }

  return element;
};

export default setClass;
