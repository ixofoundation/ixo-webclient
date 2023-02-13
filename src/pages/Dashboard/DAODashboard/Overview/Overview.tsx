import { Box, FlexBox, GridContainer, GridItem } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import React, { useMemo, useState } from 'react'
import { Activity } from './Activity'
import { Announcements } from './Announcements'
import { FundingClaims } from './FundingClaims'
import { Governance } from './Governance'
import { GovernanceActivity } from './GovernanceActivity'
import { Groups } from './Groups'
import { Membership } from './Membership'
import { TreasuryPool } from './TreasuryPool'

const Overview: React.FC = (): JSX.Element => {
  const [selectedGroups, setSelectedGroups] = useState({})

  const numOfSelectedGroups = useMemo(
    () => Object.values(selectedGroups).filter((group) => group).length,
    [selectedGroups],
  )

  return (
    <FlexBox direction='column' gap={6}>
      <Groups selectedGroups={selectedGroups} setSelectedGroups={setSelectedGroups} />

      {numOfSelectedGroups > 0 && (
        <>
          <Box mt={4}>
            <Typography variant='secondary' color='white' size='5xl'>
              {numOfSelectedGroups === 1 && 'Marketing group'}
              {numOfSelectedGroups > 1 && `${numOfSelectedGroups} selected groups`}
            </Typography>
          </Box>

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
        </>
      )}
    </FlexBox>
  )
}

export default Overview
