import { RootState } from 'common/redux/types'
import { createSelector } from 'reselect'
import { EntityExchangeState } from './types'
import * as _ from 'lodash'

export const selectSelectedEntityExchange = (state: RootState): any =>
  state.selectedEntityExchange

export const selectPortfolioAsset = createSelector(
  selectSelectedEntityExchange,
  (entityExchange: EntityExchangeState) => {
    return entityExchange ? entityExchange.portfolioAsset : null
  },
)

export const selectStakeCellEntity = createSelector(
  selectSelectedEntityExchange,
  (entityExchange: EntityExchangeState) => {
    return entityExchange ? entityExchange.stakeCellEntity : null
  },
)

export const selectSelectedAccountAddress = createSelector(
  selectSelectedEntityExchange,
  (entityExchange: EntityExchangeState) => {
    return entityExchange ? entityExchange.selectedAccountAddress : null
  },
)

export const selectLiquidityPools = createSelector(
  selectSelectedEntityExchange,
  (entityExchange: EntityExchangeState) => {
    return entityExchange ? entityExchange.liquidityPools : null
  },
)

export const selectAvailablePairs = createSelector(
  selectSelectedEntityExchange,
  (entityExchange: EntityExchangeState) => {
    const pairs = []
    if (entityExchange) {
      entityExchange.liquidityPools.forEach((pool) => {
        const { poolDetail } = pool
        const { reserve_tokens } = poolDetail
        pairs.push(reserve_tokens)
      })
    }
    return _.union(pairs)
  },
)
