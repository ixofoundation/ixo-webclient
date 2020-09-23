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
import { Spinner } from '../../../common/components/Spinner'
import { getEntity } from 'modules/Entities/SelectedEntity/SelectedEntity.actions'
import { QuestionForm } from '../types'

interface Props {
  userDid: string
  entityIsLoading: boolean
  entityTitle: string
  entityDid: string
  entityType: EntityType
  currentQuestion: QuestionForm
  currentQuestionNo: number
  questions: QuestionForm[]
  questionCount: number
  currentAnswer: FormData
  savingAnswer: boolean
  answersComplete: boolean
  match: any
  finaliseQuestions: () => void
  handleGetEntity: (entityDid: string) => void
  handlePreviousClick: () => void
  handleNextClick: () => void
  handleGoToQuestionClick: (questionNo: number) => void
  handleFormDataChange: (formData: any) => void
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

  componentDidMount(): void {
    const {
      match: {
        params: { projectDID: entityDid },
      },
      handleGetEntity,
    } = this.props

    handleGetEntity(entityDid)
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
      userDid,
      entityIsLoading,
      entityDid,
      entityType,
      entityTitle,
      currentQuestion,
      currentQuestionNo,
      questionCount,
      currentAnswer,
      savingAnswer,
      answersComplete,
      handlePreviousClick,
      handleGoToQuestionClick,
      handleFormDataChange,
    } = this.props

    if (this.state.showSummary) {
      return (
        <Redirect
          to={`/projects/${entityDid}/overview/action/new_claim/summary`}
        />
      )
    }

    if (entityIsLoading) {
      return <Spinner info={`Loading claim form...`} />
    }

    return (
      <>
        <Hero
          entityTitle={entityTitle}
          claimName="Claim Name"
          claimDescription="This would be a short description of the claim."
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
  entityDid: selectedEntitySelectors.selectEntityDid(state),
  entityType: selectedEntitySelectors.selectEntityType(state),
  entityTitle: selectedEntitySelectors.selectEntityName(state),
  entityIsLoading: selectedEntitySelectors.entityIsLoading(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handlePreviousClick: (): void => dispatch(goToPreviousQuestion()),
  handleNextClick: (): void => dispatch(goToNextQuestion()),
  handleGoToQuestionClick: (QuestionNo: number): void =>
    dispatch(goToQuestionNumber(QuestionNo)),
  handleGetEntity: (entityDid): void => dispatch(getEntity(entityDid)),
  handleFormDataChange: (formData): void => dispatch(saveAnswer(formData)),
  finaliseQuestions: (): void => dispatch(finaliseQuestions()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SubmitEntityClaim)
