import {
  EditEntityTemplateState,
  EditEntityTemplateActions,
  EditEntityTemplateActionTypes
} from './types'

export const initialState: EditEntityTemplateState = {
  existingEntity: {
    did: '',
    error: ''
  },
  validation: {}
}
export const reducer = (
  state = initialState,
  action: EditEntityTemplateActionTypes): EditEntityTemplateState => {

    switch (action.type) {
      case EditEntityTemplateActions.UpdateExistingEntityDid:
        return {
          ...state,
          existingEntity: {
            did: action.payload.existingEntityDid,
            error: ''
          }
        }
      case EditEntityTemplateActions.FetchExistingEntityFailure:
        return {
          ...state,
          existingEntity: {
            did: state.existingEntity.did,
            error: 'This entity was not found'
          }
        }
      case EditEntityTemplateActions.FetchExistingEntitySuccess:
          return {
            ...state,
            existingEntity: {
              did: state.existingEntity.did,
              error: ''
            }
          }
        case EditEntityTemplateActions.Validated:

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