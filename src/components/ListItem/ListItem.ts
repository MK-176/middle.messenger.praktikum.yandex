import {Block} from '../../modules';
import {TObject} from '../../Types';
import template from './ListItem.hbs';

export class ListItem extends Block {
  constructor(props: TObject) {
    super(props);
  }
  render() {
    return this.compile(template, {...this.props})
  }
}
