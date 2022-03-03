import {Block} from '../../modules';
import type {TObject} from '../../Types';
import InputTemplate from './input.hbs';
import {focusIn, focusOut} from '../../modules/focus';
import Notice from '../Notice';

const noticeObject = {
  notice: 'Не верно заполнено!',
};

export class Input extends Block {
  constructor(props: TObject) {
    super({
      events: {
        focusin: (ev: Event) => {
          focusIn(ev, (validate: boolean, value: string) => {
            const props = {
              ...this.props,
              ...noticeObject,
              value,
              filled: value,
            };

            if ((ev.target as HTMLFormElement).value !== this.props.value) {
              this.setProps({
                ...props,
                error: value && validate,
              });
            }
          });
        },
        focusout: (ev: Event) => {
          focusOut(ev, (validate: boolean, value: string) => {
            const props = {
              ...this.props,
              ...noticeObject,
              value,
              error: validate && value,
              filled: value,
            };

            if (validate && value) {
              this.setProps({
                ...props,
                error: false,
              });
              (this.element as HTMLDivElement).classList.add('filled');
            } else {
              this.setProps({
                ...props,
                error: true,
              });
            }
          });
        },
      },
      ...props,
    });
  }

  initChildren() {
    this.children.notice = new Notice({
      notice: this.props.notice,
    });
  }

  protected render(): any {
    return this.compile(InputTemplate, {...this.props});
  }
}
