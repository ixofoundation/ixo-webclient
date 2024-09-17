import { Flex } from '@mantine/core'
import { GridContainer, GridItem } from 'components/CoreEntry/App.styles'
import PerformanceTimelineCard from './PerformanceTimelineCard'
import ClaimStatsCard from './ClaimStatsCard'
import ClaimLocationActivityCard from './ClaimLocationActivityCard'
import LatestClaimsCard from './LatestClaimsCard'

const Overview: React.FC = () => {
  return (
    <Flex w={'100%'} direction={'column'}>
      <GridContainer
        $gridTemplateAreas={`"a a""b b""c d"`}
        $gridTemplateColumns={'1fr 1fr'}
        $gridTemplateRows={'repeat(3, minmax(300px, auto))'}
        $gridGap={6}
        width='100%'
      >
        <GridItem $gridArea='a' $alignSelf='stretch' $minHeight='300px'>
          <PerformanceTimelineCard />
        </GridItem>
        <GridItem $gridArea='b' $alignSelf='stretch' $minHeight='300px'>
          <ClaimStatsCard />
        </GridItem>
        <GridItem $gridArea='c' $alignSelf='stretch' $minHeight='300px'>
          <ClaimLocationActivityCard />
        </GridItem>
        <GridItem $gridArea='d' $alignSelf='stretch' $minHeight='300px'>
          <LatestClaimsCard />
        </GridItem>
      </GridContainer>
    </Flex>
  )
}

export default Overview
