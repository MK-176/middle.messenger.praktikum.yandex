import {Block} from '../../modules';
import type {TData} from '../../Types';
import template from './Link.hbs';

export class Link extends Block {
  constructor(props: TData) {
    super(props);
  }

  protected render(): any {
    return this.compile(template, {...this.props});
  }
}
