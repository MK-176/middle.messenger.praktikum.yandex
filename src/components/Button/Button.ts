import ButtonTmpl from './Button.hbs';
import {Block} from '../../modules';
import type {TObject} from '../../Types';

export class Button extends Block {
  constructor(props: TObject) {
    super(props);
  }

  render(): any {
    return this.compile(ButtonTmpl, {...this.props});
  }
}
