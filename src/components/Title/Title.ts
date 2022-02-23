import template from "./Title.hbs";
import {Block} from '../../modules';
import {IBlock} from '../../Interfaces';
import {TObject} from '../../Types';

export default class Title extends Block implements IBlock {
  constructor(props: TObject) {
    super(props);
  }

  protected render(): any {
    return this.compile(template, {...this.props});
  }
}
