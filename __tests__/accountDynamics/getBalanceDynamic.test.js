import { getBalanceDynamic } from '../../src/utils/accountDynamics';

describe('Функция getBalanceDynamic', () => {
  test('getBalanceDynamic выводит динамику балансов по месяцам', () => {
    const data = {
      account: '0001',
      balance: 180.00,
      transactions: [
        {
          date: '2025-05-10T10:00:00.000Z',
          from: '0002',
          to: '0001',
          amount: 100.0,
        },
        {
          date: '2025-07-10T10:00:00.000Z',
          from: '0001',
          to: '0002',
          amount: 20.0,
        },
        {
          date: '2025-08-11T10:00:00.000Z',
          from: '0003',
          to: '0001',
          amount: 100.0,
        },
      ],
    };
    const { labels, values } = getBalanceDynamic(data, 6);
    expect(labels).toHaveLength(6);
    expect(values).toEqual([
      '0.00',
      '100.00',
      '100.00',
      '80.00',
      '180.00',
      '180.00'
    ]);
  });
});
