import { Button } from '../../ui/Button/Button';
import { Input } from '../../ui/Input/Input';
import './Main.scss';
import { el } from 'redom';

const Main = () => {
  const container = el(
    'div',
    {
      className: 'auth container position-relative',
    },
    [
      el(
        'form',
        {
          className:
            'auth__form position-absolute top-50 start-50 py-5 px-5 d-flex flex-column',
        },
        [
          el('div', { className: 'auth__group position-relative' }, [
            el('h2', { className: 'auth__title mb-4' }, 'Вход в аккаунт'),
            el('div', { className: 'auth__field position-relative mb-4' }, [
              el(
                'label',
                { className: 'auth__label position-absolute' },
                'Логин'
              ),
              Input({
                type: 'text',
                className: 'auth__input',
                id: 'login',
                placeholder: '',
              }),
            ]),
            el('div', { className: 'auth__field position-relative mb-4' }, [
              el(
                'label',
                { className: 'auth__label position-absolute' },
                'Пароль'
              ),
              Input({
                type: 'password',
                className: 'auth__input',
                id: 'password',
                placeholder: '',
              }),
            ]),
            el('div', { className: 'auth__field position-relative' }, [
              Button({
                text: 'Войти',
                type: 'submit',
                className: 'auth__btn',
              }),
            ]),
          ]),
        ]
      ),
    ]
  );

  return container;
};

export default Main;
