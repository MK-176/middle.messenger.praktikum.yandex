import {Block} from '../../modules';
import {TObject} from '../../Types';
import template from './Message.hbs';

export class Message extends Block {
  constructor(props: TObject) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(template, {...this.props});
  }
}
