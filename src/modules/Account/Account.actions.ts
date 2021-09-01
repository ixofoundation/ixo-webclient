import {
  AccountActions,
  LoginAction,
  LogoutAction,
  GetAccountAction,
  UserInfo,
  ToggleAssistantAction,
  ToogleAssistantPayload,
  SetKeplrWalletAction
} from './types'
import { RootState } from 'common/redux/types'
import { Dispatch } from 'redux'
import Axios from 'axios'
import blocksyncApi from 'common/api/blocksync-api/blocksync-api'
import keysafe from 'common/keysafe/keysafe'
import * as _ from 'lodash'
import { apiCurrencyToCurrency } from './Account.utils'

export const login = (userInfo: UserInfo, address: string, accountNumber: string, sequence: string): LoginAction => ({
  type: AccountActions.Login,
  payload: {
    userInfo,
    address,
    accountNumber,
    sequence
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
      process.env.REACT_APP_GAIA_URL + '/bank/balances/' + address
    ).then((response) => {
      return {
        balances: response.data.result.map((coin) => apiCurrencyToCurrency(coin)),
      }
    }),
  })
}

export const updateLoginStatus = () => (
  dispatch: Dispatch,
  getState: () => RootState,
): any => {
  const {
    account: { userInfo },
  } = getState()

  if (!keysafe) {
    if (userInfo !== null) {
      return dispatch(logout())
    }
    return
  }

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
              `${process.env.REACT_APP_GAIA_URL}/pubKeyToAddr/${newUserInfo.didDoc.pubKey}`
            ).then((addressResponse) => {
              const address = addressResponse.data.result

              Axios.get(
                `${process.env.REACT_APP_GAIA_URL}/auth/accounts/${address}`
              ).then((response) => {
                const account = _.get(response.data.result, 'value.base_vesting_account.base_account', null)

                if (account) {
                  const { account_number: accountNumber, sequence } = account
                  dispatch(login(newUserInfo, address, accountNumber, sequence))

                  return
                }

                const { account_number: accountNumber, sequence } = response.data.result.value
                dispatch(login(newUserInfo, address, accountNumber, sequence))
              })
            })
          }
        })
    } else {
      if (userInfo !== null) {
        dispatch(logout())
      }
    }
  })
}

export const toggleAssistant = (params: ToogleAssistantPayload = { fixed: false, forceClose: false, forceOpen: false }): ToggleAssistantAction => {
  return {
    type: AccountActions.ToggleAssistant,
    payload: params
  }
}

export const setKeplrWallet = (address: string, offlineSigner: any): SetKeplrWalletAction => {
  return {
    type: AccountActions.SetKeplrWallet,
    payload: {
      address,
      offlineSigner
    }
  }
}