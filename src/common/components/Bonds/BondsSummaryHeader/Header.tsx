import React, { Component } from 'react'
import HeaderItem from './SummaryCard/SummaryCard'
import { connect } from 'react-redux'
import { RootState } from '../../../redux/types'
import { getAccount } from '../../../../modules/Account/Account.actions'
import { tokenBalance } from '../../../../modules/Account/Account.utils'
import { deviceWidth } from '../../../../lib/commonData'

import styled from 'styled-components'
import { getBalanceNumber } from 'common/utils/currency.utils'
import { BigNumber } from 'bignumber.js'
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
    const {
      activeBond,
      selectedEntity,
      selectedHeader,
      setSelectedHeader,
    } = this.props
    const balance = tokenBalance(this.props.account.balances, activeBond.symbol)
    const formattedTarget = selectedEntity.goal
      ? Number(
          selectedEntity.goal
            .split(' ')
            .pop()
            .replace(/[^\w\s]/gi, ''),
        )
      : 0

    const { allowReserveWithdrawals } = activeBond

    const myStakeInfo = `${(
      (getBalanceNumber(new BigNumber(balance.amount)) /
        activeBond.myStake.amount || 0) * 100
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
          tokenType={activeBond.myStake.denom?.toUpperCase()}
          title="My Stake"
          value={parseFloat(activeBond.myStake.amount).toFixed(3)}
          additionalInfo={myStakeInfo}
          priceColor="#6FCF97"
          setActiveHeaderItem={this.handleClick}
          selected={selectedHeader === 'stake'}
          to={false}
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
          to={false}
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
          setActiveHeaderItem={(): void => setSelectedHeader('reserve')}
          selected={selectedHeader === 'reserve'}
          to={allowReserveWithdrawals}
        />
        <HeaderItem
          title="Alpha"
          value={activeBond.alpha.toFixed(2)}
          additionalInfo={moment(activeBond.alphaDate).format('DD[/]MM[/]YYYY')}
          selected={selectedHeader === 'alpha'}
          isAlpha={true}
          priceColor="#39C3E6"
          to={false}
        />
      </StyledHeader>
    )
  }
}

const mapStateToProps = function (state: RootState): RootState {
  return state
}

export default connect(mapStateToProps)(Header)
