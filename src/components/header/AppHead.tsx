import React, { Component } from 'react'
import './AppHead.scss'

import HeaderItem from './header-item/HeaderItem'
import { connect } from 'react-redux'
import { Store } from '../../model/store'
import {
  initProvider,
  getBalances,
} from '../../redux/account/account_action_creators'
import { tokenBalance } from '../../model/account'
import { getBondBalances } from '../../redux/bond/bond_action_creators'

class AppHead extends Component<any> {
  constructor(props: any) {
    super(props)

    // initialize keysafe or query account & bond balances
    if (Object.entries(this.props.account).length === 0) {
      this.props.dispatch(initProvider())
    } else {
      this.props.dispatch(getBalances(this.props.account.address))
    }

    // get bond information
    this.props.dispatch(getBondBalances(props.activeBond.symbol))
  }

  componentWillReceiveProps(nextProps: Store) {
    // if the user changes, get their balances
    if (this.props.account.address !== nextProps.account.address) {
      this.props.dispatch(getBalances(this.props.account.address))
    }
    // if we're on a different bond, init that bond.
    if (this.props.activeBond.symbol !== nextProps.activeBond.symbol) {
      this.props.dispatch(getBondBalances(nextProps.activeBond.symbol))
    }

    // if there are more trades, update the bond's balances
    if (
      this.props.activeBond.trades.length !== nextProps.activeBond.trades.length
    ) {
      this.props.dispatch(getBondBalances(nextProps.activeBond.symbol))
    }
  }

  render() {
    const { activeBond } = this.props
    const activeSymbol = activeBond.symbol
    const balance = tokenBalance(
      { account: { balances: this.props.account.balances } } as Store,
      activeBond.symbol,
    )

    return (
      <header className="AppHead_header">
        <HeaderItem
          title="My Tokens"
          value={balance.amount}
          tokenType={activeSymbol}
        ></HeaderItem>
        <HeaderItem
          title="Token Supply"
          value={activeBond.collateral.amount}
          tokenType={activeBond.collateral.denom}
        ></HeaderItem>
        <HeaderItem
          title="Price"
          value={activeBond.price.amount}
          tokenType={activeBond.price.denom}
        ></HeaderItem>
        <HeaderItem
          title="Reserve Pool"
          value={activeBond.totalSupply.amount}
          tokenType={activeBond.totalSupply.denom}
        ></HeaderItem>
        <HeaderItem title="Alpha" value={activeBond.alpha}></HeaderItem>
      </header>
    )
  }
}

const mapStateToProps = function(state: Store) {
  return state
}

export default connect(mapStateToProps)(AppHead)
