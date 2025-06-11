import { el, setChildren } from 'redom';
import './AccountSkeleton.scss';

const AccountSkeleton = () => {
  const skeleton = el('div.ssc.ssc-card');
  const wrapper = el('div.ssc-wrapper');
  const lineOne = el('div.mb-2.ssc-line.w-100');
  const lineTwo = el('div.mb-5.ssc-line.w-30');
  const lineThree = el('div.mb-2.ssc-line.w-50');
  const lineFour = el('div.mb-2.ssc-line.w-30');

  setChildren(wrapper, [lineOne, lineTwo, lineThree, lineFour]);
  setChildren(skeleton, [wrapper]);

  return skeleton;
};

export default AccountSkeleton;
