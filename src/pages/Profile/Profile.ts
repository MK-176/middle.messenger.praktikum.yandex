import type { TData } from '../../Types';
import { Block } from '../../modules';
import ProfileFormItem from '../../components/ProfileFormItem';
import BackButton from '../../components/BackButton';
import Avatar from '../../components/Avatar';
import template from './Profile.hbs';
import ProfileFormItemLink from '../../components/ProfileFormItemLink';

const profileItems = [
  {
    label: 'Почта',
    value: 'pochta@yandex.ru',
  },
  {
    label: 'Логин',
    value: 'michaelkim',
  },
  {
    label: 'Имя',
    value: 'Михаил',
  },
  {
    label: 'Фамилия',
    value: 'Ким',
  },
  {
    label: 'Имя в чате',
    value: 'Михаил',
  },
  {
    label: 'Телефон',
    value: '+7 (000) 000-00-00',
  },
];
const profileItemsLinks = [
  {
    link: './change-data-page.html',
    text: 'Изменить данные',
    modify: '',
  },
  {
    link: './change-password-page.html',
    text: 'Изменить пароль',
    modify: '',
  },
  {
    link: './auth-page.html',
    text: 'Выйти',
    modify: 'alert',
  },
];

export class Profile extends Block {
  constructor(props: TData) {
    super({ ...props });
  }

  initChildren(): void {
    this.children.backButton = new BackButton({
      link: this.props.link,
      text: 'Назад к чатам',
    });
    this.children.avatar = new Avatar({
      canChange: false,
    });
    this.children.profileFormItem = [];
    (profileItems as TData[]).forEach((props: TData) => {
      const profileItem = new ProfileFormItem({ ...props });

      (this.children.profileFormItem as Block[]).push(profileItem);
    });
    this.children.profileFormItemLink = [];
    (profileItemsLinks as TData[]).forEach((props: TData) => {
      const profileItemLink = new ProfileFormItemLink({ ...props });

      (this.children.profileFormItemLink as Block[]).push(profileItemLink);
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}
