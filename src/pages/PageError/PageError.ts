import {Block} from '../../modules';
import type {TData} from '../../Types';
import Link from '../../components/Link';
import template from './PageError.hbs';

export class PageError extends Block {
  constructor(props: TData) {
    super(props);
  }

  protected initChildren(): void {
    this.children.link = new Link({
      text: 'Назад к чатам',
      link: this.props.link,
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, {...this.props});
  }
}
