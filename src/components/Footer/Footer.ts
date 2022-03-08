import { Block } from '../../modules';
import type { TData } from '../../Types';
import { ListItem } from '../ListItem/ListItem';
import template from './Footer.hbs';

const listItems = [
  {
    modify: 'media',
    text: 'Фото или Видео',
  },
  {
    modify: 'file',
    text: 'Файл',
  },
  {
    modify: 'location',
    text: 'Локация',
  },
];

export class Footer extends Block {
  constructor(props: TData) {
    super(props);
  }

  initChildren(): any {
    this.children.listItem = [];
    listItems.forEach((props) => {
      const item = new ListItem({ ...props });
      (this.children.listItem as Block[]).push(item);
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}
