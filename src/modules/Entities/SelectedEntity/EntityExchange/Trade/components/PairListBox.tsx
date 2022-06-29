import { CurrencyType } from 'modules/Account/types'
import React from 'react'

import { PairListBoxWrapper, PairWrapper } from './PairListBox.styles'

interface Props {
  pairList: CurrencyType[]
  handleChangePair: (pair: CurrencyType) => void
}

const PairListBox: React.FunctionComponent<Props> = ({
  pairList,
  handleChangePair,
}) => {
  return (
    <PairListBoxWrapper>
      {pairList.map((pair: CurrencyType) => (
        <PairWrapper
          key={pair.denom}
          onClick={(): void => handleChangePair(pair)}
        >
          <img className="image mr-2" src={pair.imageUrl} alt={pair.denom} />
          <span className="denom">{pair.denom}</span>
        </PairWrapper>
      ))}
    </PairListBoxWrapper>
  )
}

export default PairListBox
