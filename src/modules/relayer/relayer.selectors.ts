import { RootState } from 'common/redux/types'
import { createSelector } from 'reselect'
import { PaymentCoins, RelayerInfo } from './types'

const relayerName = process.env.REACT_APP_GAIA_URL.match(
  /^(http|https):\/\/([^ "]+)$/,
)?.[1]

export const selectRelayers = (state: RootState): RelayerInfo[] =>
  state.relayers

export const selectPaymentCoins = createSelector(
  selectRelayers,
  (relayers: RelayerInfo[]): PaymentCoins[] => {
    return relayers.filter((relayer) => relayer.name === relayerName)[0]
      .paymentCoins
  },
)
