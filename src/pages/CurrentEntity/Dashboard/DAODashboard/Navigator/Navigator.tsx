import { FlexBox, GridContainer, GridItem } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import React, { useState } from 'react'
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
import { GroupStakingModal } from 'components/Modals'

const Navigator: React.FC = (): JSX.Element => {
  const { entityId: daoId } = useParams<{ entityId: string }>()
  const { selectedGroups, selectDaoGroup } = useCurrentDao()
  const selectedGroupAddresses: string[] = Object.keys(selectedGroups)
  const numOfSelectedGroups = selectedGroupAddresses.length
  const [groupStakingModalOpen, setGroupStakingModalOpen] = useState(false)

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
          onClick={() => setGroupStakingModalOpen(true)}
        >
          Add Stake
        </Button>
      )
    }
    return null
  }

  return (
    <FlexBox direction='column' gap={6}>
      <Groups selectedGroups={selectedGroups} selectDaoGroup={(address: string) => selectDaoGroup(address, true)} />

      {numOfSelectedGroups > 0 && (
        <>
          <FlexBox width='100%' alignItems='center' justifyContent='space-between'>
            <Typography variant='secondary' color='white' size='5xl' transform='capitalize'>
              {numOfSelectedGroups === 1 && `${Object.values(selectedGroups)[0]?.config.name} group`}
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
      {groupStakingModalOpen && selectedGroups[selectedGroupAddresses[0]] && (
        <GroupStakingModal
          open={groupStakingModalOpen}
          setOpen={setGroupStakingModalOpen}
          daoGroup={selectedGroups[selectedGroupAddresses[0]]}
        />
      )}
    </FlexBox>
  )
}

export default Navigator
