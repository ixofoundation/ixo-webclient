import { Flex } from '@mantine/core'
import CreatorCard from 'components/ControlPanel/Actions/CreatorCard'
import FundingCard from 'components/ControlPanel/Actions/FundingCard'
import TimeSpanCard from 'components/ControlPanel/Actions/TimeSpanCard'
import { useParams } from 'react-router-dom'
import { getEntityById } from 'redux/entities/entities.selectors'
import { useAppSelector } from 'redux/hooks'

const includedTypes = ['deed/request']

export const RequestEntityActions = () => {
  const { entityId = '' } = useParams()
  const { type } = useAppSelector(getEntityById(entityId))

  if (!includedTypes.includes(type)) {
    return null
  }

  return (
    <Flex direction='column' gap={10}>
      <CreatorCard />
      <FundingCard />
      <TimeSpanCard />
    </Flex>
  )
}
