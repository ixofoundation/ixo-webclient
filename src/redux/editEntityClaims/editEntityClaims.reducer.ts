import { v4 as uuidv4 } from 'uuid'
import { EditEntityClaimsActions, EditEntityClaimActionTypes, EditEntityClaimsState } from './editEntityClaims.types'
import { EditEntityActionTypes, EditEntityActions } from '../editEntity/editEntity.types'
import { omitKey } from 'utils'

const firstEntityClaimId = uuidv4()
const firstEntityClaimTemplateId = uuidv4()

export const initialState: EditEntityClaimsState = {
  entityClaims: {
    [firstEntityClaimId]: {
      id: firstEntityClaimId,
      template: {
        id: firstEntityClaimTemplateId,
        entityClaimId: firstEntityClaimId,
        templateId: undefined,
        title: undefined,
        description: undefined,
        isPrivate: false,
        minTargetClaims: undefined,
        maxTargetClaims: undefined,
        goal: undefined,
        submissionStartDate: undefined,
        submissionEndDate: undefined,
      },
      agentRoles: {},
      evaluations: {},
      approvalCriteria: {},
      enrichments: {},
    },
  },
  validation: {},
} as any

export const reducer = (
  state = initialState,
  action: EditEntityClaimActionTypes | EditEntityActionTypes,
): EditEntityClaimsState => {
  switch (action.type) {
    case EditEntityClaimsActions.AddEntityClaim:
      return {
        ...state,
        entityClaims: {
          ...state.entityClaims,
          [action.payload.id]: {
            id: action.payload.id,
            template: {
              id: uuidv4(),
              entityClaimId: action.payload.id,
              templateId: undefined,
              title: undefined,
              description: undefined,
              isPrivate: false,
              minTargetClaims: undefined,
              maxTargetClaims: undefined,
              goal: undefined,
              submissionStartDate: undefined,
              submissionEndDate: undefined,
            },
            agentRoles: {},
            evaluations: {},
            approvalCriteria: {},
            enrichments: {},
          },
        } as any,
      }
    case EditEntityClaimsActions.RemoveEntityClaim:
      return {
        ...state,
        entityClaims: omitKey(state.entityClaims, action.payload.id),
      }
    case EditEntityClaimsActions.UpdateEntityClaimTemplate:
      return {
        ...state,
        entityClaims: {
          ...state.entityClaims,
          [action.payload.entityClaimId]: {
            ...state.entityClaims[action.payload.entityClaimId],
            template: { ...action.payload },
          },
        },
      }
    case EditEntityClaimsActions.AddEntityClaimAgentRole:
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
                autoApprove: false,
              },
            },
          },
        } as any,
      }
    case EditEntityClaimsActions.RemoveEntityClaimAgentRole:
      return {
        ...state,
        entityClaims: {
          ...state.entityClaims,
          [action.payload.entityClaimId]: {
            ...state.entityClaims[action.payload.entityClaimId],
            agentRoles: omitKey(state.entityClaims[action.payload.entityClaimId].agentRoles, action.payload.id),
          },
        },
      }
    case EditEntityClaimsActions.UpdateEntityClaimAgentRole:
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
    case EditEntityClaimsActions.AddEntityClaimEvaluation:
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
        } as any,
      }
    case EditEntityClaimsActions.RemoveEntityClaimEvaluation:
      return {
        ...state,
        entityClaims: {
          ...state.entityClaims,
          [action.payload.entityClaimId]: {
            ...state.entityClaims[action.payload.entityClaimId],
            evaluations: omitKey(state.entityClaims[action.payload.entityClaimId].evaluations, action.payload.id),
          },
        },
      }
    case EditEntityClaimsActions.UpdateEntityClaimEvaluation:
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
    case EditEntityClaimsActions.AddEntityClaimApprovalCriterion:
      return {
        ...state,
        entityClaims: {
          ...state.entityClaims,
          [action.payload.entityClaimId]: {
            ...state.entityClaims[action.payload.entityClaimId],
            approvalCriteria: {
              ...state.entityClaims[action.payload.entityClaimId].approvalCriteria,
              [action.payload.id]: {
                ...action.payload,
                context: undefined,
                contextLink: undefined,
                approvalAttributes: undefined,
              },
            },
          },
        } as any,
      }
    case EditEntityClaimsActions.RemoveEntityClaimApprovalCriterion:
      return {
        ...state,
        entityClaims: {
          ...state.entityClaims,
          [action.payload.entityClaimId]: {
            ...state.entityClaims[action.payload.entityClaimId],
            approvalCriteria: omitKey(
              state.entityClaims[action.payload.entityClaimId].approvalCriteria,
              action.payload.id,
            ),
          },
        },
      }
    case EditEntityClaimsActions.UpdateEntityClaimApprovalCriterion:
      return {
        ...state,
        entityClaims: {
          ...state.entityClaims,
          [action.payload.entityClaimId]: {
            ...state.entityClaims[action.payload.entityClaimId],
            approvalCriteria: {
              ...state.entityClaims[action.payload.entityClaimId].approvalCriteria,
              [action.payload.id]: action.payload,
            },
          },
        },
      }
    case EditEntityClaimsActions.AddEntityClaimEnrichment:
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
              },
            },
          },
        } as any,
      }
    case EditEntityClaimsActions.RemoveEntityClaimEnrichment:
      return {
        ...state,
        entityClaims: {
          ...state.entityClaims,
          [action.payload.entityClaimId]: {
            ...state.entityClaims[action.payload.entityClaimId],
            enrichments: omitKey(state.entityClaims[action.payload.entityClaimId].enrichments, action.payload.id),
          },
        },
      }
    case EditEntityClaimsActions.UpdateEntityClaimEnrichment:
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
    case EditEntityClaimsActions.Validated:
      return {
        ...state,
        validation: {
          ...state.validation,
          ...{
            [action.payload.identifier]: {
              identifier: action.payload.identifier,
              validated: true,
              errors: [],
            },
          },
        },
      }
    case EditEntityClaimsActions.ValidationError:
      return {
        ...state,
        validation: {
          ...state.validation,
          ...{
            [action.payload.identifier]: {
              identifier: action.payload.identifier,
              validated: false,
              errors: action.payload.errors,
            },
          },
        },
      }
    case EditEntityActions.NewEntity:
    case EditEntityActions.EditEntitySuccess:
      return initialState
    case EditEntityClaimsActions.ImportEntityClaims:
      return {
        ...state,
        ...action.payload,
      }
  }

  return state
}
