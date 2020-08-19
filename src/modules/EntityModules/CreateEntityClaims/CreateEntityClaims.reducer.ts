import {
  CreateEntityClaimsActions,
  CreateEntityClaimActionTypes,
  CreateEntityClaimsState,
} from './types'
import {
  CreateEntityActionTypes,
  CreateEntityActions,
} from '../CreateEntity/types'
import * as reduxUtils from 'common/redux/utils'

export const initialState: CreateEntityClaimsState = {
  entityClaims: {},
  validation: {},
}

export const reducer = (
  state = initialState,
  action: CreateEntityClaimActionTypes | CreateEntityActionTypes,
) => {
  switch (action.type) {
    case CreateEntityClaimsActions.AddEntityClaim:
      return {
        ...state,
        entityClaims: {
          ...state.entityClaims,
          [action.payload.id]: {
            id: action.payload.id,
            template: {
              entityClaimId: action.payload.id,
              templateId: undefined,
              title: undefined,
              description: undefined,
              isPrivate: undefined,
              minTargetClaims: undefined,
              maxTargetClaims: undefined,
              submissionStartDate: undefined,
              submissionEndDate: undefined,
            },
            agentRoles: {},
            evaluations: {},
            approvalCriteria: {},
            enrichments: {},
          },
        },
      }
    case CreateEntityClaimsActions.RemoveEntityClaim:
      return {
        ...state,
        entityClaims: reduxUtils.omitKey(state.entityClaims, action.payload.id),
      }
    case CreateEntityClaimsActions.UpdateEntityClaimTemplate:
      return {
        ...state,
        entityClaims: {
          ...state.entityClaims,
          [action.payload.entityClaimId]: {
            ...state.entityClaims[action.payload.entityClaimId],
            template: action.payload,
          },
        },
      }
    case CreateEntityClaimsActions.AddEntityClaimAgentRole:
      return {
        ...state,
        entityClaims: {
          ...state.entityClaims,
          [action.payload.entityClaimId]: {
            ...state.entityClaims[action.payload.entityClaimId],
            agentRoles: {
              ...state.entityClaims[action.payload.entityClaimId].agentRoles,
              [action.payload.id]: {
                ...action.payload,
                role: undefined,
                credential: undefined,
                autoApprove: undefined,
              },
            },
          },
        },
      }
    case CreateEntityClaimsActions.RemoveEntityClaimAgentRole:
      return {
        ...state,
        entityClaims: {
          ...state.entityClaims,
          [action.payload.entityClaimId]: {
            ...state.entityClaims[action.payload.entityClaimId],
            agentRoles: reduxUtils.omitKey(
              state.entityClaims[action.payload.entityClaimId].agentRoles,
              action.payload.id,
            ),
          },
        },
      }
    case CreateEntityClaimsActions.UpdateEntityClaimAgentRole:
      return {
        ...state,
        entityClaims: {
          ...state.entityClaims,
          [action.payload.entityClaimId]: {
            ...state.entityClaims[action.payload.entityClaimId],
            agentRoles: {
              ...state.entityClaims[action.payload.entityClaimId].agentRoles,
              [action.payload.id]: action.payload,
            },
          },
        },
      }
    case CreateEntityClaimsActions.AddEntityClaimEvaluation:
      return {
        ...state,
        entityClaims: {
          ...state.entityClaims,
          [action.payload.entityClaimId]: {
            ...state.entityClaims[action.payload.entityClaimId],
            evaluations: {
              ...state.entityClaims[action.payload.entityClaimId].evaluations,
              [action.payload.id]: {
                ...action.payload,
                context: undefined,
                contextLink: undefined,
                evaluationAttributes: undefined,
                evaluationMethodology: undefined,
              },
            },
          },
        },
      }
    case CreateEntityClaimsActions.RemoveEntityClaimEvaluation:
      return {
        ...state,
        entityClaims: {
          ...state.entityClaims,
          [action.payload.entityClaimId]: {
            ...state.entityClaims[action.payload.entityClaimId],
            evaluations: reduxUtils.omitKey(
              state.entityClaims[action.payload.entityClaimId].evaluations,
              action.payload.id,
            ),
          },
        },
      }
    case CreateEntityClaimsActions.UpdateEntityClaimEvaluation:
      return {
        ...state,
        entityClaims: {
          ...state.entityClaims,
          [action.payload.entityClaimId]: {
            ...state.entityClaims[action.payload.entityClaimId],
            evaluations: {
              ...state.entityClaims[action.payload.entityClaimId].evaluations,
              [action.payload.id]: action.payload,
            },
          },
        },
      }
    case CreateEntityClaimsActions.AddEntityClaimApprovalCriterion:
      return {
        ...state,
        entityClaims: {
          ...state.entityClaims,
          [action.payload.entityClaimId]: {
            ...state.entityClaims[action.payload.entityClaimId],
            approvalCriteria: {
              ...state.entityClaims[action.payload.entityClaimId]
                .approvalCriteria,
              [action.payload.id]: {
                ...action.payload,
                context: undefined,
                contextLink: undefined,
                approvalAttributes: undefined,
                approvalCondition: undefined,
              },
            },
          },
        },
      }
    case CreateEntityClaimsActions.RemoveEntityClaimApprovalCriterion:
      return {
        ...state,
        entityClaims: {
          ...state.entityClaims,
          [action.payload.entityClaimId]: {
            ...state.entityClaims[action.payload.entityClaimId],
            approvalCriteria: reduxUtils.omitKey(
              state.entityClaims[action.payload.entityClaimId].approvalCriteria,
              action.payload.id,
            ),
          },
        },
      }
    case CreateEntityClaimsActions.UpdateEntityClaimApprovalCriterion:
      return {
        ...state,
        entityClaims: {
          ...state.entityClaims,
          [action.payload.entityClaimId]: {
            ...state.entityClaims[action.payload.entityClaimId],
            approvalCriteria: {
              ...state.entityClaims[action.payload.entityClaimId]
                .approvalCriteria,
              [action.payload.id]: action.payload,
            },
          },
        },
      }
    case CreateEntityClaimsActions.AddEntityClaimEnrichment:
      return {
        ...state,
        entityClaims: {
          ...state.entityClaims,
          [action.payload.entityClaimId]: {
            ...state.entityClaims[action.payload.entityClaimId],
            enrichments: {
              ...state.entityClaims[action.payload.entityClaimId].enrichments,
              [action.payload.id]: {
                ...action.payload,
                context: undefined,
                contextLink: undefined,
                resources: undefined,
                productId: undefined,
              },
            },
          },
        },
      }
    case CreateEntityClaimsActions.RemoveEntityClaimEnrichment:
      return {
        ...state,
        entityClaims: {
          ...state.entityClaims,
          [action.payload.entityClaimId]: {
            ...state.entityClaims[action.payload.entityClaimId],
            enrichments: reduxUtils.omitKey(
              state.entityClaims[action.payload.entityClaimId].enrichments,
              action.payload.id,
            ),
          },
        },
      }
    case CreateEntityClaimsActions.UpdateEntityClaimEnrichment:
      return {
        ...state,
        entityClaims: {
          ...state.entityClaims,
          [action.payload.entityClaimId]: {
            ...state.entityClaims[action.payload.entityClaimId],
            enrichments: {
              ...state.entityClaims[action.payload.entityClaimId].enrichments,
              [action.payload.id]: action.payload,
            },
          },
        },
      }
  }

  return state
}
