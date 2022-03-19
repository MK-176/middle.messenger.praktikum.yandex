import { submitForm } from './utils';
import Modal from './components/Modal';
import Preloader from './components/Preloader';
import Router from './Router';
import IndexPage from './pages/Index';
import Auth from './pages/Auth';
import Register from './pages/Register';
import Chat from './pages/Chat';
import ChangeData from './pages/ChangeData';
import ChangePassword from './pages/ChangePassword';
import Profile from './pages/Profile';
import PageError from './pages/PageError';

document.addEventListener('DOMContentLoaded', async () => {
  const router = new Router('.root');

  router
    .use('/', IndexPage, {})
    .use('/index.html', IndexPage, {})
    .use('/auth-page.html', Auth, {})
    .use('/register-page.html', Register, {})
    .use('/chat-page.html', Chat, {
      date: '19 июля',
    })
    .use('/change-data-page.html', ChangeData, {
      link: '/profile-page.html',
      avatarCanChange: true,
    })
    .use('/change-password-page.html', ChangePassword, {
      link: '/profile-page.html',
      avatarCanChange: false,
    })
    .use('/profile-page.html', Profile, {
      link: '/',
    })
    .use('/500-page.html', PageError, {
      title: '500',
      subtitle: 'Мы уже фиксим',
    })
    .use('/404-page.html', PageError, {
      title: '404',
      subtitle: 'Не туда попали',
    })
    .start();

  new Modal();

  document.querySelectorAll('[data-form]').forEach((form) => {
    form.addEventListener('submit', submitForm);
  });
});

window.addEventListener('load', () => {
  new Preloader().removePreloader();
});
