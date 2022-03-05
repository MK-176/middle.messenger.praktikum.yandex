import ButtonTmpl from './Button.hbs';
import {Block} from '../../modules';
import type {TData} from '../../Types';

export class Button extends Block {
  constructor(props: TData) {
    super(props);
  }

  protected render(): any {
    return this.compile(ButtonTmpl, {...this.props});
  }
}
