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
import { ReactComponent as ArrowLeftIcon } from 'assets/images/icon-arrow-left.svg'
import { MyProposals } from './MyProposals'

const MyGroups: React.FC = () => {
  const history = useHistory()
  const { registered, balances } = useAccount()
  const { entityId } = useParams<{ entityId: string }>()
  const { getQuery } = useQuery()
  const token: string | undefined = getQuery('token')
  const expand: string | undefined = getQuery('expand')
  const tokenDetail: any = history.location.state

  useEffect(() => {
    if (!registered) {
      history.push(`/entity/${entityId}/dashboard/overview`)
    }
  }, [registered, history, entityId])

  return (
    <FlexBox direction='column' gap={6} width='100%' color='white'>
      <Groups isFollowing />

      <Typography variant='secondary' size='5xl' weight='normal'>
        My Stakes
      </Typography>

      {expand === 'token' && (
        <Card label='My Stakes' actionIcon={<ArrowLeftIcon />} onAction={() => history.goBack()}>
          <MyStakes balances={balances} />
        </Card>
      )}
      {expand === 'proposal' && (
        <Card label='My Proposals' actionIcon={<ArrowLeftIcon />} onAction={() => history.goBack()}>
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
              label='My Stakes'
              onAction={() => history.push({ pathname: history.location.pathname, search: `?expand=token` })}
            >
              <MyStakes balances={balances} full={false} />
            </Card>
          </GridItem>
          <GridItem gridArea='b'>
            <Card
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
    </FlexBox>
  )
}

export default MyGroups
