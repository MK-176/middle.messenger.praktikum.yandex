import {Block} from '../../modules';
import {TObject} from '../../Types';
import template from './Register.hbs';
import Title from '../../components/Title';
import registerInputs from '../../json/register.json';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Link from '../../components/Link';

export class Register extends Block {
  constructor(props: TObject) {
    super(props);
  }

  protected initChildren() {
    this.children.title = new Title({text: 'Регистрация'});
    this.children.input = [];
    registerInputs.forEach((props: TObject) => {
      const input = new Input({...props});
      (this.children.input as Block[]).push(input);
    });
    this.children.button = new Button({text: 'Зарегистрироваться'});
    this.children.link = new Link({text: 'Войти'});
  }

  render() {
    return this.compile(template, {...this.props});
  }
}
