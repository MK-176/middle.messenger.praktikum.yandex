import { Block } from '../../modules';
import type { TData } from '../../Types';
import ButtonTmpl from './Button.hbs';

export class Button extends Block {
  constructor(props: TData) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(ButtonTmpl, { ...this.props });
  }
}
