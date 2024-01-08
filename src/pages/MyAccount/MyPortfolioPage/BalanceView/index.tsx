import { GridContainer, GridItem } from 'components/App/App.styles'
import React from 'react'
import TotalValueStatisticCard from './TotalValueStatisticCard'
import NativeTokensCard from './NativeTokensCard'
import CreditsCard from './CreditsCard'
import ImpactAssetsCard from './ImpactAssetsCard'
import SharesCard from './SharesCard'

const BalanceView: React.FC = () => {
  return (
    <GridContainer
      gridTemplateAreas={`"a a""b c""d e"`}
      gridTemplateColumns={'1fr 1fr'}
      gridTemplateRows={'repeat(3, minmax(400px, auto))'}
      gridGap={6}
      width='100%'
    >
      <GridItem gridArea='a' alignSelf='center' height='100%'>
        <TotalValueStatisticCard />
      </GridItem>
      <GridItem gridArea='b' alignSelf='center' height='100%'>
        <NativeTokensCard />
      </GridItem>
      <GridItem gridArea='c' alignSelf='center' height='100%'>
        <CreditsCard />
      </GridItem>
      <GridItem gridArea='d' alignSelf='center' height='100%'>
        <ImpactAssetsCard />
      </GridItem>
      <GridItem gridArea='e' alignSelf='center' height='100%'>
        <SharesCard />
      </GridItem>
    </GridContainer>
  )
}

export default BalanceView
