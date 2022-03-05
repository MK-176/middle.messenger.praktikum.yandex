import {Block} from '../../modules';
import type {TData} from '../../Types';
import InputTemplate from './input.hbs';
import {inputFocusIn, inputFocusOut} from '../../modules/inputFocus';
import Notice from '../Notice';

const noticeObject = {
  notice: 'Не верно заполнено!',
};

export class Input extends Block {
  constructor(props: TData) {
    super({
      events: {
        focusin: (ev: Event) => {
          inputFocusIn(ev, (validate: boolean, value: string) => {
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
          inputFocusOut(ev, (validate: boolean, value: string) => {
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

  protected initChildren(): void {
    this.children.notice = new Notice({
      notice: this.props.notice,
    });
  }

  protected render(): any {
    return this.compile(InputTemplate, {...this.props});
  }
}
