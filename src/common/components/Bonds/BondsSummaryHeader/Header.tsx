import React, { Component } from 'react'
import HeaderItem from './SummaryCard/SummaryCard'
import { connect } from 'react-redux'
import { RootState } from '../../../redux/types'
import { getAccount } from '../../../../modules/account/account.actions'
import { getBalances as getBondBalances } from '../../../../modules/bond/bond.actions'
import { tokenBalance } from '../../../../modules/account/account.utils'
import { deviceWidth } from '../../../../lib/commonData'

import styled from 'styled-components'

const StyledHeader = styled.header`
  margin: 1.25rem;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  @media (min-width: ${deviceWidth.tablet}px) {
    justify-content: flex-start;
    margin: 2.5rem;
  }
`

const INTERVAL_LENGTH = 6000

class Header extends Component<any> {
  constructor(props: any) {
    super(props)

    setInterval(() => {
      this.refreshAccount()
    }, INTERVAL_LENGTH)

    this.refreshAccount()
  }

  refreshAccount = (): void => {
    if (this.props.account.userInfo) {
      this.props.dispatch(getAccount(this.props.account.address))
      this.props.dispatch(getBondBalances(this.props.bondDID))
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
