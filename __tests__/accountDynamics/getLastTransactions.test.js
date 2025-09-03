import { getLastTransactions } from '../../src/utils/accountDynamics';

const txs = [
  {
    date: '2024-10-10T10:00:00.000Z',
    from: '0001',
    to: '0002',
    amount: 500.0,
  },
  {
    date: '2024-10-11T10:00:00.000Z',
    from: '0004',
    to: '0001',
    amount: 700.0,
  },
  {
    date: '2024-10-12T10:00:00.000Z',
    from: '0001',
    to: '0005',
    amount: 300.0,
  },
];

describe('Функция getLastTransactions', () => {
  test('Без аргументов, выводит транзакции в порядке убывания', () => {
    const data = getLastTransactions(txs);
    expect(data).toEqual([
      {
        date: '2024-10-12T10:00:00.000Z',
        from: '0001',
        to: '0005',
        amount: 300.0,
      },
      {
        date: '2024-10-11T10:00:00.000Z',
        from: '0004',
        to: '0001',
        amount: 700.0,
      },
      {
        date: '2024-10-10T10:00:00.000Z',
        from: '0001',
        to: '0002',
        amount: 500.0,
      },
    ]);
  });

  test('C аргументов количества, выводит транзации в порядке убывания', () => {
    const data = getLastTransactions(txs, 2);
    expect(data).toHaveLength(2);
    expect(data).toEqual([
      {
        date: '2024-10-12T10:00:00.000Z',
        from: '0001',
        to: '0005',
        amount: 300.0,
      },
      {
        date: '2024-10-11T10:00:00.000Z',
        from: '0004',
        to: '0001',
        amount: 700.0,
      },
    ]);
  });
});
