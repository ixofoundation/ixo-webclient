import { FlexBox, GridContainer, GridItem } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { useAccount } from 'hooks/account'
import { useQuery } from 'hooks/window'
import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { AssetDetailCard, Card } from '../../Components'
import { Groups } from '../Components'
import { MyActivity } from './MyActivity'
import { MyStakes } from './MyStakes'
import { MyProposals } from './MyProposals'
import { ReactComponent as ArrowLeftIcon } from 'assets/images/icon-arrow-left.svg'
import { ReactComponent as StakesIcon } from 'assets/images/icon-stakes.svg'
import { ReactComponent as ProposalsIcon } from 'assets/images/icon-proposals.svg'
import useCurrentDao from 'hooks/currentDao'

const MyParticipation: React.FC = () => {
  const history = useHistory()
  const { selectedGroups } = useCurrentDao()
  const { registered, balances } = useAccount()
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
      <Groups isFollowing />

      {Object.keys(selectedGroups).length >= 1 && (
        <>
          <Typography variant='secondary' size='5xl' weight='normal' color='dark-blue'>
            My participation in the{' '}
            <Typography variant='secondary' size='5xl' weight='normal' color='white'>
              {selectedGroups[0]?.config.name}
            </Typography>{' '}
            group
          </Typography>

          {expand === 'token' && (
            <Card
              icon={<StakesIcon />}
              label='My Stakes'
              actionIcon={<ArrowLeftIcon />}
              onAction={() => history.goBack()}
            >
              <MyStakes balances={balances} />
            </Card>
          )}
          {expand === 'proposal' && (
            <Card
              icon={<ProposalsIcon />}
              label='My Proposals'
              actionIcon={<ArrowLeftIcon />}
              onAction={() => history.goBack()}
            >
              <MyProposals />
            </Card>
          )}
          {token && tokenDetail && <AssetDetailCard {...tokenDetail} />}
          {!expand && !token && (
            <GridContainer
              gridTemplateAreas={`"a a b b" "c c c c"`}
              gridTemplateColumns={'1fr 1fr 1fr 1fr'}
              gridTemplateRows={'repeat(2, minmax(330px, auto))'}
              gridGap={6}
              width='100%'
            >
              <GridItem gridArea='a'>
                <Card
                  icon={<StakesIcon />}
                  label='My Stakes'
                  onAction={() => history.push({ pathname: history.location.pathname, search: `?expand=token` })}
                >
                  <MyStakes balances={balances} full={false} />
                </Card>
              </GridItem>
              <GridItem gridArea='b'>
                <Card
                  icon={<ProposalsIcon />}
                  label='My Proposals'
                  onAction={() => history.push({ pathname: history.location.pathname, search: `?expand=proposal` })}
                >
                  <MyProposals full={false} />
                </Card>
              </GridItem>
              <GridItem gridArea='c'>
                <MyActivity />
              </GridItem>
            </GridContainer>
          )}
        </>
      )}
    </FlexBox>
  )
}

export default MyParticipation
