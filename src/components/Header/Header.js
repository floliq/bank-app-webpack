import './Header.scss';
import { el } from 'redom';

const Header = () => {
  const header = el(
    'header',
    {
      className: 'position-relative header bg-primary py-4 z-3',
    },
    el(
      'div',
      {
        className: 'container',
      },
      [
        el(
          'a',
          {
            className: 'header__main',
            href: '/',
          },
          'Coin.'
        ),
      ]
    )
  );

  return header;
};

export default Header;
