import { createSelector } from 'reselect'
import { RootState } from 'common/redux/types'
import { AccountState, UserInfo, WalletType } from './types'
import { Coin } from '@cosmjs/proto-signing'
import { KeyTypes } from 'common/utils'
import { SigningStargateClient } from '@ixo/impactxclient-sdk'

export const selectAccountState = (state: RootState): AccountState => state.account

/**
 * @deprecated
 */
export const selectUserInfo = createSelector(selectAccountState, (account: AccountState): UserInfo => {
  return account.userInfo
})

/**
 * @deprecated
 */
export const selectUserIsLoggedIn = createSelector(selectUserInfo, (userInfo: UserInfo): boolean => {
  return userInfo ? userInfo.loggedInKeysafe : false
})

/**
 * @deprecated
 */
export const selectUserDid = createSelector(selectUserInfo, (userInfo: UserInfo): string => {
  return userInfo ? userInfo.didDoc.did : ''
})

/**
 * @deprecated
 */
export const selectUserAccountNumber = createSelector(selectAccountState, (account: AccountState): string => {
  return account ? account.accountNumber : null!
})

/**
 * @deprecated
 */
export const selectUserSequence = createSelector(selectAccountState, (account: AccountState): string => {
  return account ? account.sequence : null!
})

export const selectAccountAddress = createSelector(selectAccountState, (account: AccountState): string => {
  return account ? account.address : null!
})

export const selectAccountBalances = createSelector(selectAccountState, (account: AccountState): Coin[] => {
  return account?.balances ?? []
})

export const selectAccountSelectedWallet = createSelector(selectAccountState, (account: AccountState): WalletType => {
  return account?.selectedWallet || null!
})

export const selectAccountName = createSelector(selectAccountState, (account: AccountState): string => account?.name)

export const selectAccountRegistered = createSelector(
  selectAccountState,
  (account: AccountState): boolean => account?.registered,
)

export const selectAccountFunded = createSelector(selectAccountBalances, (balances: Coin[]): boolean =>
  balances.some(({ denom }) => denom === 'uixo'),
)

export const selectAccountPubKey = createSelector(
  selectAccountState,
  (account: AccountState): string => account?.pubKey,
)

export const selectAccountSigningClient = createSelector(
  selectAccountState,
  (account: AccountState): SigningStargateClient => account?.signingClient,
)

export const selectAccountKeyType = createSelector(
  selectAccountState,
  (account: AccountState): KeyTypes => (account?.selectedWallet === WalletType.Keplr ? 'secp' : 'ed'),
)

export const selectAccountDid = createSelector(selectAccountState, (account: AccountState): string => account?.did)
