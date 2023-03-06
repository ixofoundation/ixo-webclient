import { CurrentEntityActions, CurrentEntityActionTypes, CurrentEntity } from './currentEntity.types'

const initialState: CurrentEntity = {
  entityType: '',
}

export const reducer = (state = initialState, action: CurrentEntityActionTypes): CurrentEntity => {
  switch (action.type) {
    case CurrentEntityActions.UpdateEntity:
      return action.payload
    default:
      return { ...state }
  }
}
