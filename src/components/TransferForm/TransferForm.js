import { el, setAttr, setChildren } from 'redom';
import './TransferForm.scss';
import Select from '../../ui/Select/Select';
import { Input } from '../../ui/Input/Input';
import { Button } from '../../ui/Button/Button';
import Mail from '../../assets/images/mail.svg';
import { getAccounts, transferToAccount } from '../../api/Accounts';
import { isFloat, matches } from 'validator';

const getAccountNumbers = async (id) => {
  try {
    const response = await getAccounts();

    if (response && response.payload) {
      const accountsData = response.payload;
      const accountNumbers = accountsData
        .map((account) => account.account)
        .filter((account) => account !== id);

      const accountsObject = {
        '': 'Кошелек',
        ...accountNumbers.reduce((obj, accNumber) => {
          obj[accNumber] = accNumber;
          return obj;
        }, {}),
      };

      return accountsObject;
    } else {
      throw new Error(response?.error || 'Неверный формат ответа сервера');
    }
  } catch {
    return null;
  }
};

const getRequestAnswer = (response) => {
  if (response.error) {
    switch (response.error) {
    case 'Invalid account from':
      return {
        message:
            'Не указан адрес счёта списания, или этот счёт не принадлежит нам',
        success: false,
      };
    case 'Invalid account to':
      return {
        message: 'Не указан счёт зачисления, или этого счёта не существует',
        success: false,
      };
    case 'Invalid amount':
      return {
        message: 'Не указана сумма перевода, или она отрицательная',
        success: false,
      };
    case 'Overdraft prevented':
      return {
        message: 'Невозможно перевести больше денег, чем доступно на счёте',
        success: false,
      };
    default:
      return { message: 'Произошла неизвестная ошибка', success: false };
    }
  }
  return {
    message: 'Успешный запрос',
    success: true,
    payload: response.payload,
  };
};

export const validateDecimal = (value) => {
  return (
    isFloat(value, { min: 0 }) &&
    matches(value, /^\d+(\.\d{2})?$/)
  );
};

const TransferForm = async (id, onUpdate) => {
  const form = el('form.transfer-form.py-5.px-5.d-flex.flex-column.w-100');
  const title = el('h3.transfer-form__title.subtitle.mb-3', 'Новый перевод');

  const group = el('div.transfer-form__group.position-relative');

  const errorText = el('p.transfer-form__error.position-absolute.text-danger');

  const transferTop = el(
    'div.transfer-form__field.mb-4.d-flex.align-items-center.justify-content-center.justify-content-xl-end'
  );
  const transferMiddle = el(
    'div.transfer-form__field.mb-4.d-flex.align-items-center.justify-content-center.justify-content-xl-end'
  );
  const transferLast = el(
    'div.transfer-form__field.d-flex.justify-content-center'
  );

  const accountLabel = el(
    'label.transfer-form__label.me-3',
    'Номер счёта получателя'
  );
  const amountLabel = el('label.transfer-form__label.me-3', 'Сумма перевода');

  const accounts = await getAccountNumbers(id);

  const accountSelect = new Select({
    options: accounts,
    placeholder: 'Кошелек',
    id: 'transfer-form-account',
    search: true,
    className: 'transfer-form__input'
  });

  const amountInput = Input({
    type: 'text',
    className: 'transfer-form__input',
    id: 'amount',
    placeholder: '',
    required: true,
  });

  const btn = Button({
    text: 'Отправить',
    type: 'submit',
    className: 'tranfer-form__btn',
    icon: Mail,
  });

  setAttr(form, {
    method: 'POST',
  });

  setChildren(transferLast, [btn]);
  setChildren(transferMiddle, [amountLabel, amountInput]);
  setChildren(transferTop, [errorText, accountLabel, accountSelect]);
  setChildren(group, [title, transferTop, transferMiddle, transferLast]);
  setChildren(form, [group]);

  function resetFields() {
    errorText.innerText = '';
    amountInput.classList.remove('border-danger');
    accountSelect.container
      .querySelector('.ts-control')
      ?.classList.remove('border-danger');
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const account = accountSelect.value;
    const amount = amountInput.value;

    let isError = false;

    resetFields();

    if (!account) {
      errorText.innerText = 'Не выбран кошелек для перевода';
      accountSelect.container
        .querySelector('.ts-control')
        ?.classList.add('border-danger');
      isError = true;
    }

    if (!validateDecimal(amount)) {
      errorText.innerText =
        'Число должно быть положительное и 2 знака после запятой';
      amountInput.classList.add('border-danger');
      isError = true;
    }

    if (isError) return;

    try {
      const responce = await transferToAccount(id, account, amount);

      const { message, success, payload } = getRequestAnswer(responce);
      if (!success) {
        errorText.innerText = message;
        return;
      }

      onUpdate(payload);
      amountInput.value = '';
      accountSelect.value = '';
    } catch {
      errorText.innerText = 'Произошла неизвестная ошибка';
      amountInput.classList.add('border-danger');
      isError = true;
      return;
    }
  });

  return form;
};

export default TransferForm;
