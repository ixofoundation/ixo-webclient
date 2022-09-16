import React, { Dispatch } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { RootState } from 'common/redux/types'
import Summary from './Summary/Summary'
import * as submitEntityClaimSelectors from '../SubmitEntityClaim.selectors'
import * as selectedEntitySelectors from 'modules/Entities/SelectedEntity/SelectedEntity.selectors'
import {
  createEntityClaim,
  goToQuestionNumber,
} from '../SubmitEntityClaim.actions'
import { QuestionForm } from '../../types'
import { ActionWrapper } from 'common/components/ControlPanel/Actions/Actions.styles'
import StatusMessage, {
  MessageType,
} from 'common/components/StatusMessage/StatusMessage'
import { SubmitEntityClaimWrapper } from '../SubmitEntityClaim.container.styles'

interface Props {
  questions: QuestionForm[]
  entityDid: string
  match: any
  answersComplete: boolean
  creating: boolean
  created: boolean
  error: string
  handleGoToQuestionClick: (questionNo: number) => void
  handleCreateClaim: () => void
  history: any
}

interface State {
  showForm: boolean
}

class SummaryContainer extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)

    this.state = {
      showForm: false,
    }
  }

  handleGoToQuestion = (questionNo: number): void => {
    const { handleGoToQuestionClick } = this.props
    handleGoToQuestionClick(questionNo)
    this.setState({ showForm: true })
  }

  handleGotoOverview = (): void => {
    const { history, entityDid } = this.props
    history.push(`/projects/${entityDid}/overview`)
  }

  render(): JSX.Element {
    const {
      entityDid,
      questions,
      answersComplete,
      creating,
      created,
      error,
      handleCreateClaim,
    } = this.props

    if (this.state.showForm || !answersComplete) {
      return (
        <Redirect
          to={`/projects/${entityDid}/overview/action/new_claim/form`}
        />
      )
    }

    return (
      <ActionWrapper className="open summary">
        <SubmitEntityClaimWrapper>
          {creating && (
            <StatusMessage
              message="Submitting Claim"
              messageType={MessageType.Sending}
              repeatPulse={true}
            />
          )}
          {created && (
            <StatusMessage
              message="Successfully Submitted Claim"
              messageType={MessageType.Success}
              repeatPulse={false}
            >
              <button onClick={(): void => this.handleGotoOverview()}>
                Back to Overview
              </button>
            </StatusMessage>
          )}
          {error && (
            <StatusMessage
              message="Oops, an error occurred"
              messageType={MessageType.Error}
              repeatPulse={false}
            >
              <div className="error">{error}</div>
              <button onClick={handleCreateClaim}>Try Again</button>
            </StatusMessage>
          )}
          {!creating && !created && !error && (
            <Summary
              cancelLink={`/projects/${entityDid}/overview`}
              handleSubmit={handleCreateClaim}
              questions={questions.map((question) => ({
                title: question.schema.title,
              }))}
              handleNavigatetoQuestion={this.handleGoToQuestion}
            />
          )}
        </SubmitEntityClaimWrapper>
      </ActionWrapper>
    )
  }
}

const mapStateToProps = (state: RootState): Record<string, any> => ({
  questions: submitEntityClaimSelectors.selectQuestions(state),
  entityDid: selectedEntitySelectors.selectEntityDid(state),
  answersComplete: submitEntityClaimSelectors.selectAnswersComplete(state),
  creating: submitEntityClaimSelectors.selectCreating(state),
  created: submitEntityClaimSelectors.selectCreated(state),
  error: submitEntityClaimSelectors.selectError(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleGoToQuestionClick: (questionNo: number): void =>
    dispatch(goToQuestionNumber(questionNo)),
  handleCreateClaim: (): void => dispatch(createEntityClaim()),
})

export const SummaryContainerConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SummaryContainer)
