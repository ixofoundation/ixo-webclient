import React, { useState } from 'react'
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
} from './NftPairListCard.styles'
import { GrayText, WhiteText } from './AmountInputBox.styles'
import { displayTokenAmount } from 'common/utils/currency.utils'

const decimals = 2

interface Props {
  pairList: any[]
  viewPairList: 'from' | 'to' | 'none'
  isTriangle?: boolean
  handleSelectToken: (token: any) => void
  children?: React.ReactNode
}

const PairListToken = ({ nft, onClick }): JSX.Element => {
  // TODO: should be fetched from blocksync or cellnode
  const price = 250
  const remainings = 301

  return (
    <PairListTokenWrapper onClick={onClick}>
      <img src={nft.image} className="mr-3" alt="" />
      <div className="d-flex flex-column w-100">
        <div className="d-flex align-items-center justify-content-between w-100">
          <WhiteText
            lineHeight="21px"
            fontSize="18px"
            fontWeight={400}
            className="name"
          >
            {nft.name}
          </WhiteText>
          <WhiteText lineHeight="21px" fontSize="18px" fontWeight={400}>
            ${displayTokenAmount(String(price), decimals)}
          </WhiteText>
        </div>
        <div className="d-flex align-items-center justify-content-between w-100">
          <WhiteText lineHeight="16px" fontSize="14px" fontWeight={400}>
            {remainings}
          </WhiteText>
          <GrayText lineHeight="16px" fontSize="14px" fontWeight={400}>
            &nbsp;
          </GrayText>
        </div>
      </div>
    </PairListTokenWrapper>
  )
}

const PairListCard: React.FC<Props> = ({
  pairList,
  viewPairList,
  isTriangle = true,
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
          .filter(({ name }) => name.indexOf(search) > -1)
          .map((nft) => (
            <PairListToken
              key={nft.name}
              nft={nft}
              onClick={(): void => handleSelectToken(nft)}
            />
          ))}
      </PairListTokens>

      {isTriangle && viewPairList === 'from' && (
        <div className="triangle-left" />
      )}
      {isTriangle && viewPairList === 'to' && (
        <div className="triangle-right" />
      )}
    </PairListWrapper>
  )
}

export default PairListCard
