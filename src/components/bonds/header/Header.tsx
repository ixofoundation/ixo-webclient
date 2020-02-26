import React, { Component } from 'react'
import HeaderItem from './header-item/HeaderItem'
import { connect } from 'react-redux'
import { Store } from '../../../model/store'
import {
  initProvider,
  getBalances,
} from '../../../modules/account/account.actions'
import { tokenBalance } from '../../../model/account'
import { getBondBalances } from '../../../modules/bond/bond.actions'

import styled from 'styled-components'

const StyledHeader = styled.header`
  margin: 2.5rem;
  display: flex;
  flex-flow: row wrap;
`

class Header extends Component<any> {
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

  UNSAFE_componentWillReceiveProps(nextProps: Store): void {
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

  render(): JSX.Element {
    const { activeBond } = this.props
    const activeSymbol = activeBond.symbol
    const balance = tokenBalance(
      { account: { balances: this.props.account.balances } } as Store,
      activeBond.symbol,
    )

    return (
      <StyledHeader>
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
      </StyledHeader>
    )
  }
}

const mapStateToProps = function(state: Store): Store {
  return state
}

export default connect(mapStateToProps)(Header)
