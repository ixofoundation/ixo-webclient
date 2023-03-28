import { FlexBox, GridContainer, GridItem } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { useAccount } from 'hooks/account'
import useCurrentDao from 'hooks/currentDao'
import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Groups } from '../Components'
import { Activity } from './Activity'
import { MyStakes } from './MyStakes'

const MyStats: React.FC = () => {
  const history = useHistory()
  const { entityId } = useParams<{ entityId: string }>()
  const { registered } = useAccount()
  const { selectedGroups } = useCurrentDao()

  useEffect(() => {
    if (!registered) {
      history.push(`/entity/${entityId}/dashboard/overview`)
    }
  }, [registered, history, entityId])

  return (
    <FlexBox direction='column' gap={6} width='100%' color='white'>
      <Groups isFollowing />
      {Object.keys(selectedGroups).length > 0 && (
        <>
          <Typography variant='secondary' size='4xl' weight='normal'>
            My Stakes
          </Typography>

          <GridContainer
            gridTemplateAreas={`"a a b b" "c c c c"`}
            gridTemplateColumns={'1fr 1fr 1fr 1fr'}
            gridTemplateRows={'repeat(2, minmax(330px, auto))'}
            gridGap={6}
            width='100%'
          >
            <GridItem gridArea='a'>
              <MyStakes />
            </GridItem>
            <GridItem gridArea='b'>B</GridItem>
            <GridItem gridArea='c'>
              <Activity />
            </GridItem>
          </GridContainer>
        </>
      )}
    </FlexBox>
  )
}

export default MyStats
