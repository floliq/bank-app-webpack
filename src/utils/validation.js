import validator from 'validator';

export const validateAuth = (text) => {
  return validator.isLength(text, { min: 6, max: 256 }) && !text.includes(' ');
};
