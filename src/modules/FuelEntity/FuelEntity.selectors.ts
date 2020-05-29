import { createSelector } from 'reselect'
import { RootState } from 'src/common/redux/types'
import { FuelEntityState } from './types'
import BigNumber from 'bignumber.js'
import * as currencyUtils from '../../common/utils/currency.utils'

export const selectFuelEntity = (state: RootState): FuelEntityState =>
  state.fuelEntity

export const selectOrderSymbol = createSelector(
  selectFuelEntity,
  (fuelEntity: FuelEntityState): string => {
    return fuelEntity.order ? fuelEntity.order.symbol : null
  },
)

export const selectOrderSubscription = createSelector(
  selectFuelEntity,
  (fuelEntity: FuelEntityState): string => {
    return fuelEntity.order ? fuelEntity.order.subscription : null
  },
)

export const selectOrderFiat = createSelector(
  selectFuelEntity,
  (fuelEntity: FuelEntityState): string => {
    return fuelEntity.order ? fuelEntity.order.fiat : null
  },
)

export const selectOrderFiatSymbol = createSelector(
  selectFuelEntity,
  (fuelEntity: FuelEntityState): string => {
    return fuelEntity.order ? fuelEntity.order.fiatSymbol : null
  },
)

export const selectOrderFiatConversion = createSelector(
  selectFuelEntity,
  (fuelEntity: FuelEntityState): string => {
    return fuelEntity.order ? fuelEntity.order.fiatConversion : '1'
  },
)

export const selectOrderAmount = createSelector(
  selectFuelEntity,
  (fuelEntity: FuelEntityState): string => {
    return fuelEntity.order ? fuelEntity.order.amount : '0'
  },
)

export const selectOrderTransactionFee = createSelector(
  selectFuelEntity,
  (fuelEntity: FuelEntityState): string => {
    return fuelEntity.order ? fuelEntity.order.transactionFee : '0'
  },
)

export const selectOrderGasFee = createSelector(
  selectFuelEntity,
  (fuelEntity: FuelEntityState): string => {
    return fuelEntity.order ? fuelEntity.order.gasFee : '0'
  },
)

export const selectSending = createSelector(
  selectFuelEntity,
  (fuelEntity: FuelEntityState): boolean => {
    return fuelEntity.sending
  },
)

export const selectError = createSelector(
  selectFuelEntity,
  (fuelEntity: FuelEntityState): string => {
    return fuelEntity.error
  },
)

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

export const selectOrderTokenFiatConversion = createSelector(
  selectOrderFiatConversion,
  selectOrderSymbol,
  (conversion: string, tokenSymbol: string): string => {
    return currencyUtils.displayTokenAmount(
      new BigNumber(conversion),
      tokenSymbol,
    )
  },
)

export const selectOrderTokenAmount = createSelector(
  selectOrderAmount,
  selectOrderSymbol,
  (amount: string, tokenSymbol: string): string => {
    return currencyUtils.displayTokenAmount(new BigNumber(amount), tokenSymbol)
  },
)

export const selectOrderTokenTransactionFee = createSelector(
  selectOrderTransactionFee,
  selectOrderSymbol,
  (transactionFee: string, tokenSymbol: string): string => {
    return currencyUtils.displayTokenAmount(
      new BigNumber(transactionFee),
      tokenSymbol,
    )
  },
)

export const selecOrderTokenTotal = createSelector(
  selectOrderTotal,
  selectOrderSymbol,
  (total: BigNumber, tokenSymbol): string => {
    return currencyUtils.displayTokenAmount(total, tokenSymbol)
  },
)

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
    return currencyUtils.displayFiatAmount(
      new BigNumber(amount).times(conversionRate),
      fiatSymbol,
    )
  },
)

export const selectOrderFiatTransactionFee = createSelector(
  selectOrderTransactionFee,
  selectOrderConversionRate,
  selectOrderFiatSymbol,
  (
    transactionFee: string,
    conversionRate: BigNumber,
    fiatSymbol: string,
  ): string => {
    return currencyUtils.displayFiatAmount(
      new BigNumber(transactionFee).times(conversionRate),
      fiatSymbol,
    )
  },
)

export const selectOrderFiatTotal = createSelector(
  selectOrderTotal,
  selectOrderConversionRate,
  selectOrderFiatSymbol,
  (total: BigNumber, conversionRate: BigNumber, fiatSymbol): string => {
    return currencyUtils.displayFiatAmount(
      total.times(conversionRate),
      fiatSymbol,
    )
  },
)
