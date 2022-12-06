import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'redux/store'
import { FuelEntityState } from './fundingChat.types'
import BigNumber from 'bignumber.js'
import * as currencyUtils from '../../utils/currency'

export const selectFuelEntity = (state: RootState): FuelEntityState => state.fuelEntity

export const selectOrderSymbol = createSelector(selectFuelEntity, (fuelEntity: FuelEntityState): string => {
  return fuelEntity.order ? fuelEntity.order.symbol : null!
})

export const selectOrderSubscription = createSelector(selectFuelEntity, (fuelEntity: FuelEntityState): string => {
  return fuelEntity.order ? fuelEntity.order.subscription : null!
})

export const selectOrderFiat = createSelector(selectFuelEntity, (fuelEntity: FuelEntityState): string => {
  return fuelEntity.order ? fuelEntity.order.fiat : null!
})

export const selectOrderFiatSymbol = createSelector(selectFuelEntity, (fuelEntity: FuelEntityState): string => {
  return fuelEntity.order ? fuelEntity.order.fiatSymbol : null!
})

export const selectOrderFiatConversion = createSelector(selectFuelEntity, (fuelEntity: FuelEntityState): string => {
  return fuelEntity.order ? fuelEntity.order.fiatConversion : '1'
})

export const selectOrderAmount = createSelector(selectFuelEntity, (fuelEntity: FuelEntityState): string => {
  return fuelEntity.order ? fuelEntity.order.amount : '0'
})

export const selectOrderTransactionFee = createSelector(selectFuelEntity, (fuelEntity: FuelEntityState): string => {
  return fuelEntity.order ? fuelEntity.order.transactionFee : '0'
})

export const selectOrderGasFee = createSelector(selectFuelEntity, (fuelEntity: FuelEntityState): string => {
  return fuelEntity.order ? currencyUtils.displayTokenAmount(new BigNumber(fuelEntity.order.gasFee)) : '0'
})

export const selectSending = createSelector(selectFuelEntity, (fuelEntity: FuelEntityState): boolean => {
  return fuelEntity.sending
})

export const selectSent = createSelector(selectFuelEntity, (fuelEntity: FuelEntityState): boolean => {
  return fuelEntity.sent
})

export const selectError = createSelector(selectFuelEntity, (fuelEntity: FuelEntityState): string => {
  return fuelEntity.error!
})

export const selectOrderConversionRate = createSelector(
  selectOrderFiatConversion,
  (fiatConversion: string): BigNumber => {
    return new BigNumber(1).dividedBy(new BigNumber(fiatConversion))
  },
)

export const selectOrderTotal = createSelector(
  selectOrderAmount,
  selectOrderTransactionFee,
  (amount: string, transactionFee: string): BigNumber => {
    return new BigNumber(amount).plus(new BigNumber(transactionFee))
  },
)

export const selectOrderTokenAmount = createSelector(selectOrderAmount, selectOrderSymbol, (amount: string): string => {
  return currencyUtils.displayTokenAmount(new BigNumber(amount))
})

export const selectOrderTokenTransactionFee = createSelector(
  selectOrderTransactionFee,
  selectOrderSymbol,
  (transactionFee: string): string => {
    return currencyUtils.displayTokenAmount(new BigNumber(transactionFee))
  },
)

export const selectOrderTokenTotal = createSelector(selectOrderTotal, selectOrderSymbol, (total: BigNumber): string => {
  return currencyUtils.displayTokenAmount(total)
})

export const selectOrderFiatConversionRate = createSelector(
  selectOrderConversionRate,
  selectOrderFiatSymbol,
  (conversionRate: BigNumber, fiatSymbol: string): string => {
    return currencyUtils.displayFiatAmount(conversionRate, fiatSymbol)
  },
)

export const selectOrderFiatAmount = createSelector(
  selectOrderAmount,
  selectOrderConversionRate,
  selectOrderFiatSymbol,
  (amount: string, conversionRate: BigNumber, fiatSymbol: string): string => {
    return currencyUtils.displayFiatAmount(new BigNumber(amount).times(conversionRate), fiatSymbol)
  },
)

export const selectOrderFiatTransactionFee = createSelector(
  selectOrderTransactionFee,
  selectOrderConversionRate,
  selectOrderFiatSymbol,
  (transactionFee: string, conversionRate: BigNumber, fiatSymbol: string): string => {
    return currencyUtils.displayFiatAmount(new BigNumber(transactionFee).times(conversionRate), fiatSymbol)
  },
)

export const selectOrderFiatTotal = createSelector(
  selectOrderTotal,
  selectOrderConversionRate,
  selectOrderFiatSymbol,
  (total: BigNumber, conversionRate: BigNumber, fiatSymbol): string => {
    return currencyUtils.displayFiatAmount(total.times(conversionRate), fiatSymbol)
  },
)

export const selectHasOrder = createSelector(selectFuelEntity, (fuelEntity: FuelEntityState): boolean => {
  return !!fuelEntity.order
})
