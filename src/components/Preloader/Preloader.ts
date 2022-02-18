import type {TArray} from "../../Types/TArray";
class Preloader {
  preloaderArray: TArray | null = null;

  constructor () {
    this.preloaderArray = Array.from(
      document.querySelectorAll('[data-preloader]'),
    );
  }

  removePreloader = () => {
    this.preloaderArray?.map((preloader: HTMLDivElement) => {
      if (preloader) {
        setTimeout(() => {
          preloader.remove();
        }, 300);
      }
    });
  }
}

export default Preloader;
