import React, { Dispatch } from 'react'
import { RouteProps } from 'react-router'
import { connect } from 'react-redux'
import {
  ActionWrapper,
  AssistantWrapper,
  SummaryWrapper,
} from '../../components/project/ControlPanel/Actions/Actions.styles'
import Assistant, {
  startAssistant,
} from '../../common/components/Assistant/Assistant'
import FuelEntityConfirmOrder from './components/FuelEntityConfirmOrder/FuelEntityConfirmOrder'
import { RootState } from 'src/common/redux/types'
import * as fuelEntitySelectors from './FuelEntity.selectors'
import { getOrder, confirmOrder } from './FuelEntity.actions'

interface Props {
  match: any
  subscription: string
  symbol: string
  amount: string
  fiatAmount: string
  fiatConversionRate: string
  transactionFee: string
  fiatTransactionFee: string
  gasFee: string
  fiat: string
  total: string
  fiatTotal: string
  sending: boolean
  error: string
  handleGetOrder: (assistantResponse: any) => void
  handleConfirmOrder: (entityDid: string) => void
}

interface State {
  isInfoComplete: boolean
}

class FuelEntity extends React.Component<Props & RouteProps, State> {
  constructor(props) {
    super(props)

    this.state = {
      isInfoComplete: false,
    }
  }

  componentDidMount(): void {
    startAssistant('fuel_my_entity')
  }

  onAssistantMessageReceive = (text: string): void => {
    // TODO - actual event to trigger end
    if (text === "Sorry, I didn't get that. Could you rephrase?") {
      this.setState({ isInfoComplete: true })
      // TODO - actual response to pass to handleGetOrder
      this.props.handleGetOrder(null)
    }
  }

  render(): JSX.Element {
    const { isInfoComplete } = this.state
    const {
      subscription,
      symbol,
      amount,
      fiatAmount,
      fiatConversionRate,
      transactionFee,
      fiatTransactionFee,
      gasFee,
      fiat,
      total,
      fiatTotal,
      handleConfirmOrder,
    } = this.props

    return (
      <ActionWrapper className="open">
        <AssistantWrapper className={!isInfoComplete ? 'open' : ''}>
          <Assistant onMessageReceive={this.onAssistantMessageReceive} />
        </AssistantWrapper>
        <SummaryWrapper className={isInfoComplete ? 'open' : ''}>
          <FuelEntityConfirmOrder
            subscription={subscription}
            symbol={symbol}
            amount={amount}
            fiatAmount={fiatAmount}
            fiatConversionRate={fiatConversionRate}
            transactionFee={transactionFee}
            fiatTransactionFee={fiatTransactionFee}
            gasFee={gasFee}
            fiat={fiat}
            total={total}
            fiatTotal={fiatTotal}
            handleConfirmOrder={(): void =>
              handleConfirmOrder(this.props.match.params.projectDID)
            }
          />
        </SummaryWrapper>
      </ActionWrapper>
    )
  }
}

const mapStateToProps = (state: RootState): any => ({
  subscription: fuelEntitySelectors.selectOrderSubscription(state),
  symbol: fuelEntitySelectors.selectOrderSymbol(state),
  amount: fuelEntitySelectors.selectOrderTokenAmount(state),
  fiatAmount: fuelEntitySelectors.selectOrderFiatAmount(state),
  fiatConversionRate: fuelEntitySelectors.selectOrderFiatConversionRate(state),
  transactionFee: fuelEntitySelectors.selectOrderTokenTransactionFee(state),
  fiatTransactionFee: fuelEntitySelectors.selectOrderFiatTransactionFee(state),
  gasFee: fuelEntitySelectors.selectOrderGasFee(state),
  fiat: fuelEntitySelectors.selectOrderFiat(state),
  total: fuelEntitySelectors.selectOrderTokenTotal(state),
  fiatTotal: fuelEntitySelectors.selectOrderFiatTotal(state),
  sending: fuelEntitySelectors.selectSending(state),
  error: fuelEntitySelectors.selectError(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleGetOrder: (assistantResponse: any): void =>
    dispatch(getOrder(assistantResponse)),
  handleConfirmOrder: (entityDid: string): void =>
    dispatch(confirmOrder(entityDid)), // TODO remove entityDid once projects refactored
})

export default connect(mapStateToProps, mapDispatchToProps)(FuelEntity)
