import { el, setChildren } from 'redom';
import './Account.scss';
import { formatDate } from '../../utils/formatDate';
import LinkButton from '../../ui/LinkButton/LinkButton';

const Account = (account, balance, date, router) => {
  const card = el('div.accounts__account.col-12.col-md-6.col-lg-4.gy-4');

  const accountContent = el('div.account.d-flex.flex-column.p-4');

  const title = el('h3.account__title.mb-2', account);
  const balanceText = el('p.account__balance.mb-2', `${balance.toLocaleString('ru-RU')} ₽`);

  const cardBottom = el(
    'div.account__bottom.d-flex.justify-content-between.align-items-end'
  );

  const cardInfo = el('div.account__info');
  const lastTransaction = el('p.account__transaction', 'Последняя транзакция');
  const transactionDate = el('p.account__date', date ? formatDate(date) : 'Не производилась');

  const cardBtn = LinkButton({
    text: 'Открыть',
    href: `/accounts/${account}`,
    className: 'account__btn',
  });

  setChildren(cardInfo, [lastTransaction, transactionDate]);
  setChildren(cardBottom, [cardInfo, cardBtn]);
  setChildren(accountContent, [title, balanceText, cardBottom]);
  setChildren(card, [accountContent])

  cardBtn.addEventListener('click', (e) => {
    e.preventDefault();
    router.navigate(`/accounts/${account}`)
  })

  return card;
};

export default Account;
