import {
  CreateEntityTemplateState,
  CreateEntityTemplateActions,
  CreateEntityTemplateActionTypes
} from './types'

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
        return {
          ...state,
          existingEntity: {
            did: state.existingEntity.did,
            error: 'This entity was not found'
          }
        }
      case CreateEntityTemplateActions.FetchExistingEntitySuccess:
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