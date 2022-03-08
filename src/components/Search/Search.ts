import { Block } from '../../modules';
import type { TData } from '../../Types';
import { setClass } from '../../utils';
import template from './Search.hbs';

export class Search extends Block {
  constructor(props: TData) {
    super({
      ...props,
      events: {
        focusin: (ev: Event) => {
          const target = ev.target as HTMLInputElement;

          if (target.hasAttribute('data-search-input')) {
            const parent = target.closest('[data-search]') as HTMLDivElement;
            setClass(parent, 'filled', true);
          }
        },
        focusout: (ev: Event) => {
          const target = ev.target as HTMLInputElement;

          if (target.hasAttribute('data-search-input')) {
            const parent = target.closest('[data-search]') as HTMLDivElement;
            setClass(parent, 'filled', false);
            setClass(parent, 'focus', target.value !== '');
          }
        },
      },
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}
