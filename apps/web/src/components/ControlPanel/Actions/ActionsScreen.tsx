import { useParams } from 'react-router-dom'
import { Flex } from '@mantine/core'
import { getEntityById } from 'redux/entities/entities.selectors'
import { useAppSelector } from 'redux/hooks'
import CreatorCard from './CreatorCard'
import { TEntityModel } from 'types/entities'
import TimeSpanCard from './TimeSpanCard'
import LocationCard from './LocationCard'
import ResourcesCard from './ResourcesCard'

const ActionsFactory = ({ entity }: { entity: TEntityModel }) => {
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
      return (
        <Flex direction={'column'} gap="md">
          <CreatorCard entity={entity}/>
          <TimeSpanCard entity={entity}/>
          <LocationCard entity={entity}/>
          <ResourcesCard entity={entity}/>
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
