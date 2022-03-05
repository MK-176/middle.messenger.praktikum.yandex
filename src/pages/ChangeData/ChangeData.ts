import type {TData} from '../../Types';
import ChangeProfileData from '../../components/ChangeProfileData';
import {Block} from '../../modules';
import ProfileFormItem from '../../components/ProfileFormItem';

const profileItems = [
  {
    'label': 'Почта',
    'value': 'pochta@yandex.ru',
    'type': 'text',
    'name': 'email',
    "inputType": "email",
    "modify": "stroke",
    "notice": "Поле не заполнено",
    "error": false,
  },
  {
    'label': 'Логин',
    'value': 'michaelkim',
    'type': 'text',
    'name': 'login',
    "inputType": "login",
    "modify": "stroke",
    "notice": "Поле не заполнено",
    "error": false,
  },
  {
    'label': 'Имя',
    'value': 'Михаил',
    'type': 'text',
    'name': 'name',
    "inputType": "name",
    "modify": "stroke",
    "notice": "Поле не заполнено",
    "error": false,
  },
  {
    'label': 'Фамилия',
    'value': 'Ким',
    'type': 'text',
    'name': 'surname',
    "inputType": "name",
    "modify": "stroke",
    "notice": "Поле не заполнено",
    "error": false,
  },
  {
    'label': 'Имя в чате',
    'value': 'Михаил',
    'type': 'text',
    'name': 'login',
    "inputType": "email",
    "modify": "stroke",
    "notice": "Поле не заполнено",
    "error": false,
  },
  {
    'label': 'Телефон',
    'value': '+7 (000) 000-00-00',
    'type': 'text',
    'name': 'phone',
    "inputType": "phone",
    "modify": "stroke",
    "notice": "Поле не заполнено",
    "error": false,
  },
];

export class ChangeData extends ChangeProfileData {
  constructor(props: TData) {
    super({...props});
  }

  protected initChildren(): void {
    super.initChildren();
    this.children.profileFormItem = [];
    (profileItems as TData[]).forEach((props: TData) => {
      const profileItem = new ProfileFormItem({...props, });

      (this.children.profileFormItem as Block[]).push(profileItem);
    });
  }
}
