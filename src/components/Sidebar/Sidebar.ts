import {Block} from '../../modules';
import {TObject} from '../../Types';
import template from './Sidebar.hbs';
import contacts from '../../json/contacts.json';
import Search from '../Search';
import ChatContact from '../ChatContact';

export class Sidebar extends Block {
  constructor(props: TObject) {
    super(props);
  }

  initChildren() {
    this.children.search = new Search({});
    this.children.contact = [];
    contacts.forEach((props: TObject) => {
      const contact = new ChatContact({...props});
      (this.children.contact as Block[]).push(contact);
    });
  }

  render(): DocumentFragment {
    return this.compile(template, {...this.props});
  }
}
