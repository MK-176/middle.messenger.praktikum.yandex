import type {TData} from '../../Types';
import ChangeProfileData from '../../components/ChangeProfileData';
import ProfileFormItem from '../../components/ProfileFormItem';
import {Block} from '../../modules';

const profileItems = [
  {
    'label': 'Старый пароль',
    'value': '1234567890',
    'type': 'password',
    'name': 'old-password',
    "inputType": "password",
    "modify": "stroke",
    "notice": "Поле не заполнено",
    "error": false,
  },
  {
    'label': 'Новый пароль',
    'value': '1234567890123456',
    'type': 'password',
    'name': 'password',
    "inputType": "password",
    "modify": "stroke",
    "notice": "Поле не заполнено",
    "error": false,
  },
  {
    'label': 'Повторите новый пароль',
    'value': '1234567890123456',
    'type': 'password',
    'name': 'new-password',
    "inputType": "password",
    "modify": "stroke",
    "notice": "Поле не заполнено",
    "error": false,
  },
];

export class ChangePassword extends ChangeProfileData {
  constructor(props: TData) {
    super({...props});
  }

  protected initChildren(): void {
    super.initChildren();
    this.children.profileFormItem = [];
    (profileItems as TData[]).forEach((props: TData) => {
      const profileItem = new ProfileFormItem({...props});

      (this.children.profileFormItem as Block[]).push(profileItem);
    });
  }
}
