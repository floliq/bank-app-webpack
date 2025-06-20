import 'babel-polyfill';

import { el, setChildren } from 'redom';
import './index.scss';
import Navigo from 'navigo';
import Header from './components/Header/Header';
import { getToken } from './api/Auth';

const Login = () => import('./pages/Login/Login');
const Accounts = () => import('./pages/Accounts/Accounts');
const AccountInfo = () => import('./pages/AccountInfo/AccountInfo');

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

router.on('/login', async () => {
  const module = await Login();
  updateApp(module.default(router));
});

router.on('/accounts', async () => {
  const module = await Accounts();
  updateApp(module.default(router));
});

router.on('/accounts/:id', async ({ data }) => {
  if (getToken()) {
    const module = await AccountInfo();
    const page = await module.default(router, data.id);
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
