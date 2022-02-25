import type {TArray} from '../../Types';
import template from './Modal.hbs';

type TObject<T = string | boolean | number | null | undefined | Function> = {
  [key: string]: T,
};

const defaultData: TObject = {
  selector: '[data-modal]',
  src: 'data-modal',
  wrap: 'data-modal-wrap',
  content: 'data-modal-content',
  hasCloseBtn: false,
  opened: null,
};

export class Modal {
  mainData: TObject = {};
  modalBlock: HTMLDivElement | null = null;

  constructor(options: TObject = {}) {
    this.#setMainData(options);

    const {
      mainData: {
        selector,
      },
    } = this;
    const modals: TArray = Array.from(
      document.querySelectorAll(selector as string),
    );
    const initModals: TArray = modals.filter((modal: HTMLDivElement) => (
      !modal.hasAttribute('data-modal-init')
    ));

    if (initModals.length > 0) {
      this.#init(initModals);
    }
  }

  #setMainData = (options: TObject) => {
    this.mainData = {
      ...defaultData,
      ...options,
    };
  };

  #init = (modals: TArray) => {
    modals.forEach((modal: HTMLDivElement) => {
      modal.setAttribute('data-modal-init', 'true');
      return this.#eventListeners(modal);
    });
  };

  #eventListeners = (modal: HTMLDivElement) => {
    modal.addEventListener('click', (e: Event) => {
      e.preventDefault();
      const {
        mainData: {
          src,
          opened,
          wrap,
        },
      } = this;
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
        const openedCallback = opened as Function;
        openedCallback(this.modalBlock);
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
    const modals: TArray = Array.from(
      wrap.querySelectorAll(this.mainData.selector as string),
    );
    const modalsArray: TArray = modals.map((modal) => {
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
    modal.addEventListener('click', function removeModal(ev: Event) {
      if ((ev.target as HTMLElement).classList.contains('modal')) {
        modal.remove();
      }
    });
  };

  #closeAllModals = (modals: TArray = []) => {
    modals.forEach((modal: HTMLDivElement) => {
      modal.remove();
    });
  };
}
