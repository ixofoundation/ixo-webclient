import React, { Dispatch, Fragment } from 'react'
import { RouteProps } from 'react-router'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  AssistantWrapper,
  AssistantHeader,
  SummaryWrapper,
  AssistantContentWrapper,
  AssistantProgress,
} from 'common/components/ControlPanel/Actions/Actions.styles'
import Assistant, {
  startAssistant,
} from 'common/components/Assistant/Assistant'
import FundingChatConfirmOrder from './components/FundingChatConfirmOrder/FundingChatConfirmOrder'
import { RootState } from 'common/redux/types'
import * as fundingChatSelectors from './FundingChat.selectors'
import { getOrder, confirmOrder, cancelOrder } from './FundingChat.actions'
import ChatbotIcon from 'assets/icons/Chatbot'
import PaymentSuccessIcon from 'assets/icons/PaymentSuccess'
import SendIcon from 'assets/icons/Send'

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
}

class FundingChat extends React.Component<Props & RouteProps> {
  constructor(props: any) {
    super(props)
  }

  componentDidMount(): void {
    startAssistant('fuel_my_entity')
  }

  onAssistantMessageReceive = (utter: any): void => {
    // TODO - actual event to trigger end
    // if (utter.text === "Sorry, I didn't get that. Could you rephrase?") {
    // TODO - actual response to pass to handleGetOrder
    this.props.handleGetOrder(null)
    // }
  }

  render(): JSX.Element {
    const {
      match: {
        params: { projectDID },
      },
      subscription,
      symbol,
      amount,
      fiatAmount,
      fiatConversionRate,
      transactionFee,
      fiatTransactionFee,
      gasFee,
      total,
      fiatTotal,
      hasOrder,
      sending,
      sent,
      error,
      handleConfirmOrder,
      handleCancelOrder,
    } = this.props

    const hasError = !!error

    return (
      <Fragment>
        {!sending && !sent && !hasOrder && (
          <AssistantWrapper>
            <AssistantHeader>
              <h3 className="assistant-heading">
                <span className="chatbot-icon">
                  <ChatbotIcon />
                </span>
                Pixo
              </h3>
            </AssistantHeader>
            <Assistant onMessageReceive={this.onAssistantMessageReceive} />
          </AssistantWrapper>
        )}
        {!sending && !sent && hasOrder && !hasError && (
          <SummaryWrapper>
            <FundingChatConfirmOrder
              subscription={subscription}
              symbol={symbol}
              amount={amount}
              fiatAmount={fiatAmount}
              fiatConversionRate={fiatConversionRate}
              transactionFee={transactionFee}
              fiatTransactionFee={fiatTransactionFee}
              gasFee={gasFee}
              total={total}
              fiatTotal={fiatTotal}
              handleConfirmOrder={(): void => handleConfirmOrder(projectDID)}
              handleCancelOrder={(): void => handleCancelOrder()}
            />
          </SummaryWrapper>
        )}
        {sending && (
          <AssistantContentWrapper>
            <AssistantProgress>
              <div className="icon-pulse-wrapper repeat">
                <SendIcon width="80" fill="#49BFE0" />
              </div>
              <h2>Sending...</h2>
            </AssistantProgress>
          </AssistantContentWrapper>
        )}
        {sent && (
          <AssistantContentWrapper>
            <AssistantProgress>
              <div className="icon-pulse-wrapper">
                <PaymentSuccessIcon width="132" fill="#6FCF97" />
              </div>
              <h2>Payment Successful</h2>
              <NavLink
                className="close-button"
                to={`/projects/${projectDID}/overview`}
              >
                Close
              </NavLink>
            </AssistantProgress>
          </AssistantContentWrapper>
        )}
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
