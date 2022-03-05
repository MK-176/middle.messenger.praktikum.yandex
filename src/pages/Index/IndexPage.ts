import {Block} from '../../modules';
import type {TData} from '../../Types';
import template from './IndexPage.hbs';
import Sidebar from '../../components/Sidebar';


export class IndexPage extends Block {
  constructor(props: TData) {
    super(props);
  }

  protected initChildren(): void {
    this.children.sidebar = new Sidebar({});
  }

  protected render(): any {
    return this.compile(template, {...this.props});
  }
}
