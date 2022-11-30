import * as Toast from 'common/utils/Toast'
import {
  CreateEntityTemplateActions,
  CreateEntityTemplateActionTypes,
  CreateEntityTemplateState,
} from './createTemplate.types'
import { omitKey } from 'utils/objects'
import { CreateEntityActions, CreateEntityActionTypes } from '../createEntityOld/createEntity.types'

export const initialState: CreateEntityTemplateState = {
  existingEntity: {
    did: '',
    sourceNet: '',
    error: undefined,
  } as any,
  validation: {},
  associatedTemplates: {},
  alphaBondInfo: {
    token: '',
    name: '',
    controllerDid: '',
    reserveToken: '',
    txFeePercentage: 0,
    exitFeePercentage: 0,
    feeAddress: '',
    reserveWithdrawalAddress: '',
    maxSupply: 0,
    initialPrice: 0,
    initialFundingPool: 0,
    initialSupply: 0,
    baseCurveShape: 0,
    orderQuantityLimits: 0,
    outcomePayment: 0,
    allowSells: false,
    allowReserveWithdrawals: false,
    bondDid: '',
  },
}
export const reducer = (
  state = initialState,
  action: CreateEntityTemplateActionTypes | CreateEntityActionTypes,
): CreateEntityTemplateState => {
  switch (action.type) {
    case CreateEntityTemplateActions.UpdateExistingEntityError:
      return {
        ...state,
        existingEntity: {
          ...state.existingEntity,
          error: undefined,
        } as any,
      }
    case CreateEntityTemplateActions.UpdateExistingEntityDid:
      return {
        ...state,
        existingEntity: {
          did: action.payload.existingEntityDid,
          sourceNet: action.payload.sourceNet,
          error: undefined,
        } as any,
      }
    case CreateEntityTemplateActions.FetchExistingEntityFailure:
      Toast.errorToast('Failed to Import!')
      return {
        ...state,
        existingEntity: {
          did: state.existingEntity.did,
          sourceNet: state.existingEntity.sourceNet,
          error: 'A Project with this ID could not be retrieved',
        },
      }
    case CreateEntityTemplateActions.FetchExistingEntitySuccess:
      Toast.successToast('Successfully Imported!')
      return {
        ...state,
        existingEntity: {
          did: state.existingEntity.did,
          sourceNet: state.existingEntity.sourceNet,
          error: '',
        },
      }
    case CreateEntityTemplateActions.Validated:
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
    case CreateEntityTemplateActions.ValidationError:
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
    case CreateEntityTemplateActions.AddAssociatedTemplate:
      return {
        ...state,
        associatedTemplates: {
          ...state.associatedTemplates,
          ...{
            [action.payload.id]: {
              id: action.payload.id,
              templateId: undefined,
              name: undefined,
              collection: undefined,
              denom: undefined,
              quantity: undefined,
            },
          },
        } as any,
        validation: {
          ...state.validation,
          ...{
            [action.payload.id]: {
              identifier: action.payload.id,
              validated: false,
              errors: [],
            },
          },
        },
      }
    case CreateEntityTemplateActions.UpdateAssociatedTemplate:
      return {
        ...state,
        associatedTemplates: {
          ...state.associatedTemplates,
          ...{
            [action.payload.id]: {
              id: action.payload.id,
              templateId: action.payload.templateId,
              name: action.payload.name,
              collection: action.payload.collection,
              denom: action.payload.denom,
              quantity: action.payload.quantity,
            },
          },
        },
      }
    case CreateEntityTemplateActions.ClearAssociatedTemplates:
      return {
        ...state,
        associatedTemplates: {},
      }
    case CreateEntityTemplateActions.RemoveAssociatedTemplate:
      return {
        ...state,
        associatedTemplates: omitKey(state.associatedTemplates, action.payload.id),
      }
    case CreateEntityTemplateActions.UpdateAlphaBondInfo:
      return {
        ...state,
        alphaBondInfo: action.payload,
      }
    case CreateEntityActions.NewEntity:
    case CreateEntityActions.CreateEntitySuccess:
    case CreateEntityActions.ClearEntity:
      return {
        ...state,
        associatedTemplates: initialState.associatedTemplates,
      }
  }

  return state
}
