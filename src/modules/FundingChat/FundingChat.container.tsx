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
import CloseIcon from 'assets/icons/CloseStroke'

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
  handleGetOrder?: (assistantResponse: any) => void
  handleConfirmOrder?: (entityDid: string) => void
  handleCancelOrder?: () => void
  assistantPanelToggle: () => void
}

class FundingChat extends React.Component<Props & RouteProps> {
  componentDidMount(): void {
    startAssistant('fuel_my_entity')
  }

  onAssistantMessageReceive = (utter): void => {
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
      handleCancelOrder,
      assistantPanelToggle
    } = this.props

    const hasError = !!error

    return (
      <Fragment>
          <AssistantWrapper>
            <AssistantHeader>
              <h3></h3>
              <span className="close-icon cursor-pointer" onClick={assistantPanelToggle}>
                <CloseIcon />
              </span>
            </AssistantHeader>
            <div className="assistant-container">
              <Assistant onMessageReceive={this.onAssistantMessageReceive} />
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
})

export default connect(mapStateToProps, mapDispatchToProps)(FundingChat)
