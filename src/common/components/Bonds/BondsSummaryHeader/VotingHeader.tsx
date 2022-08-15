import React, { Component } from 'react'
import HeaderItem from './SummaryCard/SummaryCard'
import { connect } from 'react-redux'
import { RootState } from '../../../redux/types'
import { getAccount } from '../../../../modules/Account/Account.actions'
import {
  findDenomByMinimalDenom,
  minimalDenomToDenom,
  tokenBalance,
} from '../../../../modules/Account/Account.utils'
import { deviceWidth } from '../../../../lib/commonData'

import styled from 'styled-components'
import { convertPrice } from 'common/utils/currency.utils'
import { thousandSeparator } from 'common/utils/formatters'
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
    const {
      publicAlpha,
      symbol,
      reserveDenom,
      alphaHistory,
      outcomePayment,
      maxSupply,
      myStake,
    } = activeBond

    const currentSupply = minimalDenomToDenom(myStake.denom, myStake.amount)

    const myStakeInfo =
      (currentSupply
        ? `${(
            (minimalDenomToDenom(
              balance.denom,
              new BigNumber(balance.amount).toString(),
            ) /
              currentSupply) *
            100
          ).toFixed(2)}%`
        : '0%') +
      ` of ${convertPrice(currentSupply, 2)} ` +
      symbol.toUpperCase()

    const successYieldInfo = `For ${thousandSeparator(
      maxSupply.amount,
      ',',
    )} Votes`

    const reserveInfo = `${(
      (activeBond.reserve.amount / activeBond.capital.amount || 0) * 100
    ).toFixed(2)}% of Capital raise`

    const successTargetInfo = `${(
      100 -
      (myStake.amount / maxSupply.amount) * 100
    ).toFixed(0)}% Still Needed`

    return (
      <StyledHeader>
        <HeaderItem
          tokenType={findDenomByMinimalDenom(reserveDenom)}
          title={`Stake to Vote`}
          value={minimalDenomToDenom(reserveDenom, activeBond.lastPrice)}
          additionalInfo={`${findDenomByMinimalDenom(
            reserveDenom,
          ).toUpperCase()} per ${activeBond.symbol.toUpperCase()}`}
          priceColor="#39C3E6"
          setActiveHeaderItem={(): void => setSelectedHeader('price')}
          selected={selectedHeader === 'price'}
          to={true}
          isDark={isDark}
        />
        <HeaderItem
          tokenType={symbol}
          title="My Share"
          value={balance.amount}
          additionalInfo={myStakeInfo}
          priceColor="#6FCF97"
          setActiveHeaderItem={(): void => setSelectedHeader('stake')}
          selected={selectedHeader === 'stake'}
          to={true}
          isDark={isDark}
        />
        <HeaderItem
          tokenType={findDenomByMinimalDenom(reserveDenom)}
          title="Success Yield"
          value={outcomePayment}
          additionalInfo={successYieldInfo}
          priceColor="#39C3E6"
          setActiveHeaderItem={this.handleClick}
          selected={selectedHeader === 'raised'}
          to={false}
          isDark={isDark}
        />
        <HeaderItem
          tokenType={findDenomByMinimalDenom(reserveDenom)}
          title="My Votes"
          value={activeBond.reserve.amount}
          additionalInfo={reserveInfo}
          priceColor="#39C3E6"
          setActiveHeaderItem={(): void => setSelectedHeader('reserve')}
          selected={selectedHeader === 'reserve'}
          to={true}
          isDark={isDark}
        />
        <HeaderItem
          tokenType={symbol}
          title="Success Target"
          value={publicAlpha}
          decimals={2}
          additionalInfo={successTargetInfo}
          selected={selectedHeader === 'alpha'}
          priceColor="#39C3E6"
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
