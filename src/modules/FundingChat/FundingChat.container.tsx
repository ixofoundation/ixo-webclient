import React, { Dispatch, Fragment } from 'react'
// import { RouteProps } from 'react-router'
import { connect } from 'react-redux'
import {
  AssistantWrapper,
  AssistantHeader,
} from 'common/components/ControlPanel/Actions/Actions.styles'
import Assistant from 'common/components/Assistant/Assistant_new'
import { RootState } from 'common/redux/types'
import * as fundingChatSelectors from './FundingChat.selectors'
import { getOrder, confirmOrder, cancelOrder } from './FundingChat.actions'
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
  intent?: string
  role?: AgentRole
  params?: any
  handleGetOrder?: (assistantResponse: any) => void
  handleConfirmOrder?: (entityDid: string) => void
  handleCancelOrder?: () => void
  assistantPanelToggle: () => void
  handleCreateEntityAgent?: (
    email: string,
    name: string,
    role: AgentRole,
  ) => void
}

function FundingChat({ intent, params }: Props): any {
  return (
    // <Fragment>
    //   <AssistantWrapper>
    //     <AssistantHeader></AssistantHeader>
    //     <div className="assistant-container">
    //       <Assistant initMsg={intent} params={params} />
    //     </div>
    //   </AssistantWrapper>
    // </Fragment>
    <Assistant initMsg={intent} params={params} />
  )
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
  intent: state.account.intent,
  params: state.account.params,
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleGetOrder: (assistantResponse: any): void =>
    dispatch(getOrder(assistantResponse)),
  handleConfirmOrder: (entityDid: string): void =>
    dispatch(confirmOrder(entityDid)), // TODO remove entityDid once projects refactored
  handleCancelOrder: (): void => dispatch(cancelOrder()),
  handleCreateEntityAgent: (
    email: string,
    name: string,
    role: AgentRole,
  ): void => dispatch(createEntityAgent(email, name, role)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FundingChat)
