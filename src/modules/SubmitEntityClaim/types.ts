import { FormControl, FormData } from '../../common/components/JsonForm/types'

export interface SubmitEntityClaimState {
  questions: FormControl[]
  currentQuestionNo: number
  answers: FormData
  answersComplete: boolean
  savingAnswer: boolean
  sending: boolean
  sent: boolean
  error?: string
}

export enum SubmitEntityClaimActions {
  SaveAnswer = 'ixo/SubmitEntityClaim/SAVE_ANSWER',
  SaveAnswerPending = 'ixo/SubmitEntityClaim/SAVE_ANSWER_PENDING',
  SaveAnswerSuccess = 'ixo/SubmitEntityClaim/SAVE_ANSWER_FULFILLED',
  SaveAnswerFailure = 'ixo/SubmitEntityClaim/SAVE_ANSWER_REJECTED',
  GoToNextQuestion = 'ixo/SubmitEntityClaim/GOTO_NEXT_QUESTION',
  GoToPreviousQuestion = 'ixo/SubmitEntityClaim/GOTO_PREVIOUS_QUESTION',
  GoToQuestionNumber = 'ixo/SubmitEntityClaim/GOTO_QUESTION_NUMBER',
  FinaliseQuestions = 'ixo/SubmitEntityClaim/FINALISE_QUESTIONS',
  ConfirmClaim = 'ixo/FuelEntity/CONFIRM_CLAIM',
  ConfirmClaimPending = 'ixo/FuelEntity/CONFIRM_CLAIM_PENDING',
  ConfirmClaimSuccess = 'ixo/FuelEntity/CONFIRM_CLAIM_FULFILLED',
  ConfirmClaimFailure = 'ixo/FuelEntity/CONFIRM_CLAIM_REJECTED',
}

export interface SaveAnswerAction {
  type: typeof SubmitEntityClaimActions.SaveAnswer
  payload: Promise<FormData>
}

export interface SaveAnswerSuccessAction {
  type: typeof SubmitEntityClaimActions.SaveAnswerSuccess
  payload: FormData
}

export interface SaveAnswerPendingAction {
  type: typeof SubmitEntityClaimActions.SaveAnswerPending
}

export interface SaveAnswerFailureAction {
  type: typeof SubmitEntityClaimActions.SaveAnswerFailure
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
export interface FinaliseQuestionsAction {
  type: typeof SubmitEntityClaimActions.FinaliseQuestions
}

export type SubmitEntityClaimActionTypes =
  | SaveAnswerAction
  | SaveAnswerSuccessAction
  | SaveAnswerPendingAction
  | SaveAnswerFailureAction
  | GoToNextQuestionAction
  | GoToPreviousQuestionAction
  | GoToQuestionNumberAction
  | FinaliseQuestionsAction
