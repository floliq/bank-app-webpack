import { el } from 'redom';
import './Input.scss';

export const Input = ({
  type = 'text',
  id = '',
  className = '',
  placeholder = '',
}) => {
  return el('input', {
    className: `input ${className}`,
    type,
    id,
    placeholder,
  });
};
