import { renderDOM, submitForm } from './utils';
import Modal from './components/Modal';
import Preloader from './components/Preloader';

document.addEventListener('DOMContentLoaded', async () => {
  const path: string = window.location.pathname;
  let Component: any;
  let props: Record<string, any>;

  switch (path) {
    case '/':
    case '/index.html': {
      Component = await import('./pages/Index');
      props = {};
      break;
    }
    case '/auth-page.html': {
      Component = await import('./pages/Auth');
      props = {};
      break;
    }
    case '/register-page.html': {
      Component = await import('./pages/Register');
      props = {};
      break;
    }
    case '/chat-page.html': {
      Component = await import('./pages/Chat');
      props = {
        date: '19 июля',
      };
      break;
    }
    case '/change-data-page.html': {
      Component = await import('./pages/ChangeData');
      props = {
        link: '/profile-page.html',
        avatarCanChange: true,
      };
      break;
    }
    case '/change-password-page.html': {
      Component = await import('./pages/ChangePassword');
      props = {
        link: '/profile-page.html',
        avatarCanChange: false,
      };
      break;
    }
    case '/profile-page.html': {
      Component = await import('./pages/Profile');
      props = {
        link: '/',
      };
      break;
    }
    case '/500-page.html': {
      Component = await import('./pages/PageError');
      props = {
        title: '500',
        subtitle: 'Мы уже фиксим',
      };
      break;
    }
    default: {
      Component = await import('./pages/PageError');
      props = {
        title: '404',
        subtitle: 'Не туда попали',
      };
      break;
    }
  }

  const Page = Component.default;
  const template = new Page(props);
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
