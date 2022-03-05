import template from "./Title.hbs";
import {Block} from '../../modules';
import type {TData} from '../../Types';

export default class Title extends Block {
  constructor(props: TData) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, {...this.props});
  }
}
