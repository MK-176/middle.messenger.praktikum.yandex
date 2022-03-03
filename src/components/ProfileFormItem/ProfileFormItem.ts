import {Block} from '../../modules';
import {TObject} from '../../Types';
import Input from '../Input';
import template from './ProfileFormItem.hbs';


export class ProfileFormItem extends Block {
  constructor(props: TObject) {
    super(props);
  }

  initChildren() {
    if (this.props.type) {
      this.children.input = new Input({
        type: this.props.type,
        value: this.props.value,
      });
    }
  }

  render(): DocumentFragment {
    return this.compile(template, {...this.props});
  }
}
