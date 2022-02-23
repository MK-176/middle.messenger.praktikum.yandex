import {TComponentDidMount, TComponentDidUpdate, TObject} from '../Types';
import {nanoid} from 'nanoid';
import {EventBus} from '../modules';
import {isEqual} from '../utils/mydash';
import {IBlock} from '../Interfaces';

export class Block implements IBlock {
  static EVENTS: TObject = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  public id = nanoid(6);
  private _element: HTMLElement | null = null;
  private eventBus: () => (EventBus);
  protected props: any;
  protected children: Record<string, Block | Block[]> = {};

  constructor(propsAndChildren: TObject) {
    const eventBus = new EventBus;
    const {props, children} = this.getChildren(propsAndChildren);

    this.children = children;
    this.initChildren();
    this.props = this._makePropsProxy(props);
    this.eventBus = () => (eventBus);
    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus: TObject) {
    console.log('_registerEvents');
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
  }

  _componentDidMount() {
    console.log('_CDM');
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER, {...this.props});
    this.componentDidMount();
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount: TComponentDidMount = () => {
  };

  dispatchComponentDidMount() {
    this._componentDidMount();
  }

  _componentDidUpdate(oldProps: TObject, newProps: TObject) {
    console.log('_CDU');
    let result: Function | boolean = false;

    if (!isEqual(oldProps, newProps)) {
      result = (): boolean => {
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        return true;
      };
    }

    this.componentDidUpdate(oldProps, newProps);
    return typeof result === 'function' ? result() : result;
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidUpdate: TComponentDidUpdate = () => {
  };

  setProps: any = (nextProps: TObject) => {
    console.log('setProps');
    if (!nextProps) {
      return false;
    }

    Object.assign(this.props, nextProps);
  };

  getChildren(propsAndChildren: any) {
    const children: any = {};
    const props: any = {};

    const addPropsAndChildren = (Object: Array<[string, any]>) => {
      Object.map(([key, value]) => {
        if (value instanceof Block) {
          children[key] = value;
        } else if (Array.isArray(value)) {
          addPropsAndChildren(value);
        } else {
          props[key] = value;
        }
      });
    }
    addPropsAndChildren(Object.entries(propsAndChildren));

    return {props, children};
  }

  get element() {
    return this._element;
  }

  protected initChildren() {
  }

  _render() {
    console.log('_render');
    const fragment = this.render();
    const newElement = fragment.firstElementChild;

    if (this._element) {
      this._removeEvents();
      this._element.replaceWith(newElement!);
    }

    this._element = newElement as HTMLElement;
    this._addEvents();
  }

  // Может переопределять пользователь, необязательно трогать
  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent = () => {
    console.log('getContent');
    return this._element;
  };

  _makePropsProxy = (props: TObject): ProxyHandler<any> => {
    console.log('_makePropsProxy');
    const self = this;

    return new Proxy(props as unknown as object, {
      get(target: Record<string, any>, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: Record<string, any>, prop: string, value: unknown): boolean {
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, {...target}, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  };

  _removeEvents() {
    console.log('_removeEvents');
    const events: Record<string, () => void> = (this.props as any).events;

    if (!events || !this._element) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.removeEventListener(event, listener);
    });
  }

  _addEvents() {
    console.log('_addEvents');
    const events: Record<string, () => void> = (this.props as any).events;

    if (!events) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.addEventListener(event, listener);
    });
  }

  _createDocumentElement = (tagName: string) => {
    console.log('_createDocumentElement');
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  };

  compile(template: (context: any) => string, context: any) {
    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
    const divGetContent = (arr: Array<[any]>) => {
      arr.map((child) => {
        if (Array.isArray(child)) {
          divGetContent(child);
        } else {
          const stub = fragment.content.querySelector(`[data-id='id-${(child as Block).id}']`);
          if (!stub) {
            return;
          }
          stub.replaceWith((child as Block).getContent()!);
        }
      })
    };

    Object.entries(this.children).map(([key, child]) => {
      if (Array.isArray(child)) {
        context[key] = '';
        child.map((children) => {
          context[key] += `<div data-id="id-${children.id}"></div>`;
        });
      } else {
        context[key] = `<div data-id="id-${child.id}"></div>`;
      }
    });

    fragment.innerHTML = template(context);

    divGetContent(Object.values(this.children) as []);

    return fragment.content;
  }
}
