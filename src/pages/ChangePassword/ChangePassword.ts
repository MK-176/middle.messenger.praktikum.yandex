import {TObject} from '../../Types';
import ChangeProfileData from '../../components/ChangeProfileData';
import ProfileFormItem from '../../components/ProfileFormItem';
import {Block} from '../../modules';

const profileItems = [
  {
    'label': 'Старый пароль',
    'value': '1234567890',
    'type': 'password',
    'name': 'old-password',
  },
  {
    'label': 'Новый пароль',
    'value': '1234567890123456',
    'type': 'password',
    'name': 'password',
  },
  {
    'label': 'Повторите новый пароль',
    'value': '1234567890123456',
    'type': 'password',
    'name': 'new-password',
  },
];

export class ChangePassword extends ChangeProfileData {
  constructor(props: TObject) {
    super({...props});
  }

  initChildren() {
    super.initChildren();
    this.children.profileFormItem = [];
    (profileItems as TObject[]).forEach((props: TObject) => {
      const profileItem = new ProfileFormItem({...props});

      (this.children.profileFormItem as Block[]).push(profileItem);
    });
  }
}
