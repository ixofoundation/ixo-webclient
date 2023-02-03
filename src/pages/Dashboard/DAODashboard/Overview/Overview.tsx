import { GridContainer, GridItem } from 'components/App/App.styles'
import React from 'react'
import { Activity } from './Activity'
import { Announcements } from './Announcements'
import { FundingClaims } from './FundingClaims'
import { Governance } from './Governance'
import { GovernanceActivity } from './GovernanceActivity'
import { Membership } from './Membership'
import { TreasuryPool } from './TreasuryPool'

const Overview: React.FC = (): JSX.Element => {
  return (
    <GridContainer
      gridTemplateAreas={`"a b b b""c d d d""e e e e""f f g g"`}
      gridTemplateColumns={'1fr 1fr 1fr 1fr'}
      gridTemplateRows={'repeat(4, minmax(330px, auto))'}
      gridGap={6}
    >
      <GridItem gridArea='a'>
        <Membership />
      </GridItem>
      <GridItem gridArea='b'>
        <Announcements />
      </GridItem>
      <GridItem gridArea='c'>
        <Governance />
      </GridItem>
      <GridItem gridArea='d'>
        <GovernanceActivity />
      </GridItem>
      <GridItem gridArea='e'>
        <Activity />
      </GridItem>
      <GridItem gridArea='f'>
        <FundingClaims />
      </GridItem>
      <GridItem gridArea='g'>
        <TreasuryPool />
      </GridItem>
    </GridContainer>
  )
}

export default Overview
