import {
  AccountActions,
  LoginAction,
  LogoutAction,
  UserInfo,
  ToggleAssistantAction,
  ToogleAssistantPayload,
  GetTransactionsByAssetAction,
  SetKeplrWalletAction,
  GetTransactionsAction,
  GetUSDRateAction,
  GetMarketChartAction,
  ChooseWalletAction,
  UpdateNameAction,
  UpdateAddressAction,
  UpdateBalancesAction,
  UpdateRegisteredAction,
  UpdatePubKeyAction,
  UpdateSigningClientAction,
  UpdateDidAction,
  UpdateCosmWasmClientAction,
  UpdateCWClientAction,
  UpdateCw20TokensAction,
  UpdateNativeTokensAction,
} from './account.types'
import { Dispatch } from 'redux'
import Axios from 'axios'
import { displayTokenAmount, getDisplayAmount } from 'utils/currency'
import BigNumber from 'bignumber.js'
import { upperCase } from 'lodash'
import { thousandSeparator } from 'utils/formatters'
import { Coin } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/v1beta1/coin'
import { SigningStargateClient } from '@ixo/impactxclient-sdk'
import { SigningCosmWasmClient, CosmWasmClient } from '@ixo/impactxclient-sdk/node_modules/@cosmjs/cosmwasm-stargate'
import { WalletType } from '@gssuper/cosmodal'
import { Cw20Token, NativeToken } from 'types/tokens'

export const login = (userInfo: UserInfo, address: string, accountNumber: string, sequence: string): LoginAction => ({
  type: AccountActions.Login,
  payload: {
    userInfo,
    address,
    accountNumber,
    sequence,
  },
})

export const logout = (): LogoutAction => ({
  type: AccountActions.Logout,
})

export const getUSDRate =
  (denom = 'ixo') =>
  (dispatch: Dispatch): GetUSDRateAction => {
    const currency = 'usd'
    const request = Axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${denom}&vs_currencies=${currency}`)

    return dispatch({
      type: AccountActions.GetUSDRate,
      payload: request
        .then((response) => response.data)
        .then((response) => response[denom][currency])
        .catch(() => 0),
    })
  }

export const getMarketChart =
  (denom = 'ixo', currency = 'usd', days = '1') =>
  (dispatch: Dispatch): GetMarketChartAction => {
    const request = Axios.get(
      `https://api.coingecko.com/api/v3/coins/${denom}/market_chart?vs_currency=${currency}&days=${days}`,
    )

    return dispatch({
      type: AccountActions.GetMarketChart,
      payload: request
        .then((response) => response.data)
        .then((response) => ({
          prices: response.prices.map((price: any) => ({
            date: price[0],
            price: price[1],
          })),
          market_caps: response.market_caps.map((caps: any) => ({
            date: caps[0],
            caps: caps[1],
          })),
          total_volumes: response.total_volumes.map((volumes: any) => ({
            date: volumes[0],
            volumes: volumes[1],
          })),
        }))
        .catch(() => null),
    })
  }

export const getTransactions =
  (address: string) =>
  (dispatch: Dispatch): GetTransactionsAction => {
    const request = Axios.get(`${process.env.REACT_APP_BLOCK_SYNC_URL}/transactions/listTransactionsByAddr/${address}`)

    return dispatch({
      type: AccountActions.GetTransactions,
      payload: request
        .then((response) => response.data)
        .then((response) => {
          return response.map((transaction: any) => {
            const { txhash, tx_response, tx, _id } = transaction
            let asset = tx.body.messages[0].amount[0].denom
            let amount = tx.body.messages[0].amount[0].amount

            if (asset === 'uixo') {
              asset = 'ixo'
              amount = getDisplayAmount(new BigNumber(amount))
            }

            let type = tx.body.messages[0]['@type'].split('.').pop().substring(3)
            let inValue = displayTokenAmount(new BigNumber(amount))
            let outValue = displayTokenAmount(new BigNumber(amount))
            const fromAddress = tx.body.messages[0]['from_address']
            const toAddress = tx.body.messages[0]['to_address']

            switch (type) {
              case 'Send':
                if (address === fromAddress) {
                  inValue = null!
                  outValue += ' ' + upperCase(asset)
                } else if (address === toAddress) {
                  type = 'Receive'
                  outValue = null!
                  inValue += ' ' + upperCase(asset)
                }
                break
              default:
                break
            }

            return {
              id: _id,
              asset: asset,
              date: new Date(tx_response.timestamp),
              txhash: txhash,
              type: type,
              quantity: Number(amount),
              price: 0, //  placeholder
              in: inValue,
              out: outValue,
            }
          })
        }),
    })
  }

