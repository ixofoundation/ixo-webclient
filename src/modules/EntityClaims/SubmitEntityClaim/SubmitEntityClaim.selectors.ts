import { createSelector } from 'reselect'
import { RootState } from 'common/redux/types'
import { SubmitEntityClaimState } from './types'
import { ApiClaim } from 'common/api/blocksync-api/types/claims'
import * as accountSelectors from 'modules/Account/Account.selectors'
import * as entitySelectors from 'modules/Entities/SelectedEntity/SelectedEntity.selectors'
import { serverDateFormat } from 'common/utils/formatters'

export const selectSubmitEntityClaim = (
  state: RootState,
): SubmitEntityClaimState => state.submitEntityClaim

export const selectQuestions = createSelector(
  selectSubmitEntityClaim,
  (submitEntityClaim) => {
    return submitEntityClaim ? submitEntityClaim.questions : null
  },
)

export const selectCurrentQuestionNo = createSelector(
  selectSubmitEntityClaim,
  (submitEntityClaim) => {
    return submitEntityClaim ? submitEntityClaim.currentQuestionNo : null
  },
)

export const selectCurrentQuestion = createSelector(
  selectQuestions,
  selectCurrentQuestionNo,
  (questions, currentQuestionNo) => {
    return questions && questions.length > 0
      ? questions[currentQuestionNo - 1]
      : null
  },
)

export const selectQuestionCount = createSelector(
  selectQuestions,
  (questions) => {
    return questions ? questions.length : null
  },
)

export const selectAnswers = createSelector(
  selectSubmitEntityClaim,
  (submitEntityClaim) => {
    return submitEntityClaim ? submitEntityClaim.answers : null
  },
)

export const selectCurrentAnswer = createSelector(
  selectCurrentQuestion,
  selectAnswers,
  (question, answers) => {
    if (answers && Object.keys(answers).length > 0) {
      const id = Object.keys(question.schema.properties)[0]
      return answers[id] ? { [id]: answers[id] } : undefined
    }

    return undefined
  },
)

export const selectClaimType = createSelector(
  selectSubmitEntityClaim,
  (submitEntityClaim) => {
    return submitEntityClaim ? submitEntityClaim.type : null
  },
)

export const selectTemplateDid = createSelector(
  selectSubmitEntityClaim,
  (submitEntityClaim) => {
    return submitEntityClaim ? submitEntityClaim.templateDid : null
  },
)

export const selectClaimTitle = createSelector(
  selectSubmitEntityClaim,
  (submitEntityClaim) => {
    return submitEntityClaim ? submitEntityClaim.claimTitle : null
  },
)

export const selectClaimShortDescription = createSelector(
  selectSubmitEntityClaim,
  (submitEntityClaim) => {
    return submitEntityClaim ? submitEntityClaim.claimShortDescription : null
  },
)

export const selectSavingAnswer = createSelector(
  selectSubmitEntityClaim,
  (submitEntityClaim) => {
    return submitEntityClaim ? submitEntityClaim.savingAnswer : null
  },
)

export const selectAnswersComplete = createSelector(
  selectSubmitEntityClaim,
  (submitEntityClaim) => {
    return submitEntityClaim ? submitEntityClaim.answersComplete : null
  },
)

export const selectCreating = createSelector(
  selectSubmitEntityClaim,
  (submitEntityClaim) => {
    return submitEntityClaim ? submitEntityClaim.creating : null
  },
)

export const selectCreated = createSelector(
  selectSubmitEntityClaim,
  (submitEntityClaim) => {
    return submitEntityClaim ? submitEntityClaim.created : null
  },
)

export const selectError = createSelector(
  selectSubmitEntityClaim,
  (submitEntityClaim) => {
    return submitEntityClaim ? submitEntityClaim.error : null
  },
)

export const selectIsLoading = createSelector(
  selectSubmitEntityClaim,
  (submitEntityClaim) => {
    return submitEntityClaim === null
  },
)

export const selectClaimApiPayload = createSelector(
  selectTemplateDid,
  selectClaimType,
  accountSelectors.selectUserDid,
  entitySelectors.selectEntityDid,
  selectQuestions,
  selectAnswers,
  (templateDid, type, userDid, entityDid, questions, answers): ApiClaim => {
    return {
      '@context':
        'https://schema.ixo.foundation/claims/53690e7d550278dbe228ddf35e0ba72b2666cba6',
      id: templateDid,
      type,
      issuerId: userDid,
      claimSubject: {
        id: entityDid,
      },
      items: Object.keys(answers).map((id) => {
        return {
          id,
          attribute: questions.find(
            (question) => question.schema.properties[id],
          )['@type'],
          value: answers[id],
        }
      }),
      dateTime: serverDateFormat(Date.now()),
      projectDid: entityDid, // needed to make the submission work
    }
  },
)
