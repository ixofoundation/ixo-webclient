import {
  CreateEntityState,
  CreateEntityActionTypes,
  CreateEntityActions,
  Step,
} from './types'

export const initialState: CreateEntityState = {
  step: Step.PageContent,
  entityType: null,
}

export const reducer = (
  state = initialState,
  action: CreateEntityActionTypes,
): CreateEntityState => {
  switch (action.type) {
    case CreateEntityActions.GoToStep:
      return {
        ...state,
        step: action.payload.step,
      }
    case CreateEntityActions.NewEntity:
      return {
        ...state,
        entityType: action.payload.entityType,
      }
  }

  return state
}
