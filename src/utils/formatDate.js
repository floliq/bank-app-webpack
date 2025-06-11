export const formatDate = (dateString) => {
  if (!dateString || isNaN(new Date(dateString))) {
    return 'Не производилась';
  }

  const date = new Date(dateString);
  const options = { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  };

  return date.toLocaleDateString('ru-RU', options);
};