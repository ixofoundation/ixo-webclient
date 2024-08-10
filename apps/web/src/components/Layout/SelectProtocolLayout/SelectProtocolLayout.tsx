import { Box, Flex, ScrollArea, Text, TextInput, rem } from '@mantine/core'
import { Outlet } from 'react-router-dom'
import { ReactComponent as AssistantIcon } from 'assets/images/icon-assistant.svg'
import { useRequestsContext } from 'contexts/RequestsContext'
import ActionPanel from 'components/ActionPanel/ActionPanel'

const CreateFlowLayout = () => {
  const { setSearchString } = useRequestsContext()
  return (
    <Flex w='100%' h='calc(-74px + 100vh)'>
      <Flex w='100%' direction={'column'}>
        <Flex w='100%' h={200} align={'center'} bg='linear-gradient(135deg, #05324C 0%, #149FBD 100%)' pos='relative'>
          <Box w='90%' mx='auto'>
            <Text size={rem(30)} c='white'>
              Create Entity
            </Text>
            <Text size={rem(20)} c='white' mt={10}>
              Select a Protocol
            </Text>
          </Box>

          <TextInput
            w='600px'
            pos={'absolute'}
            bottom={0}
            left={0}
            right={0}
            mb={-20}
            mx='auto'
            radius={'md'}
            rightSection={<AssistantIcon />}
            size='lg'
            placeholder='Search'
            style={{ overflow: 'hidden', zIndex: 9999 }}
            onChange={(event) => setSearchString(event.target.value)}
          />
        </Flex>
        <ScrollArea w='100%' h='100%'>
          <Outlet />
        </ScrollArea>
      </Flex>
      <Flex w='360px' h='100%'>
        <ActionPanel />
      </Flex>
    </Flex>
  )
}

export default CreateFlowLayout
