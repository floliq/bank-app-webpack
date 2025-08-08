import { el, setChildren } from 'redom';
import AccountSkeleton from '../AccountSkeleton/AccountSkeleton';

const AccountsPageSkeleton = (element) => {
  for (let i = 0; i < 9; i++) {
    const col = el('div.col-4.mb-4');
    const account = AccountSkeleton();
    setChildren(col, [account]);
    element.appendChild(col);
  }
};

export default AccountsPageSkeleton;
