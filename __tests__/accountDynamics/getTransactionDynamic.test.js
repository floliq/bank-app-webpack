import { getTransactionDynamic } from '../../src/utils/accountDynamics';

describe('Функция getTRansactionDynamic', () => {
  test('getTRansactionDynamic выводит динамику балансов по месяцам c доходами и расходами', () => {
    const now = new Date();
    const y = now.getUTCFullYear();
    const m = now.getUTCMonth();
    const data = {
      account: '0001',
      balance: 180.0,
      transactions: [
        {
          date: '2025-05-10T10:00:00.000Z',
          from: '0002',
          to: '0001',
          amount: 100.0,
        },
        {
          date: '2025-05-12T10:00:00.000Z',
          from: '0001',
          to: '0002',
          amount: 30.0,
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
        {
          date: '2025-08-15T10:00:00.000Z',
          from: '0001',
          to: '0003',
          amount: 10.0,
        },
        {
          date: '2025-08-15T10:00:00.000Z',
          from: '0001',
          to: '0003',
          amount: 15.0,
        },
      ],
    };
    const { labels, income, expense } = getTransactionDynamic(data, 6);
    expect(labels).toHaveLength(6);
    expect(income).toEqual([
      '0.00',
      '100.00',
      '0.00',
      '0.00',
      '100.00',
      '0.00',
    ]);
    expect(expense).toEqual([
      '0.00',
      '30.00',
      '0.00',
      '20.00',
      '0.00',
      '25.00',
    ]);
  });
});
