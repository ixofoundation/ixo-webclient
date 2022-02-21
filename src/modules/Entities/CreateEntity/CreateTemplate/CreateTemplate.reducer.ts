import * as Toast from 'common/utils/Toast'
import {
  CreateEntityTemplateActions,
  CreateEntityTemplateActionTypes,
  CreateEntityTemplateState,
} from './types'

export const initialState: CreateEntityTemplateState = {
  existingEntity: {
    did: '',
    sourceNet: '',
    error: undefined,
  },
  validation: {},
}
export const reducer = (
  state = initialState,
  action: CreateEntityTemplateActionTypes,
): CreateEntityTemplateState => {
  switch (action.type) {
    case CreateEntityTemplateActions.UpdateExistingEntityError:
      return {
        ...state,
        existingEntity: {
          ...state.existingEntity,
          error: undefined,
        },
      }
    case CreateEntityTemplateActions.UpdateExistingEntityDid:
      return {
        ...state,
        existingEntity: {
          did: action.payload.existingEntityDid,
          sourceNet: action.payload.sourceNet,
          error: undefined,
        },
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
  }

  return state
}
