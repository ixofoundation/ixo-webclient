import { createSelector } from 'reselect'
import { RootState } from 'src/common/redux/types'
import { CreateEntityAdvancedState } from './types'

export const selectAdvanced = (state: RootState): CreateEntityAdvancedState =>
  state.createEntityAdvanced

export const selectLinkedEntities = createSelector(
  selectAdvanced,
  (advanced: CreateEntityAdvancedState) => {
    return Object.values(advanced.linkedEntities)
  },
)

export const selectPayments = createSelector(
  selectAdvanced,
  (advanced: CreateEntityAdvancedState) => {
    return Object.values(advanced.payments)
  },
)

export const selectStaking = createSelector(
  selectAdvanced,
  (advanced: CreateEntityAdvancedState) => {
    return Object.values(advanced.staking)
  },
)

export const selectNodes = createSelector(
  selectAdvanced,
  (advanced: CreateEntityAdvancedState) => {
    return Object.values(advanced.nodes)
  },
)

export const selectFunding = createSelector(
  selectAdvanced,
  (advanced: CreateEntityAdvancedState) => {
    return Object.values(advanced.funding)
  },
)

export const selectKeys = createSelector(
  selectAdvanced,
  (advanced: CreateEntityAdvancedState) => {
    return Object.values(advanced.keys)
  },
)

export const selectServices = createSelector(
  selectAdvanced,
  (advanced: CreateEntityAdvancedState) => {
    return Object.values(advanced.services)
  },
)

export const selectDataResources = createSelector(
  selectAdvanced,
  (advanced: CreateEntityAdvancedState) => {
    return Object.values(advanced.dataResources)
  },
)
