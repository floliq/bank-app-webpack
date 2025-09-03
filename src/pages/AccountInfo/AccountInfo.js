import { el, setChildren } from 'redom';
import './AccountInfo.scss';
import Back from '../../assets/images/back.svg';
import TransferForm from '../../components/TransferForm/TransferForm';
import ChartView from '../../components/ChartView/ChartView';
import { getAccount } from '../../api/Accounts';
import TransferHistory from '../../components/TransferHistory/TransferHistory';
import LinkButton from '../../ui/LinkButton/LinkButton';
import AccountInfoSkeleton from '../../ui/Skeletons/AccountInfoSkeleton/AccountInfoSkeleton';

const AccountInfo = async (router, id) => {
  const page = el('div.container.account-page.py-5');
  const errorText = el(
    'p.text-error',
    'Произошла ошибка, перезагрузите страницу'
  );

  const accountTop = el(
    'div.account-page__top.mb-4.d-flex.justify-content-between.align-items-end.flex-wrap'
  );
  const title = el('h2.title.account-page__title', 'Просмотр счёта');
  const backLink = LinkButton({
    text: 'Вернуться назад',
    href: '/accounts',
    className: 'account-page__back',
    icon: Back,
  });
  setChildren(accountTop, [title, backLink]);

  const skeleton = AccountInfoSkeleton();
  setChildren(page, [accountTop, skeleton]);

  backLink.addEventListener('click', (e) => {
    e.preventDefault();
    router.navigate('/accounts');
  });

  (async () => {
    try {
      const response = await getAccount(id);
      const data = response.payload;

      const header = el(
        'div.account-page__header.d-flex.justify-content-between.flex-wrap.align-items-center.mb-5'
      );
      const number = el('h3.account-page_number.text-break', `№ ${id}`);
      const money = el('div.account-page__balance.d-flex');
      const balance = el(
        'p.account-page__balance',
        `${data.balance.toLocaleString('ru-RU')} ₽`
      );
      const balanceTitle = el('span.account-page__balance-bold.me-5', 'Баланс');

      const content = el('div.account__content');
      const row = el('div.row.mb-5');
      const colOne = el('div.col-12.col-xl-6.d-flex.mb-4');
      const colTwo = el('div.col-12.col-xl-6');

      const historyContainer = el('div');

      function onUpdate(newData) {
        balance.textContent = `${newData.balance.toLocaleString('ru-RU')} ₽`;

        const newHistory = TransferHistory(id, newData.transactions, router);
        setChildren(historyContainer, [newHistory]);

        const newChart = ChartView(newData, 6);
        setChildren(colTwo, [newChart]);
      }

      const transferForm = await TransferForm(id, onUpdate);
      const chart = ChartView(data, 6);
      const history = TransferHistory(id, data.transactions, router, 10);
      setChildren(historyContainer, [history]);

      setChildren(money, [balanceTitle, balance]);
      setChildren(header, [number, money]);
      setChildren(colOne, [transferForm]);
      setChildren(colTwo, [chart]);
      setChildren(row, [colOne, colTwo]);
      setChildren(content, [row, historyContainer]);

      setChildren(page, [accountTop, header, content]);
    } catch {
      setChildren(page, [errorText]);
    }
  })();
  return page;
};

export default AccountInfo;
