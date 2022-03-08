import type { TComponentDidMount, TComponentDidUpdate } from '../Types';

export interface IBlock {
  init: () => void,
  componentDidMount: TComponentDidMount,
  componentDidUpdate: TComponentDidUpdate,
  setProps: () => void | boolean,
  element: HTMLElement | null,
  getContent: () => HTMLElement | null,
}
