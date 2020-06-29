import {
  AccountActions,
  LoginAction,
  LogoutAction,
  GetAccountAction,
  UserInfo,
} from './types'
import { RootState } from '../../common/redux/types'
import { Dispatch } from 'redux'
import Axios from 'axios'
import blocksyncApi from '../../common/api/blocksync-api/blocksync-api'
import keysafe from '../../common/keysafe/keysafe'
import { apiCurrencyToCurrency } from './Account.utils'

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

export const getAccount = (address: string) => (
  dispatch: Dispatch,
): GetAccountAction => {
  return dispatch({
    type: AccountActions.GetAccount,
    payload: Axios.get(
      process.env.REACT_APP_GAIA_URL + '/auth/accounts/' + address,
      {
        transformResponse: [
          (response: string): any => {
            return JSON.parse(response).result.value
          },
        ],
      },
    ).then(response => {
      return {
        balances: response.data.coins.map(coin => apiCurrencyToCurrency(coin)),
        sequence: response.data.sequence.toString(),
        accountNumber: response.data.account_number.toString(),
      }
    }),
  })
}

export const updateLoginStatus = () => (
  dispatch: Dispatch,
  getState: () => RootState,
): void => {
  const {
    account: { userInfo },
  } = getState()

  keysafe.getInfo((error, response) => {
    if (response) {
      const newUserInfo = { ...response, loggedInKeysafe: true }

      blocksyncApi.user
        .getDidDoc(newUserInfo.didDoc.did)
        .then((didResponse: any) => {
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
}
