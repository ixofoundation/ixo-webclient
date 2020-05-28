import Axios from 'axios'
import keysafe from '../../common/keysafe/keysafe'
import {
  GetOrderAction,
  FuelEntityActions,
  ConfirmOrderAction,
  FuelEntityOrderTx,
} from './types'
import { Dispatch } from 'redux'
import { RootState } from 'src/common/redux/types'
import * as transactionUtils from '../../common/utils/transaction.utils'
import * as Toast from '../../common/utils/Toast'

export const getOrder = (assistantResponse: any): GetOrderAction => ({
  // TODO read from the actual response when assistant ready
  // using dummy values for now
  type: FuelEntityActions.GetOrder,
  payload: {
    order: {
      subscription: '12-months standard hosting',
      currency: 'Euros',
      currencySymbol: '€',
      amount: 1200,
      currencyConversion: 10,
      transactionFee: 10,
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
      order: { amount },
    },
    account: {
      userInfo: {
        didDoc: { did: fromDid, pubKey },
      },
    },
  } = getState()

  const tx: FuelEntityOrderTx = {
    pubKey,
    fromDid,
    toDid: entityDid,
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
      ).then(response => {
        if (!response.data.logs[0].success) {
          Toast.errorToast('Order submission failed. Please try again.')
        } else {
          Toast.successToast('Order submitted!')
        }
      }),
    })
  })

  return null
}
