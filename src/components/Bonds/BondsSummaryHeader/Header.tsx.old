import HeaderItem from './SummaryCard/SummaryCard'
import { connect, useSelector } from 'react-redux'
import { RootState } from '../../../redux/types'
import { findDenomByMinimalDenom, minimalDenomToDenom, tokenBalance } from 'redux/account/account.utils'
import { deviceWidth } from 'constants/device'

import styled from 'styled-components'
import { BondStateType } from 'redux/bond/bond.types'
import { convertPrice } from 'utils/currency'
import { selectEntityThemeHighlightLight } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
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

const Header: React.FC<any> = (props) => {
  const { activeBond, selectedHeader, setSelectedHeader, goal, isDark } = props
  const balance = tokenBalance(props.account.balances, activeBond.symbol)
  const {
    state,
    publicAlpha,
    initialRaised,
    symbol,
    myStake,
    reserveDenom,
    alphaHistory,
    outcomePayment,
    withdrawHistory,
  } = activeBond

  const primaryColor = useSelector(selectEntityThemeHighlightLight)

  let sumOfwithdrawals = 0
  try {
    sumOfwithdrawals = withdrawHistory
      .map((_: any) => _.amount)
      .reduce((previousValue: any, currentValue: any) => previousValue + currentValue)
  } catch (e) {
    sumOfwithdrawals = 0
  }

  let fundingTarget = 0
  try {
    fundingTarget = parseInt(goal.replace(/[^0-9]/g, ''))
  } catch (e) {
    fundingTarget = 0
  }

  const currentSupply = minimalDenomToDenom(activeBond.myStake.denom, activeBond.myStake.amount)

  const myStakeInfo =
    (currentSupply
      ? `${(
          (minimalDenomToDenom(balance.denom!, new BigNumber(balance.amount!).toString()) / currentSupply) *
          100
        ).toFixed(2)}%`
      : '0%') + ` of ${convertPrice(currentSupply, 2)}`

  const bondCapitalInfo = `${
    fundingTarget ? ((activeBond.capital.amount / fundingTarget) * 100).toFixed(2) : 0
  }% of Funding Target`

  const reserveInfo = `${((activeBond.reserve.amount / activeBond.capital.amount || 0) * 100).toFixed(
    2,
  )}% of Capital raise`

  const payoutInfo = `${((sumOfwithdrawals / outcomePayment) * 100).toFixed(0)}% of Expected Payout`

  const handleClick = (): void => {
    // TODO Add click handler
  }

  return (
    <StyledHeader>
      <HeaderItem
        tokenType={findDenomByMinimalDenom(reserveDenom)}
        title='Last Price'
        value={activeBond.lastPrice}
        additionalInfo={`xUSD per ${activeBond.symbol.toUpperCase()}`}
        priceColor={primaryColor ?? '#39C3E6'}
        setActiveHeaderItem={(): void => setSelectedHeader('price')}
        selected={selectedHeader === 'price'}
        to={true}
        isDark={isDark}
      />
      <HeaderItem
        tokenType={balance.denom}
        title='My Stake'
        value={balance.amount}
        additionalInfo={myStakeInfo}
        priceColor='#6FCF97'
        setActiveHeaderItem={(): void => setSelectedHeader('stake')}
        selected={selectedHeader === 'stake'}
        to={true}
        isDark={isDark}
      />
      {state !== BondStateType.SETTLED ? (
        <HeaderItem
          tokenType={findDenomByMinimalDenom(reserveDenom)}
          title='Capital Raised'
          value={activeBond.capital.amount}
          additionalInfo={bondCapitalInfo}
          priceColor={primaryColor ?? '#39C3E6'}
          setActiveHeaderItem={handleClick}
          selected={selectedHeader === 'raised'}
          to={false}
          isDark={isDark}
        />
      ) : (
        <HeaderItem
          tokenType={findDenomByMinimalDenom(reserveDenom)}
          title='Payout'
          value={outcomePayment}
          additionalInfo={payoutInfo}
          priceColor={primaryColor ?? '#39C3E6'}
          setActiveHeaderItem={handleClick}
          selected={selectedHeader === 'raised'}
          to={false}
          isDark={isDark}
        />
      )}
      <HeaderItem
        tokenType={findDenomByMinimalDenom(reserveDenom)}
        title='Reserve Funds'
        value={activeBond.reserve.amount}
        additionalInfo={reserveInfo}
        priceColor={primaryColor ?? '#39C3E6'}
        setActiveHeaderItem={(): void => setSelectedHeader('reserve')}
        selected={selectedHeader === 'reserve'}
        to={true}
        isDark={isDark}
      />
      {state === BondStateType.HATCH ? (
        <HeaderItem
          tokenType={symbol}
          title='Required Hatch'
          value={myStake.amount ? myStake.amount : 0}
          additionalInfo={`${(myStake.amount / initialRaised) * 100}% of ${initialRaised}`}
          selected={selectedHeader === 'alpha'}
          priceColor={primaryColor ?? '#39C3E6'}
          to={false}
          isDark={isDark}
        />
      ) : (
        <HeaderItem
          title='Alpha'
          value={publicAlpha}
          decimals={2}
          additionalInfo={' '}
          selected={selectedHeader === 'alpha'}
          isAlpha={true}
          priceColor={primaryColor ?? '#39C3E6'}
          to={alphaHistory.length > 0}
          setActiveHeaderItem={(): void => {
            if (alphaHistory.length > 0) {
              setSelectedHeader('alpha')
            }
          }}
          isDark={isDark}
        />
      )}
    </StyledHeader>
  )
}

const mapStateToProps = function (state: RootState): RootState {
  return state
}

export default connect(mapStateToProps)(Header)
