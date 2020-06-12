import Axios from 'axios'
import keysafe from '../../common/keysafe/keysafe'
import {
  GetOrderAction,
  FuelEntityActions,
  ConfirmOrderAction,
  FuelEntityOrderTx,
  CancelOrderAction,
} from './types'
import { Dispatch } from 'redux'
import { RootState } from 'src/common/redux/types'
import * as transactionUtils from '../../common/utils/transaction.utils'

export const getOrder = (assistantResponse: any): GetOrderAction => ({
  // TODO read from the actual response when assistant ready
  // using dummy values for now
  type: FuelEntityActions.GetOrder,
  payload: {
    order: {
      symbol: 'IXO',
      subscription: '12-months standard hosting',
      fiat: 'EUR',
      fiatSymbol: '€',
      amount: '1267',
      fiatConversion: '10.00399181',
      transactionFee: '8.44500019',
      gasFee: '1.0045',
    },
  },
})

// TODO - entityDid will come from the SelectedEntity state when we refactor projects!
// so remove this param when it does
export const confirmOrder = (entityDid: string) => (
  dispatch: Dispatch,
  getState: () => RootState,
): ConfirmOrderAction => {
  const {
    fuelEntity: {
      order: { amount: amount },
    },
    account: {
      userInfo: {
        didDoc: { did: userDid, pubKey },
      },
    },
  } = getState()

  const tx: FuelEntityOrderTx = {
    pubKey,
    fromDid: userDid,
    toDid: `${entityDid}/${entityDid}`,
    amount: [{ denom: 'ixo', amount }],
  }

  keysafe.requestSigning(JSON.stringify(tx), (error, signature) => {
    if (error) {
      return null
    }

    return dispatch({
      type: FuelEntityActions.ConfirmOrder,
      payload: Axios.post(
        `${process.env.REACT_APP_GAIA_URL}/txs`,
        JSON.stringify(
          transactionUtils.generateTx('treasury/MsgSend', tx, signature),
        ),
      ),
    })
  })

  return null
}

export const cancelOrder = (): CancelOrderAction => ({
  type: FuelEntityActions.CancelOrder,
})
