import { getFormattedDate } from '../../utils/formatDate';
import { getLastTransactions } from '../../utils/accountDynamics';
import './TransferHistory.scss';
import { el, setAttr, setChildren } from 'redom';
import Pagination from '../Pagination/Pagination';

const TransferHistory = (account, transactions, router, count) => {
  let currentPage = 1;
  const itemsPerPage = 10;

  const history = el('div.transfer-history.py-5.px-5.d-flex.flex-column');
  const title = el('h3.transfer-history__title.subtitle.mb-3', 'История переводов');

  const table = el('table.transfer-history__table.table');
  const tHead = el('thead.transfer-history__thead.rounded-top.overflow-hidden');
  const tHeadRow = el('tr');
  const tHeadingFrom = el('th.transfer-history__throw.transfer-history__throw-first.col-2.px-4.py-3', 'Счёт отправителя');
  const tHeadingTo = el('th.transfer-history__throw.col-2.px-4.py-3', 'Счёт получателя');
  const tHeadingAmount = el('th.transfer-history__throw.col-2.px-4.py-3', 'Сумма');
  const tHeadingFour = el('th.transfer-history__throw.transfer-history__throw-last.col-6.px-4.py-3', 'Дата');
  const tBody = el('tbody');

  setAttr(tHeadingFrom, { scope: 'col' });
  setAttr(tHeadingTo, { scope: 'col' });
  setAttr(tHeadingAmount, { scope: 'col' });
  setAttr(tHeadingFour, { scope: 'col' });

  setChildren(tHeadRow, [tHeadingFrom, tHeadingTo, tHeadingAmount, tHeadingFour]);
  setChildren(tHead, [tHeadRow]);

  const lastTransactions = getLastTransactions(transactions, count);
  const totalPages = Math.ceil(lastTransactions.length / itemsPerPage);

  // Функция отображения данных на странице
  const displayData = (page) => {
    currentPage = page;
    tBody.innerHTML = '';
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, lastTransactions.length);
    const pageTransactions = lastTransactions.slice(startIndex, endIndex);

    if (pageTransactions.length !== 0) {
      pageTransactions.forEach((transaction) => {
        const row = el('tr.transfer-history__row');
        const tDataFrom = el('td.transfer-history__tdata.px-4.py-3', transaction.from);
        const tDataTo = el('td.transfer-history__tdata.px-4.py-3', transaction.to);
        let tDataAmount;

        if (transaction.from === account) {
          tDataAmount = el('td.transfer-history__tdata.px-4.py-3.text-danger', `- ${transaction.amount.toLocaleString('ru-RU')} ₽`);
        } else {
          tDataAmount = el('td.transfer-history__tdata.px-4.py-3.text-success', `+ ${transaction.amount.toLocaleString('ru-RU')} ₽`);
        }

        const tDataDate = el('td.transfer-history__tdata.px-4.py-3', getFormattedDate(transaction.date));

        setAttr(tDataFrom, { scope: 'row' });
        setChildren(row, [tDataFrom, tDataTo, tDataAmount, tDataDate]);
        tBody.appendChild(row);

        row.addEventListener('click', (e) => {
          e.preventDefault();
          router.navigate(`accounts/${account}/history`);
        });
      });
    } else {
      const row = el('tr.transfer-history__row');
      const tData = el('td.transfer-history__tdata.px-4.py-3', 'Данные отсутствуют');
      setAttr(tData, { scope: 'row' });
      setChildren(row, [tData]);
      tBody.appendChild(row);
    }
  };

  // Обработчик изменения страницы
  const handlePageChange = (newPage) => {
    displayData(newPage);
    updatePagination();
  };

  // Обновление пагинации
  const updatePagination = () => {
    const oldPagination = history.querySelector('nav.pagination');
    if (oldPagination) {
      oldPagination.remove();
    }
    
    if (totalPages > 1) {
      const newPagination = Pagination({
        currentPage,
        totalPages,
        onPageChange: handlePageChange
      });
      history.appendChild(newPagination);
    }
  };

  // Инициализация
  displayData(currentPage);

  setChildren(table, [tHead, tBody]);
  setChildren(history, [title, table]);
  updatePagination();

  return history;
};

export default TransferHistory;