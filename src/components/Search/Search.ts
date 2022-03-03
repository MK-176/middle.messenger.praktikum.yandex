import {Block} from '../../modules';
import {TObject} from '../../Types';
import template from './Search.hbs';

export class Search extends Block {
  constructor(props: TObject) {
    super(props);
  }

  render(): DocumentFragment {
    return this.compile(template, {...this.props});
  }
}