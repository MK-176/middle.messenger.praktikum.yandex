import { Block } from '../../modules';
import Link from '../../components/Link';
import type { TData } from '../../Types';
import template from './Page404.hbs';

export class PageError extends Block {
  constructor(props: TData) {
    super(props);
  }

  initChildren(): void {
    this.children.link = new Link({
      text: 'Назад к чатам',
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}
