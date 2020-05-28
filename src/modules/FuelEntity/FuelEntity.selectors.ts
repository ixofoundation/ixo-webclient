import { createSelector } from 'reselect'
import { RootState } from 'src/common/redux/types'
import { FuelEntityState } from './types'

export const selectFuelEntity = (state: RootState): FuelEntityState =>
  state.fuelEntity

export const selectOrderSubscription = createSelector(
  selectFuelEntity,
  (fuelEntity: FuelEntityState): string => {
    return fuelEntity.order ? fuelEntity.order.subscription : null
  },
)

export const selectOrderCurrency = createSelector(
  selectFuelEntity,
  (fuelEntity: FuelEntityState): string => {
    return fuelEntity.order ? fuelEntity.order.currency : null
  },
)

export const selectOrderCurrencySymbol = createSelector(
  selectFuelEntity,
  (fuelEntity: FuelEntityState): string => {
    return fuelEntity.order ? fuelEntity.order.currencySymbol : null
  },
)

export const selectOrderCurrencyConversion = createSelector(
  selectFuelEntity,
  (fuelEntity: FuelEntityState): number => {
    return fuelEntity.order ? fuelEntity.order.currencyConversion : null
  },
)

export const selectOrderAmount = createSelector(
  selectFuelEntity,
  (fuelEntity: FuelEntityState): number => {
    return fuelEntity.order ? fuelEntity.order.amount : null
  },
)

export const selectOrderTransactionFee = createSelector(
  selectFuelEntity,
  (fuelEntity: FuelEntityState): number => {
    return fuelEntity.order ? fuelEntity.order.transactionFee : null
  },
)

export const selectOrderGasFee = createSelector(
  selectFuelEntity,
  (fuelEntity: FuelEntityState): number => {
    return fuelEntity.order ? fuelEntity.order.gasFee : null
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

export const selectOrderCurrencyConversionRate = createSelector(
  selectOrderCurrencyConversion,
  (currencyConversion: number): number => {
    return 1 / currencyConversion
  },
)

export const selectOrderAmountInCurrency = createSelector(
  selectOrderAmount,
  selectOrderCurrencyConversionRate,
  (amount: number, conversionRate: number) => {
    return amount * conversionRate
  },
)

export const selectOrderTransactionFeeInCurrency = createSelector(
  selectOrderTransactionFee,
  selectOrderCurrencyConversionRate,
  (transactionFee: number, conversionRate: number) => {
    return transactionFee * conversionRate
  },
)

export const selectOrderTotal = createSelector(
  selectOrderAmount,
  selectOrderTransactionFee,
  (amount: number, transactionFee: number) => {
    return amount + transactionFee
  },
)

export const selectOrderTotalInCurrency = createSelector(
  selectOrderTotal,
  selectOrderCurrencyConversion,
  (total: number, conversionRate: number) => {
    return total * conversionRate
  },
)

//TODO - formatted...
