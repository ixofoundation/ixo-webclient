import React from 'react'

import { PairListBoxWrapper, PairWrapper } from './PairListBox.styles'

interface Props {
  pairList: {
    image: string
    denom: string
  }[]
}

const PairListBox: React.FunctionComponent<Props> = ({ pairList }) => {
  return (
    <PairListBoxWrapper>
      {pairList.map((pair) => (
        <PairWrapper key={pair.denom}>
          <img className="image mr-2" src={pair.image} alt={pair.denom} />
          <span className="denom">{pair.denom}</span>
        </PairWrapper>
      ))}
    </PairListBoxWrapper>
  )
}

export default PairListBox
