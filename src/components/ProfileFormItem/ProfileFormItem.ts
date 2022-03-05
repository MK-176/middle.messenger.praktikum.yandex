import {Block} from '../../modules';
import type {TData} from '../../Types';
import Input from '../Input';
import template from './ProfileFormItem.hbs';

export class ProfileFormItem extends Block {
  constructor(props: TData) {
    super(props);
  }

  protected initChildren(): void {
    this.children.input = new Input({
      ...this.props,
      type: this.props.type,
      value: this.props.value,
      modify: 'border-none',
      label: '',
    });
  }

  protected render(): any {
    return this.compile(template, {...this.props});
  }
}
