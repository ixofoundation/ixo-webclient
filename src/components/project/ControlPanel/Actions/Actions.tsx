import React from 'react'
import ActionIcon from '../../../../assets/icons/Actions'
import { Widget, ActionType } from '../types'
import ActionButton from './ActionButton/ActionButton'
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
import FuelProjectSummary, {
  Props as FuelSummaryProps,
} from './FuelProjectSummary/FuelProjectSummary'

interface Props {
  entityDid: string
  userDid: string
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
  fuelSummary: FuelSummaryProps
}

class Actions extends React.Component<Props, State> {
  state = {
    status: ActionStatus.InProgress,
    fuelSummary: null,
  }

  handleInititateAction = (action: ActionType, intent: string): void => {
    // temp
    if (action !== ActionType.Fuel) {
      return
    }

    this.setState({ status: ActionStatus.InProgress })
    this.props.handleInititateActionClick(action, intent)
  }

  onAssistantMessageReceive = (text: string): void => {
    // temp
    if (text === "Sorry, I didn't get that. Could you rephrase?") {
      this.setState({ status: ActionStatus.Completed })

      switch (this.props.currentAction) {
        case ActionType.Fuel:
          // todo - get actual values from bot when this is ready
          this.setState({
            fuelSummary: {
              feeCurrency: 'Euros',
              ixoAmount: 1200,
              ixoCurrencyConversion: 10,
              ixoTransactionFee: 10,
              offerDescription: '12-months standard hosting',
            },
          })
          break
        default:
          break
      }
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
            <Assistant onMessageReceive={this.onAssistantMessageReceive} />
          </AssistantWrapper>
          <SummaryWrapper
            className={status === ActionStatus.Completed ? 'open' : ''}
          >
            {this.props.currentAction === ActionType.Fuel && (
              <FuelProjectSummary {...this.state.fuelSummary} />
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
                <ActionButton
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
