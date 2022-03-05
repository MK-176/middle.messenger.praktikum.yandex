import {Block} from '../../modules';
import type {TData} from '../../Types';
import template from './Auth.hbs';
import authInputs from '../../json/auth.json';
import Title from '../../components/Title';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Link from '../../components/Link';
import {submitForm} from '../../utils';

export class Auth extends Block {
  constructor(props: TData) {
    super(props);
  }

  protected initChildren(): void {
    this.children.title = new Title({
      text: 'Авторизация',
    });
    this.children.input = [];
    authInputs.forEach((props: TData) => {
      const input = new Input({...props});
      (this.children.input as Block[]).push(input);
    });
    this.children.button = new Button({
      text: 'Войти',
      type: 'submit',
      events: {
        'click': submitForm,
      },
    });
    this.children.link = new Link({
      text: 'Нет аккаунта?',
    });
  }

  protected render(): any {
    return this.compile(template, {...this.props});
  }
}
