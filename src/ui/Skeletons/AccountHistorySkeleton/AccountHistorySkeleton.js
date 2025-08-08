import { el, setChildren } from 'redom';

const AccountHistorySkeleton = () => {
  const skeleton = el('div.ssc.ssc-wrapper');
  const head = el('div.ssc-head-line.mb-5');

  const graphOne = el('div.ssc-card.ssc-wrapper.p-5.mb-5');
  const graphTwo = el('div.ssc-card.ssc-wrapper.p-5.mb-5');
  const squareOne = el('div.ssc-square');
  const squareTwo = el('div.ssc-square');

  const history = el('div.ssc-card.ssc-wrapper.p-5');
  const historyTitle = el('div.ssc-head-line.w-30.mb-4');
  const historyLineFirst = el('div.ssc-line.mb-4');
  const historyLineSecond = el('div.ssc-line.mb-4');
  const historyLineThird = el('div.ssc-line');

  setChildren(graphOne, [squareOne]);
  setChildren(graphTwo, [squareTwo]);
  setChildren(history, [
    historyTitle,
    historyLineFirst,
    historyLineSecond,
    historyLineThird,
  ]);
  setChildren(skeleton, [head, graphOne, graphTwo, history]);

  return skeleton;
};

export default AccountHistorySkeleton;
