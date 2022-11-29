import { createSelector } from 'reselect'
import { CreateEntityClaimsState, EntityClaimItem } from './createEntityClaims.types'
import { RootState } from 'redux/types'

export const selectEntityClaimsState = (state: RootState): CreateEntityClaimsState => state.createEntityClaims

export const selectEntityClaims = createSelector(
  selectEntityClaimsState,
  (entityClaimsState: CreateEntityClaimsState): EntityClaimItem[] => {
    return Object.values(entityClaimsState.entityClaims).map((entityClaim) => {
      const { id, template, agentRoles, evaluations, approvalCriteria, enrichments } = entityClaim

      return {
        id,
        template,
        agentRoles: Object.values(agentRoles),
        evaluations: Object.values(evaluations),
        approvalCriteria: Object.values(approvalCriteria),
        enrichments: Object.values(enrichments),
      }
    })
  },
)

export const selectValidation = createSelector(selectEntityClaimsState, (entityClaimsState) => {
  return entityClaimsState.validation
})

export const selectValidationComplete = createSelector(
  selectEntityClaims,
  selectValidation,
  (entityClaims, validation) => {
    let validationComplete = true

    entityClaims.forEach((entityClaim) => {
      const { template, agentRoles, approvalCriteria, enrichments, evaluations } = entityClaim

      validationComplete = validationComplete && !!validation[template.id]
      validationComplete = validationComplete && agentRoles.map((section) => section.id).every((id) => !!validation[id])
      validationComplete =
        validationComplete && approvalCriteria.map((section) => section.id).every((id) => !!validation[id])
      validationComplete =
        validationComplete && enrichments.map((section) => section.id).every((id) => !!validation[id])
      validationComplete =
        validationComplete && evaluations.map((section) => section.id).every((id) => !!validation[id])
    })

    return validationComplete
  },
)

export const selectValidated = createSelector(
  selectEntityClaims,
  selectValidationComplete,
  selectValidation,
  (entityClaims, validationComplete, validation) => {
    // check if each section has been validated successfully
    if (!validationComplete) {
      return false
    }

    let validated = true

    entityClaims.forEach((entityClaim) => {
      const { template, agentRoles, approvalCriteria, enrichments, evaluations } = entityClaim

      validated = validated && validation[template.id].validated
      validated = validated && agentRoles.map((section) => section.id).every((id) => validation[id].validated)
      validated = validated && approvalCriteria.map((section) => section.id).every((id) => validation[id].validated)
      validated = validated && enrichments.map((section) => section.id).every((id) => validation[id].validated)
      validated = validated && evaluations.map((section) => section.id).every((id) => validation[id].validated)
    })

    return validated
  },
)
