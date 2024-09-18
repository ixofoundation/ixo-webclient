import { Flex } from '@mantine/core'
import { useParams } from 'react-router-dom'
import { getEntityById } from 'redux/entities/entities.selectors'
import { useAppSelector } from 'redux/hooks'
import { TEntityModel } from 'types/entities'
import CreatorCard from './CreatorCard'
import TaskDetailsCard from './TaskDetailsCard'
import TimeSpanCard from './TimeSpanCard'
import FundingCard from './FundingCard'
import { DidQRCode } from '../DidQRCode'

const ActionsFactory = ({ entity }: { entity: TEntityModel }) => {
  const { tab, id } = useParams<{
    tab: string
    id: string
  }>()
  switch (entity.type) {
    case 'dao':
      return <Flex direction={'column'}></Flex>
    case 'oracle':
      return <Flex direction={'column'}></Flex>
    case 'project':
      return (
        <Flex direction={'column'}>
          <DidQRCode />
        </Flex>
      )
    case 'protocol':
      return <Flex direction={'column'}></Flex>
    case 'deed/request':
      if (tab === 'tasks' && id) {
        return <TaskDetailsCard />
      }
      return (
        <Flex direction={'column'} gap='md'>
          <CreatorCard />
          <FundingCard />
          <TimeSpanCard />
        </Flex>
      )
    default:
      return <Flex></Flex>
  }
}

const ActionsScreen = () => {
  const { entityId = '' } = useParams()
  const entity = useAppSelector(getEntityById(entityId))

  return <ActionsFactory entity={entity} />
}

export default ActionsScreen
