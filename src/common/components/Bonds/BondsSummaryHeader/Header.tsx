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
    const balance = tokenBalance(
      { account: { balances: this.props.account.balances } } as RootState,
      activeBond.symbol,
    )
    const bondCapitalInfo = `${(activeBond.collateral.amount /
      activeBond.totalSupply.amount || 0) * 100}% of Bond cap`
    const reserveInfo = `${(activeBond.reserve.amount /
      activeBond.totalSupply.amount || 0) * 100}% of Capital raise`

    return (
      <StyledHeader>
        <HeaderItem
          tokenType={activeBond.price.denom}
          title="Token Price"
          value={activeBond.price.amount}
          additionalInfo="--"
        ></HeaderItem>
        <HeaderItem
          tokenType={activeBond.symbol}
          title="My Token"
          value={balance.amount}
          additionalInfo="--"
        ></HeaderItem>
        <HeaderItem
          tokenType={activeBond.totalSupply.denom}
          title="Bond Capital"
          value={activeBond.collateral.amount}
          additionalInfo={bondCapitalInfo}
        ></HeaderItem>
        <HeaderItem
          tokenType={activeBond.reserve.denom}
          title="Bond Reserve"
          value={activeBond.reserve.amount}
          additionalInfo={reserveInfo}
        ></HeaderItem>
        <HeaderItem
          title="Bond Yield"
          value="--"
          additionalInfo="--"
        ></HeaderItem>
      </StyledHeader>
    )
  }
}

const mapStateToProps = function(state: RootState): RootState {
  return state
}

export default connect(mapStateToProps)(Header)
