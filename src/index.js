import 'babel-polyfill';

import { el, setChildren } from 'redom';
import './index.scss';
import Navigo from 'navigo';
import Header from './components/Header/Header';
import { getToken } from './api/Auth';
import AccountHistory from './pages/AccountHistory/AccountHistory';
import Login from './pages/Login/Login';
import Accounts from './pages/Accounts/Accounts';
import AccountInfo from './pages/AccountInfo/AccountInfo';

const router = new Navigo('/');
const currentPath = window.location.pathname;

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
  const page = Login(router);
  updateApp(page);
});

router.on('/accounts', async () => {
  const page = await Accounts(router);
  updateApp(page);
});

router.on('/accounts/:id', async ({ data }) => {
  if (getToken()) {
    const page = await AccountInfo(router, data.id);
    updateApp(page);
  } else {
    router.navigate('/login');
  }
});

router.on('/accounts/:id/history', async ({ data }) => {
  if (getToken()) {
    const page = await AccountHistory(router, data.id);
    updateApp(page);
  } else {
    router.navigate('/login');
  }
});

if (currentPath === '/') {
  if (getToken()) {
    router.navigate('/accounts');
  } else {
    router.navigate('/login');
  }
} else {
  router.resolve();
}
