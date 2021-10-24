import { FormData } from '../../../common/components/JsonForm/types'
import { 
  // EntityClaimType,
  QuestionForm
} from '../types'

export interface SubmitEntityClaimState {
  templateDid: string
  claimTitle: string
  claimShortDescription: string
  // type: EntityClaimType
  type: string
  questions: QuestionForm[]
  currentQuestionNo: number
  answers: FormData
  answersComplete: boolean
  savingAnswer: boolean
  creating: boolean
  created: boolean
  error: string
}

export enum SubmitEntityClaimActions {
  GetClaimTemplate = 'ixo/SubmitEntityClaim/GET_CLAIM_TEMPLATE',
  GetClaimTemplateSuccess = 'ixo/SubmitEntityClaim/GET_CLAIM_TEMPLATE_FULFILLED',
  GetClaimTemplatePending = 'ixo/SubmitEntityClaim/GET_CLAIM_TEMPLATE_PENDING',
  GetClaimTemplateFailure = 'ixo/SubmitEntityClaim/GET_CLAIM_TEMPLATE_REJECTED',
  ClearClaimTemplate = 'ixo/Entity/CLEAR_CLAIM_TEMPLATE',
  SaveAnswer = 'ixo/SubmitEntityClaim/SAVE_ANSWER',
  SaveAnswerPending = 'ixo/SubmitEntityClaim/SAVE_ANSWER_PENDING',
  SaveAnswerSuccess = 'ixo/SubmitEntityClaim/SAVE_ANSWER_FULFILLED',
  SaveAnswerFailure = 'ixo/SubmitEntityClaim/SAVE_ANSWER_REJECTED',
  GoToNextQuestion = 'ixo/SubmitEntityClaim/GOTO_NEXT_QUESTION',
  GoToPreviousQuestion = 'ixo/SubmitEntityClaim/GOTO_PREVIOUS_QUESTION',
  GoToQuestionNumber = 'ixo/SubmitEntityClaim/GOTO_QUESTION_NUMBER',
  FinaliseQuestions = 'ixo/SubmitEntityClaim/FINALISE_QUESTIONS',
  CreateClaim = 'ixo/SubmitEntityClaim/CREATE_CLAIM',
  CreateClaimStart = 'ixo/SubmitEntityClaim/CREATE_CLAIM_START',
  CreateClaimSuccess = 'ixo/SubmitEntityClaim/CREATE_CLAIM_SUCCESS',
  CreateClaimFailure = 'ixo/SubmitEntityClaim/CREATE_CLAIM_FAILURE',
}

export interface GetClaimTemplateAction {
  type: typeof SubmitEntityClaimActions.GetClaimTemplate
  payload: Promise<{
    templateDid: string
    claimTitle: string
    claimShortDescription: string
    // type: EntityClaimType
    type: string
    questions: QuestionForm[]
  }>
}

export interface GetClaimTemplateSuccessAction {
  type: typeof SubmitEntityClaimActions.GetClaimTemplateSuccess
  payload: {
    templateDid: string
    claimTitle: string
    claimShortDescription: string
    // type: EntityClaimType
    type: string
    questions: QuestionForm[]
  }
}

export interface ClearClaimTemplateAction {
  type: typeof SubmitEntityClaimActions.ClearClaimTemplate
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

export interface CreateClaimAction {
  type: typeof SubmitEntityClaimActions.CreateClaim
  payload: Promise<any>
}

export interface CreateClaimStartAction {
  type: typeof SubmitEntityClaimActions.CreateClaimStart
}

export interface CreateClaimSuccessAction {
  type: typeof SubmitEntityClaimActions.CreateClaimSuccess
}

export interface CreateClaimFailureAction {
  type: typeof SubmitEntityClaimActions.CreateClaimFailure
  payload: {
    error
  }
}

export type SubmitEntityClaimActionTypes =
  | GetClaimTemplateAction
  | GetClaimTemplateSuccessAction
  | ClearClaimTemplateAction
  | SaveAnswerAction
  | SaveAnswerSuccessAction
  | SaveAnswerPendingAction
  | SaveAnswerFailureAction
  | GoToNextQuestionAction
  | GoToPreviousQuestionAction
  | GoToQuestionNumberAction
  | FinaliseQuestionsAction
  | CreateClaimAction
  | CreateClaimStartAction
  | CreateClaimSuccessAction
  | CreateClaimFailureAction
