import './CurrenciesChange.scss';
import { el, setChildren } from 'redom';

const CurrenciesChange = () => {
  const component = el('div.changes.p-5.h-100.gray-box');
  const title = el('h3.changes__title.subtitle.mb-3', 'Изменения курсов в реальном времени');
  const content = el('div.changes__content');

  const rates = [];
  const MAX_RATES = 18;

  const renderRates = () => {
    setChildren(content, []);

    const rateElements = rates.map((rateData) => {
      const row = el('div.d-flex.justify-content-between.change__currency.mb-3');
      const name = el('p.changes__name.currency.me-1', rateData.key);
      const dots = el('span.flex-grow-1.changes__dots.dots.me-1');
      const value = el('p.changes__value.currency-value', rateData.rate.toFixed(2));

      if (rateData.change > 0) {
        value.classList.add('changes__value-up');
        dots.classList.add('changes__dots-up');
      } else if (rateData.change < 0) {
        value.classList.add('changes__value-down');
        dots.classList.add('changes__dots-down');
      }
      setChildren(row, [name, dots, value]);
      return row;
    });

    setChildren(content, rateElements);
    setChildren(component, [title, content]);
  };

  const updateRate = (data) => {
    const key = `${data.from}/${data.to}`;
    const newRate = {
      key,
      rate: data.rate,
      change: data.change,
      timestamp: Date.now(),
    };

    const existingIndex = rates.findIndex((r) => r.key === key);

    if (existingIndex >= 0) {
      rates.splice(existingIndex, 1);
    }

    rates.unshift(newRate);

    if (rates.length > MAX_RATES) {
      rates.pop();
    }

    renderRates();
  };

  return {
    el: component,
    onmount() {
      // eslint-disable-next-line no-undef
      this.socket = new WebSocket(`${process.env.API_URL}/currency-feed`);

      this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'EXCHANGE_RATE_CHANGE') {
          updateRate(data);
        }
      };

      this.socket.onclose = () => {
        setTimeout(() => this.onmount(), 3000);
      };
    },
    onunmount() {
      if (this.socket) {
        this.socket.close();
      }
    },
  };
};

export default CurrenciesChange;
