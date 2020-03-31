import { createSelector } from 'reselect'
import { RootState } from '../../common/redux/types'
import { BondBuyState } from './types'
import { Currency } from 'src/types/models'

export const selectBondBuy = (state: RootState): BondBuyState => state.bondBuy

export const selectBondBuyTotalPrice = createSelector(
  selectBondBuy,
  (bondBuy: BondBuyState): Currency => bondBuy.totalPrice,
)

export const selectBondBuyActualPrice = createSelector(
  selectBondBuy,
  (bondBuy: BondBuyState): Currency => bondBuy.actualPrice,
)

export const selectBondBuyTotalFee = createSelector(
  selectBondBuy,
  (bondBuy: BondBuyState): Currency => bondBuy.totalFee,
)

export const selectBondBuyMaxPrice = createSelector(
  selectBondBuy,
  (bondBuy: BondBuyState): Currency => bondBuy.maxPrice,
)

export const selectBondBuyReceiving = createSelector(
  selectBondBuy,
  (bondBuy: BondBuyState): Currency => bondBuy.receiving,
)

export const selectBondBuySignPending = createSelector(
  selectBondBuy,
  (bondBuy: BondBuyState): boolean => bondBuy.signPending,
)

export const selectBondBuyQuotePending = createSelector(
  selectBondBuy,
  (bondBuy: BondBuyState): boolean => bondBuy.quotePending,
)

export const selectEstimatePrice = createSelector(
  selectBondBuyActualPrice,
  selectBondBuyReceiving,
  (actualPrice: Currency, receiving: Currency) => ({
    amount: actualPrice.amount / receiving.amount,
    denom: actualPrice.denom,
  }),
)

export const selectBondBuyIsReceiving = createSelector(
  selectBondBuy,
  (bondBuy: BondBuyState): boolean => !!bondBuy.receiving,
)

export const selectBondBuyHasTotalPrice = createSelector(
  selectBondBuyTotalPrice,
  (totalPrice: Currency): boolean => !!totalPrice,
)
