import { Box, Flex, ScrollArea, Text, TextInput, rem } from '@mantine/core'
import { Outlet } from 'react-router-dom'
import { ReactComponent as AssistantIcon } from 'assets/images/icon-assistant.svg'
import { useRequestsContext } from 'contexts/RequestsContext'
import { useSelector } from 'react-redux'
import { selectEntityHeadUIConfig } from 'redux/entities/entities.selectors'

const ExploreLayout = () => {
  const headConfig = useSelector(selectEntityHeadUIConfig)
  const title = headConfig?.title
  const { setSearchString } = useRequestsContext()
  return (
    <Flex w='100%' h='calc(-74px + 100vh)' direction={'column'}>
      <Flex w='100%' h={200} align={'center'} bg='linear-gradient(135deg, #05324C 0%, #149FBD 100%)' pos='relative'>
        <Box w='90%' mx='auto'>
          <Text size={rem(30)} c='white'>
            {title}
          </Text>
          <Text size={rem(20)} c='white' mt={10}>
            Requests
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
          style={{ overflow: "hidden", zIndex: 9999}}
          onChange={(event) => setSearchString(event.target.value)}
        />
      </Flex>
      <ScrollArea w='100%' h='100%'>
        <Outlet />
      </ScrollArea>
    </Flex>
  )
}

export default ExploreLayout
