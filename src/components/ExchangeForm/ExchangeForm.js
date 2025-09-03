import { el, setAttr, setChildren } from 'redom';
import './ExchangeForm.scss';
import { buyCurrency, getAllCurrencies } from '../../api/Currencies';
import Select from '../../ui/Select/Select';
import { Input } from '../../ui/Input/Input';
import { Button } from '../../ui/Button/Button';
import validator from 'validator';

export const validateDecimal = (value) => {
  return (
    validator.isFloat(value, { min: 0 }) &&
    validator.matches(value, /^\d+(\.\d{2})?$/)
  );
};

const getRequestAnswer = (response) => {
  if (response.error) {
    switch (response.error) {
    case 'Unknown currency code':
      return {
        message:
            'Передан неверный валютный код, код не поддерживается системой (валютный код списания или валютный код зачисления)',
        success: false,
      };
    case 'Invalid amount':
      return {
        message: 'Не указана сумма перевода, или она отрицательная',
        success: false,
      };
    case 'Not enough currency':
      return {
        message: 'На валютном счёте списания нет средств',
        success: false,
      };
    case 'Overdraft prevented':
      return {
        message: 'Попытка перевести больше, чем доступно на счёте списания.',
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

const ExchangeForm = async (updateCurrencies) => {
  const form = el('form.exchange.box.p-5.mb-4');
  const errorText = el('p.text-danger');

  try {
    const currenciesData = await getAllCurrencies();

    const currencyOptions = {
      '': 'Валюта',
      ...currenciesData.payload.reduce((acc, currency) => {
        acc[currency] = currency;
        return acc;
      }, {}),
    };

    const title = el('h3.exchange__title.subtitle.mb-3', 'Обмен валют');

    const row = el('div.row');
    const colOne = el('div.col-12.col-xxl-9');
    const colTwo = el('div.col-12.col-xxl-3');

    const currencies = el('div.exchange__currencies.d-flex.mb-3.flex-wrap.flex-lg-nowrap');

    const currencyOne = el(
      'div.exchange__currency.d-flex.align-items-center.me-3.w-50.flex-column.flex-lg-row'
    );
    const currencyTwo = el(
      'div.exchange__currency.d-flex.align-items-center.w-50.flex-column.flex-lg-row'
    );
    const currencyThree = el(
      'div.exchange__currency.d-flex.align-items-center.mb-2.flex-column.flex-lg-row'
    );

    const fromLabel = el('label.echange__label.me-3', 'Из');
    const toLabel = el('label.exchange__label.me-3', 'В');

    const fromSelect = new Select({
      options: currencyOptions,
      placeholder: 'Из',
      id: 'exchange-from',
      search: true,
      className: 'exchange__select exchange__select-from',
    });

    const toSelect = new Select({
      options: currencyOptions,
      placeholder: 'В',
      id: 'exchange-to',
      search: true,
      className: 'exchange__select exchange__select-to',
    });

    const amountLabel = el('label.exchange__label.me-2', 'Сумма');
    const amountInput = Input({
      type: 'text',
      id: 'exchange-amount',
      required: true,
      className: 'exchange__input',
    });

    const exchangeBtn = Button({
      text: 'Обменять',
      type: 'submit',
      className: 'exchange__btn',
    });

    setAttr(form, {
      method: 'POST',
    });

    setChildren(currencyOne, [fromLabel, fromSelect]);
    setChildren(currencyTwo, [toLabel, toSelect]);
    setChildren(currencyThree, [amountLabel, amountInput]);
    setChildren(currencies, [currencyOne, currencyTwo]);
    setChildren(colOne, [errorText, currencies, currencyThree]);
    setChildren(colTwo, [exchangeBtn]);
    setChildren(row, [colOne, colTwo]);

    setChildren(form, [title, row]);

    function resetFields() {
      errorText.innerText = '';
      amountInput.classList.remove('border-danger');
      fromSelect.container
        .querySelector('.ts-control')
        ?.classList.remove('border-danger');
      toSelect.container
        .querySelector('.ts-control')
        ?.classList.remove('border-danger');
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const from = fromSelect.value;
      const to = toSelect.value;
      const amount = amountInput.value;

      let isError = false;

      resetFields();

      if (!from) {
        errorText.innerText = 'Не выбран кошелек для перевода';
        fromSelect.container
          .querySelector('.ts-control')
          ?.classList.add('border-danger');
        isError = true;
      }

      if (!to) {
        errorText.innerText = 'Не выбран кошелек для перевода';
        toSelect.container
          .querySelector('.ts-control')
          ?.classList.add('border-danger');
        isError = true;
      }

      const normalizedAmount = amount.replace(',', '.');
      if (!validateDecimal(normalizedAmount)) {
        errorText.innerText = 'Число должно быть положительным и иметь 2 знака после запятой';
        amountInput.classList.add('border-danger');
        isError = true;
      }

      if (isError) return;

      try {
        const responce = await buyCurrency(from, to, normalizedAmount);
        const { message, success, payload } = getRequestAnswer(responce);
        if (!success) {
          errorText.innerText = message;
          return;
        }

        if (updateCurrencies && payload) {
          updateCurrencies(payload);
        }
        fromSelect.value = '';
        toSelect.value = '';
        amountInput.value = '';
      } catch {
        errorText.innerText = 'Произошла неизвестная ошибка';
        amountInput.classList.add('border-danger');
        isError = true;
        return;
      }
    });

    return form;
  } catch (error) {
    console.error(error);
    setChildren(form, [errorText]);
    return form;
  }
};

export default ExchangeForm;
