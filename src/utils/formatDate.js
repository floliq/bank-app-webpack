export const formatDate = (dateString) => {
  if (!dateString || isNaN(new Date(dateString))) {
    return 'Не производилась';
  }

  const date = new Date(dateString);
  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  return date.toLocaleDateString('ru-RU', options);
};

export const getFormattedDate = (dateString) => {
  const date = new Date(dateString);

  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();

  const formattedDate = `${day}.${month}.${year}`;
  return formattedDate;
};
