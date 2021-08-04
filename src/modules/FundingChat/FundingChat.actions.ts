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
import { RootState } from 'common/redux/types'
import * as transactionUtils from '../../common/utils/transaction.utils'
import * as Toast from '../../common/utils/Toast'
import blocksyncApi from 'common/api/blocksync-api/blocksync-api'

export const getOrder = (assistantResponse: any): GetOrderAction => ({
  // TODO read from the actual response when assistant ready
  // using dummy values for now
  type: FuelEntityActions.GetOrder,
  payload: {
    order: {
      symbol: 'IXO',
      subscription: '12 Months',
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
      order: { amount },
    },
    account: {
      userInfo: {
        didDoc: { did: userDid, pubKey },
      },
    },
  } = getState()

  Axios.get(
    `${process.env.REACT_APP_GAIA_URL}/projectAccounts/${entityDid}`,
  ).then((projectAccounts) => {
    const projectAddr = projectAccounts.data[entityDid]

    const tx: FuelEntityOrderTx = {
      pubKey,
      from_did: userDid,
      to_did: `${projectAddr}`,
      amount: [{ denom: 'ixo', amount }],
    }

    const msgType = 'treasury/MsgSend'
    blocksyncApi.utils
      .getSignData(tx, msgType, pubKey)
      .then((response: any) => {
        if (response.sign_bytes && response.fee) {
          keysafe.requestSigning(
            response.sign_bytes,
            (error, signature) => {
              if (error) {
                return null
              }

              return dispatch({
                type: FuelEntityActions.ConfirmOrder,
                payload: Axios.post(
                  `${process.env.REACT_APP_GAIA_URL}/txs`,
                  JSON.stringify(
                    transactionUtils.generateTx(
                      msgType,
                      tx,
                      signature,
                      response.fee,
                    ),
                  ),
                ),
              })
            },
            'base64',
          )
        }
      })
      .catch(() => {
        Toast.errorToast('Sale failed. Please try again.')
      })
  })

  return null
}

export const cancelOrder = (): CancelOrderAction => ({
  type: FuelEntityActions.CancelOrder,
})
