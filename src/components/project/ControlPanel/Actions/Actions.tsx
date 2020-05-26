import React from 'react'
import ActionIcon from '../../../../assets/icons/Actions'
import { Widget } from '../types'
import Action from './Action/Action'
import { ControlPanelSection } from '../ControlPanel.styles'
import {
  ActionButtonsWrapper,
  AssistantWrapper,
  SummaryWrapper,
} from './Actions.styles'
import Assistant, {
  triggerIntent,
} from '../../../../common/components/Assistant/Assistant'

interface Props {
  currentAction: string
  widget: Widget
  handleInititateActionClick: (action: string) => void
}

enum ActionStatus {
  InProgress = 'IN_PROGRESS',
  Completed = 'COMPLETED',
}

interface State {
  status: ActionStatus
}

class Actions extends React.Component<Props, State> {
  state = {
    status: ActionStatus.InProgress,
  }

  handleInititateAction = (intent: string): void => {
    // temp
    if (intent !== 'fuel_my_entity') {
      return
    }

    this.setState({ status: ActionStatus.InProgress })
    this.props.handleInititateActionClick(intent)
  }

  onBotUttered = (text: string): void => {
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
        <SummaryWrapper
          className={
            currentAction && status === ActionStatus.Completed ? 'open' : ''
          }
        >
          this is the summary!
        </SummaryWrapper>
        <AssistantWrapper
          className={
            currentAction && status === ActionStatus.InProgress ? 'open' : ''
          }
        >
          <Assistant onBotUttered={this.onBotUttered} />
        </AssistantWrapper>
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

/* const Actions: React.FunctionComponent<Props> = ({
  currentAction,
  widget: { title, controls },
  handleInititateActionClick,
}) => {
  const handleInititateAction = (intent: string): void => {
    // temp
    if (intent !== 'fuel_my_entity') {
      return
    }

    handleInititateActionClick(intent)
  }

  const onBotUttered = (text: string): void => {
    console.log(text)
  }

  return (
    <>
      <SummaryWrapper>this is the summary!</SummaryWrapper>
      <AssistantWrapper className={currentAction ? 'open' : ''}>
        <Assistant onBotUttered={onBotUttered} />
      </AssistantWrapper>
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
                onClick={handleInititateAction}
              />
            )
          })}
        </ActionButtonsWrapper>
      </ControlPanelSection>
    </>
  )
} */

export const triggerAction = (action: string): void => triggerIntent(action)

export default Actions
