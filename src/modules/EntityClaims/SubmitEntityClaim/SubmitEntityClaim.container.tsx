import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import { RootState } from 'redux/types'
import { Hero } from './components/Hero/Hero'
import Question from './components/Question/Question'
import {
  SubmitEntityClaimWrapper,
  ControlPanelWrapper,
  MainPanelWrapper,
  FrameContainer,
} from './SubmitEntityClaim.container.styles'
import { Steps } from '../../../common/components/Steps/Steps'
import { FormData } from '../../../common/components/JsonForm/types'
import * as submitEntityClaimSelectors from '../../../redux/submitEntityClaim/submitEntityClaim.selectors'
import * as accountSelectors from '../../../redux/account/account.selectors'
import {
  goToNextQuestion,
  goToPreviousQuestion,
  goToQuestionNumber,
  saveAnswer,
  finaliseQuestions,
} from '../../../redux/submitEntityClaim/submitEntityClaim.actions'
import { EntityType, EntityTypeStrategyMap } from 'modules/Entities/types'
import ControlPanel from '../../../common/components/ControlPanel/ControlPanel'
import { QuestionForm } from '../types'
import { getClaimTemplate, createEntityClaim } from 'redux/submitEntityClaim/submitEntityClaim.actions'
import * as entitySelectors from 'redux/selectedEntity/selectedEntity.selectors'
import Summary from 'modules/EntityClaims/SubmitEntityClaim/SubmitEntityClaimFinal/Summary/Summary'
import StatusMessage, { MessageType } from 'common/components/StatusMessage/StatusMessage'
import { selectEntityConfig } from 'redux/entitiesExplorer/entitiesExplorer.selectors'

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
  entity: any
  creating: boolean
  created: boolean
  error: string
  finaliseQuestions: () => void
  handlePreviousClick: () => void
  handleNextClick: () => void
  handleGoToQuestionClick: (questionNo: number) => void
  handleFormDataChange: (formData: any) => void
  handleGetClaimTemplate: (templateDid: string) => void
  handleCreateClaim: () => void
  claimTemplateDid: string
  entityTypeMap: EntityTypeStrategyMap
  history: any
  entityDid: string
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

  UNSAFE_componentWillReceiveProps(nextProps: any): void {
    const { claimTemplateDid } = nextProps.match.params
    const { handleGetClaimTemplate } = this.props

    handleGetClaimTemplate(claimTemplateDid)
  }

  componentDidMount(): void {
    const { claimTemplateDid } = this.props.match.params
    const { handleGetClaimTemplate } = this.props

    handleGetClaimTemplate(claimTemplateDid)
  }

  handleNext = (): void => {
    const {
      currentQuestionNo,
      questionCount,
      answersComplete,
      questions,
      finaliseQuestions,
      handleNextClick,
      handleGoToQuestionClick,
    } = this.props

    if (!answersComplete && currentQuestionNo !== questionCount) {
      handleNextClick()
      return
    }
    if (!answersComplete && currentQuestionNo === questionCount) {
      finaliseQuestions()
    }

    handleGoToQuestionClick(questions.length)
    this.setState({ showSummary: true })
  }

  handleGoToQuestion = (questionNo: number): void => {
    const { handleGoToQuestionClick } = this.props
    handleGoToQuestionClick(questionNo)
    this.setState({ showSummary: false })
  }

  handleSubmit = (): void => {
    const { handleCreateClaim } = this.props

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })

    handleCreateClaim()
  }

  handleGotoOverview = (): void => {
    const { history, entityDid } = this.props
    history.push(`/projects/${entityDid}/overview`)
  }

  handleRenderFrame = (): JSX.Element => {
    const {
      currentAnswer,
      savingAnswer,
      answersComplete,
      currentQuestion,
      currentQuestionNo,
      questionCount,
      match: {
        params: { projectDID: entityDid },
      },
      questions,
      creating,
      created,
      error,
      handlePreviousClick,
      handleFormDataChange,
      handleCreateClaim,
    } = this.props
    const { showSummary } = this.state

    if (showSummary) {
      if (creating) {
        return (
          <div className='mt-5 pt-5'>
            <StatusMessage message='Submitting Claim' messageType={MessageType.Sending} repeatPulse={true} />
          </div>
        )
      }

      if (created) {
        return (
          <div className='mt-5 pt-5'>
            <StatusMessage message='Successfully Submitted Claim' messageType={MessageType.Success} repeatPulse={false}>
              <button onClick={(): void => this.handleGotoOverview()}>Back to Overview</button>
            </StatusMessage>
          </div>
        )
      }

      if (error) {
        return (
          <div className='mt-5 pt-5'>
            <StatusMessage message='Oops, an error occurred' messageType={MessageType.Error} repeatPulse={false}>
              <div className='error'>{error}</div>
              <button onClick={handleCreateClaim}>Try Again</button>
            </StatusMessage>
          </div>
        )
      }

      return (
        <Summary
          cancelLink={`/projects/${entityDid}/overview`}
          handleSubmit={this.handleSubmit}
          questions={
            questions.map((question) => ({
              title: question.schema.title,
            })) as any
          }
          handleNavigatetoQuestion={this.handleGoToQuestion}
        />
      )
    }

    return (
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
    )
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
      claimTitle,
      claimShortDescription,
      entity,
      handleGoToQuestionClick,
    } = this.props

    if (claimTemplateIsLoading) {
      return <div />
    }

    return (
      <>
        <SubmitEntityClaimWrapper className='container-fluid'>
          <div className='row'>
            <MainPanelWrapper className='col-lg-9 pr-md-5'>
              <Hero entityTitle={entityTitle} claimName={claimTitle} claimDescription={claimShortDescription} />
              <FrameContainer className='mt-3 pb-5'>
                <Steps
                  currentStepTitle={currentQuestion.schema.title!}
                  currentStepNo={currentQuestionNo}
                  totalSteps={questionCount}
                  handleGoToStepClick={handleGoToQuestionClick}
                />
                {this.handleRenderFrame()}
              </FrameContainer>
            </MainPanelWrapper>
            <ControlPanelWrapper className='col-lg-3'>
              <ControlPanel
                schema={this.props.entityTypeMap[entityType].controlPanelSchema}
                entityDid={entityDid}
                userDid={userDid}
                claims={entity.entityClaims.items}
              />
            </ControlPanelWrapper>
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
  entityType: entitySelectors.selectEntityType(state),
  entityTitle: entitySelectors.selectEntityName(state),
  entityDid: entitySelectors.selectEntityDid(state),
  claimTemplateIsLoading: submitEntityClaimSelectors.selectIsLoading(state),
  claimTitle: submitEntityClaimSelectors.selectClaimTitle(state),
  claimShortDescription: submitEntityClaimSelectors.selectClaimShortDescription(state),
  entity: entitySelectors.selectSelectedEntity(state),
  entityTypeMap: selectEntityConfig(state),
  creating: submitEntityClaimSelectors.selectCreating(state),
  created: submitEntityClaimSelectors.selectCreated(state),
  error: submitEntityClaimSelectors.selectError(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handlePreviousClick: (): void => dispatch(goToPreviousQuestion()),
  handleNextClick: (): void => dispatch(goToNextQuestion()),
  handleGoToQuestionClick: (QuestionNo: number): void => dispatch(goToQuestionNumber(QuestionNo)),
  handleFormDataChange: (formData: any): void => dispatch(saveAnswer(formData)),
  finaliseQuestions: (): void => dispatch(finaliseQuestions()),
  handleGetClaimTemplate: (templateDid: any): void => dispatch(getClaimTemplate(templateDid)),
  handleCreateClaim: (): void => dispatch(createEntityClaim()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SubmitEntityClaim)
