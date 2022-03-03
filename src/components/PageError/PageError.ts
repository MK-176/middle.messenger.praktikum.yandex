import {Block} from '../../modules';
import {TObject} from '../../Types';
import template from './Page404.hbs';
import Link from '../../components/Link';


export class PageError extends Block {
  constructor(props: TObject) {
    super(props);
  }

  initChildren() {
    this.children.link = new Link({
      text: 'Назад к чатам',
    });
  }

  render(): any {
    return this.compile(template, {...this.props});
  }
}
