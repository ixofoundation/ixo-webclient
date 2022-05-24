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
import { BondStateType } from 'modules/BondModules/bond/types'
import { convertPrice } from 'common/utils/currency.utils'

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
    const {
      state,
      publicAlpha,
      initialRaised,
      symbol,
      myStake,
      reserveDenom,
      alphaHistory,
    } = activeBond

    const currentSupply = minimalDenomToDenom(
      activeBond.myStake.denom,
      activeBond.myStake.amount,
    )

    const myStakeInfo =
      (currentSupply
        ? `${(
            (minimalDenomToDenom(balance.denom, balance.amount) /
              currentSupply) *
            100
          ).toFixed(2)}%`
        : '0%') + ` of ${convertPrice(currentSupply, 2)}`

    // TODO: activeBond.capital.amount / 60,000 (from claim target)
    const bondCapitalInfo = `${(
      (activeBond.capital.amount / 60000) *
      100
    ).toFixed(2)}% of Funding Target`

    const reserveInfo = `${(
      (activeBond.reserve.amount / activeBond.capital.amount || 0) * 100
    ).toFixed(2)}% of Capital raise`

    return (
      <StyledHeader>
        <HeaderItem
          tokenType={reserveDenom.toUpperCase()}
          title="Last Price"
          value={activeBond.lastPrice}
          // additionalInfo={`${reserveDenom.toUpperCase()} per ${activeBond.symbol.toUpperCase()}`}
          additionalInfo={`xUSD per ${activeBond.symbol.toUpperCase()}`}
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
          setActiveHeaderItem={(): void => setSelectedHeader('stake')}
          selected={selectedHeader === 'stake'}
          to={true}
        />
        <HeaderItem
          tokenType={(activeBond.reserveDenom === 'uixo'
            ? 'ixo'
            : activeBond.reserveDenom
          ).toUpperCase()}
          title="Capital Raised"
          value={Number(activeBond.capital.amount).toFixed(2)}
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
          value={Number(activeBond.reserve.amount).toFixed(2)}
          additionalInfo={reserveInfo}
          priceColor="#39C3E6"
          setActiveHeaderItem={(): void => setSelectedHeader('reserve')}
          selected={selectedHeader === 'reserve'}
          to={true}
        />
        {state === BondStateType.HATCH ? (
          <HeaderItem
            tokenType={symbol.toUpperCase()}
            title="Required Hatch"
            value={myStake.amount ? myStake.amount : 0}
            additionalInfo={
              (myStake.amount / initialRaised) * 100 +
              '%' +
              ' of ' +
              initialRaised
            }
            selected={selectedHeader === 'alpha'}
            priceColor="#39C3E6"
            to={false}
          />
        ) : (
          <HeaderItem
            title="Alpha"
            value={publicAlpha.toFixed(2)}
            additionalInfo={' '}
            selected={selectedHeader === 'alpha'}
            isAlpha={true}
            priceColor="#39C3E6"
            to={alphaHistory.length > 0}
            setActiveHeaderItem={(): void => {
              if (alphaHistory.length > 0) {
                setSelectedHeader('alpha')
              }
            }}
          />
        )}
      </StyledHeader>
    )
  }
}

const mapStateToProps = function (state: RootState): RootState {
  return state
}

export default connect(mapStateToProps)(Header)
