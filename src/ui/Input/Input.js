import { el } from 'redom';
import './Input.scss';

export const Input = ({
  type = 'text',
  id = '',
  className = '',
  placeholder = '',
  required = false
}) => {
  return el('input', {
    className: `input ${className}`,
    type,
    id,
    placeholder,
    required
  });
};
