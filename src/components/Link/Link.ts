import {Block} from '../../modules';
import {TObject} from '../../Types';
import template from './Link.hbs';

export class Link extends Block {
  constructor(props: TObject) {
    super(props);
  }


  render(): any {
    return this.compile(template, {...this.props});
  }
}
