import { createSelector } from 'reselect'
import { RootState } from 'redux/types'
import { CreateEntityAdvancedState } from './createEntityAdvanced.types'

export const selectAdvanced = (state: RootState): CreateEntityAdvancedState => state.createEntityAdvanced

export const selectLinkedEntities = createSelector(selectAdvanced, (advanced: CreateEntityAdvancedState) => {
  return Object.values(advanced.linkedEntities)
})

export const selectPayments = createSelector(selectAdvanced, (advanced: CreateEntityAdvancedState) => {
  return Object.values(advanced.payments)
})

export const selectStaking = createSelector(selectAdvanced, (advanced: CreateEntityAdvancedState) => {
  return advanced.staking ? Object.values(advanced.staking) : []
})

export const selectNodes = createSelector(selectAdvanced, (advanced: CreateEntityAdvancedState) => {
  try {
    return Object.values(advanced.nodes)
  } catch (e) {
    console.log('selectNodes', e)
    return []
  }
})

export const selectLiquidity = createSelector(selectAdvanced, (advanced: CreateEntityAdvancedState) => {
  return advanced.liquidity ? Object.values(advanced.liquidity) : []
})

export const selectKeys = createSelector(selectAdvanced, (advanced: CreateEntityAdvancedState) => {
  return advanced.keys ? Object.values(advanced.keys) : []
})

export const selectServices = createSelector(selectAdvanced, (advanced: CreateEntityAdvancedState) => {
  return Object.values(advanced.services)
})

export const selectDataResources = createSelector(selectAdvanced, (advanced: CreateEntityAdvancedState) => {
  return advanced.dataResources ? Object.values(advanced.dataResources) : []
})

export const selectLinkedResources = createSelector(selectAdvanced, (advanced: CreateEntityAdvancedState) => {
  return advanced.linkedResources ? Object.values(advanced.linkedResources) : []
})

export const selectValidation = createSelector(selectAdvanced, (advanced) => {
  return advanced.validation
})

export const selectValidationComplete = createSelector(
  selectLinkedEntities,
  selectPayments,
  // selectStaking,
  selectNodes,
  selectLiquidity,
  // selectKeys,
  selectServices,
  // selectDataResources,
  selectLinkedResources,
  selectValidation,
  (
    linkedEntitySections,
    paymentSections,
    // stakingSections,
    nodeSections,
    liquiditySections,
    // keySections,
    serviceSections,
    // dataResourceSections,
    linkedResources,
    validation,
  ) => {
    // check if each section has had it's validation completed
    let validationComplete = true
    validationComplete = linkedEntitySections.map((section) => section.id).every((id) => !!validation[id])
    validationComplete =
      validationComplete && paymentSections.map((section) => section.id).every((id) => !!validation[id])
    // validationComplete =
    //   validationComplete &&
    //   stakingSections
    //     .map((section) => section.id)
    //     .every((id) => !!validation[id])
    validationComplete = validationComplete && nodeSections.map((section) => section.id).every((id) => !!validation[id])
    validationComplete =
      validationComplete && liquiditySections.map((section) => section.id).every((id) => !!validation[id])
    // validationComplete =
    //   validationComplete &&
    //   keySections.map((section) => section.id).every((id) => !!validation[id])
    validationComplete =
      validationComplete && serviceSections.map((section) => section.id).every((id) => !!validation[id])
    // validationComplete =
    //   validationComplete &&
    //   dataResourceSections
    //     .map((section) => section.id)
    //     .every((id) => !!validation[id])
    validationComplete =
      validationComplete && linkedResources.map((section) => section.id).every((id) => !!validation[id])

    return validationComplete
  },
)

export const selectValidated = createSelector(
  selectLinkedEntities,
  selectPayments,
  // selectStaking,
  selectNodes,
  selectLiquidity,
  // selectKeys,
  selectServices,
  // selectDataResources,
  selectLinkedResources,
  selectValidationComplete,
  selectValidation,
  (
    linkedEntitySections,
    paymentSections,
    // stakingSections,
    nodeSections,
    liquiditySections,
    // keySections,
    serviceSections,
    // dataResourceSections,
    linkedResources,
    validationComplete,
    validation,
  ) => {
    // check if each section has been validated successfully
    if (!validationComplete) {
      return false
    }

    let validated = true
    validated = linkedEntitySections.map((section) => section.id).every((id) => validation[id].validated)
    validated = validated && paymentSections.map((section) => section.id).every((id) => validation[id].validated)
    // validated =
    //   validated &&
    //   stakingSections
    //     .map((section) => section.id)
    //     .every((id) => validation[id].validated)
    validated = validated && nodeSections.map((section) => section.id).every((id) => validation[id].validated)
    validated = validated && liquiditySections.map((section) => section.id).every((id) => validation[id].validated)
    // validated =
    //   validated &&
    //   keySections
    //     .map((section) => section.id)
    //     .every((id) => validation[id].validated)
    validated = validated && serviceSections.map((section) => section.id).every((id) => validation[id].validated)
    // validated =
    //   validated &&
    //   dataResourceSections
    //     .map((section) => section.id)
    //     .every((id) => validation[id].validated)
    validated = validated && linkedResources.map((section) => section.id).every((id) => validation[id].validated)

    return validated
  },
)
