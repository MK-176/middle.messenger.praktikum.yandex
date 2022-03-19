import { Route } from './Route';
import { Block } from '../modules';
import { TData } from '../Types';

export class Router {
  private static instance: Router;
  private routes: Array<Route> = [];
  private history: History = window.history;
  private _currentRoute: Route | null | undefined;
  private readonly _rootQuery: string | undefined;

  constructor(rootQuery: string) {
    if (Router.instance) {
      return Router.instance;
    }
    this._currentRoute = null;
    this._rootQuery = rootQuery;
    Router.instance = this;
  }

  use(pathname: string, block: typeof Block, props: TData) {
    const route = new Route(pathname, block, {
      ...props,
      rootQuery: this._rootQuery,
    });

    this.routes.push(route);

    return this;
  }

  start() {
    window.addEventListener('onpopstate', (event: Event) => {
      this._onRoute((event.currentTarget as Window).location.pathname);
    });

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route: Route) => (
      route.match(pathname)
    ));
  }
}
