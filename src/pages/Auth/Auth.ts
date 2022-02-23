import {Block} from '../../modules';
import {TObject} from '../../Types';
import template from './Auth.hbs';
import authInputs from '../../json/auth.json';
import Input from '../../components/Input';
import Title from '../../components/Title';
import Button from '../../components/Button';
import Link from '../../components/Link';

export class Auth extends Block {
  constructor(props: TObject) {
    super(props);
  }

  protected initChildren() {
    this.children.title = new Title({text: 'Авторизация'});
    this.children.input = [];
    authInputs.forEach((props: TObject) => {
      const input = new Input({...props});
      (this.children.input as Block[]).push(input);
    });
    this.children.button = new Button({text: 'Войти'});
    this.children.link = new Link({
      text: 'Нет аккаунта?',
    });
  }

  render(): any {
    return this.compile(template, {...this.props});
  }
}
