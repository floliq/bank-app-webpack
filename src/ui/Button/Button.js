import { el, setChildren } from 'redom';
import './Button.scss';

export const Button = ({
  text = '',
  type = 'button',
  className = '',
  icon = null
}) => {
  const btn = el(
    `button.button.position-relative.${className}.d-flex.align-items-center`,
    {
      type,
    }
  );

  const backgrouud = el(
    'div.button-bg.position-absolute.w-100.h-100.start-0.top-0'
  );
  const textData = el('span.button-text.position-relative.z-1', text);

  let iconElement;

  if (icon) {
    iconElement = el('img.button-icon.me-2.position-relative.z-1', {
      src: icon,
      alt: 'Картинка в кнопке'
    });
  }

  setChildren(btn, [backgrouud, iconElement || null, textData]);

  return btn;
};
