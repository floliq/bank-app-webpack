import { formatDate } from '../../src/utils/formatDate';

describe('Функция formatDate', () => {
  test('Переводит дату в русский формат', () => {
    const date = '2021-12-24T10:20:30.000Z';
    const result = formatDate(date);
    expect(result).toBe('24 декабря 2021 г.');
  });

  test('Перевод пустых данных в русский формат даты', () => {
    expect(formatDate('')).toBe('Не производилась');
    expect(formatDate(null)).toBe('Не производилась');
    expect(formatDate('not-a-date')).toBe('Не производилась');
  });
});
