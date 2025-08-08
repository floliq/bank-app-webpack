import { el, mount, setChildren } from 'redom';
import './Accounts.scss';
import { createAccount, getAccounts } from '../../api/Accounts';
import Account from '../../components/Account/Account';
import Select from '../../ui/Select/Select';
import { Button } from '../../ui/Button/Button';
import Plus from '../../assets/images/plus.svg';
import AccountsPageSkeleton from '../../ui/Skeletons/AccountsPageSkeleton/AccountsPageSkeleton';

const selectOptions = {
  '': 'Сортировка',
  number: 'По номеру',
  balance: 'По балансу',
  lastTransaction: 'По последней транзакции',
};

const Accounts = (router) => {
  let accountsData = [];

  const page = el('div.container.accounts.py-5');

  const pageTop = el('div.accounts__top.d-flex.justify-content-between.mb-5');
  const pageMain = el('div.accounts__main.d-flex.align-items-center');
  const title = el('h2.title.accounts__title.me-5', 'Ваши счета');

  const filterSelect = new Select({
    options: selectOptions,
    placeholder: 'Сортировка',
    id: 'accounts-select',
    onChange: (value) => {
      sortAccounts(value);
    },
  });

  filterSelect.onmount();

  const addBtn = Button({
    text: 'Создать новый счет',
    type: 'btn',
    className: 'accounts__add',
    icon: Plus,
  });

  const content = el('div.accounts__content.row');
  const errorMessage = el('div.accounts__error.text-danger.mt-3', {
    style: { display: 'none' },
  });

  setChildren(pageMain, [title, filterSelect]);
  setChildren(pageTop, [pageMain, addBtn]);

  mount(page, pageTop);
  mount(page, errorMessage);
  generateAccounts();
  setChildren(page, [pageTop, content, errorMessage]);

  const sortAccounts = (sortBy) => {
    if (!sortBy) return;

    const sortedAccounts = [...accountsData];

    switch (sortBy) {
    case 'number':
      sortedAccounts.sort((a, b) => a.account.localeCompare(b.account));
      break;
    case 'balance':
      sortedAccounts.sort((a, b) => b.balance - a.balance);
      break;
    case 'lastTransaction':
      sortedAccounts.sort((a, b) => {
        const dateA = a.transactions[0]?.date || 0;
        const dateB = b.transactions[0]?.date || 0;
        return new Date(dateB) - new Date(dateA);
      });
      break;
    default:
      return;
    }

    renderAccounts(sortedAccounts);
  };

  async function generateAccounts() {
    try {
      content.innerHTML = '';
      AccountsPageSkeleton(content);

      errorMessage.style.display = 'none';
      errorMessage.textContent = '';

      const response = await getAccounts();

      if (response && response.payload) {
        accountsData = response.payload;
        renderAccounts(accountsData);
      } else {
        throw new Error(response?.error || 'Неверный формат ответа сервера');
      }
    } catch {
      content.innerHTML = '';
      errorMessage.style.display = 'block';
      errorMessage.textContent =
        'Ошибка загрузки данных. Пожалуйста, попробуйте позже.';
    }
  }

  const renderAccounts = (accounts) => {
    content.innerHTML = '';

    if (accounts.length === 0) {
      const emptyMessage = el(
        'div.col-12.text-muted.text-center',
        'У вас пока нет счетов'
      );
      content.appendChild(emptyMessage);
      return;
    }

    accounts.forEach((acc) => {
      const account = Account(
        acc.account,
        acc.balance,
        acc.transactions[0] ? acc.transactions[0].date : null,
        router
      );
      content.appendChild(account);
    });
  };

  addBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      const response = await createAccount();

      if (response.error) {
        throw new Error('Не удалось создать счет');
      }

      const newAccountData = response.payload;
      accountsData.push(newAccountData);
      renderAccounts(accountsData);
    } catch {
      errorMessage.style.display = 'block';
      errorMessage.textContent = 'Ошибка при создании счета';
    }
  });

  return page;
};

export default Accounts;
