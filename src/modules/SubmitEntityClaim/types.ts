import { FormControl, FormData } from '../../common/components/JsonForm/types'

export interface SubmitEntityClaimState {
  questions: FormControl[]
  currentQuestionNo: number
  answers: FormData
  answersComplete: boolean
  sending: boolean
  sent: boolean
  error?: string
}

export enum SubmitEntityClaimActions {
  SaveAnswer = 'ixo/SubmitEntityClaim/SAVE_ANSWER',
  GoToNextQuestion = 'ixo/SubmitEntityClaim/GOTO_NEXT_QUESTION',
  GoToPreviousQuestion = 'ixo/SubmitEntityClaim/GOTO_PREVIOUS_QUESTION',
  GoToQuestionNumber = 'ixo/SubmitEntityClaim/GOTO_QUESTION_NUMBER',
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

export interface GoToQuestionNumberAction {
  type: typeof SubmitEntityClaimActions.GoToQuestionNumber
  payload: {
    questionNo
  }
}

export type SubmitEntityClaimActionTypes =
  | SaveAnswerAction
  | GoToNextQuestionAction
  | GoToPreviousQuestionAction
  | GoToQuestionNumberAction
