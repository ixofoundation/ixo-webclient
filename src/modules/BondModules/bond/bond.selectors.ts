import { RootState } from 'common/redux/types'
import { createSelector } from 'reselect'
import { BondState } from './types'

export const selectActiveBond = (state: RootState): BondState =>
  state.activeBond

export const selectBondName = createSelector(
  selectActiveBond,
  (bond: BondState) => {
    return bond ? bond.name : null
  },
)

export const selectPriceHistory = createSelector(
  selectActiveBond,
  (bond: BondState) => {
    return bond ? bond.priceHistory : []
  }
)

export const selectTransactionProps = createSelector(
  selectActiveBond,
  (bond: BondState) => {
    return bond ? bond.transactions : []
  }
)

export const selectBalanceProps = createSelector(
  selectActiveBond,
  (bond:BondState) => {
    return bond ? {
      price: bond.price,
      myStake: bond.myStake,
      reserveDenom: bond.reserveDenom,
      reserve: bond.reserve,
      alphaDate: bond.alphaDate,
      capital: bond.capital,
      symbol: bond.symbol
    } : {}
  }
)

export const selectBondDIDProps = createSelector(
  selectActiveBond,
  (bond: BondState) => {
    return bond ? bond.bondDid : ''
  }
)