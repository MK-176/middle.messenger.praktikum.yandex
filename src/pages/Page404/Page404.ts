import {Block} from '../../modules';
import {TObject} from '../../Types';
import template from './Page404.hbs';
import Link from '../../components/Link';

export class Page404 extends Block {
  constructor(props: TObject) {
    super(props);
  }

  protected initChildren() {
    this.children.link = new Link({
      text: 'Назад к чатам',
    });
  }

  protected render(): any {
    return this.compile(template, {...this.props});
  }
}
