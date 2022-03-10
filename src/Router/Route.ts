import { renderDOM } from '../utils';
import { Block } from '../modules';
import { TData } from '../Types';

export class Route {
  private readonly blockClass: typeof Block;
  private pathname: string;
  private block: Block | undefined;
  private readonly props: TData;

  constructor(
    pathname: string,
    view: typeof Block,
    props: TData,
  ) {
    this.pathname = pathname;
    this.blockClass = view;
    this.props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this.pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this.block) {
      this.block.hide();
    }
  }

  match(pathname: string) {
    return pathname === this.pathname;
  }

  render(): void {
    if (!this.block) {
      this.block = new this.blockClass(this.props);
      renderDOM(this.props.rootQuery, this.block as Block);
    }

    this.block?.show();
  }
}
