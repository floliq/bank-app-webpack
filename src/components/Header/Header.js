import { el, setChildren } from 'redom';
import Menu from './Menu';
import BurgerMenu from './BurgerMenu';

const linksData = {
  Банкоматы: '/atms',
  Счета: '/accounts',
  Валюта: '/currencies',
  Выйти: '/logout',
};

const Header = (router) => {
  const header = el('header.position-relative.header.bg-primary.py-4.z-3');

  const menu = Menu(router, linksData);
  const burgerMenu = BurgerMenu(router, linksData);

  setChildren(header, [menu, burgerMenu]);

  return header;
};

export default Header;
