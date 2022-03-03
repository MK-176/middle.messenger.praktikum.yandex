import {Block} from '../../modules';
import {TObject} from '../../Types';
import template from './Chat.hbs';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Messages from '../../components/Messages';


export class Chat extends Block {
  constructor(props: TObject) {
    super(props);
  }

  initChildren() {
    this.children.sidebar = new Sidebar({});
    this.children.header = new Header({});
    this.children.messages = new Messages({
      date: this.props.date,
    });
    this.children.footer = new Footer({});
  }

  render(): DocumentFragment {
    return this.compile(template, {...this.props});
  }
}
