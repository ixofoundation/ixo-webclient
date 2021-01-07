import React, { Dispatch, Fragment } from 'react'
import { RouteProps } from 'react-router'
import { connect } from 'react-redux'
import {
  AssistantWrapper,
  AssistantHeader,
  AssistantContentWrapper,
  AssistantProgress,
} from 'common/components/ControlPanel/Actions/Actions.styles'
import Assistant, {
  startAssistant,
} from 'common/components/Assistant/Assistant'
import { RootState } from 'common/redux/types'
import * as fundingChatSelectors from './FundingChat.selectors'
import { getOrder, confirmOrder, cancelOrder } from './FundingChat.actions'
import FundingchatCustom from './components/FundingChatCustom/FundingChatCustom'
import { AssistantActions, AssistantActionTypes } from './types'
import { createEntityAgent } from 'modules/Entities/SelectedEntity/EntityImpact/EntityAgents/EntityAgents.actions'
import { AgentRole } from 'modules/Account/types'

interface Props {
  match?: any
  subscription?: string
  symbol?: string
  amount?: string
  fiatAmount?: string
  fiatConversionRate?: string
  transactionFee?: string
  fiatTransactionFee?: string
  gasFee?: string
  total?: string
  fiatTotal?: string
  hasOrder?: boolean
  sending?: boolean
  sent?: boolean
  error?: string
  assistantIntent?: string
  role?: AgentRole
  handleGetOrder?: (assistantResponse: any) => void
  handleConfirmOrder?: (entityDid: string) => void
  handleCancelOrder?: () => void
  assistantPanelToggle: () => void
  handleCreateEntityAgent?: (email: string, name: string, role: AgentRole) => void
}

class FundingChat extends React.Component<Props & RouteProps> {
  constructor(props: any) {
    super(props)
  }

  componentDidMount(): void {
    const { assistantIntent } = this.props;

    startAssistant(assistantIntent)
  }

  onAssistantMessageReceive = (utter): void => {
    const { handleCreateEntityAgent, role } = this.props;


    switch (utter.action) {
      case AssistantActions.Authorise:
        switch (utter.type) {
          case AssistantActionTypes.AgentApplication:
            if (utter.emai) {
              handleCreateEntityAgent(utter.emai, utter.name, role)
            }
            break
        }
        break;
    }
    /*  */
    // TODO - actual event to trigger end
    // if (utter.text === "Sorry, I didn't get that. Could you rephrase?") {
    // TODO - actual response to pass to handleGetOrder
    console.log(utter)
    // this.props.handleGetOrder(null)
    // }
  }

  render(): JSX.Element {
    const {
      error,
      assistantIntent,
      handleCancelOrder,
    } = this.props

    const hasError = !!error

    return (
      <Fragment>
          <AssistantWrapper>
            <AssistantHeader>
              <h3></h3>
            </AssistantHeader>
            <div className="assistant-container">
              <Assistant
                onMessageReceive={this.onAssistantMessageReceive}
                customComponent={ FundingchatCustom }
                initPayload={ assistantIntent }
              />
            </div>
          </AssistantWrapper>
        {hasError && (
          <AssistantContentWrapper>
            <AssistantProgress>
              <h2>Oops an error occured</h2>
              <div className="error">{error}</div>
              <button onClick={(): void => handleCancelOrder()}>Go back</button>
            </AssistantProgress>
          </AssistantContentWrapper>
        )}
      </Fragment>
    )
  }
}

const mapStateToProps = (state: RootState): any => ({
  subscription: fundingChatSelectors.selectOrderSubscription(state),
  symbol: fundingChatSelectors.selectOrderSymbol(state),
  amount: fundingChatSelectors.selectOrderTokenAmount(state),
  fiatAmount: fundingChatSelectors.selectOrderFiatAmount(state),
  fiatConversionRate: fundingChatSelectors.selectOrderFiatConversionRate(state),
  transactionFee: fundingChatSelectors.selectOrderTokenTransactionFee(state),
  fiatTransactionFee: fundingChatSelectors.selectOrderFiatTransactionFee(state),
  gasFee: fundingChatSelectors.selectOrderGasFee(state),
  total: fundingChatSelectors.selectOrderTokenTotal(state),
  fiatTotal: fundingChatSelectors.selectOrderFiatTotal(state),
  hasOrder: fundingChatSelectors.selectHasOrder(state),
  sending: fundingChatSelectors.selectSending(state),
  error: fundingChatSelectors.selectError(state),
  sent: fundingChatSelectors.selectSent(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleGetOrder: (assistantResponse: any): void =>
    dispatch(getOrder(assistantResponse)),
  handleConfirmOrder: (entityDid: string): void =>
    dispatch(confirmOrder(entityDid)), // TODO remove entityDid once projects refactored
  handleCancelOrder: (): void => dispatch(cancelOrder()),
  handleCreateEntityAgent: (email: string, name:string, role: AgentRole): void =>
    dispatch(createEntityAgent(email, name, role)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FundingChat)
