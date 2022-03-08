import { Block } from '../../modules';
import type { TData } from '../../Types';
import template from './Title.hbs';

export class Title extends Block {
  constructor(props: TData) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}
