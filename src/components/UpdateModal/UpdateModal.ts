import {Block} from '../../modules';
import {TObject} from '../../Types';
import template from './UpdateModal.hbs';
import Input from '../Input';
import Button from '../Button';


export class UpdateModal extends Block {
  constructor(props: TObject) {
    super(props);
  }

  initChildren() {
    this.children.input = new Input({
      modify: 'stroke',
      type: 'text',
      label: 'Логин',
    });
    this.children.button = new Button({
      text: this.props.text,
      type: 'button',
    });
  }

  render(): DocumentFragment {
    return this.compile(template, {...this.props});
  }
}
