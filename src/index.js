import 'babel-polyfill';

import { el, setChildren } from 'redom';
import './index.scss';
import Navigo from 'navigo';
import Login from './pages/Login/Login';
import Header from './components/Header/Header';
import Accounts from './pages/Accounts/Accounts';
import { getToken } from './api/Auth';
import AccountInfo from './pages/AccountInfo/AccountInfo';

const router = new Navigo('/');

const main = el('main');

const updateApp = (component) => {
  setChildren(main, [component]);
  setChildren(document.body, [Header(router), main]);
};

router.hooks({
  after: () => {
    setChildren(document.body, [Header(router), main]);
  },
});

router.on('/', () => {
  if (getToken()) {
    router.resolve('/accounts');
  } else {
    router.resolve('/login');
  }
});

router.on('/login', () => {
  updateApp(Login(router));
});

router.on('/accounts', () => {
  updateApp(Accounts(router));
});

router.on('/accounts/:id', () => {
  updateApp(AccountInfo());
});

if (getToken()) {
  router.resolve('/accounts');
} else {
  router.resolve('/login');
}
