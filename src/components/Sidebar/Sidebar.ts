import {Block} from '../../modules';
import type {TData} from '../../Types';
import template from './Sidebar.hbs';
import contacts from '../../json/contacts.json';
import Search from '../Search';
import ChatContact from '../ChatContact';

export class Sidebar extends Block {
  constructor(props: TData) {
    super({...props, link: './profile-page.html'});
  }

  protected initChildren(): void {
    this.children.search = new Search({});
    this.children.contact = [];
    contacts.forEach((props: TData) => {
      const contact = new ChatContact({...props});
      (this.children.contact as Block[]).push(contact);
    });
  }

  protected render(): any {
    return this.compile(template, {...this.props});
  }
}
