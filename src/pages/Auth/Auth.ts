import {Block} from '../../modules';
import {TObject} from '../../Types';
import template from './Auth.hbs';
import authInputs from '../../json/auth.json';
import Input from '../../components/Input';
import Title from '../../components/Title';
import Button from '../../components/Button';
import Link from '../../components/Link';
import {focusIn, focusOut} from '../../modules/focus';

export class Auth extends Block {
  constructor(props: TObject) {
    super(props);
  }

  initChildren() {
    const inputFocusIn = (ev: Event) => {
      focusIn(ev, (validate: boolean, value: string) => {
        if (validate) {
          console.log(value);
        }
      });
    };
    const inputFocusOut = (ev: Event) => {
      focusOut(ev, (validate: boolean, value: string) => {
        console.log(value, validate);
        if (validate) {
          console.log(value);
        }
      });
    };

    this.children.title = new Title({text: 'Авторизация'});
    this.children.input = [];
    authInputs.forEach((props: TObject) => {
      const input = new Input({
        ...props,
        events: {
          'focusin': inputFocusIn,
          'focusout': inputFocusOut,
        },
      });
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
