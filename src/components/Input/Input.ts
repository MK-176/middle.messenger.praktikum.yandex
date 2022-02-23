import {Block} from '../../modules';
import type {TObject} from '../../Types';
import InputTemplate from './input.hbs';

export default class Input extends Block {
  constructor(props: TObject) {
    super(props);
  }

  render(): any {
    return this.compile(InputTemplate, {...this.props});
  }
}
