import {Block} from '../../modules';
import type {TData} from '../../Types';
import template from './Page404.hbs';
import Link from '../../components/Link';

export class PageError extends Block {
  constructor(props: TData) {
    super(props);
  }

  protected initChildren(): void {
    this.children.link = new Link({
      text: 'Назад к чатам',
    });
  }

  protected render(): any {
    return this.compile(template, {...this.props});
  }
}
