import { el, setChildren } from 'redom';
import { getAccount } from '../../api/Accounts';
import LinkButton from '../../ui/LinkButton/LinkButton';
import Back from '../../assets/images/back.svg';
import ChartView from '../../components/ChartView/ChartView';
import ChartDynamicView from '../../components/ChartDynamicVIew/ChartDynamicView';
import TransferHistory from '../../components/TransferHistory/TransferHistory';

const AccountHistory = async (router, id) => {
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
      href: `/accounts/${id}`,
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
    const row = el('div.row');
    const colOne = el('div.col-12.mb-5');
    const colTwo = el('div.col-12.mb-5');
    const chart = ChartView(data, 12);
    const chartDynamic = ChartDynamicView(data, 12);
    const history = TransferHistory(id, data.transactions, router)

    setChildren(accountTop, [title, backLink]);
    setChildren(money, [balanceTitle, balance]);
    setChildren(header, [number, money]);

    setChildren(colOne, [chart]);
    setChildren(colTwo, [chartDynamic]);
    setChildren(row, [colOne, colTwo]);
    setChildren(content, [row, history]);
    setChildren(page, [accountTop, header, content]);

    return page;
  } catch {
    setChildren(page, [errorText]);
    return page;
  }
};

export default AccountHistory;
