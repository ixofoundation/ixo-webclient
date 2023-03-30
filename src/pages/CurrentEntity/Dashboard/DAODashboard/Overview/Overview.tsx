import { FlexBox, GridContainer, GridItem } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import React from 'react'
import { useParams } from 'react-router-dom'
import { Activity } from './Activity'
import { Announcements } from './Announcements'
import { FundingClaims } from './FundingClaims'
import { Governance } from './Governance'
import { GovernanceActivity } from './GovernanceActivity'
import { Groups } from '../Components'
import { Membership } from './Membership'
import { TreasuryPool } from './TreasuryPool'
import useCurrentDao from 'hooks/currentDao'
import { Button } from 'pages/CreateEntity/Components'

const Overview: React.FC = (): JSX.Element => {
  const { entityId: daoId } = useParams<{ entityId: string }>()
  const { selectedGroups } = useCurrentDao()
  const selectedGroupAddresses: string[] = Object.keys(selectedGroups)
  const numOfSelectedGroups = selectedGroupAddresses.length

  const renderAction = () => {
    if (selectedGroups[selectedGroupAddresses[0]].type === 'membership') {
      return (
        <Button
          variant='secondary'
          size='flex'
          height={36}
          textSize='base'
          textTransform='capitalize'
          textWeight='medium'
          disabled
        >
          Join
        </Button>
      )
    } else if (selectedGroups[selectedGroupAddresses[0]].type === 'staking') {
      return (
        <Button
          variant='secondary'
          size='flex'
          height={36}
          textSize='base'
          textTransform='capitalize'
          textWeight='medium'
          disabled
        >
          Add Stake
        </Button>
      )
    }
    return null
  }

  return (
    <FlexBox direction='column' gap={6}>
      <Groups />

      {numOfSelectedGroups > 0 && (
        <>
          <FlexBox width='100%' alignItems='center' justifyContent='space-between'>
            <Typography variant='secondary' color='white' size='5xl' transform='capitalize'>
              {numOfSelectedGroups === 1 && `${Object.values(selectedGroups)[0]?.type} group`}
              {numOfSelectedGroups > 1 && `${numOfSelectedGroups} selected groups`}
            </Typography>
            {numOfSelectedGroups === 1 && renderAction()}
          </FlexBox>

          <GridContainer
            gridTemplateAreas={`"a b b b" "c d d d" "e e e e" "f f g g"`}
            gridTemplateColumns={'1fr 1fr 1fr 1fr'}
            gridTemplateRows={'repeat(4, minmax(330px, auto))'}
            gridGap={6}
          >
            <GridItem gridArea='a'>
              <Membership groupAddresses={selectedGroupAddresses} />
            </GridItem>
            <GridItem gridArea='b'>
              <Announcements daoId={daoId} groupAddresses={selectedGroupAddresses} />
            </GridItem>
            <GridItem gridArea='c'>
              <Governance daoId={daoId} groupAddresses={selectedGroupAddresses} />
            </GridItem>
            <GridItem gridArea='d'>
              <GovernanceActivity daoId={daoId} groupIds={selectedGroupAddresses} />
            </GridItem>
            <GridItem gridArea='e'>
              <Activity daoId={daoId} groupIds={selectedGroupAddresses} />
            </GridItem>
            <GridItem gridArea='f'>
              <FundingClaims daoId={daoId} groupIds={selectedGroupAddresses} />
            </GridItem>
            <GridItem gridArea='g'>
              <TreasuryPool daoId={daoId} groupAddresses={selectedGroupAddresses} />
            </GridItem>
          </GridContainer>
        </>
      )}
    </FlexBox>
  )
}

export default Overview
