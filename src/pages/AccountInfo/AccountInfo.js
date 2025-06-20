import { el, setChildren } from 'redom';
import './AccountInfo.scss';
import Back from '../../assets/images/back.svg';
import TransferForm from '../../components/TransferForm/TransferForm';
import ChartView from '../../components/ChartView/ChartView';
import { getAccount } from '../../api/Accounts';
import TransferHistory from '../../components/TransferHistory/TransferHistory';
import LinkButton from '../../ui/LinkButton/LinkButton';

const AccountInfo = async (router, id) => {
  const page = el('div.container.account-page.py-5');
  const errorText = el(
    'p.text-error',
    'Произошла ошибка, перезагрузите страницу'
  );

  try {
    const response = await getAccount(id);
    const data = response.payload;

    const accountTop = el(
      'div.account-page__top.mb-4.d-flex.justify-content-between.align-items-end'
    );
    const title = el('h2.title.account-page__title', 'Просмотр счёта');
    const backLink = LinkButton({
      text: 'Вернуться назад',
      href: '/accounts',
      className: 'account-page__back',
      icon: Back,
    });

    const header = el(
      'div.account-page__header.d-flex.justify-content-between.align-items-end.mb-5'
    );
    const number = el('h3.account-page_number', `№ ${id}`);
    const money = el('div.account-page__balance.d-flex');
    const balance = el(
      'p.account-page__balance',
      `${response.payload.balance.toLocaleString('ru-RU')} ₽`
    );
    const balanceTitle = el('span.account-page__balance-bold.me-5', 'Баланс');

    const content = el('div.account__content');
    const row = el('div.row.mb-5');
    const colOne = el('div.col-6.d-flex');
    const colTwo = el('div.col-6');
    const transferForm = await TransferForm(id, onUpdate);
    let chart = ChartView(data);
    const historyContainer = el('div');
    let history = TransferHistory(id, data.transactions);
    setChildren(historyContainer, [history]);

    function onUpdate(newData) {
      balance.textContent = `${newData.balance.toLocaleString('ru-RU')} ₽`;

      const newHistory = TransferHistory(id, newData.transactions);
      setChildren(historyContainer, [newHistory]);
      history = newHistory;

      const newChart = ChartView(newData);
      setChildren(colTwo, [newChart]);
      chart = newChart;
    }

    setChildren(accountTop, [title, backLink]);
    setChildren(money, [balanceTitle, balance]);
    setChildren(header, [number, money]);
    setChildren(colOne, [transferForm]);
    setChildren(colTwo, [chart]);
    setChildren(row, [colOne, colTwo]);
    setChildren(content, [row, historyContainer]);
    setChildren(page, [accountTop, header, content]);

    backLink.addEventListener('click', (e) => {
      e.preventDefault();
      router.navigate('/accounts');
    });

    return page;
  } catch {
    setChildren(page, [errorText]);
    return page;
  }
};

export default AccountInfo;
