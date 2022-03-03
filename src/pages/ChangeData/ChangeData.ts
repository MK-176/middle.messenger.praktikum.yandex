import {TObject} from '../../Types';
import ChangeProfileData from '../../components/ChangeProfileData';
import {Block} from '../../modules';
import ProfileFormItem from '../../components/ProfileFormItem';

const profileItems = [
  {
    'label': 'Почта',
    'value': 'pochta@yandex.ru',
    'type': 'text',
    'name': 'email',
  },
  {
    'label': 'Логин',
    'value': 'michaelkim',
    'type': 'text',
    'name': 'login',
  },
  {
    'label': 'Имя',
    'value': 'Михаил',
    'type': 'text',
    'name': 'name',
  },
  {
    'label': 'Фамилия',
    'value': 'Ким',
    'type': 'text',
    'name': 'surname',
  },
  {
    'label': 'Имя в чате',
    'value': 'Михаил',
    'type': 'text',
    'name': 'chat-name',
  },
  {
    'label': 'Телефон',
    'value': '+7 (000) 000-00-00',
    'type': 'text',
    'name': 'phone',
  },
];

export class ChangeData extends ChangeProfileData {
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
