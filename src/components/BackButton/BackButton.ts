import {Block} from '../../modules';
import {TObject} from '../../Types';
import template from './BackButton.hbs';

export class BackButton extends Block {
  constructor(props: TObject) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(template, {...this.props});
  }
}
