import {Block} from '../../modules';
import {TObject} from '../../Types';
import template from './Chat.hbs';

export class Chat extends Block {
  constructor(props: TObject) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(template, {...this.props});
  }
}
