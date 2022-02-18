import type {TArray} from "../../Types/TArray";
type TObject<T = string | boolean | number | null | undefined | Function> = {
  [key: string]: T,
};

const defaultData: TObject = {
  selector: '[data-modal]',
  src: 'data-modal',
  wrap: 'data-modal-wrap',
  hasCloseBtn: false,
  opened: null,
};

export default class Modal {
  mainData: TObject = {};
  closeBtn: HTMLDivElement | null = null;
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
    modals.map((modal: HTMLDivElement) => {
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
        hasCloseBtn,
      },
    } = this;
    const wrap: HTMLDivElement = document.createElement('div');
    const block: HTMLDivElement = document.createElement('div');
    this.modalBlock = document.createElement('div');

    wrap.classList.add('modal');
    wrap.setAttribute(wrapData as string, 'wrap');
    block.classList.add('modal__block');
    this.modalBlock.classList.add('modal__block-content');

    if (hasCloseBtn) {
      this.closeBtn = document.createElement('div');
      this.closeBtn.classList.add('modal__close');
      this.#closeModal(this.closeBtn, wrap);
    } else {
      this.#closeModal(null, wrap);
    }

    block.appendChild(this.modalBlock);
    if (hasCloseBtn) {
      block.appendChild(this.closeBtn as HTMLDivElement);
    }
    wrap.appendChild(block);

    return wrap;
  };

  #reInit = (wrap: HTMLDivElement) => {
    const modals: TArray = Array.from(
      wrap.querySelectorAll(this.mainData.selector as string)
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

  #closeModal = (button: HTMLElement | null, modal: HTMLDivElement) => {
    const modalRemove = (): void => {
      modal.remove();
    };
    if (button) {
      button.addEventListener('click', modalRemove);
    }
    modal.addEventListener('click', (ev: Event) => {
      if ((ev.target as HTMLElement).classList.contains('modal')) {
        modalRemove();
      }
    });
  };

  #closeAllModals = (modals: TArray) => {
    if (modals.length > 0) {
      modals.forEach((modal: HTMLDivElement) => {
        modal.remove();
      });
    }
  };
}
