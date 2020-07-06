import { createSelector } from 'reselect'
import { RootState } from 'src/common/redux/types'
import { SubmitEntityClaimState } from './types'
import { FormControl, FormData } from '../../common/components/JsonForm/types'

export const selectSubmitEntityClaim = (
  state: RootState,
): SubmitEntityClaimState => state.submitEntityClaim

export const selectQuestions = createSelector(
  selectSubmitEntityClaim,
  (submitEntityClaim: SubmitEntityClaimState) => {
    return submitEntityClaim.questions
  },
)

export const selectCurrentQuestionNo = createSelector(
  selectSubmitEntityClaim,
  (submitEntityClaim: SubmitEntityClaimState) => {
    return submitEntityClaim.currentQuestionNo
  },
)

export const selectCurrentQuestion = createSelector(
  selectQuestions,
  selectCurrentQuestionNo,
  (questions: FormControl[], currentQuestionNo: number) => {
    return questions[currentQuestionNo - 1]
  },
)

export const selectQuestionCount = createSelector(
  selectQuestions,
  (questions: FormControl[]) => {
    return questions.length
  },
)

export const selectAnswers = createSelector(
  selectSubmitEntityClaim,
  (submitEntityClaim: SubmitEntityClaimState) => {
    return submitEntityClaim.answers
  },
)

export const selectCurrentAnswer = createSelector(
  selectCurrentQuestion,
  selectAnswers,
  (question: FormControl, answers: FormData) => {
    return answers[question.id] ? { [question.id]: answers[question.id] } : {}
  },
)
