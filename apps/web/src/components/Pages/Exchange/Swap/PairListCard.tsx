import React, { useEffect, useMemo, useState } from 'react'

import {
  PairListWrapper,
  PairListSearchRow,
  PairListSearchInput,
  PairListSearchIcon,
  PairListTokenWrapper,
  PairListTokens,
} from './PairListCard.styles'
import { displayTokenAmount } from 'utils/currency'
import BigNumber from 'bignumber.js'
import { GrayText, WhiteText } from './AmountInputBox.styles'
import { getUSDRateByCoingeckoId } from 'utils/coingecko'
import { AssetType } from 'redux/configs/configs.types'
import AssistantButton from 'components/AssistantButton/AssistantButton'

import { FlexBox } from 'components/App/App.styles'

const decimals = 2

interface Props {
  pairList: AssetType[]
  hasCreditCard?: boolean
  balances: {
    [key: string]: string
  }
  viewPairList: 'from' | 'to' | 'none'
  isTriangle?: boolean
  handleSelectToken: (token: AssetType | undefined) => void
  children?: React.ReactNode
}

export type PairListCardProps = Props

const CreditCard = ({ onClick }: any): JSX.Element => {
  // TODO: get balance
  const balance = 250

  return (
    <PairListTokenWrapper onClick={onClick}>
      <img src="/assets/images/assets/cash.svg" className='mr-3' alt='' />
      <div className='d-flex flex-column w-100'>
        <div className='d-flex align-items-center justify-content-between w-100'>
          <WhiteText lineHeight='21px' fontSize='18px' fontWeight={400}>
            Cash
          </WhiteText>
          <WhiteText lineHeight='21px' fontSize='18px' fontWeight={400}>
            ${displayTokenAmount(new BigNumber(balance), decimals)}
          </WhiteText>
        </div>
        <div className='d-flex align-items-center justify-content-between w-100'>
          <WhiteText lineHeight='16px' fontSize='14px' fontWeight={400}>
            using Ramp
          </WhiteText>
        </div>
      </div>
    </PairListTokenWrapper>
  )
}

const PairListToken = ({ currency, balances, onClick }: any): JSX.Element => {
  const [usdRate, setUSDRate] = useState(0)
  const usdAmount = useMemo(
    () => new BigNumber(balances[currency.display] ?? 0).times(usdRate),
    [usdRate, balances, currency],
  )

  useEffect(() => {
    if (currency && currency.display) {
      getUSDRateByCoingeckoId(currency.coingeckoId).then((rate): void => setUSDRate(rate))
    }
  }, [currency])

  return (
    <PairListTokenWrapper onClick={onClick}>
      <img src={currency.logoURIs.png} className='mr-3' alt='' />
      <div className='d-flex flex-column w-100'>
        <div className='d-flex align-items-center justify-content-between w-100'>
          <WhiteText lineHeight='21px' fontSize='18px' fontWeight={400}>
            {currency.symbol}
          </WhiteText>
          <WhiteText lineHeight='21px' fontSize='18px' fontWeight={400}>
            {displayTokenAmount(new BigNumber(balances[currency.display] ?? 0), decimals)}
          </WhiteText>
        </div>
        <div className='d-flex align-items-center justify-content-between w-100'>
          <WhiteText lineHeight='16px' fontSize='14px' fontWeight={400}>
            {'ImpactHub'}
          </WhiteText>
          <GrayText lineHeight='16px' fontSize='14px' fontWeight={400}>
            $ {displayTokenAmount(new BigNumber(usdAmount), decimals)}
          </GrayText>
        </div>
      </div>
    </PairListTokenWrapper>
  )
}

const PairListCard: React.FC<Props> = ({
  pairList,
  hasCreditCard = false,
  balances,
  viewPairList,
  isTriangle = true,
  handleSelectToken,
  children,
}) => {
  const [search, setSearch] = useState<string>('')

  const handleSearchChange = (e: any): void => {
    const value = e.target.value
    setSearch(value)
  }

  return (
    <PairListWrapper>
      {children}
      <PairListSearchRow>
        <FlexBox position='relative' width='100%'>
          <PairListSearchInput value={search} placeholder='Search for an Asset' onChange={handleSearchChange} />
          <PairListSearchIcon />
        </FlexBox>
        <AssistantButton />
      </PairListSearchRow>
      <PairListTokens>
        {pairList
          .filter(
            ({ symbol, base, display }) =>
              symbol.indexOf(search) > -1 || base.indexOf(search) > -1 || display.indexOf(search) > -1,
          )
          .map((currency) => (
            <PairListToken
              key={currency?.base}
              currency={currency}
              balances={balances}
              onClick={(): void => handleSelectToken(currency)}
            />
          ))}
        {hasCreditCard && <CreditCard onClick={(): void => handleSelectToken(undefined)} />}
      </PairListTokens>

      {isTriangle && viewPairList === 'from' && <div className='triangle-left' />}
      {isTriangle && viewPairList === 'to' && <div className='triangle-right' />}
    </PairListWrapper>
  )
}

export default PairListCard
