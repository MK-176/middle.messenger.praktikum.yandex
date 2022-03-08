import { nanoid } from 'nanoid';
import type {
  TComponentDidMount,
  TComponentDidUpdate,
  TData,
} from '../Types';
import { EventBus } from '../modules';
import { isEqual, renderDOM } from '../utils';

export abstract class Block {
  public id = nanoid(6);
  private _element: HTMLElement | null = null;
  private eventBus: () => (EventBus);
  protected props: TData;
  protected children: Record<string, Block | Block[]> = {};
  private EVENTS: TData = {
    INIT: `init-${this.id}`,
    FLOW_CDM: `flow-${this.id}:component-did-mount`,
    FLOW_CDU: `flow-${this.id}:component-did-update`,
    FLOW_RENDER: `flow-${this.id}:render`,
  };

  protected constructor(propsAndChildren: TData) {
    const eventBus = new EventBus();
    const { props, children } = this.getChildren(propsAndChildren);

    this.children = children;
    this.props = this._makePropsProxy(props) as TData;
    this.initChildren();

    this.eventBus = () => (eventBus);
    this._registerEvents(eventBus);

    eventBus.emit(this.EVENTS.INIT);
  }

  private _registerEvents(eventBus: TData) {
    eventBus.on(this.EVENTS.INIT, this.init.bind(this));
    eventBus.on(this.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(this.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(this.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init() {
    this.eventBus().emit(this.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
  }

  private _componentDidMount() {
    this.eventBus().emit(this.EVENTS.FLOW_RENDER, { ...this.props });
    this.componentDidMount();
  }

  protected componentDidMount: TComponentDidMount = () => {
  };

  dispatchComponentDidMount() {
    this._componentDidMount();
  }

  private _componentDidUpdate(oldProps: TData, newProps: TData) {
    let result: Function | boolean = false;
    const oldElement = this.element;

    if (!isEqual(oldProps, newProps)) {
      result = (): boolean => {
        this.eventBus().emit(this.EVENTS.FLOW_RENDER, { ...this.props });
        return true;
      };
    }

    this.componentDidUpdate(oldProps, newProps);
    if (!isEqual(oldProps, newProps)) {
      renderDOM(oldElement as HTMLElement, this);
    }
    return typeof result === 'function' ? result() : result;
  }

  protected componentDidUpdate: TComponentDidUpdate = () => {
  };

  setProps: any = (nextProps: TData) => {
    if (!nextProps) {
      return false;
    }

    return Object.assign(this.props, nextProps);
  };

  getChildren = (propsAndChildren: any) => {
    const children: any = {};
    const props: any = {};

    const addPropsAndChildren = (obj: Array<[string, any]>) => {
      obj.forEach((item) => {
        if (Array.isArray(item)) {
          const [key, value] = item;
          if (value instanceof Block) {
            children[key] = value;
          } else if (Array.isArray(value)) {
            addPropsAndChildren(value);
          } else {
            props[key] = value;
          }
        } else {
          addPropsAndChildren(Object.entries(item));
        }
      });
    };
    addPropsAndChildren(Object.entries(propsAndChildren));

    return { props, children };
  };

  get element() {
    return this._element;
  }

  initChildren() {
  }

  dispatchInitChildren() {
    this.initChildren();
  }

  private _render() {
    const fragment = this.render();
    const newElement = fragment.firstElementChild;

    if (this._element) {
      this._removeEvents();
      this._element.replaceWith(newElement!);
    }

    this._element = newElement as HTMLElement;
    this._addEvents();
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent() {
    return this._element;
  }

  private _makePropsProxy = (props: TData): ProxyHandler<any> => (
    new Proxy(props as unknown as object, {
      get: (target: Record<string, any>, prop: string) => {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target: Record<string, any>, prop: string, value: unknown): boolean => {
        const oldValue = { ...target };
        const currentValue = { ...target };

        currentValue[prop] = value;
        this.eventBus().emit(this.EVENTS.FLOW_CDU, oldValue, currentValue);

        return true;
      },
      deleteProperty: () => {
        throw new Error('Нет доступа');
      },
    })
  );

  private _removeEvents() {
    const events: Record<string, () => void> = (this.props as any).events;

    if (!events || !this._element) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.removeEventListener(event, listener);
    });
  }

  private _addEvents() {
    const events: Record<string, () => void> = (this.props as any).events;

    if (!events) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.addEventListener(event, listener);
    });
  }

  private _createDocumentElement = (tagName: string) => (
    document.createElement(tagName)
  );

  compile(template: (context: any) => string, context: any) {
    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
    const divGetContent = (arr: Array<[any]>) => {
      arr.forEach((child) => {
        if (Array.isArray(child)) {
          divGetContent(child);
        } else {
          const stub = fragment.content.querySelector(`[data-id='id-${(child as Block).id}']`);
          if (!stub) {
            return;
          }
          const content = (child as Block).getContent() as HTMLDivElement;
          if (content.classList.contains('media')) {
            const contentBlock = (content.querySelector('[data-is-html]') as HTMLDivElement);
            contentBlock.innerHTML = contentBlock.innerText;
          }
          stub.replaceWith(content!);
        }
      });
    };

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        context[key] = '';
        child.forEach((children) => {
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
