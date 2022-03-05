import {Block} from '../../modules';
import type {TData} from '../../Types';
import template from './Messages.hbs';
import {Message} from '../Message/Message';

const messages = [
  {
    media: false,
    mine: false,
    status: false,
    seen: false,
    time: '11:56',
    text: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.',
  },
  {
    media: false,
    mine: true,
    status: true,
    seen: true,
    time: '11:57',
    text: 'Классно. А есть фото?',
  },
  {
    media: true,
    mine: false,
    status: false,
    seen: false,
    time: '12:00',
    text: '<img src="../images/hasselblad.png">',
  },
  {
    media: false,
    mine: true,
    status: true,
    seen: false,
    time: '12:01',
    text: 'Спасибо!',
  },
];

export class Messages extends Block {
  constructor(props: TData) {
    super(props);
  }

  protected initChildren(): void {
    this.children.messages = [];
    messages.forEach((props) => {
      const message = new Message({...props});

      (this.children.messages as Block[]).push(message);
    });
  }

  protected render(): any {
    return this.compile(template, {...this.props});
  }
}
