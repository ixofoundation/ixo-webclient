import { Flex } from '@mantine/core'
import { useParams } from 'react-router-dom'
import { getEntityById } from 'redux/entities/entities.selectors'
import { useAppSelector } from 'redux/hooks'
import { TEntityModel } from 'types/entities'
import CreatorCard from './CreatorCard'
import LocationCard from './LocationCard'
import ResourcesCard from './ResourcesCard'
import TaskDetailsCard from './TaskDetailsCard'
import TimeSpanCard from './TimeSpanCard'

const ActionsFactory = ({ entity }: { entity: TEntityModel }) => {
  const { tab, id } = useParams<{
    tab: string
    id: string
  }>()
  switch (entity.type) {
    case 'dao':
      return (
        <Flex direction={'column'}>
          <div>dao actions</div>
        </Flex>
      )
    case 'oracle':
      return (
        <Flex direction={'column'}>
          <div>oracle actions</div>
        </Flex>
      )
    case 'project':
      return (
        <Flex direction={'column'}>
          <div>project actions</div>
        </Flex>
      )
    case 'protocol':
      return (
        <Flex direction={'column'}>
          <div>protocol actions</div>
        </Flex>
      )
    case 'deed/request':
      if (tab === 'tasks' && id) {
        return <TaskDetailsCard />
      }
      return (
        <Flex direction={'column'} gap='md'>
          <CreatorCard entity={entity} />
          <TimeSpanCard entity={entity} />
          <LocationCard entity={entity} />
          <ResourcesCard entity={entity} />
        </Flex>
      )
    default:
      return <Flex>Hi</Flex>
  }
}

const ActionsScreen = () => {
  const { entityId = '' } = useParams()
  const entity = useAppSelector(getEntityById(entityId))

  return <ActionsFactory entity={entity} />
}

export default ActionsScreen
