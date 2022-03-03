import {Block} from '../../modules';
import {TObject} from '../../Types';
import template from './IndexPage.hbs';
import Sidebar from '../../components/Sidebar';


export class IndexPage extends Block {
  constructor(props: TObject) {
    super(props);
  }

  initChildren() {
    this.children.sidebar = new Sidebar({});
  }

  render(): any {
    return this.compile(template, {...this.props});
  }
}
