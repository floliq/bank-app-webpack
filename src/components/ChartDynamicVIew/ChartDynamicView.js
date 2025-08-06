import Chart from 'chart.js/auto';
import { el, setChildren } from 'redom';
import { getTransactionDynamic } from '../../utils/accountDynamics';

const ChartDynamicView = (data, months) => {
  const dynamic = el('div.dynamic.px-5.py-4');
  const title = el(
    'h3.subtitle.dynamic__title.mb-2',
    'Соотношение входящих исходящих транзакций'
  );
  const chart = el('canvas#chart.dynamic__canvas');

  const { labels, income, expense } = getTransactionDynamic(data, months);

  const expenseData = expense.map(value => Math.abs(value));
  const incomeData = income;

  new Chart(chart, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Расходы',
          data: expenseData,
          backgroundColor: '#FD4E5D',
          borderColor: '#FD4E5D',
          borderWidth: 1,
        },
        {
          label: 'Доходы',
          data: incomeData,
          backgroundColor: '#76CA66',
          borderColor: '#76CA66',
          borderWidth: 1,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          stacked: true,
          beginAtZero: true,
          grid: {
            display: false,
          },
          border: {
            color: '#000000',
          },
          ticks: {
            padding: 24,
            font: {
              color: '#000000',
              size: 20,
              family: 'Ubuntu',
              weight: 500,
            },
            callback: function (value, index, ticks) {
              if (index === 0 || index === ticks.length - 1) {
                return value;
              }
            }
          },
        },
        x: {
          stacked: true,
          grid: {
            display: false,
          },
          border: {
            color: 'black',
          },
          ticks: {
            padding: 8,
            font: {
              color: '#000000',
              size: 20,
              family: 'Ubuntu',
              weight: 700,
            },
          },
        },
      },
    },
  });

  setChildren(dynamic, [title, chart]);

  return dynamic;
};

export default ChartDynamicView;