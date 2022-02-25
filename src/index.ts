import {renderDOM} from './utils/renderDOM';

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
});
