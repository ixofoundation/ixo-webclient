import React, { Dispatch } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { RootState } from 'common/redux/types'
import { Hero } from './components/Hero/Hero'
import Question from './components/Question/Question'
import { SubmitEntityClaimWrapper } from './SubmitEntityClaim.container.styles'
import { Steps } from '../../../common/components/Steps/Steps'
import { FormData } from '../../../common/components/JsonForm/types'
import * as submitEntityClaimSelectors from './SubmitEntityClaim.selectors'
import * as accountSelectors from '../../Account/Account.selectors'
import * as selectedEntitySelectors from 'modules/Entities/SelectedEntity/SelectedEntity.selectors'
import {
  goToNextQuestion,
  goToPreviousQuestion,
  goToQuestionNumber,
  saveAnswer,
  finaliseQuestions,
} from './SubmitEntityClaim.actions'
import { EntityType } from 'modules/Entities/types'
import { entityTypeMap } from 'modules/Entities/strategy-map'
import ControlPanel from '../../../common/components/ControlPanel/ControlPanel'
import { QuestionForm } from '../types'

interface Props {
  userDid: string
  claimTitle: string
  claimShortDescription: string
  entityTitle: string
  entityType: EntityType
  currentQuestion: QuestionForm
  currentQuestionNo: number
  questions: QuestionForm[]
  questionCount: number
  currentAnswer: FormData
  savingAnswer: boolean
  answersComplete: boolean
  match: any
  claimTemplateIsLoading: boolean
  finaliseQuestions: () => void
  handlePreviousClick: () => void
  handleNextClick: () => void
  handleGoToQuestionClick: (questionNo: number) => void
  handleFormDataChange: (formData: any) => void
  handleGetClaimTemplate: (templateDid: string) => void
}

interface State {
  showSummary: boolean
}

class SubmitEntityClaim extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)

    this.state = {
      showSummary: false,
    }
  }

  handleNext = (): void => {
    const {
      currentQuestionNo,
      questionCount,
      answersComplete,
      finaliseQuestions,
      handleNextClick,
    } = this.props

    if (!answersComplete && currentQuestionNo !== questionCount) {
      handleNextClick()
      return
    }
    if (!answersComplete && currentQuestionNo === questionCount) {
      finaliseQuestions()
    }
    this.setState({ showSummary: true })
  }

  render(): JSX.Element {
    const {
      match: {
        params: { projectDID: entityDid },
      },
      userDid,
      claimTemplateIsLoading,
      entityType,
      entityTitle,
      currentQuestion,
      currentQuestionNo,
      questionCount,
      currentAnswer,
      savingAnswer,
      answersComplete,
      claimTitle,
      claimShortDescription,
      handlePreviousClick,
      handleGoToQuestionClick,
      handleFormDataChange,
    } = this.props

    if (claimTemplateIsLoading) {
      return (
        <Redirect to={`/projects/${entityDid}/overview/action/new_claim`} />
      )
    }

    if (this.state.showSummary) {
      return (
        <Redirect
          to={`/projects/${entityDid}/overview/action/new_claim/summary`}
        />
      )
    }

    return (
      <>
        <Hero
          entityTitle={entityTitle}
          claimName={claimTitle}
          claimDescription={claimShortDescription}
        />
        <SubmitEntityClaimWrapper className="container-fluid">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <Steps
                  currentStepTitle={currentQuestion.schema.title}
                  currentStepNo={currentQuestionNo}
                  totalSteps={questionCount}
                  handleGoToStepClick={handleGoToQuestionClick}
                />
                <Question
                  answer={currentAnswer}
                  savingAnswer={savingAnswer}
                  handleFormDataChange={handleFormDataChange}
                  handlePreviousClick={handlePreviousClick}
                  handleNextClick={this.handleNext}
                  question={currentQuestion}
                  currentQuestionNo={currentQuestionNo}
                  questionCount={questionCount}
                  answersComplete={answersComplete}
                />
              </div>
              <div className="col-lg-4">
                <ControlPanel
                  schema={entityTypeMap[entityType].controlPanelSchema}
                  entityDid={entityDid}
                  userDid={userDid}
                />
              </div>
            </div>
          </div>
        </SubmitEntityClaimWrapper>
      </>
    )
  }
}

const mapStateToProps = (state: RootState): Record<string, any> => ({
  questions: submitEntityClaimSelectors.selectQuestions(state),
  currentQuestion: submitEntityClaimSelectors.selectCurrentQuestion(state),
  currentQuestionNo: submitEntityClaimSelectors.selectCurrentQuestionNo(state),
  questionCount: submitEntityClaimSelectors.selectQuestionCount(state),
  currentAnswer: submitEntityClaimSelectors.selectCurrentAnswer(state),
  savingAnswer: submitEntityClaimSelectors.selectSavingAnswer(state),
  answersComplete: submitEntityClaimSelectors.selectAnswersComplete(state),
  userDid: accountSelectors.selectUserDid(state),
  entityType: selectedEntitySelectors.selectEntityType(state),
  entityTitle: selectedEntitySelectors.selectEntityName(state),
  claimTemplateDid: selectedEntitySelectors.selectEntityClaimTemplateId(state),
  claimTemplateIsLoading: submitEntityClaimSelectors.selectIsLoading(state),
  claimTitle: submitEntityClaimSelectors.selectClaimTitle(state),
  claimShortDescription: submitEntityClaimSelectors.selectClaimShortDescription(
    state,
  ),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handlePreviousClick: (): void => dispatch(goToPreviousQuestion()),
  handleNextClick: (): void => dispatch(goToNextQuestion()),
  handleGoToQuestionClick: (QuestionNo: number): void =>
    dispatch(goToQuestionNumber(QuestionNo)),
  handleFormDataChange: (formData): void => dispatch(saveAnswer(formData)),
  finaliseQuestions: (): void => dispatch(finaliseQuestions()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SubmitEntityClaim)
