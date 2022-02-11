import setClass from '../../utils/setClass';

const data = 'data-contact';

const setActive = (arr, id) => {
  let result = [];

  if (arr.length) {
    result = arr.map((contact) => {
      return setClass(
        contact,
        'active',
        contact.getAttribute(data) === id
      );
    });
  }

  return result;
};

const contact = () => {
  const contacts = Array.from(
    document.querySelectorAll(`[${data}]`),
  );
  if (contacts.length) {
    contacts.forEach((item) => {
      item.addEventListener('click', (ev) => {
        const { target } = ev;

        const isTarget = target.hasAttribute(data)
          || target.closest(`[${data}]`);

        if (isTarget && !target.classList.contains('active')) {
          const id = item.getAttribute(data);
          setActive(contacts, id);
        }
      });
    });
  }
};

export default contact;
