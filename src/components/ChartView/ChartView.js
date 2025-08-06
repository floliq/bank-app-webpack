import './ChartView.scss';
import Chart from 'chart.js/auto';
import { el, setChildren } from 'redom';
import { getBalanceDynamic } from '../../utils/accountDynamics';

const ChartView = (data, months = 6) => {
  const dynamic = el('div.dynamic.px-5.py-4');
  const title = el('h3.subtitle.dynamic__title.mb-2', 'Динамика баланса');
  const chart = el('canvas#chart.dynamic__canvas');

  const { labels, values } = getBalanceDynamic(data, months);

  const maxValue = Math.max(...values);

  new Chart(chart, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Баланс',
          data: values,
          backgroundColor: '#116ACC',
          borderColor: '#116ACC',
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: false,
          min: 0,
          max: maxValue,
          grid: {
            display: false,
          },
          position: 'right',
          border: {
            color: '#000000',
          },
          ticks: {
            padding: 24,
            labelOffset: 10,
            callback: function (value, index, ticks) {
              if (index === 0 || index === ticks.length - 1) {
                return value;
              }
            },
            font: {
              color: '#000000',
              size: 20,
              family: 'Ubuntu',
              weight: 500,
            },
          },
        },
        x: {
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
        x1: {
          stacked: true,
          position: 'top',
          border: {
            color: '#000000',
          },
          grid: {
            color: false,
          },
          ticks: false,
        },
        y1: {
          stacked: true,
          position: 'left',
          border: {
            color: '#000000',
          },
          ticks: {
            display: false,
          },
          grid: {
            color: false,
          },
        },
      },
    },
  });

  setChildren(dynamic, [title, chart]);

  return dynamic;
};

export default ChartView;
