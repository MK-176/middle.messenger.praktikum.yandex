import {Block} from '../../modules';
import type {TData} from '../../Types';
import template from './Avatar.hbs';
import Button from '../Button';
import Link from '../Link';

export class Avatar extends Block {
  constructor(props: TData) {
    super(props);
  }

  protected initChildren(): void {
    this.children.button = new Button({
      text: 'Поменять',
      type: 'button',
    });
    this.children.link = new Link({
      link: '#',
      text: 'Выбрать файл на компьютере',
    });
  }

  protected render(): any {
    return this.compile(template, {...this.props});
  }
}
