import {renderDOM} from './utils/renderDOM';
import Modal from './components/Modal';
import Preloader from './components/Preloader';

document.addEventListener('DOMContentLoaded', async () => {
  const path: string = location.pathname;
  let Page: any;
  let props: Record<string, any>;

  switch (path) {
    case '/': {
      Page = await import('./pages/Index');
      props = {};
      break;
    }
    case '/auth': {
      Page = await import('./pages/Auth');
      props = {};
      break;
    }
    case '/register': {
      Page = await import('./pages/Register');
      props = {};
      break;
    }
    default: {
      Page = await import('./pages/Page404');
      props = {
        title: '404',
        subtitle: 'Не туда попали',
      };
      break;
    }
  }

  const template = new Page.default(props);
  if (template) {
    renderDOM('.root', template);
  }
  setTimeout(() => {
    new Modal();
  }, 2000);
});

window.addEventListener('load', () => {
  new Preloader().removePreloader();
});
