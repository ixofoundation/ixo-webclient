import React, { Component } from 'react'
import 'react-virtualized/styles.css'

// You can import any component you want as a named export from 'react-virtualized', eg
import { connect } from 'react-redux'
import { Store } from '../../../../model/store'
import { getTransactions } from '../../../../modules/bond/bond.actions'
import TransactionsTable from '../../TransactionsTable'

class Trades extends Component<any> {
  state = { list: [] }

  constructor(props: any) {
    super(props)

    this.state = { list: [] }
  }

  componentDidMount(): void {
    // dispatch a fetch
    this.props.dispatch(getTransactions())
  }

  render(): JSX.Element {
    return (
      <TransactionsTable
        txs={this.props.activeBond.trades}
        selectedToken={this.props.activeBond.symbol}
      />
    )
  }
}

const mapStateToProps = function(state: Store): Store {
  return state
}

export default connect(mapStateToProps)(Trades)
