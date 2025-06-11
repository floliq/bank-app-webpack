import { el, setChildren } from 'redom';
import './LinkButton.scss'

export const LinkButton = ({
  text = '',
  href = '/',
  className = '',
  icon = null
}) => {
  const btn = el(
    `a.button.position-relative.${className}.d-flex.align-items-center`,
    {
      href
    }
  );

  const backgrouud = el(
    'div.button-bg.position-absolute.w-100.h-100.start-0.top-0'
  );
  const textData = el('span.button-text.position-relative.z-1', text);

  let iconElement;

  if (icon) {
    iconElement = el('img.button-icon.me-1.position-relative.z-1', {
      src: icon,
      alt: 'Картинка в кнопке'
    });
  }

  setChildren(btn, [backgrouud, iconElement || null, textData]);

  return btn;
};

export default LinkButton;