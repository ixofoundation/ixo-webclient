import { CurrentDaoActions, CurrentDaoActionTypes, CurrentDao } from './currentDao.types'

const initialState: CurrentDao = {}

export const reducer = (state = initialState, action: CurrentDaoActionTypes): CurrentDao => {
  switch (action.type) {
    case CurrentDaoActions.UpdateGroup:
      return { ...state, [action.payload.coreAddress]: action.payload }
    default:
      return { ...state }
  }
}
