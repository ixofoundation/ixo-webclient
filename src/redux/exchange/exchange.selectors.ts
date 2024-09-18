import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'redux/store'
import { ExchangeAsset, ExchangeState } from './exchange.types'

export const selectExchangeState = (state: RootState): ExchangeState => state.exchange

export const selectBalances = createSelector(selectExchangeState, (exchange): any => {
  return exchange.balances
})

export const selectInputAsset = createSelector(selectExchangeState, (exchange): ExchangeAsset => {
  return exchange.inputAsset
})

export const selectOutputAsset = createSelector(selectExchangeState, (exchange): ExchangeAsset => {
  return exchange.outputAsset
})

export const selectInputEntity = createSelector(selectExchangeState, (exchange): any => {
  return exchange.inputAsset.entity
})

export const selectOutputEntity = createSelector(selectExchangeState, (exchange): any => {
  return exchange.outputAsset.entity
})

export const selectSettings = createSelector(selectExchangeState, (exchange): any => {
  return exchange.settings
})

export const selectSlippage = createSelector(selectSettings, (settings): number => {
  return settings.slippage
})

export const selectTokenBalances = createSelector(selectExchangeState, (exchange): any => {
  return exchange.tokenBalances
})
