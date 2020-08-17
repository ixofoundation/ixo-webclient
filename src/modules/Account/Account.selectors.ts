import { createSelector } from 'reselect';
import { RootState } from '../../common/redux/types';
import { AccountState, UserInfo } from './types';

export const selectAccountState = (state: RootState): AccountState =>
  state.account;

export const selectUserInfo = createSelector(
  selectAccountState,
  (account: AccountState): UserInfo => {
    return account.userInfo;
  },
);

export const selectUserIsLoggedIn = createSelector(
  selectUserInfo,
  (userInfo: UserInfo): boolean => {
    return userInfo ? userInfo.loggedInKeysafe : false;
  },
);

export const selectUserDid = createSelector(
  selectUserInfo,
  (userInfo: UserInfo): string => {
    return userInfo ? userInfo.didDoc.did : '';
  },
);
