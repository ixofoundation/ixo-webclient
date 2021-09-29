import {
  CreateEntityTemplateState,
  CreateEntityTemplateActions,
  CreateEntityTemplateActionTypes
} from './types'
import * as Toast from 'common/utils/Toast'

export const initialState: CreateEntityTemplateState = {
  existingEntity: {
    did: '',
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
            error: ''
          }
        }
      case CreateEntityTemplateActions.FetchExistingEntityFailure:
        Toast.successToast('Failed to Import!')
        return {
          ...state,
          existingEntity: {
            did: state.existingEntity.did,
            error: 'This entity was not found'
          }
        }
      case CreateEntityTemplateActions.FetchExistingEntitySuccess:
          Toast.successToast('Successfully Imported!')
          return {
            ...state,
            existingEntity: {
              did: state.existingEntity.did,
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