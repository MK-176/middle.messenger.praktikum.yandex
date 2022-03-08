import { Block } from '../../modules';
import type { TData } from '../../Types';
import Title from '../../components/Title';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Link from '../../components/Link';
import { submitForm } from '../../utils';
import template from './Register.hbs';
import registerInputs from '../../json/register.json';

export class Register extends Block {
  constructor(props: TData) {
    super(props);
  }

  initChildren(): void {
    this.children.title = new Title({
      text: 'Регистрация',
    });
    this.children.input = [];
    registerInputs.forEach((props: TData) => {
      const input = new Input({ ...props });
      (this.children.input as Block[]).push(input);
    });
    this.children.button = new Button({
      text: 'Зарегистрироваться',
      type: 'submit',
      events: {
        click: submitForm,
      },
    });
    this.children.link = new Link({
      text: 'Войти',
      link: '/auth-page.html',
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}
