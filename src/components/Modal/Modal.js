const defaultData = {
  selector: '[data-modal]',
  src: 'data-modal',
  wrap: 'data-modal-wrap',
  hasCloseBtn: false,
};

export default class Modal {
  mainData = {};

  modalBlock = null;

  constructor(options = {}) {
    this.#setMainData(options);

    const {
      mainData: {
        selector,
      },
    } = this;
    const modals = document.querySelectorAll(selector);
    const initModals = Array.from(modals).filter((modal) => (
      !modal.hasAttribute('data-modal-init')
    ));

    if (initModals.length > 0) {
      this.#init(initModals);
    }
  }

  #setMainData = (options) => {
    this.mainData = {
      ...defaultData,
      ...options,
    };
  };

  #init = (modals) => {
    modals.map((modal) => {
      modal.setAttribute('data-modal-init', true);
      return this.#eventListeners(modal);
    });
  };

  #eventListeners = (modal) => {
    modal.addEventListener('click', (e) => {
      e.preventDefault();
      const {
        mainData: {
          src,
          opened,
          wrap,
        },
      } = this;
      this.#closeAllModals(Array.from(
        document.querySelectorAll(`[${wrap}]`),
      ));
      const block = this.#createStructure();
      const modalData = modal.getAttribute(src);

      this.#openModal(block, modal);

      const contentBlock = (
        document.getElementById(modalData)
        || document.querySelector(
          `[data-modal-block='${modalData}']`,
        )
      );

      if (contentBlock) {
        const content = contentBlock.cloneNode(true);
        this.modalBlock.appendChild(content);
        this.#reInit(block);
      }

      if (opened) {
        opened(this.modalBlock);
      }
    });
  };

  #createStructure = () => {
    const {
      mainData: {
        wrap: wrapData,
        hasCloseBtn,
      },
    } = this;
    const wrap = document.createElement('div');
    const block = document.createElement('div');
    this.modalBlock = document.createElement('div');

    wrap.classList.add('modal');
    wrap.setAttribute(wrapData, 'wrap');
    block.classList.add('modal__block');
    this.modalBlock.classList.add('modal__block-content');

    let btn;
    if (hasCloseBtn) {
      btn = document.createElement('div');
      btn.classList.add('modal__close');
    }
    this.#closeModal(btn, wrap);

    block.appendChild(this.modalBlock);
    hasCloseBtn && block.appendChild(btn);
    wrap.appendChild(block);

    return wrap;
  };

  #reInit = (wrap) => {
    const modals = Array.from(
      wrap.querySelectorAll(this.mainData.selector)
    );
    const modalsArray = modals.map((modal) => {
      if (modal.hasAttribute('data-modal-init')) {
        modal.removeAttribute('data-modal-init');
      }

      return modal;
    });

    if (modalsArray.length > 0) {
      this.#init(modals);
    }
  };

  #openModal = (block) => {
    const body = document.querySelector('body');

    body.appendChild(block);
  };

  #closeModal = (button, modal) => {
    const modalRemove = () => {
      modal.remove();
    };
    if (button) {
      button.addEventListener('click', modalRemove);
    }
    modal.addEventListener('click', (ev) => {
      if (ev.target.classList.contains('modal')) {
        modalRemove();
      }
    });
  };

  #closeAllModals = (modals) => {
    if (modals.length > 0) {
      modals.forEach((modal) => {
        modal.remove();
      });
    }
  };
}
