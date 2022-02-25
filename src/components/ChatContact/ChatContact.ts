import {Block} from '../../modules';
import {TObject} from '../../Types';
import template from './ChatContact.hbs';

export class ChatContact extends Block {
  constructor(props: TObject) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(template, {...this.props});
  }
}
