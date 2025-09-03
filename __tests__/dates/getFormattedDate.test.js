import { getFormattedDate } from '../../src/utils/formatDate';

describe('Функция getFormattedDate', () => {
  test('Возвращает дату в формате DD.MM.YYYY', () => {
    const date = '2020-01-05T00:00:00.000Z';
    expect(getFormattedDate(date)).toBe('05.01.2020');
  });
});
