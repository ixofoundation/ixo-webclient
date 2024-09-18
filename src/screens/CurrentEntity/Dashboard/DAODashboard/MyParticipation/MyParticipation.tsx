import clxs from 'classnames'
import { FlexBox, GridContainer, GridItem } from 'components/CoreEntry/App.styles'
import { Typography } from 'components/Typography'
import { useQuery } from 'hooks/window'
import React, { useMemo } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { AssetDetailCard, Card } from '../../../Components'
import { Groups, UserStakes, UserVotingPower, UserProposals } from '../Components'

import { useAppSelector } from 'redux/hooks'
import { getEntityById } from 'redux/entities/entities.selectors'

const MyParticipation: React.FC = () => {
  const { entityId = '' } = useParams<{ entityId: string }>()
  const navigate = useNavigate()
  const { state, pathname } = useLocation()
  const { getQuery } = useQuery()
  const token: string | undefined = getQuery('token')
  const expand: string | undefined = getQuery('expand')
  const selectedGroup = getQuery('selectedGroup')
  const tokenDetail: any = state
  const { daoGroups = {}, verificationMethod } = useAppSelector(getEntityById(entityId))
  const selectedDAOGroup = daoGroups[selectedGroup]

  const daoController: string = useMemo(
    () =>
      Object.values(daoGroups)
        .map((v) => v.coreAddress)
        .find((addr) => verificationMethod.some((v) => v.id.includes(addr))) || '',
    [daoGroups, verificationMethod],
  )

  return (
    <FlexBox $direction='column' $gap={6} width='100%' color='white'>
      <Groups entityId={entityId} daoController={daoController} />

      {selectedDAOGroup && (
        <>
          <Typography variant='secondary' size='5xl' weight='normal' color='white'>
            {selectedDAOGroup.config.name}
          </Typography>
          <Typography variant='secondary' size='2xl' weight='normal' color='dark-blue'>
            My participation
          </Typography>

          {/* expand === 'token' */}
          {selectedDAOGroup.type === 'staking' && (
            <Card
              className={clxs({ 'd-none': expand !== 'token' })}
              icon={<img src='/assets/images/icon-stakes.svg' />}
              label='My Stakes'
              actionIcon={<img src='/assets/images/icon-arrow-left.svg' />}
              onAction={() => navigate(-1)}
            >
              <UserStakes show={expand === 'token'} coreAddress={selectedDAOGroup.coreAddress} />
            </Card>
          )}
          {/* expand === 'votingPower' */}
          {selectedDAOGroup.type === 'membership' && (
            <Card
              className={clxs({ 'd-none': expand !== 'votingPower' })}
              icon={<img src='/assets/images/icon-pie.svg' />}
              label='My Voting Power'
              actionIcon={<img src='/assets/images/icon-arrow-left.svg' />}
              onAction={() => navigate(-1)}
            >
              <UserVotingPower show={expand === 'votingPower'} coreAddress={selectedDAOGroup.coreAddress} />
            </Card>
          )}
          {/* expand === 'proposal' */}
          <Card
            className={clxs({ 'd-none': expand !== 'proposal' })}
            icon={<img src='/assets/images/icon-proposals.svg' />}
            label='My Proposals'
            actionIcon={<img src='/assets/images/icon-arrow-left.svg' />}
            onAction={() => navigate(-1)}
          >
            <UserProposals show={expand === 'proposal'} coreAddress={selectedDAOGroup.coreAddress} />
          </Card>
          {/* token && tokenDetail */}
          {selectedDAOGroup.type === 'staking' && <AssetDetailCard show={token && tokenDetail} {...tokenDetail} />}
          {/* !expand && !token */}
          <GridContainer
            className={clxs({ 'd-none': expand || token })}
            $gridTemplateAreas={`"a a b b"`}
            $gridTemplateColumns={'1fr 1fr 1fr 1fr'}
            $gridTemplateRows={'repeat(1, minmax(330px, auto))'}
            $gridGap={6}
            width='100%'
          >
            <GridItem $gridArea='a'>
              {selectedDAOGroup.type === 'staking' && (
                <Card
                  icon={<img src='/assets/images/icon-stakes.svg' />}
                  label='My Stakes'
                  onAction={() => navigate({ pathname: pathname, search: `?expand=token` })}
                >
                  <UserStakes show={!expand && !token} coreAddress={selectedDAOGroup.coreAddress} />
                </Card>
              )}

              {selectedDAOGroup.type === 'membership' && (
                <Card
                  icon={<img src='/assets/images/icon-pie.svg' />}
                  label='My Voting Power'
                  onAction={() => navigate({ pathname: pathname, search: `?expand=votingPower` })}
                >
                  <UserVotingPower show={!expand && !token} coreAddress={selectedDAOGroup.coreAddress} />
                </Card>
              )}
            </GridItem>
            <GridItem $gridArea='b'>
              <Card
                icon={<img src='/assets/images/icon-proposals.svg' />}
                label='My Proposals'
                onAction={() => navigate({ pathname: pathname, search: `?expand=proposal` })}
              >
                <UserProposals show={!expand && !token} coreAddress={selectedDAOGroup.coreAddress} full={false} />
              </Card>
            </GridItem>
            {/* <GridItem $gridArea='c'>
              <UserActivity />
            </GridItem> */}
          </GridContainer>
        </>
      )}
    </FlexBox>
  )
}

export default MyParticipation
