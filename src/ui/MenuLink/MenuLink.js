import { el, setChildren } from 'redom';
import './MenuLink.scss';

const MenuLink = (text, href, className = '') => {
  const link = el(`a.menu-link.position-relative.${className}`, { href: href });

  const backgrouud = el(
    'div.menu-link__bg.position-absolute.w-100.h-100.start-0.top-0'
  );
  const textData = el('span.menu-link__text.position-relative.z-1', text);

  setChildren(link, [backgrouud, textData]);

  return link;
};

export default MenuLink;
