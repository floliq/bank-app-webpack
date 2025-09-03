import { Button } from '../../ui/Button/Button';
import { Input } from '../../ui/Input/Input';
import './Login.scss';
import { el, setAttr, setChildren } from 'redom';
import { auth } from '../../api/Auth';
import { validateAuth } from '../../utils/validation';

const getAuthData = (response) => {
  if (response.error) {
    switch (response.error) {
    case 'Invalid password':
      return { message: 'Неправильный пароль', auth: false };
    case 'No such user':
      return { message: 'Данного пользователя не существует', auth: false };
    default:
      return { message: 'Произошла неизвестная ошибка', auth: false };
    }
  }
  return {
    message: 'Авторизация успешна',
    isAuth: true,
    payload: response.payload,
  };
};

const Login = (router) => {
  const main = el('div.auth.container.position-relative');
  const form = el(
    'form.auth__form.position-absolute.top-50.start-50.py-5.px-5.d-flex.flex-column'
  );
  const group = el('div.auth__group.position-relative');
  const title = el('h2.auth__title.mb-4', 'Вход в аккаунт');

  const errorText = el('p.auth__error.position-absolute.text-danger');

  const authFieldTop = el('div.auth__field.position-relative.mb-4');
  const authFieldMiddle = el('div.auth__field.position-relative.mb-4');
  const authFieldLast = el('div.auth__field.position-relative');

  const loginLabel = el('label.auth__label.position-absolute', 'Логин');
  const passwordLabel = el('label.auth__label.position-absolute', 'Пароль');

  const loginInput = Input({
    type: 'text',
    className: 'auth__input',
    id: 'login',
    placeholder: '',
    required: true,
  });
  const passwordInput = Input({
    type: 'password',
    className: 'auth__input',
    id: 'password',
    placeholder: '',
    required: true,
  });

  const btn = Button({
    text: 'Войти',
    type: 'submit',
    className: 'auth__btn',
  });

  setAttr(form, {
    method: 'POST',
  });

  setChildren(authFieldLast, [btn]);
  setChildren(authFieldMiddle, [passwordLabel, passwordInput]);
  setChildren(authFieldTop, [errorText, loginLabel, loginInput]);
  setChildren(group, [title, authFieldTop, authFieldMiddle, authFieldLast]);
  setChildren(form, [group]);
  setChildren(main, [form]);

  function resetFields() {
    errorText.innerText = '';
    loginInput.classList.remove('border-danger');
    passwordInput.classList.remove('border-danger');
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const login = loginInput.value;
    const password = passwordInput.value;
    let isError = false;

    resetFields();
    if (!validateAuth(login)) {
      errorText.innerText = 'Логин: от 6 до 256 символов и без пробелов';
      loginInput.classList.add('border-danger');
      isError = true;
    }

    if (!validateAuth(password)) {
      errorText.innerText = 'Пароль: от 6 до 256 символов и без пробелов';
      passwordInput.classList.add('border-danger');
      isError = true;
    }

    if (isError) return;

    try {
      const responce = await auth(login, password);
      const { message, isAuth, payload } = getAuthData(responce);
      if (!isAuth) {
        errorText.innerText = message;
        return;
      }
      localStorage.setItem('token', payload.token);
      router.navigate('/accounts');
    } catch (error) {
      errorText.textContent = error.message;
    }
  });

  return main;
};

export default Login;
