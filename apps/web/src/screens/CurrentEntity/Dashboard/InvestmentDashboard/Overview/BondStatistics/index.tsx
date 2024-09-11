import { FlexBox, SvgBox } from 'components/App/App.styles'
import { useGetBondDid } from 'graphql/bonds'
import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from 'styled-components'
import Tab from './Tab'


import { Spinner } from 'components/Spinner/Spinner'
import BigNumber from 'bignumber.js'
import { useAccount } from 'hooks/account'
import { percentFormat, toFixed } from 'utils/currency'
import { BondStateType } from 'redux/bond/bond.types'
import { useMapBondDetail } from 'hooks/bond'

interface Props {
  bondDid: string
}

const BondStatistics: React.FC<Props> = ({ bondDid }) => {
  const theme: any = useTheme()
  const navigate = useNavigate()
  const { data: bondDetail } = useGetBondDid(bondDid)
  const {
    token,
    reserveToken,
    currentSupply,
    currentReserve,
    availableReserve,
    initialRaised,
    publicAlpha,
    outcomePayment,
    currentPrice,
  } = useMapBondDetail(bondDetail)
  const { balances } = useAccount()

  const userTokenBalance = useMemo(
    () => balances.find((balance) => balance.denom === token)?.amount || '0',
    [balances, token],
  )

  const onTabClick = (id: string) => () => {
    navigate({ hash: id })
  }

  if (!bondDetail) {
    return <Spinner />
  }

  return (
    <FlexBox width='100%' $gap={4} $alignItems='stretch'>
      <Tab
        id='price'
        prefix={reserveToken.toUpperCase()}
        color={theme.ixoNewBlue}
        header={'Last Price'}
        body={new BigNumber(currentPrice?.amount || 0).toFormat(2)}
        footer={`${reserveToken.toUpperCase()} per ${token.toUpperCase()}`}
        onClick={onTabClick('price')}
      />
      <Tab
        id='my_stake'
        prefix={token.toUpperCase()}
        color={theme.ixoGreen}
        header={'My Stake'}
        body={userTokenBalance}
        footer={`${percentFormat(userTokenBalance, currentSupply, 2)} of ${toFixed(currentSupply, 2)}`}
        onClick={onTabClick('my_stake')}
      />
      {bondDetail.state !== BondStateType.SETTLED ? (
        <Tab
          id='capital_raised'
          prefix={reserveToken.toUpperCase()}
          color={theme.ixoNewBlue}
          header={'Capital Raised'}
          body={new BigNumber(currentReserve).toFormat()}
          footer={`${percentFormat(currentReserve, initialRaised, 2)} of Funding Target`}
        />
      ) : (
        <Tab
          id='capital_raised'
          prefix={reserveToken.toUpperCase()}
          color={theme.ixoNewBlue}
          header={'Payout'}
          body={new BigNumber(outcomePayment).toFormat()}
          footer={`${percentFormat(0, outcomePayment ?? 0, 0)} of Expected Payout`}
        />
      )}
      <Tab
        id='reserve_funds'
        prefix={reserveToken.toUpperCase()}
        color={theme.ixoNewBlue}
        header={'Reserve Funds'}
        body={new BigNumber(availableReserve).toFormat()}
        footer={`${percentFormat(availableReserve, currentReserve, 2)} of Capital raise`}
        onClick={onTabClick('reserve_funds')}
      />
      {bondDetail.state === BondStateType.HATCH ? (
        <Tab
          id='alpha'
          prefix={
            <SvgBox color={theme.ixoNewBlue} $svgWidth={8} $svgHeight={8}>
              <img src="/assets/images/icon-alphabond.svg"  />
            </SvgBox>
          }
          color={theme.ixoNewBlue}
          header={'Required Hatch'}
          body={currentSupply}
          footer={`${percentFormat(currentSupply, initialRaised, 2)} of ${initialRaised}`}
          onClick={onTabClick('alpha')}
        />
      ) : (
        <Tab
          id='alpha'
          prefix={
            <SvgBox color={theme.ixoNewBlue} $svgWidth={8} $svgHeight={8}>
              <img src="/assets/images/icon-alphabond.svg"  />
            </SvgBox>
          }
          color={theme.ixoNewBlue}
          header={'Alpha'}
          body={new BigNumber(publicAlpha).toFormat(2)}
          footer={' '}
          onClick={onTabClick('alpha')}
        />
      )}
    </FlexBox>
  )
}

export default BondStatistics
