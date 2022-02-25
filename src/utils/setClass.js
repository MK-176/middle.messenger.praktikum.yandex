const setClass = (element, cls = 'active', condition = false) => {
  if (condition) {
    element.classList.add(cls);
  } else {
    element.classList.remove(cls);
  }

  return element;
};

export default setClass;
