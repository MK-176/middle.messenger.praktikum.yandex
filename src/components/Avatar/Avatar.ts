import { Block } from '../../modules';
import type { TData } from '../../Types';
import Button from '../Button';
import Link from '../Link';
import template from './Avatar.hbs';

export class Avatar extends Block {
  constructor(props: TData) {
    super(props);
  }

  initChildren(): void {
    this.children.button = new Button({
      text: 'Поменять',
      type: 'button',
    });
    this.children.link = new Link({
      link: '#',
      text: 'Выбрать файл на компьютере',
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}
