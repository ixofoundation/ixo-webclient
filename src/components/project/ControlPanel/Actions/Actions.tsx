import React from 'react'
import ActionIcon from '../../../../assets/icons/Actions'
import { Widget, ActionType } from '../types'
import Action from './Action/Action'
import { ControlPanelSection } from '../ControlPanel.styles'
import {
  ActionButtonsWrapper,
  ActionWrapper,
  AssistantWrapper,
  SummaryWrapper,
} from './Actions.styles'
import Assistant, {
  triggerIntent,
} from '../../../../common/components/Assistant/Assistant'
import FuelProjectSummary from './Summary/FuelProjectSummary'

interface Props {
  currentAction: ActionType
  widget: Widget
  handleInititateActionClick: (action: ActionType, intent: string) => void
}

enum ActionStatus {
  InProgress = 'IN_PROGRESS',
  Completed = 'COMPLETED',
}

interface State {
  status: ActionStatus
  summaryData: any
}

class Actions extends React.Component<Props, State> {
  state = {
    status: ActionStatus.InProgress,
    summaryData: null,
  }

  handleInititateAction = (action: ActionType, intent: string): void => {
    // temp
    if (action !== ActionType.FuelProject) {
      return
    }

    this.setState({ status: ActionStatus.InProgress })
    this.props.handleInititateActionClick(action, intent)
  }

  onBotUttered = (text: string): void => {
    // temp
    if (text !== 'Hi, how can I help you?') {
      this.setState({ status: ActionStatus.Completed })
    }
  }

  render(): JSX.Element {
    const {
      currentAction,
      widget: { title, controls },
    } = this.props

    const { status } = this.state

    return (
      <>
        <ActionWrapper className={currentAction ? 'open' : ''}>
          <AssistantWrapper
            className={status === ActionStatus.InProgress ? 'open' : ''}
          >
            <Assistant onBotUttered={this.onBotUttered} />
          </AssistantWrapper>
          <SummaryWrapper
            className={status === ActionStatus.Completed ? 'open' : ''}
          >
            {this.props.currentAction === ActionType.FuelProject && (
              <FuelProjectSummary />
            )}
          </SummaryWrapper>
        </ActionWrapper>
        <ControlPanelSection key={title}>
          <h4>
            <div className="heading-icon">
              <ActionIcon />
            </div>
            {title}
          </h4>
          <ActionButtonsWrapper>
            {controls.map((control, index) => {
              return (
                <Action
                  key={index}
                  control={control}
                  onClick={this.handleInititateAction}
                />
              )
            })}
          </ActionButtonsWrapper>
        </ControlPanelSection>
      </>
    )
  }
}

export const triggerAction = (intent: string): void => triggerIntent(intent)

export default Actions
