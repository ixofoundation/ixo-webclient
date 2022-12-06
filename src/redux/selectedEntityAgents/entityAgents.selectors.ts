import { RootState } from 'redux/store'
import { createSelector } from '@reduxjs/toolkit'
import { EntityAgentsState } from './entityAgents.types'

export const selectEntityAgentsState = (state: RootState): EntityAgentsState => state.selectedEntityAgents

export const selectIsFetching = createSelector(selectEntityAgentsState, (entityAgentsState) => {
  return !entityAgentsState.agents || entityAgentsState.isFetching
})

export const selectFetchError = createSelector(selectEntityAgentsState, (entityAgentsState) => {
  return entityAgentsState.fetchError
})

export const selectEntityAgents = createSelector(selectEntityAgentsState, (entityAgentsState) => {
  return entityAgentsState.agents ? Object.values(entityAgentsState.agents) : null
})

export const selectIsCreating = createSelector(selectEntityAgentsState, (entityAgentsState) => {
  return entityAgentsState.isCreating
})

export const selectCreationError = createSelector(selectEntityAgentsState, (entityAgentsState) => {
  return entityAgentsState.creationError
})
