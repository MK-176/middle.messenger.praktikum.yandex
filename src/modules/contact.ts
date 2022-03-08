import type { THtmlElementArray } from '../Types';
import { setClass } from '../utils';

const data = 'data-contact';
const addActiveClassToContact = (arr: THtmlElementArray = [], id: string) => (
  arr.map((contact: HTMLElement) => (
    setClass(
      contact,
      'active',
      contact.getAttribute(data) === id,
    )
  ))
);

export const addClickListenerToContact = () => {
  const contacts: THtmlElementArray = Array.from(
    document.querySelectorAll(`[${data}]`),
  );
  contacts.forEach((item: HTMLElement) => {
    item.addEventListener('click', (ev: Event) => {
      const target = ev.target as HTMLButtonElement;
      const isTarget = target.hasAttribute(data)
        || target.closest(`[${data}]`);

      if (isTarget && !target.classList.contains('active')) {
        addActiveClassToContact(contacts, (item.getAttribute(data) as string));
      }
    });
  });
};
