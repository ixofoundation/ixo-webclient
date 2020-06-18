import { createSelector } from 'reselect'
import { RootState } from 'src/common/redux/types'
import { SubmitEntityClaimState, Question } from './types'

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
  (questions: Question[], currentQuestionNo: number) => {
    return questions[currentQuestionNo - 1]
  },
)

export const selectQuestionCount = createSelector(
  selectQuestions,
  (questions: Question[]) => {
    return questions.length
  },
)
