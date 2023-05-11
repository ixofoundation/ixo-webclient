import clxs from 'classnames'
import { FlexBox, GridContainer, GridItem } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { useAccount } from 'hooks/account'
import { useQuery } from 'hooks/window'
import React, { useEffect, useMemo } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { AssetDetailCard, Card } from '../../../Components'
import { Groups } from '../Components'
import { MyActivity } from './MyActivity'
import { MyStakes } from './MyStakes'
import { MyProposals } from './MyProposals'
import { ReactComponent as ArrowLeftIcon } from 'assets/images/icon-arrow-left.svg'
import { ReactComponent as StakesIcon } from 'assets/images/icon-stakes.svg'
import { ReactComponent as ProposalsIcon } from 'assets/images/icon-proposals.svg'
import { ReactComponent as PieIcon } from 'assets/images/icon-pie.svg'
import useCurrentDao from 'hooks/currentDao'
import { DaoGroup } from 'redux/currentEntity/dao/currentDao.types'
import { MyVotingPower } from './MyVotingPower'

const MyParticipation: React.FC = () => {
  const history = useHistory()
  const { selectedGroups, selectDaoGroup } = useCurrentDao()
  const selectedGroup: DaoGroup | undefined = useMemo(() => {
    return Object.keys(selectedGroups).length === 1 ? Object.values(selectedGroups)[0] : undefined
  }, [selectedGroups])
  const { registered } = useAccount()
  const { entityId } = useParams<{ entityId: string }>()
  const { getQuery } = useQuery()
  const token: string | undefined = getQuery('token')
  const expand: string | undefined = getQuery('expand')
  const tokenDetail: any = history.location.state

  useEffect(() => {
    if (!registered) {
      history.push(`/entity/${entityId}/dashboard`)
    }
  }, [registered, history, entityId])

  return (
    <FlexBox direction='column' gap={6} width='100%' color='white'>
      <Groups selectedGroups={selectedGroups} selectDaoGroup={(address: string) => selectDaoGroup(address)} />

      {selectedGroup && (
        <>
          <Typography variant='secondary' size='5xl' weight='normal' color='dark-blue'>
            My participation in the{' '}
            <Typography variant='secondary' size='5xl' weight='normal' color='white'>
              {selectedGroup.config.name}
            </Typography>{' '}
            group
          </Typography>

          {/* expand === 'token' */}
          {selectedGroup.type === 'staking' && (
            <Card
              className={clxs({ 'd-none': expand !== 'token' })}
              icon={<StakesIcon />}
              label='My Stakes'
              actionIcon={<ArrowLeftIcon />}
              onAction={() => history.goBack()}
            >
              <MyStakes show={expand === 'token'} coreAddress={selectedGroup.coreAddress} />
            </Card>
          )}
          {/* expand === 'votingPower' */}
          {selectedGroup.type === 'membership' && (
            <Card
              className={clxs({ 'd-none': expand !== 'votingPower' })}
              icon={<PieIcon />}
              label='My Voting Power'
              actionIcon={<ArrowLeftIcon />}
              onAction={() => history.goBack()}
            >
              <MyVotingPower show={expand === 'votingPower'} coreAddress={selectedGroup.coreAddress} />
            </Card>
          )}
          {/* expand === 'proposal' */}
          <Card
            className={clxs({ 'd-none': expand !== 'proposal' })}
            icon={<ProposalsIcon />}
            label='My Proposals'
            actionIcon={<ArrowLeftIcon />}
            onAction={() => history.goBack()}
          >
            <MyProposals show={expand === 'proposal'} coreAddress={selectedGroup.coreAddress} />
          </Card>
          {/* token && tokenDetail */}
          {selectedGroup.type === 'staking' && <AssetDetailCard show={token && tokenDetail} {...tokenDetail} />}
          {/* !expand && !token */}
          <GridContainer
            className={clxs({ 'd-none': expand || token })}
            gridTemplateAreas={`"a a b b" "c c c c"`}
            gridTemplateColumns={'1fr 1fr 1fr 1fr'}
            gridTemplateRows={'repeat(2, minmax(330px, auto))'}
            gridGap={6}
            width='100%'
          >
            <GridItem gridArea='a'>
              {selectedGroup.type === 'staking' && (
                <Card
                  icon={<StakesIcon />}
                  label='My Stakes'
                  onAction={() => history.push({ pathname: history.location.pathname, search: `?expand=token` })}
                >
                  <MyStakes show={!expand && !token} coreAddress={selectedGroup.coreAddress} />
                </Card>
              )}

              {selectedGroup.type === 'membership' && (
                <Card
                  icon={<PieIcon />}
                  label='My Voting Power'
                  onAction={() => history.push({ pathname: history.location.pathname, search: `?expand=votingPower` })}
                >
                  <MyVotingPower show={!expand && !token} coreAddress={selectedGroup.coreAddress} />
                </Card>
              )}
            </GridItem>
            <GridItem gridArea='b'>
              <Card
                icon={<ProposalsIcon />}
                label='My Proposals'
                onAction={() => history.push({ pathname: history.location.pathname, search: `?expand=proposal` })}
              >
                <MyProposals show={!expand && !token} coreAddress={selectedGroup.coreAddress} full={false} />
              </Card>
            </GridItem>
            <GridItem gridArea='c'>
              <MyActivity />
            </GridItem>
          </GridContainer>
        </>
      )}
    </FlexBox>
  )
}

export default MyParticipation
