import { Block } from '../../modules';
import type { TData } from '../../Types';
import { ListItem } from '../ListItem/ListItem';
import UpdateModal from '../UpdateModal';
import Button from '../Button';
import Link from '../Link';
import template from './Header.hbs';

const listItems = [
  {
    modify: 'add',
    modal: 'add-user',
    text: 'Добавить пользователя',
  },
  {
    modify: 'remove',
    modal: 'remove-user',
    text: 'Удалить пользователя',
  },
  {
    modify: 'remove',
    modal: 'remove-chat',
    text: 'Удалить чат',
  },
];
const updateModals = [
  {
    dataAttr: 'add-user',
    title: 'Добавить пользователя',
    text: 'Добавить',
  },
  {
    dataAttr: 'remove-user',
    title: 'Удалить пользователя',
    text: 'Удалить',
  },
];

export class Header extends Block {
  constructor(props: TData) {
    super(props);
  }

  initChildren(): any {
    this.children.listItem = [];
    listItems.forEach((props) => {
      const item = new ListItem({ ...props });
      (this.children.listItem as Block[]).push(item);
    });
    this.children.updateModals = [];
    updateModals.forEach((props) => {
      const modal = new UpdateModal({ ...props });
      (this.children.updateModals as Block[]).push(modal);
    });
    this.children.button = new Button({
      text: 'Удалить',
      type: 'button',
    });
    this.children.link = new Link({
      text: 'Отмена',
      link: '/',
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}
