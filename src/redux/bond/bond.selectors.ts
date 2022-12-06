import { RootState } from 'redux/store'
import { createSelector } from '@reduxjs/toolkit'
import { BondState } from './bond.types'

export const selectActiveBond = (state: RootState): BondState => state.activeBond

export const selectBondName = createSelector(selectActiveBond, (bond: BondState) => {
  return bond ? bond.name : null
})

export const selectTransactionProps = createSelector(selectActiveBond, (bond: BondState) => {
  return bond ? bond.transactions : []
})
