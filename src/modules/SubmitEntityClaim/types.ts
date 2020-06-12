export interface SubmitEntityClaimState {
  claimTemplate: any
  answers: any[]
  currentQuestionNo: number
  isDataComplete: boolean
  sending: boolean
  sent: boolean
  error?: string
}

export enum SubmitEntityClaimActions {
  SaveAnswer = 'ixo/SubmitEntityClaim/SAVE_ANSWER',
  GoToNextQuestion = 'ixo/SubmitEntityClaim/GOTO_NEXT_QUESTION',
  GoToPreviousQuestion = 'ixo/SubmitEntityClaim/GOTO_PREVIOUS_QUESTION',
  ConfirmClaim = 'ixo/FuelEntity/CONFIRM_CLAIM',
  ConfirmClaimPending = 'ixo/FuelEntity/CONFIRM_CLAIM_PENDING',
  ConfirmClaimSuccess = 'ixo/FuelEntity/CONFIRM_CLAIM_FULFILLED',
  ConfirmClaimFailure = 'ixo/FuelEntity/CONFIRM_CLAIM_REJECTED',
}

export interface SaveAnswerAction {
  type: typeof SubmitEntityClaimActions.SaveAnswer
  payload: {
    questionNo: number
    answer: any
  }
}

export interface GoToNextQuestionAction {
  type: typeof SubmitEntityClaimActions.GoToNextQuestion
}

export interface GoToPreviousQuestionAction {
  type: typeof SubmitEntityClaimActions.GoToPreviousQuestion
}

export type SubmitEntityClaimTypes =
  | SaveAnswerAction
  | GoToNextQuestionAction
  | GoToPreviousQuestionAction
