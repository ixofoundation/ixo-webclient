import React, { Component } from 'react'
import HeaderItem from './SummaryCard/SummaryCard'
import { connect } from 'react-redux'
import { RootState } from '../../../redux/types'
import { getAccount } from '../../../../modules/Account/Account.actions'
import {
  minimalDenomToDenom,
  tokenBalance,
} from '../../../../modules/Account/Account.utils'
import { deviceWidth } from '../../../../lib/commonData'

import styled from 'styled-components'
import moment from 'moment'

const StyledHeader = styled.header`
  margin: 1.25rem 0;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  @media (min-width: ${deviceWidth.desktopLarge}px) {
    justify-content: flex-start;
  }
`

interface HeaderState {
  selected: number
}

class Header extends Component<any, HeaderState> {
  refreshAccount = (): void => {
    if (this.props.account.userInfo) {
      this.props.dispatch(getAccount(this.props.account.address))
    }
  }

  handleClick = (): void => {
    console.log('click')
  }

  componentDidMount(): void {
    this.refreshAccount()
  }

  render(): JSX.Element {
    const { activeBond, selectedHeader, setSelectedHeader } = this.props
    const balance = tokenBalance(this.props.account.balances, activeBond.symbol)

    const myStakeInfo = `${(
      (minimalDenomToDenom(balance.denom, balance.amount) /
        minimalDenomToDenom(
          activeBond.myStake.denom,
          activeBond.myStake.amount,
        )) *
      100
    ).toFixed(2)}%`

    const bondCapitalInfo = `${(
      (activeBond.capital.amount / activeBond.initialRaised) *
      100
    ).toFixed(2)}% of Funding Target`

    const reserveInfo = `${(
      (activeBond.reserve.amount / activeBond.capital.amount || 0) * 100
    ).toFixed(2)}% of Capital raise`

    return (
      <StyledHeader>
        <HeaderItem
          tokenType={activeBond.price.denom?.toUpperCase()}
          title="Last Price"
          value={(
            activeBond.lastPrice /
            (activeBond.symbol === 'xusd' ? 1 : Math.pow(10, 6))
          ).toFixed(
            activeBond.lastPrice /
              (activeBond.symbol === 'xusd' ? 1 : Math.pow(10, 6)) >=
              1
              ? 2
              : 6,
          )}
          additionalInfo={`Per ${activeBond.symbol.toUpperCase()}`}
          priceColor="#39C3E6"
          setActiveHeaderItem={(): void => setSelectedHeader('price')}
          selected={selectedHeader === 'price'}
          to={true}
        />
        <HeaderItem
          tokenType={balance.denom?.toUpperCase()}
          title="My Stake"
          value={balance.amount.toFixed(3)}
          additionalInfo={myStakeInfo}
          priceColor="#6FCF97"
          setActiveHeaderItem={this.handleClick}
          selected={selectedHeader === 'stake'}
        />
        <HeaderItem
          tokenType={(activeBond.reserveDenom === 'uixo'
            ? 'ixo'
            : activeBond.reserveDenom
          ).toUpperCase()}
          title="Capital Raised"
          value={activeBond.capital.amount.toFixed(2)}
          additionalInfo={bondCapitalInfo}
          priceColor="#39C3E6"
          setActiveHeaderItem={this.handleClick}
          selected={selectedHeader === 'raised'}
        />
        <HeaderItem
          tokenType={(activeBond.reserveDenom === 'uixo'
            ? 'ixo'
            : activeBond.reserveDenom
          ).toUpperCase()}
          title="Reserve Funds"
          value={activeBond.reserve.amount.toFixed(2)}
          additionalInfo={reserveInfo}
          priceColor="#39C3E6"
          setActiveHeaderItem={this.handleClick}
          selected={selectedHeader === 'reserve'}
        />
        <HeaderItem
          title="Alpha"
          value={activeBond.alpha.toFixed(2)}
          additionalInfo={moment(activeBond.alphaDate).format('DD[/]MM[/]YYYY')}
          selected={selectedHeader === 'alpha'}
          isAlpha={true}
          priceColor="#39C3E6"
        />
      </StyledHeader>
    )
  }
}

const mapStateToProps = function (state: RootState): RootState {
  return state
}

export default connect(mapStateToProps)(Header)
