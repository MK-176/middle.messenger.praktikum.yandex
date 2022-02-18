const button = (): void => {
  const buttons: NodeList = document.querySelectorAll('[data-button]');
  buttons.forEach((btn: Node) => {
    console.log(btn);
  });
};

export default button;