export const getTransactionsByAsset =
  (address: string, assets: string[]) =>
  (dispatch: Dispatch): GetTransactionsByAssetAction => {
    const requests = assets.map((asset) =>
      Axios.get(
        `${process.env.REACT_APP_BLOCK_SYNC_URL}/transactions/listTransactionsByAddrByAsset/${address}/${asset}`,
      ),
    )

    return dispatch({
      type: AccountActions.GetTransactionsByAsset,
      payload: Promise.all(requests).then(
        Axios.spread((...responses: any[]) => {
          return responses.map((response, i: number) => {
            let asset = assets[i]
            if (asset === 'uixo') asset = 'ixo'
            return {
              [asset]: response.data
                .map((transaction: any) => {
                  const { txhash, tx_response, tx, _id } = transaction
                  let amount = tx.body.messages[0].amount[0].amount
                  if (asset === 'ixo') amount = getDisplayAmount(new BigNumber(amount))
                  let type = tx.body.messages[0]['@type'].split('.').pop().substring(3)
                  let inValue = thousandSeparator(amount, ',')
                  let outValue = thousandSeparator(amount, ',')
                  const fromAddress = tx.body.messages[0]['from_address']
                  const toAddress = tx.body.messages[0]['to_address']

                  switch (type) {
                    case 'Send':
                      if (address === fromAddress) {
                        inValue = null!
                        outValue += ' ' + upperCase(asset)
                      } else if (address === toAddress) {
                        type = 'Receive'
                        outValue = null!
                        inValue += ' ' + upperCase(asset)
                      }
                      break
                    default:
                      break
                  }
                  return {
                    id: _id,
                    date: new Date(tx_response.timestamp),
                    txhash: txhash,
                    type: type,
                    quantity: thousandSeparator(Number(amount), ','),
                    price: 0, //  placeholder
                    in: inValue,
                    out: outValue,
                  }
                })
                .sort((a: any, b: any) => b.date - a.date),
            }
          })
        }),
      ),
    })
  }

export const toggleAssistant = (
  params: ToogleAssistantPayload = {
    fixed: false,
    forceClose: false,
    forceOpen: false,
  },
): ToggleAssistantAction => {
  return {
    type: AccountActions.ToggleAssistant,
    payload: params,
  }
}

export const setKeplrWallet = (address: string, offlineSigner: any): SetKeplrWalletAction => {
  return {
    type: AccountActions.SetKeplrWallet,
    payload: {
      address,
      offlineSigner,
    },
  }
}

export const chooseWalletAction = (type: WalletType | undefined): ChooseWalletAction => {
  return {
    type: AccountActions.ChooseWallet,
    payload: type,
  }
}

export const updateNameAction = (name: string): UpdateNameAction => {
  return {
    type: AccountActions.UpdateName,
    payload: name,
  }
}

export const updateAddressAction = (address: string): UpdateAddressAction => {
  return {
    type: AccountActions.UpdateAddress,
    payload: address,
  }
}

export const updateBalancesAction = (balances: Coin[]): UpdateBalancesAction => {
  return {
    type: AccountActions.UpdateBalances,
    payload: balances,
  }
}

export const updateNativeTokensAction = (balances: { [addr: string]: NativeToken }): UpdateNativeTokensAction => {
  return {
    type: AccountActions.UpdateNativeTokens,
    payload: balances,
  }
}

export const updateCw20TokensAction = (balances: { [addr: string]: Cw20Token }): UpdateCw20TokensAction => {
  return {
    type: AccountActions.UpdateCw20Tokens,
    payload: balances,
  }
}

export const updateRegisteredAction = (registered: boolean): UpdateRegisteredAction => {
  return {
    type: AccountActions.UpdateRegistered,
    payload: registered,
  }
}

export const updatePubKeyAction = (pubKey: string): UpdatePubKeyAction => {
  return {
    type: AccountActions.UpdatePubKey,
    payload: pubKey,
  }
}

export const updateSigningClientAction = (signingClient: SigningStargateClient): UpdateSigningClientAction => {
  return {
    type: AccountActions.UpdateSigningClient,
    payload: signingClient,
  }
}

export const updateCosmWasmAction = (cosmWasmClient: SigningCosmWasmClient): UpdateCosmWasmClientAction => {
  return {
    type: AccountActions.UpdateCosmWasmClient,
    payload: cosmWasmClient,
  }
}

export const updateCWClientAction = (cosmWasmClient: CosmWasmClient): UpdateCWClientAction => {
  return {
    type: AccountActions.UpdateCWClient,
    payload: cosmWasmClient,
  }
}

export const updateDidAction = (did: string): UpdateDidAction => {
  return {
    type: AccountActions.UpdateDid,
    payload: did,
  }
}
