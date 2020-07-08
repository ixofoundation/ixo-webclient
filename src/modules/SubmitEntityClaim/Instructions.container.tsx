import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import { RootState } from 'src/common/redux/types'
import Instructions from './components/Instructions/Instructions'
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
} from './SubmitEntityClaim.actions'
import { EntityType } from '../Entities/types'
import { strategyMap } from '../Entities/strategy-map'
import ControlPanel from '../../common/components/ControlPanel/ControlPanel'
import { Spinner } from '../../common/components/Spinner'
import { getEntity } from '../SelectedEntity/SelectedEntity.actions'
import { ActionWrapper } from '../../common/components/ControlPanel/Actions/Actions.styles'

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
  match: any
  handleGetEntity: (entityDid: string) => void
  handlePreviousClick: () => void
  handleNextClick: () => void
  handleGoToQuestionClick: (questionNo: number) => void
  handleFormDataChange: (formData: any) => void
}

interface State {
  showInstructions: boolean
}

class InstructionsContainer extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      showInstructions: true, // temp
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

  handleToggleInstructions = (): void => {
    this.setState({
      showInstructions: !this.state.showInstructions,
    })
  }

  render(): JSX.Element {
    const {
      userDid,
      entityIsLoading,
      entityDid,
      entityType,
      entityTitle,
      questions,
      currentQuestion,
      currentQuestionNo,
      questionCount,
      currentAnswer,
      savingAnswer,
      handlePreviousClick,
      handleNextClick,
      handleGoToQuestionClick,
      handleFormDataChange,
    } = this.props

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
                {!this.state.showInstructions && (
                  <Progress
                    question={currentQuestion}
                    currentQuestionNo={currentQuestionNo}
                    questionCount={questionCount}
                    handleGoToQuestionClick={handleGoToQuestionClick}
                  />
                )}
                <ActionWrapper
                  style={{
                    width: '100%',
                    zIndex: 1,
                    left: '700px',
                    backgroundColor: '#fff',
                  }}
                  className="open"
                >
                  <Container>
                    {this.state.showInstructions ? (
                      <Instructions
                        backLink={`/projects/${entityDid}/overview`}
                        toggleInstructions={this.handleToggleInstructions}
                        listItems={questions.map(question => ({
                          title: question.title,
                          control: question.control,
                        }))}
                      />
                    ) : (
                      <Question
                        answer={currentAnswer}
                        savingAnswer={savingAnswer}
                        handleFormDataChange={handleFormDataChange}
                        handlePreviousClick={handlePreviousClick}
                        handleNextClick={handleNextClick}
                        question={currentQuestion}
                        currentQuestionNo={currentQuestionNo}
                        questionCount={questionCount}
                      />
                    )}
                  </Container>
                </ActionWrapper>
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
})

export const InstructionsContainerConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InstructionsContainer)
