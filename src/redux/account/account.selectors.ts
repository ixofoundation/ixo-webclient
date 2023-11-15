import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'redux/store'
import { AccountState } from './account.types'
import { Coin } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/v1beta1/coin'
import { KeyTypes } from 'lib/protocol'
import { SigningStargateClient } from '@ixo/impactxclient-sdk'
import { SigningCosmWasmClient, CosmWasmClient } from '@ixo/impactxclient-sdk/node_modules/@cosmjs/cosmwasm-stargate'
import { NATIVE_MICRODENOM } from 'constants/chains'
import { ConnectedWallet, WalletType } from 'types/wallet'
import BigNumber from 'bignumber.js'
import { Cw20Token, NativeToken } from 'types/tokens'

export const selectAccountState = (state: RootState): AccountState => state.account

export const selectAccountAddress = createSelector(selectAccountState, (account: AccountState): string => {
  return account ? account.address : ''
})

export const selectAccountDid = createSelector(selectAccountState, (account: AccountState): string => {
  return account?.did || ''
})

export const selectAccountBalances = createSelector(selectAccountState, (account: AccountState): Coin[] => {
  return account.balances ?? []
})

export const selectAccountNativeTokens = createSelector(selectAccountState, (account: AccountState): NativeToken[] => {
  return Object.values(account.nativeTokens)
})

export const selectAccountCw20Tokens = createSelector(selectAccountState, (account: AccountState): Cw20Token[] => {
  return Object.values(account.cw20Tokens)
})

export const selectAccountSelectedWallet = createSelector(selectAccountState, (account: AccountState): WalletType => {
  return account.selectedWallet ?? WalletType.None
})

export const selectAccountConnectedWallet = createSelector(
  selectAccountState,
  (account: AccountState): ConnectedWallet | undefined => {
    return account.connectedWallet
  },
)
export const selectAccountName = createSelector(selectAccountState, (account: AccountState): string => account?.name)

export const selectAccountRegistered = createSelector(
  selectAccountState,
  (account: AccountState): boolean | undefined => account?.registered,
)

export const selectAccountFunded = createSelector(selectAccountBalances, (balances: Coin[]): boolean =>
  balances.some(
    ({ denom, amount }) => denom === NATIVE_MICRODENOM && new BigNumber(amount).isGreaterThan(new BigNumber(0)),
  ),
)

export const selectAccountPubKey = createSelector(
  selectAccountState,
  (account: AccountState): string => account?.pubKey,
)

export const selectAccountSigningClient = createSelector(
  selectAccountState,
  (account: AccountState): SigningStargateClient => account?.signingClient,
)

export const selectAccountCosmWasmClient = createSelector(
  selectAccountState,
  (account: AccountState): SigningCosmWasmClient => account?.cosmWasmClient,
)

export const selectAccountCWClient = createSelector(
  selectAccountState,
  (account: AccountState): CosmWasmClient => account?.cwClient,
)

export const selectAccountKeyType = createSelector(
  selectAccountState,
  // (account: AccountState): KeyTypes => (account?.selectedWallet === WalletType.Keplr ? 'secp' : 'ed'),
  (): KeyTypes => 'secp',
)
