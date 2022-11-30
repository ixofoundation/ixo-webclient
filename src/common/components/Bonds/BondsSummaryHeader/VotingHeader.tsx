import React, { Component } from 'react'
import HeaderItem from './SummaryCard/SummaryCard'
import { connect } from 'react-redux'
import { RootState } from '../../../../redux/types'
import { getAccount } from 'redux/account/account.actions'
import { findDenomByMinimalDenom, minimalDenomToDenom, tokenBalance } from 'redux/account/account.utils'
import { deviceWidth } from '../../../../constants/device'

import styled from 'styled-components'
import { convertPrice } from 'utils/currency'
import { thousandSeparator } from 'utils/formatters'
import BigNumber from 'bignumber.js'

const StyledHeader = styled.header`
  margin: 1.25rem 0;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  @media (min-width: ${deviceWidth.desktopLarge}px) {
    justify-content: flex-start;
  }
`

interface VotingHeaderState {
  selected: number
}

class VotingHeader extends Component<any, VotingHeaderState> {
  refreshAccount = (): void => {
    if (this.props.account.userInfo) {
      this.props.dispatch(getAccount(this.props.account.address))
    }
  }

  handleClick = (): void => {
    // TODO Add click handler
  }

  componentDidMount(): void {
    this.refreshAccount()
  }

  render(): JSX.Element {
    const { activeBond, selectedHeader, setSelectedHeader, isDark } = this.props
    const balance = tokenBalance(this.props.account.balances, activeBond.symbol)
    const { publicAlpha, symbol, reserveDenom, alphaHistory, outcomePayment, maxSupply, myStake } = activeBond

    const displayDenom = findDenomByMinimalDenom(reserveDenom)

    const currentSupply = minimalDenomToDenom(myStake.denom, myStake.amount)

    const myStakeInfo =
      (currentSupply
        ? `${(
            (minimalDenomToDenom(balance.denom!, new BigNumber(balance.amount!).toString()) / currentSupply) *
            100
          ).toFixed(2)}%`
        : '0%') +
      ` of ${convertPrice(currentSupply, 2)} ` +
      symbol.toUpperCase()

    const successYieldInfo = `For ${thousandSeparator(maxSupply.amount, ',')} ${symbol.toUpperCase()} Votes`

    const reserveInfo = `${((activeBond.reserve.amount / activeBond.capital.amount || 0) * 100).toFixed(
      2,
    )}% of All Staked ${displayDenom.toUpperCase()}`

    const successTargetInfo = `${(100 - (myStake.amount / maxSupply.amount) * 100).toFixed(0)}% More Votes Needed`

    return (
      <StyledHeader>
        <HeaderItem
          tokenType={displayDenom}
          title={`${displayDenom.toUpperCase()} to Vote`}
          value={minimalDenomToDenom(reserveDenom, activeBond.lastPrice)}
          additionalInfo={`${displayDenom.toUpperCase()} per ${activeBond.symbol.toUpperCase()}`}
          priceColor='#39C3E6'
          setActiveHeaderItem={(): void => setSelectedHeader('price')}
          selected={selectedHeader === 'price'}
          to={true}
          isDark={isDark}
        />
        <HeaderItem
          tokenType={symbol}
          title='My Votes'
          value={balance.amount}
          additionalInfo={myStakeInfo}
          priceColor='#6FCF97'
          setActiveHeaderItem={(): void => setSelectedHeader('stake')}
          selected={selectedHeader === 'stake'}
          to={true}
          isDark={isDark}
        />
        <HeaderItem
          tokenType={displayDenom}
          title='Success Yield'
          value={outcomePayment}
          additionalInfo={successYieldInfo}
          priceColor='#39C3E6'
          setActiveHeaderItem={this.handleClick}
          selected={selectedHeader === 'raised'}
          to={false}
          isDark={isDark}
        />
        <HeaderItem
          tokenType={displayDenom}
          title='My Stake'
          value={activeBond.reserve.amount}
          additionalInfo={reserveInfo}
          priceColor='#39C3E6'
          setActiveHeaderItem={(): void => setSelectedHeader('reserve')}
          selected={selectedHeader === 'reserve'}
          to={true}
          isDark={isDark}
        />
        <HeaderItem
          tokenType={symbol}
          title='Success Target'
          value={publicAlpha}
          decimals={2}
          additionalInfo={successTargetInfo}
          selected={selectedHeader === 'alpha'}
          priceColor='#39C3E6'
          to={alphaHistory.length > 0}
          setActiveHeaderItem={(): void => {
            if (alphaHistory.length > 0) {
              setSelectedHeader('alpha')
            }
          }}
          isDark={isDark}
        />
      </StyledHeader>
    )
  }
}

const mapStateToProps = function (state: RootState): RootState {
  return state
}

export default connect(mapStateToProps)(VotingHeader)
