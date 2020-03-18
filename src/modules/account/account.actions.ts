import {
  AccountActions,
  LoginAction,
  LogoutAction,
  GetBalancesAction,
  GetOrdersAction,
  UserInfo,
} from './types'
import { RootState } from '../../common/redux/types'
import { Dispatch } from 'redux'
import Axios from 'axios'

export const login = (userInfo: UserInfo, address: string): LoginAction => ({
  type: AccountActions.Login,
  payload: {
    userInfo,
    address,
  },
})

export const logout = (): LogoutAction => ({
  type: AccountActions.Logout,
})

export const getBalances = (address: string) => (
  dispatch: Dispatch,
): GetBalancesAction => {
  return dispatch({
    type: AccountActions.GetBalances,
    payload: Axios.get(
      process.env.REACT_APP_BLOCKCHAIN_NODE_URL + '/auth/accounts/' + address,
      {
        transformResponse: [
          (response: string): any => {
            return JSON.parse(response).result.value.coins
          },
        ],
      },
    ).then(response => {
      return { balances: response.data }
    }),
  })
}

export const getOrders = (address: string) => (
  dispatch: Dispatch,
): GetOrdersAction => {
  const config = {
    transformResponse: [
      (response: string): any => {
        return JSON.parse(response).txs
      },
    ],
  }

  const buyReq = Axios.get(
    process.env.REACT_APP_BLOCKCHAIN_NODE_URL +
      '/txs?message.action=buy&transfer.recipient=' +
      address,
    config,
  )
  const sellReq = Axios.get(
    process.env.REACT_APP_BLOCKCHAIN_NODE_URL +
      '/txs?message.action=sell&message.sender=' +
      address,
    config,
  )
  const swapReq = Axios.get(
    process.env.REACT_APP_BLOCKCHAIN_NODE_URL +
      '/txs?message.action=swap&transfer.recipient=' +
      address,
    config,
  )

  return dispatch({
    type: AccountActions.GetOrders,
    payload: Axios.all([sellReq, buyReq, swapReq]).then(
      Axios.spread((...responses) => {
        const buy = responses[0].data
        const sell = responses[1].data
        const swap = responses[2].data
        return { orders: [...buy, ...sell, ...swap] }
      }),
    ),
  })
}

export const updateLoginStatus = () => (
  dispatch: Dispatch,
  getState: () => RootState,
): void => {
  const {
    account: { userInfo },
    keySafe: { keysafe },
    ixo: { ixo },
  } = getState()

  keysafe.getInfo((error, response) => {
    if (response) {
      const newUserInfo = { ...response, loggedInKeysafe: true }

      ixo.user.getDidDoc(newUserInfo.didDoc.did).then((didResponse: any) => {
        if (didResponse.error) {
          newUserInfo.ledgered = false
          newUserInfo.hasKYC = false
        } else {
          newUserInfo.ledgered = true
          newUserInfo.hasKYC = didResponse.credentials.length > 0
        }

        if (JSON.stringify(userInfo) !== JSON.stringify(newUserInfo)) {
          Axios.get(
            `${process.env.REACT_APP_GAIA_URL}/didToAddr/${newUserInfo.didDoc.did}`,
          ).then(addressResponse => {
            const address = addressResponse.data
            dispatch(login(newUserInfo, address))
          })
        }
      })
    } else {
      dispatch(logout())
    }
  })

  // return
}
