export interface Question {
  questionId: string
  title: string
  description: string
  required: boolean
  type: string
  label: string
  control: string
  placeholder: string
}

export interface SubmitEntityClaimState {
  questions: Question[]
  currentQuestionNo: number
  answers: any[]
  answersComplete: boolean
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
    answer: any
  }
}

export interface GoToNextQuestionAction {
  type: typeof SubmitEntityClaimActions.GoToNextQuestion
  payload: {
    nextQuestionNo
  }
}

export interface GoToPreviousQuestionAction {
  type: typeof SubmitEntityClaimActions.GoToPreviousQuestion
  payload: {
    previousQuestionNo
  }
}

export type SubmitEntityClaimActionTypes =
  | SaveAnswerAction
  | GoToNextQuestionAction
  | GoToPreviousQuestionAction
