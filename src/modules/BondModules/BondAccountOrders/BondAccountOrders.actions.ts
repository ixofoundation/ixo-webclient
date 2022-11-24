import { BondAccountOrdersActions, GetBondAccountOrdersAction } from './types'
import { RootState } from 'common/redux/types'
import { Dispatch } from 'redux'
import Axios from 'axios'

export const getBondAccountOrders =
  () =>
  (dispatch: Dispatch, getState: () => RootState): GetBondAccountOrdersAction => {
    const {
      account: { address },
    } = getState()

    const config = {
      transformResponse: [
        (response: string): any => {
          return JSON.parse(response).txs
        },
      ],
    }

    const buyReq = Axios.get(
      `${process.env.REACT_APP_GAIA_URL}/txs?message.action=buy&transfer.recipient=${address}`,
      config,
    )
    const sellReq = Axios.get(
      `${process.env.REACT_APP_GAIA_URL}/txs?message.action=sell&message.sender=${address}`,
      config,
    )
    const swapReq = Axios.get(
      `${process.env.REACT_APP_GAIA_URL}/txs?message.action=swap&transfer.recipient=${address}`,
      config,
    )

    return dispatch({
      type: BondAccountOrdersActions.GetOrders,
      payload: Promise.all([sellReq, buyReq, swapReq]).then(
        Axios.spread((...responses) => {
          const buy = responses[0].data
          const sell = responses[1].data
          const swap = responses[2].data
          return { bondAccountOrders: [...buy, ...sell, ...swap] }
        }),
      ),
    })
  }
