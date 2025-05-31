import 'babel-polyfill';

import { el, setChildren } from 'redom';
import './index.scss';
import Navigo from 'navigo';
import Main from './pages/Main/Main';
import Header from './components/Header/Header';

const router = new Navigo('/');

const main = el('main');

setChildren(main, [Main()]);

router.on('/', () => {
  setChildren(window.document.body, [Header(), main]);
});

router.resolve();
