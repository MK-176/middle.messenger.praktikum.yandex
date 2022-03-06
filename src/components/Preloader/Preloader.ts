import type {THtmlDivArray} from "../../Types";

export class Preloader {
  private preloaderArray: THtmlDivArray | null = null;

  constructor () {
    this.preloaderArray = Array.from(
      document.querySelectorAll('[data-preloader]'),
    );
  }

  public removePreloader = () => {
    this.preloaderArray?.map((preloader: HTMLDivElement) => {
      if (preloader) {
        setTimeout(() => {
          preloader.remove();
        }, 300);
      }
    });
  }
}
