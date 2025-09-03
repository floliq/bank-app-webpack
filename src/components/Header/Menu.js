import { getToken } from '../../api/Auth';
import MenuLink from '../../ui/MenuLink/MenuLink';
import './Header.scss';
import { el, setChildren } from 'redom';


const Menu = (router, linkData) => {

  const menu = el(
    'div.header__menu.container.justify-content-between.align-items-center.d-none.d-md-flex'
  );
  const menuMain = el('a.header__main', { href: '/' }, 'Coin.');

  let links = el('ul.header__links.d-flex');

  if (getToken()) {
    const entries = Object.entries(linkData);
    entries.forEach(([text, href], index) => {
      const item = el('li.header__item.d-flex');
      const link = MenuLink(text, href, 'header__link');

      const route = href.replace('/', '');
      const currentRoute = router.getCurrentLocation().url;

      if (route == currentRoute || (route === 'accounts' && !currentRoute)) {
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

      if (index !== entries.length - 1) {
        link.classList.add('me-3');
      }

      setChildren(item, [link]);
      links.appendChild(item);
    });
  }

  setChildren(menu, [menuMain, links]);

  menuMain.addEventListener('click', (e) => {
    e.preventDefault();
    router.navigate('/');
  })

  return menu;
};

export default Menu;
