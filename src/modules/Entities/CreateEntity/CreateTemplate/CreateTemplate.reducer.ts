import {
  CreateEntityTemplateState,
  CreateEntityTemplateActions,
  CreateEntityTemplateActionTypes
} from './types'
import * as Toast from 'common/utils/Toast'

export const initialState: CreateEntityTemplateState = {
  existingEntity: {
    did: '',
    sourceNet: '',
    error: ''
  },
  validation: {}
}
export const reducer = (
  state = initialState,
  action: CreateEntityTemplateActionTypes): CreateEntityTemplateState => {

    switch (action.type) {
      case CreateEntityTemplateActions.UpdateExistingEntityDid:
        return {
          ...state,
          existingEntity: {
            did: action.payload.existingEntityDid,
            sourceNet: action.payload.sourceNet,
            error: ''
          }
        }
      case CreateEntityTemplateActions.FetchExistingEntityFailure:
        Toast.errorToast('Failed to Import!')
        return {
          ...state,
          existingEntity: {
            did: state.existingEntity.did,
            sourceNet: state.existingEntity.sourceNet,
            error: 'This entity was not found'
          }
        }
      case CreateEntityTemplateActions.FetchExistingEntitySuccess:
          Toast.successToast('Successfully Imported!')
          return {
            ...state,
            existingEntity: {
              did: state.existingEntity.did,
              sourceNet: state.existingEntity.sourceNet,
              error: ''
            }
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