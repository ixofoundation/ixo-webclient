import { FlexBox, SvgBox } from 'components/App/App.styles'
import { useGetBondDid } from 'graphql/bonds'
import React, { useEffect, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useTheme } from 'styled-components'
import Tab from './Tab'
import { ReactComponent as AlphqbondIcon } from 'assets/images/icon-alphabond.svg'
import { Spinner } from 'components/Spinner/Spinner'
import { useIxoConfigs } from 'hooks/configs'
import BigNumber from 'bignumber.js'
import { useAccount } from 'hooks/account'
import { convertDecCoinToCoin, percentFormat, toFixed } from 'utils/currency'
import { GetCurrentPrice } from 'lib/protocol'
import { Coin } from '@cosmjs/proto-signing'
import { BondStateType } from 'redux/bond/bond.types'

interface Props {
  bondDid: string
}

const BondStatistics: React.FC<Props> = ({ bondDid }) => {
  const theme: any = useTheme()
  const history = useHistory()
  const { data: bondDetail } = useGetBondDid(bondDid)
  const { convertToDenom } = useIxoConfigs()
  const { balances } = useAccount()

  const {
    // state = '',
    token = '',
    reserveToken = '',
    currentSupply = 0,
    currentReserve = 0,
    availableReserve = 0,
    initialRaised = 0,
    publicAlpha = 0,
    outcomePayment = 0,
  } = useMemo(
    () => {
      const state = bondDetail?.state
      const token = bondDetail?.token
      const reserveToken = convertToDenom({ denom: bondDetail?.reserveTokens[0], amount: '0' })?.denom
      const currentSupply = bondDetail?.currentSupply.amount
      const microCurrentReserve = bondDetail?.currentReserve[0]
      const currentReserve = convertToDenom(microCurrentReserve)?.amount
      const microAvailableReserve = bondDetail?.availableReserve[0]
      const availableReserve = convertToDenom(microAvailableReserve)?.amount
      const microInitialRaised = (bondDetail?.functionParameters ?? []).find((v: any) => v.param === 'd0')?.value
      const initialRaised = convertToDenom({ denom: bondDetail?.reserveTokens[0], amount: microInitialRaised })?.amount
      const publicAlpha = (bondDetail?.functionParameters ?? []).find((v: any) => v.param === 'publicAlpha')?.value
      const outcomePayment = bondDetail?.outcomePayment

      return {
        state,
        token,
        reserveToken,
        currentSupply,
        currentReserve,
        availableReserve,
        initialRaised,
        publicAlpha,
        outcomePayment,
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [bondDetail],
  )

  const userTokenBalance = useMemo(
    () => balances.find((balance) => balance.denom === token)?.amount || '0',
    [balances, token],
  )

  const [currentPrice, setCurrentPrice] = useState<Coin | undefined>(undefined)

  useEffect(() => {
    const run = async () => {
      const res = await GetCurrentPrice(bondDid)
      if (res) {
        const { currentPrice } = res
        console.log({ currentPrice })
        setCurrentPrice(convertToDenom(convertDecCoinToCoin(currentPrice[0])))
      }
    }
    if (bondDid) {
      run()
    }
    return () => {
      setCurrentPrice(undefined)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bondDid])

  const onTabClick = (id: string) => () => {
    history.push({ hash: id })
  }

  if (!bondDetail) {
    return <Spinner />
  }

  return (
    <FlexBox width='100%' gap={4} alignItems='stretch'>
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
          onClick={onTabClick('capital_raised')}
        />
      ) : (
        <Tab
          id='capital_raised'
          prefix={reserveToken.toUpperCase()}
          color={theme.ixoNewBlue}
          header={'Payout'}
          body={new BigNumber(outcomePayment).toFormat()}
          footer={`${percentFormat(0, outcomePayment ?? 0, 0)} of Expected Payout`}
          onClick={onTabClick('capital_raised')}
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
            <SvgBox color={theme.ixoNewBlue} svgWidth={8} svgHeight={8}>
              <AlphqbondIcon />
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
            <SvgBox color={theme.ixoNewBlue} svgWidth={8} svgHeight={8}>
              <AlphqbondIcon />
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
