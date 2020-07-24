export interface CreateClaimTemplateState {
  activeStep: number
  questions: Record<string, any>[]
}

export enum CreateClaimTemplateActions {
  updateActiveStep = 'ixo/CreateClaimTemplate/UPDATE_STEP',
  addQuestion = 'ixo/CreateClaimTemplate/ADD_QUESTION',
}

export interface UpdateActiveStepAction {
  type: typeof CreateClaimTemplateActions.updateActiveStep
  payload: number
}

export interface AddQuestionAction {
  type: typeof CreateClaimTemplateActions.addQuestion
  payload: Record<string, any>
}

export type CreateClaimTemplateActionTypes =
  | UpdateActiveStepAction
  | AddQuestionAction
