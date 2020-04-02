import React, { Dispatch } from 'react'
import 'react-virtualized/styles.css'
import { connect } from 'react-redux'
import { RootState } from '../../../common/redux/types'
import { getBondAccountOrders } from '../BondAccountOrders.actions'
import { selectBondAccountOrders } from '../BondAccountOrders.selectors'
import TransactionsTable from '../../../common/components/Bonds/TransactionsTable/TransactionsTable'
import { BondsWrapperConnected as BondsWrapper } from '../../../common/components/Bonds/BondsWrapper/BondsWrapper'

interface Props {
  handleGetOrders: () => void
  orders: any[]
  match: any
}

class BondAccountOrdersScreen extends React.Component<Props> {
  componentDidMount(): void {
    this.props.handleGetOrders()
  }

  render(): JSX.Element {
    return (
      <BondsWrapper {...this.props.match}>
        <TransactionsTable txs={this.props.orders} />
      </BondsWrapper>
    )
  }
}

const mapStateToProps = (state: RootState): any => ({
  orders: selectBondAccountOrders(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleGetOrders: (): void => dispatch(getBondAccountOrders()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BondAccountOrdersScreen)
