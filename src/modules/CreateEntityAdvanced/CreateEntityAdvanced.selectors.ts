import { createSelector } from 'reselect'
import { RootState } from 'src/common/redux/types'
import { CreateEntityAdvancedState } from './types'

export const selectAdvanced = (state: RootState): CreateEntityAdvancedState =>
  state.createEntityAdvanced

export const selectLinkedEntity = createSelector(
  selectAdvanced,
  (advanced: CreateEntityAdvancedState) => {
    return advanced.linkedEntity
  },
)

export const selectPayment = createSelector(
  selectAdvanced,
  (advanced: CreateEntityAdvancedState) => {
    return advanced.payment
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

export const selectKey = createSelector(
  selectAdvanced,
  (advanced: CreateEntityAdvancedState) => {
    return advanced.key
  },
)

export const selectService = createSelector(
  selectAdvanced,
  (advanced: CreateEntityAdvancedState) => {
    return advanced.service
  },
)

export const selectDataResources = createSelector(
  selectAdvanced,
  (advanced: CreateEntityAdvancedState) => {
    return Object.values(advanced.dataResources)
  },
)
