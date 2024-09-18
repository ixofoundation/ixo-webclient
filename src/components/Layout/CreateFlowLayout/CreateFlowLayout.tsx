import { Flex, ScrollArea } from '@mantine/core'
import ActionPanel from 'components/ActionPanel/ActionPanel'
import { Outlet } from 'react-router-dom'

const CreateFlowLayout = () => {
  return (
    <Flex w='100%' h='calc(-74px + 100vh)'>
      <Flex w='100%'>
        <ScrollArea w={'100%'}>
          <Outlet />
        </ScrollArea>
      </Flex>
      <Flex w='360px' h=' 100%'>
        <ActionPanel />
      </Flex>
    </Flex>
  )
}

export default CreateFlowLayout
