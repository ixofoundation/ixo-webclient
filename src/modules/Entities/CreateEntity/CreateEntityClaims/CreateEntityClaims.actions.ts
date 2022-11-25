import { v4 as uuidv4 } from 'uuid'
import {
  CreateEntityClaimsActions,
  AddEntityClaimAction,
  RemoveEntityClaimAction,
  UpdateEntityClaimTemplateAction,
  AddEntityClaimAgentRoleAction,
  RemoveEntityClaimAgentRoleAction,
  UpdateEntityClaimAgentRoleAction,
  AddEntityClaimEvaluationAction,
  RemoveEntityClaimEvaluationAction,
  UpdateEntityClaimEvaluationAction,
  AddEntityClaimApprovalCriterionAction,
  RemoveEntityClaimApprovalCriterionAction,
  UpdateEntityClaimApprovalCriterionAction,
  AddEntityClaimEnrichmentAction,
  RemoveEntityClaimEnrichmentAction,
  UpdateEntityClaimEnrichmentAction,
  ValidatedAction,
  ValidationErrorAction,
  ReorderEntityClaimAction,
} from './types'
import { FormData } from 'common/components/JsonForm/types'
import { RootState } from 'common/redux/types'
import { reorderObjectElement } from 'common/redux/utils'
import { Dispatch } from 'redux'

export const addEntityClaim = (): AddEntityClaimAction => ({
  type: CreateEntityClaimsActions.AddEntityClaim,
  payload: {
    id: uuidv4(),
  },
})

export const removeEntityClaim = (id: string): RemoveEntityClaimAction => ({
  type: CreateEntityClaimsActions.RemoveEntityClaim,
  payload: {
    id,
  },
})

export const reorderEntityClaims =
  (srcId: string, dstId: string) =>
  (dispatch: Dispatch, getState: () => RootState): ReorderEntityClaimAction => {
    const {
      createEntityClaims: { entityClaims },
    } = getState()

    return dispatch({
      type: CreateEntityClaimsActions.ReorderEntityClaim,
      payload: reorderObjectElement(srcId, dstId, { ...entityClaims }),
    })
  }

export const updateEntityClaimTemplate = (
  entityClaimId: string,
  id: any,
  formData: FormData,
): UpdateEntityClaimTemplateAction => {
  const { templateId, title, description, isPrivate, minTargetClaims, maxTargetClaims, goal, submissionDates } =
    formData

  return {
    type: CreateEntityClaimsActions.UpdateEntityClaimTemplate,
    payload: {
      id,
      entityClaimId,
      templateId,
      title,
      description,
      isPrivate,
      minTargetClaims,
      maxTargetClaims,
      goal,
      submissionStartDate: submissionDates ? submissionDates.split('|')[0] : undefined,
      submissionEndDate: submissionDates ? submissionDates.split('|')[1] : undefined,
    },
  }
}

export const addEntityClaimAgentRole = (entityClaimId: string): AddEntityClaimAgentRoleAction => ({
  type: CreateEntityClaimsActions.AddEntityClaimAgentRole,
  payload: {
    entityClaimId,
    id: uuidv4(),
  },
})

export const removeEntityClaimAgentRole = (entityClaimId: string, id: string): RemoveEntityClaimAgentRoleAction => ({
  type: CreateEntityClaimsActions.RemoveEntityClaimAgentRole,
  payload: {
    entityClaimId,
    id,
  },
})

export const updateEntityClaimAgentRole = (
  entityClaimId: string,
  id: string,
  formData: FormData,
): UpdateEntityClaimAgentRoleAction => {
  const { role, credential, autoApprove } = formData

  return {
    type: CreateEntityClaimsActions.UpdateEntityClaimAgentRole,
    payload: {
      entityClaimId,
      id,
      role,
      credential,
      autoApprove,
    },
  }
}

export const addEntityClaimEvaluation = (entityClaimId: string): AddEntityClaimEvaluationAction => ({
  type: CreateEntityClaimsActions.AddEntityClaimEvaluation,
  payload: {
    entityClaimId,
    id: uuidv4(),
  },
})

export const removeEntityClaimEvaluation = (entityClaimId: string, id: string): RemoveEntityClaimEvaluationAction => ({
  type: CreateEntityClaimsActions.RemoveEntityClaimEvaluation,
  payload: {
    entityClaimId,
    id,
  },
})

export const updateEntityClaimEvaluation = (
  entityClaimId: string,
  id: string,
  formData: FormData,
): UpdateEntityClaimEvaluationAction => {
  const { context, contextLink, evaluationAttributes, evaluationMethodology } = formData

  return {
    type: CreateEntityClaimsActions.UpdateEntityClaimEvaluation,
    payload: {
      entityClaimId,
      id,
      context,
      contextLink,
      evaluationAttributes,
      evaluationMethodology,
    },
  }
}

export const addEntityClaimApprovalCriterion = (entityClaimId: string): AddEntityClaimApprovalCriterionAction => ({
  type: CreateEntityClaimsActions.AddEntityClaimApprovalCriterion,
  payload: {
    entityClaimId,
    id: uuidv4(),
  },
})

export const removeEntityClaimApprovalCriterion = (
  entityClaimId: string,
  id: string,
): RemoveEntityClaimApprovalCriterionAction => ({
  type: CreateEntityClaimsActions.RemoveEntityClaimApprovalCriterion,
  payload: {
    entityClaimId,
    id,
  },
})

export const updateEntityClaimApprovalCriterion = (
  entityClaimId: string,
  id: string,
  formData: FormData,
): UpdateEntityClaimApprovalCriterionAction => {
  const { context, contextLink, approvalAttributes } = formData

  return {
    type: CreateEntityClaimsActions.UpdateEntityClaimApprovalCriterion,
    payload: {
      entityClaimId,
      id,
      context,
      contextLink,
      approvalAttributes,
    },
  }
}

export const addEntityClaimEnrichment = (entityClaimId: string): AddEntityClaimEnrichmentAction => ({
  type: CreateEntityClaimsActions.AddEntityClaimEnrichment,
  payload: {
    entityClaimId,
    id: uuidv4(),
  },
})

export const removeEntityClaimEnrichment = (entityClaimId: string, id: string): RemoveEntityClaimEnrichmentAction => ({
  type: CreateEntityClaimsActions.RemoveEntityClaimEnrichment,
  payload: {
    entityClaimId,
    id,
  },
})

export const updateEntityClaimEnrichment = (
  entityClaimId: string,
  id: string,
  formData: FormData,
): UpdateEntityClaimEnrichmentAction => {
  const { context, contextLink, resources } = formData

  return {
    type: CreateEntityClaimsActions.UpdateEntityClaimEnrichment,
    payload: {
      entityClaimId,
      id,
      context,
      contextLink,
      resources,
    },
  }
}

export const validated = (identifier: string): ValidatedAction => ({
  type: CreateEntityClaimsActions.Validated,
  payload: {
    identifier,
  },
})

export const validationError = (identifier: string, errors: string[]): ValidationErrorAction => ({
  type: CreateEntityClaimsActions.ValidationError,
  payload: {
    identifier,
    errors,
  },
})

export const importEntityClaims = (payload: any): any => ({
  type: CreateEntityClaimsActions.ImportEntityClaims,
  payload,
})
