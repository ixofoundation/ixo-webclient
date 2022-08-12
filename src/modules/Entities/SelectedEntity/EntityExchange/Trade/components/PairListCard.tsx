import React, { useState } from 'react'

import { CurrencyType } from 'modules/Account/types'
import CloseIcon from 'assets/images/exchange/close.svg'

import {
  PairListWrapper,
  PairListSearchInput,
  PairListTokenWrapper,
  PairListTokens,
  CloseButton,
} from './PairListCard.styles'

interface Props {
  pairList: CurrencyType[]
  handleSelectToken: (token: any) => void
  handleClose: () => void
}

const PairListToken = ({ currency, onClick }): JSX.Element => (
  <PairListTokenWrapper onClick={onClick}>
    <img src={currency.imageUrl} className="mr-3" alt={currency.denom} />
    <div className="d-flex flex-column">
      <span className="name">{currency.denom}</span>
      <span className="balance">23</span>
    </div>
  </PairListTokenWrapper>
)

const PairListCard: React.FC<Props> = ({
  pairList,
  handleSelectToken,
  handleClose,
}) => {
  const [search, setSearch] = useState<string>('')

  const handleSearchChange = (e): void => {
    const value = e.target.value
    setSearch(value)
  }

  return (
    <PairListWrapper>
      <PairListSearchInput
        value={search}
        placeholder="Choose token or paste address"
        onChange={handleSearchChange}
      />
      <PairListTokens>
        {pairList.map((currency) => (
          <PairListToken
            key={currency.denom}
            currency={currency}
            onClick={(): void => handleSelectToken(currency)}
          />
        ))}
      </PairListTokens>
      <CloseButton onClick={handleClose}>
        <img src={CloseIcon} alt="ts" />
      </CloseButton>
    </PairListWrapper>
  )
}

export default PairListCard
