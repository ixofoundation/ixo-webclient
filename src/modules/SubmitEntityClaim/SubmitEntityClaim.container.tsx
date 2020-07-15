import React, { Dispatch } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { RootState } from 'src/common/redux/types'
import { Hero } from './components/Hero/Hero'
import Question from './components/Question/Question'
import {
  Container,
  SubmitEntityClaimWrapper,
} from './SubmitEntityClaim.container.styles'
import { Progress } from './components/Progress/Progress'
import { FormControl, FormData } from '../../common/components/JsonForm/types'
import * as submitEntityClaimSelectors from './SubmitEntityClaim.selectors'
import * as accountSelectors from '../Account/Account.selectors'
import * as selectedEntitySelectors from '../SelectedEntity/SelectedEntity.selectors'
import {
  goToNextQuestion,
  goToPreviousQuestion,
  goToQuestionNumber,
  saveAnswer,
  finaliseQuestions,
} from './SubmitEntityClaim.actions'
import { EntityType } from '../Entities/types'
import { strategyMap } from '../Entities/strategy-map'
import ControlPanel from '../../common/components/ControlPanel/ControlPanel'
import { Spinner } from '../../common/components/Spinner'
import { getEntity } from '../SelectedEntity/SelectedEntity.actions'

interface Props {
  userDid: string
  entityIsLoading: boolean
  entityTitle: string
  entityDid: string
  entityType: EntityType
  currentQuestion: FormControl
  currentQuestionNo: number
  questions: FormControl[]
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
  constructor(props) {
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
                <Progress
                  question={currentQuestion}
                  currentQuestionNo={currentQuestionNo}
                  questionCount={questionCount}
                  handleGoToQuestionClick={handleGoToQuestionClick}
                />
                <Container>
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
                </Container>
              </div>
              <div className="col-lg-4">
                <ControlPanel
                  schema={strategyMap[entityType].controlPanelSchema}
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
  entityTitle: selectedEntitySelectors.selectEntityTitle(state),
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

export const SubmitEntityClaimConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubmitEntityClaim)
