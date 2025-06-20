const monthOfTheYear = [
  'янв',
  'фев',
  'мар',
  'апр',
  'май',
  'июн',
  'июл',
  'авг',
  'сен',
  'окт',
  'ноя',
  'дек',
];

const getMonthBalance = (account, monthTransactions, initialBalance) => {
  let monthBalance = initialBalance;

  monthTransactions.forEach((transaction) => {
    if (transaction.from === account) {
      monthBalance += transaction.amount;
    } else if (transaction.to === account) {
      monthBalance -= transaction.amount;
    }
  });

  return monthBalance;
};

export const getBalanceDynamic = (data) => {
  let balance = data.balance;
  const account = data.account;
  const transactions = data.transactions;
  const labels = [];
  const values = [];

  const currentDate = new Date();

  for (let i = 0; i < 6; i++) {
    const monthStart = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - i,
      1
    );
    const monthEnd = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - i + 1,
      0
    );

    const monthTransactions = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= monthStart && transactionDate <= monthEnd;
    });

    balance = getMonthBalance(account, monthTransactions, balance);

    labels.unshift(monthOfTheYear[monthStart.getMonth()]);
    values.unshift(i !== 0 ? balance.toFixed(2) : data.balance);
  }

  return { labels, values };
};

export const getLastTransactions = (transactions) => {
  let sortedTransactions = [...transactions];

  sortedTransactions = transactions.sort((a, b) => {
    const dateA = a.date || 0;
    const dateB = b.date || 0;
    return new Date(dateB) - new Date(dateA);
  });

  sortedTransactions = sortedTransactions.slice(0, 10);

  return sortedTransactions;
};
