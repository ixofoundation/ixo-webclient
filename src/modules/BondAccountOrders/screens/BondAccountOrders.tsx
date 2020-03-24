import React, { Dispatch } from 'react'
import 'react-virtualized/styles.css'
import { connect } from 'react-redux'
import { RootState } from '../../../common/redux/types'
import { getOrders } from '../../account/account.actions'
import TransactionsTable from '../../../common/components/Bonds/TransactionsTable/TransactionsTable'
import BondsWrapper from '../../../common/components/Bonds/BondsWrapper/BondsWrapper'

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
  orders: state.account.orders,
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleGetOrders: (): void => dispatch(getOrders()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BondAccountOrdersScreen)
