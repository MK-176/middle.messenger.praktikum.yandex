import { Block } from '../../modules';
import type { TData } from '../../Types';
import Link from '../Link';
import template from './ProfileFormItemLink.hbs';

export class ProfileFormItemLink extends Block {
  constructor(props: TData) {
    super(props);
  }

  initChildren(): void {
    this.children.link = new Link({
      ...this.props,
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}
