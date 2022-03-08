import type { THtmlDivArray } from '../../Types';
import template from './Modal.hbs';

type TDefaultData = {
  selector?: string,
  src?: string,
  wrap?: string,
  content?: string,
  hasCloseBtn?: boolean,
  opened?: Function | null,
};
const defaultData: TDefaultData = {
  selector: '[data-modal]',
  src: 'data-modal',
  wrap: 'data-modal-wrap',
  content: 'data-modal-content',
  hasCloseBtn: false,
  opened: null,
};

export class Modal {
  mainData: TDefaultData = {};
  modalBlock: HTMLDivElement | null = null;

  constructor(options: TDefaultData = {}) {
    this.#setMainData(options);

    const {
      mainData: {
        selector,
      },
    } = this;
    const modals: THtmlDivArray = Array.from(
      document.querySelectorAll(selector as string),
    );
    const initModals: THtmlDivArray = modals.filter((modal: HTMLDivElement) => (
      !modal.hasAttribute('data-modal-init')
    ));

    if (initModals.length > 0) {
      this.#init(initModals);
    }
  }

  #setMainData = (options: TDefaultData) => {
    this.mainData = {
      ...defaultData,
      ...options,
    };
  };

  #init = (modals: THtmlDivArray) => {
    modals.forEach((modal: HTMLDivElement) => {
      modal.setAttribute('data-modal-init', 'true');
      return this.#eventListeners(modal);
    });
  };

  #eventListeners = (modal: HTMLDivElement) => {
    modal.addEventListener('click', (e: Event) => {
      e.preventDefault();

      const { src } = this.mainData;
      const { opened } = this.mainData;
      const { wrap } = this.mainData;

      this.#closeAllModals(Array.from(
        document.querySelectorAll(`[${wrap as string}]`),
      ));
      const block: HTMLDivElement = this.#createStructure();
      const modalData: string | null = modal.getAttribute(src as string);

      this.#openModal(block);

      if (modalData) {
        const contentBlock: Node | null = (
          document.getElementById(modalData)
          || document.querySelector(
            `[data-modal-block='${modalData}']`,
          )
        );

        if (contentBlock) {
          const content: Node = contentBlock.cloneNode(true);

          (this.modalBlock as HTMLDivElement).appendChild(content);
          this.#reInit(block);
        }
      }

      if (opened) {
        opened(this.modalBlock);
      }
    });
  };

  #createStructure = (): HTMLDivElement => {
    const {
      mainData: {
        wrap: wrapData,
        content,
      },
    } = this;

    const tmpl: HTMLTemplateElement = document.createElement('template');
    tmpl.innerHTML = template();
    const wrap = ((
      tmpl.content.querySelector(`[${wrapData}]`) as Node
    ).cloneNode(true) as HTMLDivElement);
    tmpl.remove();

    this.modalBlock = (wrap.querySelector(`[${content}]`) as HTMLDivElement);
    this.#closeModal(wrap);

    return wrap;
  };

  #reInit = (wrap: HTMLDivElement) => {
    const modals: THtmlDivArray = Array.from(
      wrap.querySelectorAll(this.mainData.selector as string),
    );
    const modalsArray: THtmlDivArray = modals.map((modal) => {
      if (modal.hasAttribute('data-modal-init')) {
        modal.removeAttribute('data-modal-init');
      }

      return modal;
    });

    if (modalsArray.length > 0) {
      this.#init(modals);
    }
  };

  #openModal = (block: HTMLDivElement) => {
    const body: HTMLElement = document.body;

    body.appendChild(block);
  };

  #closeModal = (modal: HTMLDivElement) => {
    const removeModal = (ev: Event) => {
      if ((ev.target as HTMLElement).classList.contains('modal')) {
        modal.remove();
      }
    };
    modal.addEventListener('click', removeModal);
  };

  #closeAllModals = (modals: THtmlDivArray = []) => {
    modals.forEach((modal: HTMLDivElement) => {
      modal.remove();
    });
  };
}
