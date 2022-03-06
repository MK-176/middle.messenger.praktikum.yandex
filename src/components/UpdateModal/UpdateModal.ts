import {Block} from '../../modules';
import type {TData} from '../../Types';
import template from './UpdateModal.hbs';
import Input from '../Input';
import Button from '../Button';

export class UpdateModal extends Block {
  constructor(props: TData) {
    super(props);
  }

  protected initChildren(): void {
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

  protected render(): DocumentFragment {
    return this.compile(template, {...this.props});
  }
}
