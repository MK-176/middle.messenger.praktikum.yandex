import {Block} from '../../modules';
import {TObject} from '../../Types';
import BackButton from '../../components/BackButton';
import Avatar from '../../components/Avatar';
import Button from '../../components/Button';
import template from './ChangeData.hbs';

export class ChangeProfileData extends Block {
  constructor(props: TObject) {
    super(props);
  }

  initChildren() {
    this.children.backButton = new BackButton({
      link: this.props.link,
      text: 'Назад к чатам',
    });
    this.children.avatar = new Avatar({
      canChange: this.props.avatarCanChange,
    });
    this.children.button = new Button({
      text: 'Сохранить',
      type: 'button',
    });
  }

  render(): DocumentFragment {
    return this.compile(template, {...this.props});
  }
}
