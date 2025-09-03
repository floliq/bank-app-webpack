import { getToken } from '../../api/Auth';
import MenuLink from '../../ui/MenuLink/MenuLink';
import './Header.scss';
import { el, setAttr, setChildren } from 'redom';

const BurgerMenu = (router, linkData) => {
  const menu = el(
    'div.navbar.navbar-expand-md.header__burger.container.justify-content-between.align-items-center.d-flex.d-md-none'
  );
  const menuMain = el('a.header__main', { href: '/' }, 'Coin.');

  const menuToggler = el('button.navbar-toggler');
  setAttr(menuToggler, {
    type: 'button',
    'data-bs-toggle': 'collapse',
    'data-bs-target': '#menuBurger',
    'aria-controls': 'menuBurger',
    'aria-expanded': 'false',
    'aria-label': 'Toggle navigation',
  });
  const menuTogglerIcon = el('span.navbar-toggler-icon');

  setChildren(menuToggler, [menuTogglerIcon]);

  const menuContent = el('div.collapse.navbar-collapse.pt-2');
  setAttr(menuContent, {
    id: 'menuBurger',
  });

  let links = el('ul.header__links.navbar-nav');

  if (getToken()) {
    const entries = Object.entries(linkData);
    entries.forEach(([text, href]) => {
      const item = el('li.nav-item');
      const link = MenuLink(text, href, 'nav-link header__link.mb-2.text-center');

      const route = href.replace('/', '');
      const currentRoute = router.getCurrentLocation().url;

      if (route === currentRoute || (route === 'accounts' && !currentRoute)) {
        link.classList.add('active');
      }

      link.addEventListener('click', (e) => {
        e.preventDefault();
        if (text === 'Выйти') {
          localStorage.removeItem('token');
          router.navigate('/login');
        } else {
          router.navigate(href);
        }
      });

      setChildren(item, [link]);
      links.appendChild(item);
    });
  }

  setChildren(menuContent, [links]);
  setChildren(menu, [menuMain, menuToggler, menuContent]);

  menuToggler.addEventListener('click', () => {
    menuContent.classList.toggle('show');
  });

  menuMain.addEventListener('click', (e) => {
    e.preventDefault();
    router.navigate('/');
  });

  return menu;
};

export default BurgerMenu;
