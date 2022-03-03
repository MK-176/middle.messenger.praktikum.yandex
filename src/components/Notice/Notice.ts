import {Block} from '../../modules';
import {TObject} from '../../Types';
import template from './Notice.hbs';

export class Notice extends Block {
  constructor(props: TObject) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(template, {...this.props});
  }
}
