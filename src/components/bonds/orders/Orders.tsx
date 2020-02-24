import React, { Component } from 'react'
import 'react-virtualized/styles.css'
import { connect } from 'react-redux'
import { Store } from '../../../model/store'
import { getOrders } from '../../../redux/account/account_action_creators'
import TransactionsTable from '../TransactionsTable'
import BondsWrapper from '../BondsWrapper'

class Orders extends Component<any> {
  state = { list: [] }

  constructor(props: any) {
    super(props)

    this.state = { list: [] }
  }

  componentDidMount(): void {
    // dispatch a fetch
    this.props.dispatch(getOrders(this.props.account.address))
  }

  render(): JSX.Element {
    return (
      <BondsWrapper>
        <div className="BondsWrapper_panel orders_panel">
          <TransactionsTable txs={this.props.account.orders} />
        </div>
      </BondsWrapper>
    )
  }
}

const mapStateToProps = function(state: Store): Store {
  return state
}

export default connect(mapStateToProps)(Orders)
