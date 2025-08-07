import { el, setChildren } from 'redom';

const ProfileCurrencies = (initialCurrencies) => {
  const component = el('div.profile-currencies.box.p-5.mb-5');

  const title = el('h3.profile-currencies__title.subtitle.mb-3', 'Ваши валюты');
  const content = el('div.profile-currencies__content');

  const update = (currencies) => {
    content.innerHTML = '';

    Object.values(currencies).forEach((currency) => {
      const row = el(
        'div.d-flex.justify-content-between.profile-currencies__currency.mb-2'
      );
      const name = el(
        'p.profile-currencies__name.me-1.currency',
        currency.code
      );
      const dots = el('span.flex-grow-1.profile-currencies__dots.dots.me-1');
      const value = el(
        'p.profile-currencies__value.currency-value',
        currency.amount.toFixed(2)
      );
      setChildren(row, [name, dots, value]);
      content.appendChild(row);
    });
  };
  update(initialCurrencies);

  setChildren(component, [title, content]);
  component.update = update;
  return component;
};

export default ProfileCurrencies;
