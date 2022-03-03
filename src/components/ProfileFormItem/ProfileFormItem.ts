import {Block} from '../../modules';
import {TObject} from '../../Types';
import Input from '../Input';
import template from './ProfileFormItem.hbs';


export class ProfileFormItem extends Block {
  constructor(props: TObject) {
    super(props);
  }

  initChildren() {
    this.children.input = new Input({
      ...this.props,
      type: this.props.type,
      value: this.props.value,
      modify: 'border-none',
      label: '',
    });
  }

  render(): DocumentFragment {
    return this.compile(template, {...this.props});
  }
}
