import { el, setChildren } from 'redom';
import ProfileCurrencies from '../../components/ProfileCurrencies/ProfileCurrencies';
import ExchangeForm from '../../components/ExchangeForm/ExchangeForm';
import CurrenciesChange from '../../components/CurrenciesChange/CurrenciesChange';
import { getCurrencies } from '../../api/Currencies';
import CurrenciesSkeleton from '../../ui/Skeletons/CurrenciesSkeleton/CurrenciesSkeleton';

const Currencies = async () => {
  const page = el('div.container.currencies.py-5');
  const errorText = el(
    'p.text-error',
    'Произошла ошибка, перезагрузите страницу'
  );
  const title = el('h2.title.currencies__title.title.mb-5', 'Валютный обмен');

  const skeleton = CurrenciesSkeleton();

  setChildren(page, [title, skeleton]);
  (async () => {
    try {
      const row = el('div.row');
      const colOne = el('div.col-6');
      const colTwo = el('div.col-6');

      const initialResponse = await getCurrencies();
      let currentCurrencies = initialResponse.payload;

      const updateCurrencies = (newCurrencies) => {
        currentCurrencies = newCurrencies;
        profileCurrencies.update(currentCurrencies);
      };

      const profileCurrencies = ProfileCurrencies(currentCurrencies);
      const exchangeForm = await ExchangeForm(updateCurrencies);
      const currenciesChange = CurrenciesChange();

      setChildren(colOne, [profileCurrencies, exchangeForm]);
      setChildren(colTwo, [currenciesChange]);
      setChildren(row, [colOne, colTwo]);
      setChildren(page, [title, row]);
    } catch (error) {
      console.error(error);
      setChildren(page, [errorText]);
    }
  })();

  return page;
};

export default Currencies;
