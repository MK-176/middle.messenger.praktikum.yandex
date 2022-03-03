import template from "./Title.hbs";
import {Block} from '../../modules';
import {TObject} from '../../Types';

export default class Title extends Block {
  constructor(props: TObject) {
    super(props);
  }

  protected render(): any {
    return this.compile(template, {...this.props});
  }
}
