import { el, setChildren } from 'redom';

const AccountInfoSkeleton = () => {
  const skeleton = el('div.ssc.ssc-wrapper');
  const head = el('div.ssc-head-line.mb-5');

  const content = el('div.d-flex.justify-content-between.mb-5');
  const cardOne = el('div.ssc-card.ssc-wrapper.w-50.me-5.p-5');
  const cardTwo = el('div.ssc-card.ssc-wrapper.w-50.p-5');

  const cardOneTitle = el('div.ssc-head-line.w-30.mb-4');
  const cardOneLineFirst = el('div.ssc-line.mb-4');
  const cardOneLineSecond = el('div.ssc-line.mb-4');
  const cardOneLineThird = el('div.ssc-line');

  const cardTwoSquare = el('div.ssc-square');

  const history = el('div.ssc-card.ssc-wrapper.p-5');
  const historyTitle = el('div.ssc-head-line.w-30.mb-4');
  const historyLineFirst = el('div.ssc-line.mb-4');
  const historyLineSecond = el('div.ssc-line.mb-4');
  const historyLineThird = el('div.ssc-line');

  setChildren(cardOne, [
    cardOneTitle,
    cardOneLineFirst,
    cardOneLineSecond,
    cardOneLineThird,
  ]);
  setChildren(cardTwo, [cardTwoSquare]);
  setChildren(history, [
    historyTitle,
    historyLineFirst,
    historyLineSecond,
    historyLineThird,
  ]);
  setChildren(content, [cardOne, cardTwo]);
  setChildren(skeleton, [head, content, history]);

  return skeleton;
};

export default AccountInfoSkeleton;
