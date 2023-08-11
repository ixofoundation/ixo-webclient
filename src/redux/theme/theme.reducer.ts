import { CustomThemeActionType, CustomThemeActionTypeStates, CustomThemeActionTypes } from './theme.types'

// TODO replace any type with appropriate type
export const reducer = (state = {}, action: CustomThemeActionTypes): any => {
  switch (action.type) {
    case CustomThemeActionTypeStates.FULFILLED:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
