import { RootState } from 'common/redux/types'
// import { AgentRole } from 'modules/Account/types'
import { createSelector } from 'reselect'
import { EntityAgentsState } from './types'

export const selectEntityAgentsState = (state: RootState): EntityAgentsState =>
  state.selectedEntityAgents

export const selectIsFetching = createSelector(
  selectEntityAgentsState,
  (entityAgentsState) => {
    return !entityAgentsState.agents || entityAgentsState.isFetching
  },
)

export const selectFetchError = createSelector(
  selectEntityAgentsState,
  (entityAgentsState) => {
    return entityAgentsState.fetchError
  },
)

export const selectEntityAgents = createSelector(
  selectEntityAgentsState,
  (entityAgentsState) => {
    return entityAgentsState.agents
      ? Object.values(entityAgentsState.agents)
      : null
  },
)
