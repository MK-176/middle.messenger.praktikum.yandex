import {renderDOM} from './utils/renderDOM';
import Modal from './components/Modal';
import Preloader from './components/Preloader';
import {submitForm} from './utils/submitForm';

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
    case '/chat': {
      Page = await import('./pages/Chat');
      props = {
        date: '19 июля',
      };
      break;
    }
    case '/change-data': {
      Page = await import('./pages/ChangeData');
      props = {
        link: '/profile',
        avatarCanChange: true,
      };
      break;
    }
    case '/change-password': {
      Page = await import('./pages/ChangePassword');
      props = {
        link: '/profile',
        avatarCanChange: false,
      };
      break;
    }
    case '/profile': {
      Page = await import('./pages/Profile');
      props = {
        link: '/',
      };
      break;
    }
    case '/500': {
      Page = await import('./pages/PageError');
      props = {
        title: '500',
        subtitle: 'Мы уже фиксим',
      };
      break;
    }
    default: {
      Page = await import('./pages/PageError');
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

  new Modal();

  document.querySelectorAll('[data-form]').forEach((form) => {
    form.addEventListener('submit', submitForm);
  });
});

window.addEventListener('load', () => {
  new Preloader().removePreloader();
});
