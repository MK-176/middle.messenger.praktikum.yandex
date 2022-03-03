import {Block} from '../../modules';
import {TObject} from '../../Types';
import Link from '../../components/Link';
import template from './PageError.hbs';

export class PageError extends Block {
  constructor(props: TObject) {
    super(props);
  }

  initChildren() {
    this.children.link = new Link({
      text: 'Назад к чатам',
      link: this.props.link,
    });
  }

  render(): any {
    return this.compile(template, {...this.props});
  }
}
