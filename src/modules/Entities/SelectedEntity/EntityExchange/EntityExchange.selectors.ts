import { RootState } from 'common/redux/types'
import { createSelector } from 'reselect'
import { EntityExchangeState } from './types'

export const selectSelectedEntityExchange = (state: RootState): any =>
  state.selectedEntityExchange

export const selectTradeMethod = createSelector(
  selectSelectedEntityExchange,
  (entityExchange: EntityExchangeState) => {
    return entityExchange ? entityExchange.tradeMethod : null
  },
)
