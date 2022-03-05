import {Block} from '../../modules';
import type {TData} from '../../Types';
import template from './ProfileFormItemLink.hbs';
import Link from '../Link';

export class ProfileFormItemLink extends Block {
  constructor(props: TData) {
    super(props);
  }

  protected initChildren(): void {
    this.children.link = new Link({
      ...this.props,
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, {...this.props});
  }
}
