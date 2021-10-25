import React, { Component } from 'react'
import HeaderItem from './SummaryCard/SummaryCard'
import { connect } from 'react-redux'
import { RootState } from '../../../redux/types'
import { getAccount } from '../../../../modules/Account/Account.actions'
import { tokenBalance } from '../../../../modules/Account/Account.utils'
import { deviceWidth } from '../../../../lib/commonData'

import styled from 'styled-components'

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
    console.log('click');
  }

  componentDidMount(): void {
    this.refreshAccount()
  }

  render (): JSX.Element {
    const {
      activeBond,
      selectedEntity,
      selectedHeader,
      setSelectedHeader,
    } = this.props
    const balance = tokenBalance(this.props.account.balances, activeBond.symbol)
    const formattedTarget = Number(
      selectedEntity.goal
        .split(' ')
        .pop()
        .replace(/[^\w\s]/gi, ''),
    )

    const myStakeInfo = `${(
      (balance.amount / activeBond.myStake.amount || 0) * 100
    ).toFixed(2)}%`

    const bondCapitalInfo = `${(
      (activeBond.capital.amount / formattedTarget || 0) * 100
    ).toFixed(2)}% of Funding Target`

    const reserveInfo = `${(
      (activeBond.reserve.amount / activeBond.capital.amount || 0) * 100
    ).toFixed(2)}% of Capital raise`

    return (
      <StyledHeader>
        <HeaderItem
          tokenType={activeBond.price.denom?.toUpperCase()}
          title='Price'
          value={activeBond.price.amount}
          additionalInfo={`Per ${activeBond.symbol.toUpperCase()}`}
          priceColor='#39C3E6'
          setActiveHeaderItem={(): void => setSelectedHeader('price')}
          selected={selectedHeader === 'price'}
          to={true}
        />
        <HeaderItem
          tokenType={activeBond.myStake.denom?.toUpperCase()}
          title='My Stake'
          value={activeBond.myStake.amount}
          additionalInfo={myStakeInfo}
          priceColor='#6FCF97'
          setActiveHeaderItem={(): void => setSelectedHeader('stake')}
          selected={selectedHeader === 'stake'}
          to={true}
        />
        <HeaderItem
          tokenType={activeBond.reserveDenom.toUpperCase()}
          title='Capital Raised'
          value={activeBond.capital.amount}
          additionalInfo={bondCapitalInfo}
          priceColor="#39C3E6"
          setActiveHeaderItem={this.handleClick}
          selected={selectedHeader === 'raised'}
        />
        <HeaderItem
          tokenType={activeBond.reserveDenom.toUpperCase()}
          title='Reserve Funds'
          value={activeBond.reserve.amount}
          additionalInfo={reserveInfo}
          priceColor="#39C3E6"
          setActiveHeaderItem={this.handleClick}
          selected={selectedHeader === 'reserve'}
        />
        <HeaderItem
          title="Alpha"
          value="--"
          additionalInfo="--"
          selected={selectedHeader === 'alpha'}
          isAlpha={true}
          priceColor="#39C3E6"
          setActiveHeaderItem={this.handleClick}
        />
      </StyledHeader>
    )
  }
}

const mapStateToProps = function (state: RootState): RootState {
  return state
}

export default connect(mapStateToProps)(Header)
