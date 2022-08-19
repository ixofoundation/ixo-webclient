import React, { useEffect, useMemo, useState } from 'react'
import Lottie from 'react-lottie'

import assistanceAnimation from 'assets/animations/assistant/hover.json'

import {
  PairListWrapper,
  PairListSearchRow,
  PairListSearchInputWrapper,
  PairListSearchInput,
  PairListSearchIcon,
  PairListSearchAssistanceButton,
  PairListTokenWrapper,
  PairListTokens,
} from './PairListCard.styles'
import { displayTokenAmount } from 'common/utils/currency.utils'
import BigNumber from 'bignumber.js'
import { GrayText, WhiteText } from './AmountInputBox.styles'
import { getUSDRateByCoingeckoId } from 'utils'
import { AssetType } from 'states/configs/configs.types'

const decimals = 2

interface Props {
  pairList: AssetType[]
  balances: {
    [key: string]: string
  }
  viewPairList: 'from' | 'to' | 'none'
  handleSelectToken: (token: any) => void
  children?: React.ReactNode
}

const PairListToken = ({ currency, balances, onClick }): JSX.Element => {
  const [usdRate, setUSDRate] = useState(0)
  const usdAmount = useMemo(
    () => new BigNumber(balances[currency.display] ?? 0).times(usdRate),
    [usdRate, balances, currency],
  )

  useEffect(() => {
    if (currency && currency.display) {
      getUSDRateByCoingeckoId(currency.coingeckoId).then((rate): void =>
        setUSDRate(rate),
      )
    }
  }, [currency])

  return (
    <PairListTokenWrapper onClick={onClick}>
      <img src={currency.logoURIs.png} className="mr-3" alt={currency.symbol} />
      <div className="d-flex flex-column w-100">
        <div className="d-flex align-items-center justify-content-between w-100">
          <WhiteText lineHeight="21px" fontSize="18px" fontWeight={400}>
            {currency.symbol}
          </WhiteText>
          <WhiteText lineHeight="21px" fontSize="18px" fontWeight={400}>
            {displayTokenAmount(
              new BigNumber(balances[currency.display] ?? 0),
              decimals,
            )}
          </WhiteText>
        </div>
        <div className="d-flex align-items-center justify-content-between w-100">
          <WhiteText lineHeight="16px" fontSize="14px" fontWeight={400}>
            {'Osmosis'}
          </WhiteText>
          <GrayText lineHeight="16px" fontSize="14px" fontWeight={400}>
            $ {displayTokenAmount(new BigNumber(usdAmount), decimals)}
          </GrayText>
        </div>
      </div>
    </PairListTokenWrapper>
  )
}

const PairListCard: React.FC<Props> = ({
  pairList,
  balances,
  viewPairList,
  handleSelectToken,
  children,
}) => {
  const [search, setSearch] = useState<string>('')
  const [animLoop, setAnimLoop] = useState(false)

  const handleSearchChange = (e): void => {
    const value = e.target.value
    setSearch(value)
  }

  return (
    <PairListWrapper>
      {children}
      <PairListSearchRow className="mt-2">
        <PairListSearchInputWrapper>
          <PairListSearchInput
            value={search}
            placeholder="Search for an Asset"
            onChange={handleSearchChange}
          />
          <PairListSearchIcon />
        </PairListSearchInputWrapper>
        <PairListSearchAssistanceButton
          onMouseEnter={(): void => setAnimLoop(true)}
          onMouseLeave={(): void => setAnimLoop(false)}
        >
          <Lottie
            height={44}
            width={44}
            options={{
              loop: true,
              autoplay: false,
              animationData: assistanceAnimation,
            }}
            isStopped={!animLoop}
          />
        </PairListSearchAssistanceButton>
      </PairListSearchRow>
      <PairListTokens>
        {pairList
          .filter(
            ({ symbol, base, display }) =>
              symbol.indexOf(search) > -1 ||
              base.indexOf(search) > -1 ||
              display.indexOf(search) > -1,
          )
          .map((currency) => (
            <PairListToken
              key={currency?.base}
              currency={currency}
              balances={balances}
              onClick={(): void => handleSelectToken(currency)}
            />
          ))}
      </PairListTokens>

      {viewPairList === 'from' && <div className="triangle-left" />}
      {viewPairList === 'to' && <div className="triangle-right" />}
    </PairListWrapper>
  )
}

export default PairListCard
