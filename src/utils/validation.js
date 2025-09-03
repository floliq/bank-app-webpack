import { isLength } from 'validator';

export const validateAuth = (text) => {
  return isLength(text, { min: 6, max: 256 }) && !text.includes(' ');
};
