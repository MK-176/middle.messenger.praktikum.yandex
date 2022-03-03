import {Block} from '../../modules';
import {TObject} from '../../Types';
import template from './Avatar.hbs';
import Button from '../Button';
import Link from '../Link';

export class Avatar extends Block {
  constructor(props: TObject) {
    super(props);
  }

  initChildren() {
    this.children.button = new Button({
      text: 'Поменять',
      type: 'button',
    });
    this.children.link = new Link({
      link: '#',
      text: 'Выбрать файл на<br />компьютере',
    });
  }

  render(): DocumentFragment {
    return this.compile(template, {...this.props});
  }
}
