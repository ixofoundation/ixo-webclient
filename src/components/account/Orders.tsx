import React, { Component } from 'react'
import 'react-virtualized/styles.css'

// You can import any component you want as a named export from 'react-virtualized', eg
import { connect } from 'react-redux'
import { Store } from '../../model/store'
import { getOrders } from '../../redux/account/account_action_creators'
import TransactionsTable from '../TransactionsTable'

class Orders extends Component<any> {
  state = { list: [] }

  constructor(props: any) {
    super(props)

    this.state = { list: [] }
  }

  componentDidMount() {
    // dispatch a fetch
    this.props.dispatch(getOrders(this.props.account.address))
  }

  render() {
    return (
      <div className="AppBody_panel orders_panel">
        <TransactionsTable txs={this.props.account.orders} />
      </div>
    )
  }
}

const mapStateToProps = function(state: Store) {
  return state
}

export default connect(mapStateToProps)(Orders)
