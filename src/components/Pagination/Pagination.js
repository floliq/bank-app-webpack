import { el, setChildren } from 'redom';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const paginationContainer = el('nav', {
    'aria-label': 'Пагинация',
    className: 'pagination justify-content-center mt-4'
  });
  const paginationList = el('ul.pagination');

  // Функция для создания кнопки страницы
  const createPageButton = (content, pageNumber, isActive = false, isDisabled = false) => {
    const li = el('li.page-item', {
      className: `${isActive ? 'active' : ''} ${isDisabled ? 'disabled' : ''}`
    });
    const button = el('button.page-link', {
      type: 'button',
      disabled: isDisabled
    }, content);

    if (!isDisabled && pageNumber !== null) {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        onPageChange(pageNumber);
      });
    }

    setChildren(li, [button]);
    return li;
  };

  // Кнопка "Первая страница" (<<)
  if (currentPage > 1) {
    paginationList.appendChild(
      createPageButton('«', 1, false, false)
    );
  }

  // Кнопка "Предыдущая страница" (<)
  if (currentPage > 1) {
    paginationList.appendChild(
      createPageButton('‹', currentPage - 1, false, false)
    );
  }

  // Номера страниц
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  // Корректировка, если вышли за границы
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  // Добавление первой страницы и многоточия, если нужно
  if (startPage > 1) {
    paginationList.appendChild(createPageButton('1', 1));
    
    if (startPage > 2) {
      paginationList.appendChild(createPageButton('...', null, false, true));
    }
  }

  // Добавление номеров страниц
  for (let i = startPage; i <= endPage; i++) {
    paginationList.appendChild(
      createPageButton(i.toString(), i, i === currentPage)
    );
  }

  // Добавление многоточия и последней страницы, если нужно
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      paginationList.appendChild(createPageButton('...', null, false, true));
    }

    paginationList.appendChild(
      createPageButton(totalPages.toString(), totalPages)
    );
  }

  // Кнопка "Следующая страница" (>)
  if (currentPage < totalPages) {
    paginationList.appendChild(
      createPageButton('›', currentPage + 1)
    );
  }

  // Кнопка "Последняя страница" (>>)
  if (currentPage < totalPages) {
    paginationList.appendChild(
      createPageButton('»', totalPages)
    );
  }

  setChildren(paginationContainer, [paginationList]);
  return paginationContainer;
};

export default Pagination;