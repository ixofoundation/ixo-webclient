import {
  CreateClaimTemplateState,
  CreateClaimTemplateActions,
  CreateClaimTemplateActionTypes,
} from './types'

export const initialState: CreateClaimTemplateState = {
  activeStep: 1,
  questions: [],
}

export const reducer = (
  state = initialState,
  action: CreateClaimTemplateActionTypes,
): CreateClaimTemplateState => {
  switch (action.type) {
    case CreateClaimTemplateActions.updateActiveStep:
      return {
        ...state,
        activeStep: action.payload,
      }
    case CreateClaimTemplateActions.addQuestion:
      return {
        ...state,
        questions: [...state.questions, action.payload],
      }
  }

  return state
}
