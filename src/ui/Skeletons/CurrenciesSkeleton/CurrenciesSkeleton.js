import { el, setChildren } from 'redom';

const CurrenciesSkeleton = () => {
  const skeleton = el('div.ssc.ssc-wrapper');

  const content = el('div.d-flex.justify-content-between.mb-5');
  const cardOne = el('div.ssc-card.w-50.me-5');
  const cardTwo = el('div.ssc-card.w-50');

  const profileCurrencies = el('div.ssc-card.ssc-wrapper.me-5.p-5');

  const cardOneTitle = el('div.ssc-head-line.w-30.mb-4');
  const cardOneContent = el('div');

  for (let i = 0; i < 15; i++) {
    const line = el('div.ssc-line.mb-4');
    cardOneContent.appendChild(line);
  }

  const currencies = el('div.ssc-card.ssc-wrapper.p-5');
  const cardTwoTitle = el('div.ssc-head-line.w-30.mb-4');
  const cardTwoContent = el('div');

  for (let i = 0; i < 21; i++) {
    const line = el('div.ssc-line.mb-4');
    cardTwoContent.appendChild(line);
  }

  const form = el('div.ssc-card.ssc-wrapper.p-5');
  const formTitle = el('div.ssc-head-line.w-30.mb-4');
  const formLineFirst = el('div.ssc-line.mb-4');
  const formLineSecond = el('div.ssc-line.mb-4');

  setChildren(currencies, [cardTwoTitle, cardTwoContent]);
  setChildren(profileCurrencies, [cardOneTitle, cardOneContent]);
  setChildren(cardOne, [profileCurrencies, form]);
  setChildren(cardTwo, [currencies]);
  setChildren(form, [formTitle, formLineFirst, formLineSecond]);
  setChildren(content, [cardOne, cardTwo]);
  setChildren(skeleton, [content]);

  return skeleton;
};

export default CurrenciesSkeleton;
