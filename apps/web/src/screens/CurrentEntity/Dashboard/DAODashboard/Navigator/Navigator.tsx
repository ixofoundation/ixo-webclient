import { FlexBox, GridContainer, GridItem } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import React, { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Activity } from './Activity'
import { Announcements } from './Announcements'
import { FundingClaims } from './FundingClaims'
import { Governance } from './Governance'
import { GovernanceActivity } from './GovernanceActivity'
import { Groups } from '../Components'
import { Membership } from './Membership'
import { TreasuryPool } from './TreasuryPool'
import { Button } from 'screens/CreateEntity/Components'
import { GroupStakingModal } from 'components/Modals'
import { useQuery } from 'hooks/window'
import { useAppSelector } from 'redux/hooks'
import { getEntityById } from 'redux/entities/entities.selectors'

const Navigator: React.FC = (): JSX.Element => {
  const { entityId = '' } = useParams<{ entityId: string }>()
  const { getQuery } = useQuery()
  const selectedGroup = getQuery('selectedGroup')
  const { daoGroups = {}, verificationMethod } = useAppSelector(getEntityById(entityId))
  const selectedDAOGroup = daoGroups[selectedGroup]
  const [groupStakingModalOpen, setGroupStakingModalOpen] = useState(false)

  const daoController: string = useMemo(
    () =>
      Object.values(daoGroups)
        .map((v) => v.coreAddress)
        .find((addr) => verificationMethod.some((v) => v.id.includes(addr))) || '',
    [daoGroups, verificationMethod],
  )

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
    <FlexBox $direction='column' $gap={6}>
      <Groups entityId={entityId} daoController={daoController} />

      {selectedDAOGroup && (
        <>
          <FlexBox width='100%' $alignItems='center' $justifyContent='space-between'>
            <Typography variant='secondary' color='white' size='5xl' transform='capitalize'>
              {selectedDAOGroup.config.name} group
            </Typography>
            {renderAction()}
          </FlexBox>

          <GridContainer
            $gridTemplateAreas={`"a b b b" "c d d d" "e e e e" "f f g g"`}
            $gridTemplateColumns={'1fr 1fr 1fr 1fr'}
            $gridTemplateRows={'repeat(4, minmax(330px, auto))'}
            $gridGap={6}
          >
            <GridItem $gridArea='a'>
              <Membership groupAddresses={[]} />
            </GridItem>
            <GridItem $gridArea='b'>
              <Announcements daoId={entityId} groupAddresses={[]} />
            </GridItem>
            <GridItem $gridArea='c'>
              <Governance daoId={entityId} groupAddresses={[]} />
            </GridItem>
            <GridItem $gridArea='d'>
              <GovernanceActivity daoId={entityId} groupIds={[]} />
            </GridItem>
            <GridItem $gridArea='e'>
              <Activity daoId={entityId} groupIds={[]} />
            </GridItem>
            <GridItem $gridArea='f'>
              <FundingClaims daoId={entityId} groupIds={[]} />
            </GridItem>
            <GridItem $gridArea='g'>
              <TreasuryPool daoId={entityId} groupAddresses={[]} />
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
