import {TObject} from '../../Types';
import ChangeProfileData from '../../components/ChangeProfileData';
import {Block} from '../../modules';
import ProfileFormItem from '../../components/ProfileFormItem';

const profileItems = [
  {
    'label': 'Почта',
    'value': 'pochta@yandex.ru',
  },
  {
    'label': 'Логин',
    'value': 'michaelkim',
  },
  {
    'label': 'Имя',
    'value': 'Михаил',
  },
  {
    'label': 'Фамилия',
    'value': 'Ким',
  },
  {
    'label': 'Имя в чате',
    'value': 'Михаил',
  },
  {
    'label': 'Телефон',
    'value': '+7 (000) 000-00-00',
  },
];

export class Profile extends ChangeProfileData {
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
