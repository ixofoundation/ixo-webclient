import React, { Component } from 'react'
import HeaderItem from './header-item/HeaderItem'
import { connect } from 'react-redux'
import { RootState } from '../../../common/redux/types'
import { initProvider } from '../../../modules/account/account.actions'
import { tokenBalance } from '../../../modules/account/account.utils'

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
    }
  }

  render(): JSX.Element {
    const { activeBond } = this.props
    const activeSymbol = activeBond.symbol
    const balance = tokenBalance(
      { account: { balances: this.props.account.balances } } as RootState,
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

const mapStateToProps = function(state: RootState): RootState {
  return state
}

export default connect(mapStateToProps)(Header)
