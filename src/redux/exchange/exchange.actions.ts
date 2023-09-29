import BigNumber from 'bignumber.js'
import {
  ExchangeActions,
  ResetStateAction,
  SetBalancesAction,
  SetInputAssetAction,
  SetInputAssetAmountAction,
  SetInputAssetEntityAction,
  SetInputAssetUSDAmountAction,
  SetOutputAssetAction,
  SetOutputAssetEntityAction,
  SetOutputAssetUSDAmountAction,
  SetSlippageAction,
  SetTokenBalancesAction,
} from './exchange.types'
import { Dispatch } from 'react'
import Axios from 'axios'
import { serviceEndpointToUrl } from 'utils/entities'

export const setBalances = (balances: Record<string, string>): SetBalancesAction => ({
  type: ExchangeActions.SetBalances,
  payload: balances,
})

export const setInputAssetUSDAmount = (usdAmount: BigNumber): SetInputAssetUSDAmountAction => ({
  type: ExchangeActions.SetInputAssetUSDAmount,
  payload: usdAmount,
})

export const setOutputAssetUSDAmount = (usdAmount: BigNumber): SetOutputAssetUSDAmountAction => ({
  type: ExchangeActions.SetOutputAssetUSDAmount,
  payload: usdAmount,
})

export const setInputAssetEntity = (entity: any) => {
  return async (dispatch: Dispatch<SetInputAssetEntityAction>) => {
    try {
      const url = serviceEndpointToUrl(entity.settings.Profile.serviceEndpoint, entity.service)
      const response = await Axios.get(url)
      dispatch({
        type: ExchangeActions.SetInputAssetEntity,
        payload: { ...entity, profile: response.data },
      })
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
}

export const setOutputAssetEntity = (entity: any) => {
  return async (dispatch: Dispatch<SetOutputAssetEntityAction>) => {
    try {
      const url = serviceEndpointToUrl(entity.settings.Profile.serviceEndpoint, entity.service)
      const response = await Axios.get(url)

      dispatch({
        type: ExchangeActions.SetOutputAssetEntity,
        payload: { ...entity, profile: response.data },
      })
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
}

export const setSlippage = (slippage: number): SetSlippageAction => ({
  type: ExchangeActions.SetSlippage,
  payload: slippage,
})

export const setTokenBalances = (balances: any): SetTokenBalancesAction => ({
  type: ExchangeActions.SetTokenBalances,
  payload: balances,
})

export const setInputAsset = (asset: any): SetInputAssetAction => ({
  type: ExchangeActions.SetInputAsset,
  payload: asset,
})

export const setOutputAsset = (asset: any): SetOutputAssetAction => ({
  type: ExchangeActions.SetOutputAsset,
  payload: asset,
})

export const setInputAssetAmount = (amount: BigNumber): SetInputAssetAmountAction => ({
  type: ExchangeActions.SetInputAssetAmount,
  payload: amount,
})

export const resetState = (): ResetStateAction => ({
  type: ExchangeActions.ResetState,
})
