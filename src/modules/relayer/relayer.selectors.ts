import { RootState } from 'common/redux/types'
import { createSelector } from 'reselect'
import { CurrencyInfo, PaymentCoins, RelayerInfo } from './types'

const relayerName = process.env.REACT_APP_GAIA_URL.match(
  /^(http|https):\/\/([^ "]+)$/,
)?.[2]

export const selectRelayers = (state: RootState): RelayerInfo[] =>
  state.relayers

export const selectMyRelayer = createSelector(
  selectRelayers,
  (relayers: RelayerInfo[]): RelayerInfo =>
    relayers.find((relayer) => relayer.name === relayerName),
)

export const selectPaymentCoins = createSelector(
  selectMyRelayer,
  (relayer: RelayerInfo): PaymentCoins[] => relayer.paymentCoins,
)

export const selectCurrencies = createSelector(
  selectMyRelayer,
  (relayer: RelayerInfo): CurrencyInfo[] => relayer.currencies,
)
