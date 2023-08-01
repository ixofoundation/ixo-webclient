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
import { Button } from 'pages/CreateEntity/Components'
import { GroupStakingModal } from 'components/Modals'
import useCurrentEntity from 'hooks/currentEntity'

const Navigator: React.FC = (): JSX.Element => {
  const { entityId: daoId } = useParams<{ entityId: string }>()
  const { selectedDAOGroup, selectDAOGroup } = useCurrentEntity()
  const [groupStakingModalOpen, setGroupStakingModalOpen] = useState(false)

  const renderAction = () => {
    if (selectedDAOGroup?.type === 'membership') {
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
    } else if (selectedDAOGroup?.type === 'staking') {
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
      <Groups selectedGroup={selectedDAOGroup} selectDaoGroup={(address: string) => selectDAOGroup(address)} />

      {selectedDAOGroup && (
        <>
          <FlexBox width='100%' alignItems='center' justifyContent='space-between'>
            <Typography variant='secondary' color='white' size='5xl' transform='capitalize'>
              {selectedDAOGroup.config.name} group
            </Typography>
            {renderAction()}
          </FlexBox>

          <GridContainer
            gridTemplateAreas={`"a b b b" "c d d d" "e e e e" "f f g g"`}
            gridTemplateColumns={'1fr 1fr 1fr 1fr'}
            gridTemplateRows={'repeat(4, minmax(330px, auto))'}
            gridGap={6}
          >
            <GridItem gridArea='a'>
              <Membership groupAddresses={[]} />
            </GridItem>
            <GridItem gridArea='b'>
              <Announcements daoId={daoId} groupAddresses={[]} />
            </GridItem>
            <GridItem gridArea='c'>
              <Governance daoId={daoId} groupAddresses={[]} />
            </GridItem>
            <GridItem gridArea='d'>
              <GovernanceActivity daoId={daoId} groupIds={[]} />
            </GridItem>
            <GridItem gridArea='e'>
              <Activity daoId={daoId} groupIds={[]} />
            </GridItem>
            <GridItem gridArea='f'>
              <FundingClaims daoId={daoId} groupIds={[]} />
            </GridItem>
            <GridItem gridArea='g'>
              <TreasuryPool daoId={daoId} groupAddresses={[]} />
            </GridItem>
          </GridContainer>
        </>
      )}
      {groupStakingModalOpen && selectedDAOGroup && (
        <GroupStakingModal
          open={groupStakingModalOpen}
          setOpen={setGroupStakingModalOpen}
          daoGroup={selectedDAOGroup}
        />
      )}
    </FlexBox>
  )
}

export default Navigator
