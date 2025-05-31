import { el } from 'redom';
import './Button.scss';

export const Button = ({
  text = '',
  type = 'button',
  className = '',
  onClick = null,
}) => {
  return el(
    'button',
    {
      className: `button ${className}`,
      type,
      onclick: onClick,
    },
    text
  );
};
