import { Flex, ScrollArea } from '@mantine/core'
import { Outlet,  } from 'react-router-dom'

const EntityDashboardLayout = () => {
  return (
    <Flex w='100%' h='calc(-74px + 100vh)'>
      <Flex flex={1}>
        <ScrollArea w="100%">
          <Outlet />
        </ScrollArea>
      </Flex>
    </Flex>
  )
}

export default EntityDashboardLayout
