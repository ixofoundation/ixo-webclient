import { v4 as uuidv4 } from 'uuid'
import {
  EditEntityClaimsActions,
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
} from './editEntityClaims.types'
import { FormData } from 'common/components/JsonForm/types'

export const addEntityClaim = (): AddEntityClaimAction => ({
  type: EditEntityClaimsActions.AddEntityClaim,
  payload: {
    id: uuidv4(),
  },
})

export const removeEntityClaim = (id: string): RemoveEntityClaimAction => ({
  type: EditEntityClaimsActions.RemoveEntityClaim,
  payload: {
    id,
  },
})

export const updateEntityClaimTemplate = (
  entityClaimId: string,
  id: any,
  formData: FormData,
): UpdateEntityClaimTemplateAction => {
  const { templateId, title, description, isPrivate, minTargetClaims, maxTargetClaims, goal, submissionDates } =
    formData

  return {
    type: EditEntityClaimsActions.UpdateEntityClaimTemplate,
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
  type: EditEntityClaimsActions.AddEntityClaimAgentRole,
  payload: {
    entityClaimId,
    id: uuidv4(),
  },
})

export const removeEntityClaimAgentRole = (entityClaimId: string, id: string): RemoveEntityClaimAgentRoleAction => ({
  type: EditEntityClaimsActions.RemoveEntityClaimAgentRole,
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
    type: EditEntityClaimsActions.UpdateEntityClaimAgentRole,
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
  type: EditEntityClaimsActions.AddEntityClaimEvaluation,
  payload: {
    entityClaimId,
    id: uuidv4(),
  },
})

export const removeEntityClaimEvaluation = (entityClaimId: string, id: string): RemoveEntityClaimEvaluationAction => ({
  type: EditEntityClaimsActions.RemoveEntityClaimEvaluation,
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
    type: EditEntityClaimsActions.UpdateEntityClaimEvaluation,
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
  type: EditEntityClaimsActions.AddEntityClaimApprovalCriterion,
  payload: {
    entityClaimId,
    id: uuidv4(),
  },
})

export const removeEntityClaimApprovalCriterion = (
  entityClaimId: string,
  id: string,
): RemoveEntityClaimApprovalCriterionAction => ({
  type: EditEntityClaimsActions.RemoveEntityClaimApprovalCriterion,
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
    type: EditEntityClaimsActions.UpdateEntityClaimApprovalCriterion,
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
  type: EditEntityClaimsActions.AddEntityClaimEnrichment,
  payload: {
    entityClaimId,
    id: uuidv4(),
  },
})

export const removeEntityClaimEnrichment = (entityClaimId: string, id: string): RemoveEntityClaimEnrichmentAction => ({
  type: EditEntityClaimsActions.RemoveEntityClaimEnrichment,
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
    type: EditEntityClaimsActions.UpdateEntityClaimEnrichment,
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
  type: EditEntityClaimsActions.Validated,
  payload: {
    identifier,
  },
})

export const validationError = (identifier: string, errors: string[]): ValidationErrorAction => ({
  type: EditEntityClaimsActions.ValidationError,
  payload: {
    identifier,
    errors,
  },
})

export const importEntityClaims = (payload: any) => ({
  type: EditEntityClaimsActions.ImportEntityClaims,
  payload,
})
