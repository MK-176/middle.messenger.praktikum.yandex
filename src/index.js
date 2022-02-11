import input from './components/input';
import button from './components/button';
import search from './components/search';
import contact from './components/contact';
import Modal from './components/Modal';
import Preloader from './components/Preloader';

window.addEventListener('load', () => {
  new Preloader().removePreloader();
  new Modal({
    opened: (block) => {
      input(block);
    },
  });
  input();
  button();
  search();
  contact();
});
