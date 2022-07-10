import { RootState } from 'common/redux/types'
import { createSelector } from 'reselect'
import { CurrencyInfo, PaymentCoins, RelayerInfo } from './types'

const chainId = process.env.REACT_APP_CHAIN_ID

export const selectRelayers = (state: RootState): RelayerInfo[] =>
  state.relayers

export const selectMyRelayer = createSelector(
  selectRelayers,
  (relayers: RelayerInfo[]): RelayerInfo => {
    return relayers.find((relayer) => relayer.chainId === chainId)
  },
)

export const selectPaymentCoins = createSelector(
  selectMyRelayer,
  (relayer: RelayerInfo): PaymentCoins[] => relayer?.paymentCoins ?? [],
)

export const selectCurrencies = createSelector(
  selectMyRelayer,
  (relayer: RelayerInfo): CurrencyInfo[] => relayer.currencies,
)
