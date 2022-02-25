class Preloader {
  preloaderArray = null;

  constructor () {
    this.preloaderArray = Array.from(
      document.querySelectorAll('[data-preloader]'),
    );
  }

  removePreloader = () => {
    this.preloaderArray?.map((preloader) => {
      if (preloader) {
        setTimeout(() => {
          preloader.remove();
        }, 300);
      }
    });
  }
}

export default Preloader;
