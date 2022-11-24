import { createSelector } from 'reselect'
import { RootState } from 'common/redux/types'
import { AccountState, KeplrWalletInfo, UserInfo, WalletType } from './types'
import { Currency } from 'types/models'

export const selectAccountState = (state: RootState): AccountState => state.account

export const selectUserInfo = createSelector(selectAccountState, (account: AccountState): UserInfo => {
  return account.userInfo
})

export const selectUserIsLoggedIn = createSelector(selectUserInfo, (userInfo: UserInfo): boolean => {
  return userInfo ? userInfo.loggedInKeysafe : false
})

export const selectUserDid = createSelector(selectUserInfo, (userInfo: UserInfo): string => {
  return userInfo ? userInfo.didDoc.did : ''
})

export const selectUserAddress = createSelector(selectAccountState, (account: AccountState): string | null => {
  return account ? account.address : null
})

export const selectUserAccountNumber = createSelector(selectAccountState, (account: AccountState): string | null => {
  return account ? account.accountNumber : null
})

export const selectUserSequence = createSelector(selectAccountState, (account: AccountState): string | null => {
  return account ? account.sequence : null
})

export const selectUserBalances = createSelector(selectAccountState, (account: AccountState): Currency[] => {
  return account ? account.balances : []
})

export const selectUSDRate = createSelector(selectAccountState, (account: AccountState): number => {
  return account ? account.usdRate : 1
})

export const selectSelectedWallet = createSelector(
  selectAccountState,
  (account: AccountState): WalletType | undefined => {
    return account ? account.selectedWallet : undefined
  },
)

export const selectKeplrWallet = createSelector(
  selectAccountState,
  (account: AccountState): KeplrWalletInfo | undefined => {
    return account ? account.keplrWallet : undefined
  },
)
