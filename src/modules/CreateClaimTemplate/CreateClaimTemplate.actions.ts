import {
  UpdateActiveStepAction,
  CreateClaimTemplateActions,
  AddQuestionAction,
} from './types'
import { Dispatch } from 'redux'
import { RootState } from 'src/common/redux/types'

export const updateActiveStep = (newStepNo: number) => (
  dispatch: Dispatch,
  getState: () => RootState,
): UpdateActiveStepAction => {
  const {
    createClaimTemplate: { activeStep },
  } = getState()

  if (activeStep !== newStepNo)
    return dispatch({
      type: CreateClaimTemplateActions.updateActiveStep,
      payload: newStepNo,
    })
  return null
}

export const addQuestion = (newQuestion: Record<string, any>) => (
  dispatch: Dispatch,
): AddQuestionAction => {
  return dispatch({
    type: CreateClaimTemplateActions.addQuestion,
    payload: newQuestion,
  })
}
