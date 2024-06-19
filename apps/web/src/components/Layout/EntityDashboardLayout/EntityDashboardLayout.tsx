import { Flex, ScrollArea } from '@mantine/core'
import ControlPanel from 'components/ControlPanel'
import { Outlet, useParams } from 'react-router-dom'
import { getEntityById } from 'redux/entities/entities.selectors'
import { useAppSelector } from 'redux/hooks'
import { toRootEntityType } from 'utils/entities'

const EntityOverviewLayout = () => {
  const { entityId = '' } = useParams()
  const { type, profile } = useAppSelector(getEntityById(entityId))

  return (
    <Flex w='100%' h='calc(-74px + 100vh)'>
      <Flex flex={1}>
        <ScrollArea>
          <Outlet />
        </ScrollArea>
      </Flex>
      <Flex w='360px' h='100%'>
        <ControlPanel entityType={toRootEntityType(type)} entityName={profile?.name} />
      </Flex>
    </Flex>
  )
}

export default EntityOverviewLayout
