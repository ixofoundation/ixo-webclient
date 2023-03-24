import { FlexBox } from 'components/App/App.styles'
import { useAccount } from 'hooks/account'
import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Groups } from '../Components'

const MyStats: React.FC = () => {
  const history = useHistory()
  const { entityId } = useParams<{ entityId: string }>()
  const { registered } = useAccount()

  useEffect(() => {
    if (!registered) {
      history.push(`/entity/${entityId}/dashboard/overview`)
    }
  }, [registered, history, entityId])

  return (
    <FlexBox direction='column' gap={6} width='100%' color='white'>
      <Groups isFollowing />
    </FlexBox>
  )
}

export default MyStats
