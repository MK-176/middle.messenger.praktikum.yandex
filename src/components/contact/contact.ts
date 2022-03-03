import type {TArrayElement} from "../../Types/TArray";
import setClass from '../../utils/setClass';

const data = 'data-contact';

const setActive = (arr: TArrayElement = [], id: string) => arr.map((contact: HTMLElement) => {
  return setClass(
    contact,
    'active',
    contact.getAttribute(data) === id
  );
});

export const contact = () => {
  const contacts: TArrayElement = Array.from(
    document.querySelectorAll(`[${data}]`),
  );
  contacts.forEach((item: HTMLElement) => {
    item.addEventListener('click', (ev: Event) => {
      const target = ev.target as HTMLButtonElement;
      const isTarget = target.hasAttribute(data)
        || target.closest(`[${data}]`);

      if (isTarget && !target.classList.contains('active')) {
        setActive(contacts, (item.getAttribute(data) as string));
      }
    });
  });
};